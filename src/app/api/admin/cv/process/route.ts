import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";

import { verifyAdminSessionCookie } from "@/lib/adminSession";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { getOpenAI, getOpenAIModel } from "@/lib/openai";
import { cvExtractionJsonSchema, cvExtractionSchema } from "@/lib/cvSchema";
import {
  SITE_CONTENT_COLLECTION,
  SITE_CONTENT_DRAFT_DOC,
  SITE_CONTENT_PUBLISHED_DOC,
} from "@/lib/siteContent";
import type {
  AboutFields,
  Experience,
  Locale,
  SiteContentDoc,
  SkillCategory,
} from "@/lib/types";
import type { IconKey } from "@/lib/icon";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_PDF_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_ICON_KEYS: ReadonlySet<string> = new Set<IconKey>([
  "html",
  "css",
  "scss",
  "tailwind",
  "js",
  "typescript",
  "react",
  "next",
  "astro",
  "seo",
  "node",
  "mysql",
  "mongodb",
  "firebase",
  "aws",
  "gcp",
  "salesforce",
  "veeva",
  "cat-frontend",
  "cat-backend",
  "cat-db",
  "cat-cloud",
  "cat-testing",
  "cat-methods",
  "cat-devops",
  "jest",
  "cypress",
  "git",
  "gitlab",
  "github",
  "vercel",
  "link",
]);

function pickIcon(value: string | null): IconKey | undefined {
  if (!value) return undefined;
  return ALLOWED_ICON_KEYS.has(value) ? (value as IconKey) : undefined;
}

// Recursively remove keys whose value is `undefined` so Firestore accepts the document
// even if `ignoreUndefinedProperties` setting wasn't applied (e.g. on first cold start).
function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((v) => stripUndefined(v)) as unknown as T;
  }
  if (value && typeof value === "object" && !(value instanceof Date)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === undefined) continue;
      out[k] = stripUndefined(v);
    }
    return out as T;
  }
  return value;
}

const SYSTEM_PROMPT = `You extract structured resume data from a candidate's CV PDF.

Rules:
- Detect the CV's source language. Always output BOTH Spanish (es) and English (en) for every localized field. Translate naturally — do not transliterate brand or technology names.
- Preserve the candidate's original meaning. Never invent jobs, dates, companies, achievements, or technologies. If a field is not present in the CV, use a sensible empty value (empty array) but do NOT fabricate.
- Dates must use the format YYYY-MM. Use null for endDate when the role is current/ongoing.
- For experience entries, set "id" to a stable slug.
  * If existingIds hint provides a match where company AND role describe the same position (case-insensitive, semantic match), REUSE that exact id.
  * Otherwise, generate id as kebab-case ascii: "<company>-<role>-<startYear>". Strip diacritics, lowercase, replace spaces with "-".
- Skills must be grouped into one of these category ids only: frontend, backend, db, cloud_tools, testing, methodologies, devops. Each category title must be localized.
- For each skill item, set icon to one of these keys when applicable, else null: html, css, scss, tailwind, js, typescript, react, next, astro, seo, node, mysql, mongodb, firebase, aws, gcp, salesforce, veeva, jest, cypress, git, gitlab, github, vercel, link.
- About section: extract a concise professional summary (3-5 sentences), soft skills, what the candidate is currently learning, and hobbies. If the CV omits any, return an empty array (or empty string for summary) — never fabricate.
- Keep technology lists deduplicated and consistently capitalized (e.g. "React", "Next.js", "TypeScript").
- Order experience from most recent to oldest.`;

type ProcessResult = {
  ok: true;
  draft: SiteContentDoc;
  summary: {
    experienceCount: number;
    skillCategoriesCount: number;
    totalSkillItems: number;
  };
};

export async function POST(req: Request) {
  const admin = await verifyAdminSessionCookie();
  if (!admin) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "OPENAI_API_KEY is not configured" },
      { status: 500 },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid multipart payload" },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "Missing 'file' field" },
      { status: 400 },
    );
  }
  if (file.type && file.type !== "application/pdf") {
    return NextResponse.json(
      { ok: false, error: "Only PDF files are accepted" },
      { status: 400 },
    );
  }
  if (file.size > MAX_PDF_BYTES) {
    return NextResponse.json(
      { ok: false, error: "PDF exceeds 8MB limit" },
      { status: 400 },
    );
  }

  const db = getAdminDb();

  // Build hint with existing experience IDs for stability
  const publishedSnap = await db
    .collection(SITE_CONTENT_COLLECTION)
    .doc(SITE_CONTENT_PUBLISHED_DOC)
    .get();
  const published = publishedSnap.exists
    ? (publishedSnap.data() as SiteContentDoc)
    : null;

  const existingIds: Array<{ id: string; company: string; role: string }> = [];
  if (published?.experience?.en) {
    for (const item of published.experience.en) {
      existingIds.push({
        id: item.id,
        company: item.company,
        role: item.role,
      });
    }
  }

  const openai = getOpenAI();
  const model = getOpenAIModel();

  let uploadedFileId: string | null = null;
  try {
    // Upload PDF to OpenAI Files API for multimodal input
    const uploaded = await openai.files.create({
      file,
      purpose: "user_data",
    });
    uploadedFileId = uploaded.id;

    const userInstruction = `Extract and translate the attached CV PDF.\n\nexistingIds hint (reuse these ids when a position matches semantically):\n${JSON.stringify(existingIds, null, 2)}`;

    const response = await openai.responses.create({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [
            { type: "input_file", file_id: uploadedFileId },
            { type: "input_text", text: userInstruction },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: cvExtractionJsonSchema.name,
          strict: cvExtractionJsonSchema.strict,
          schema: cvExtractionJsonSchema.schema,
        },
      },
    });

    const rawText = response.output_text?.trim();
    if (!rawText) {
      return NextResponse.json(
        { ok: false, error: "Empty response from model" },
        { status: 422 },
      );
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Model returned invalid JSON" },
        { status: 422 },
      );
    }

    const validation = cvExtractionSchema.safeParse(parsedJson);
    if (!validation.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Schema validation failed",
          issues: validation.error.issues,
        },
        { status: 422 },
      );
    }

    const extracted = validation.data;

    // Map AI output to internal site content shape
    const experience: Record<Locale, Experience[]> = {
      es: extracted.experience.map<Experience>((e) => ({
        id: e.id,
        role: e.role.es,
        company: e.company,
        companyUrl: e.companyUrl ?? undefined,
        location: e.location ?? undefined,
        startDate: e.startDate,
        endDate: e.endDate ?? undefined,
        description: e.description.es,
        highlights: e.highlights.es,
        technologies: e.technologies,
      })),
      en: extracted.experience.map<Experience>((e) => ({
        id: e.id,
        role: e.role.en,
        company: e.company,
        companyUrl: e.companyUrl ?? undefined,
        location: e.location ?? undefined,
        startDate: e.startDate,
        endDate: e.endDate ?? undefined,
        description: e.description.en,
        highlights: e.highlights.en,
        technologies: e.technologies,
      })),
    };

    const skills: Record<Locale, SkillCategory[]> = {
      es: extracted.skills.map<SkillCategory>((c) => ({
        id: c.id,
        title: c.title.es,
        items: c.items.map((it) => ({
          label: it.label,
          ...(pickIcon(it.icon) ? { icon: pickIcon(it.icon)! } : {}),
        })),
      })),
      en: extracted.skills.map<SkillCategory>((c) => ({
        id: c.id,
        title: c.title.en,
        items: c.items.map((it) => ({
          label: it.label,
          ...(pickIcon(it.icon) ? { icon: pickIcon(it.icon)! } : {}),
        })),
      })),
    };

    const about: Record<Locale, AboutFields> = {
      es: {
        summary: extracted.about.summary.es,
        softSkills: extracted.about.softSkills.es,
        learningNow: extracted.about.learningNow.es,
        hobbies: extracted.about.hobbies.es,
      },
      en: {
        summary: extracted.about.summary.en,
        softSkills: extracted.about.softSkills.en,
        learningNow: extracted.about.learningNow.en,
        hobbies: extracted.about.hobbies.en,
      },
    };

    const draft: SiteContentDoc = {
      experience,
      skills,
      about,
      status: "draft",
      updatedAt: Date.now(),
      updatedBy: admin.email || admin.uid,
      sourceFileName: file.name || "cv.pdf",
      model,
    };

    await db
      .collection(SITE_CONTENT_COLLECTION)
      .doc(SITE_CONTENT_DRAFT_DOC)
      .set(
        stripUndefined({
          ...draft,
          updatedAtTs: Timestamp.now(),
        }),
      );

    const result: ProcessResult = {
      ok: true,
      draft,
      summary: {
        experienceCount: experience.en.length,
        skillCategoriesCount: skills.en.length,
        totalSkillItems: skills.en.reduce((acc, c) => acc + c.items.length, 0),
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isProd = process.env.NODE_ENV === "production";
    return NextResponse.json(
      isProd
        ? { ok: false, error: "Failed to process CV" }
        : { ok: false, error: message },
      { status: 500 },
    );
  } finally {
    if (uploadedFileId) {
      try {
        await getOpenAI().files.delete(uploadedFileId);
      } catch {
        // best effort cleanup
      }
    }
  }
}
