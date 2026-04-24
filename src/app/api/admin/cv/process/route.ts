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
import { ALLOWED_REACT_ICON_NAMES } from "@/lib/icon";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_PDF_BYTES = 8 * 1024 * 1024; // 8 MB

// Curated short keys still accepted for backwards-compat with the seed dataset.
const LEGACY_SHORT_KEYS: ReadonlySet<string> = new Set([
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
  "jest",
  "cypress",
  "git",
  "gitlab",
  "github",
  "vercel",
  "link",
]);

const ALLOWED_ICON_NAMES: ReadonlySet<string> = new Set([
  ...LEGACY_SHORT_KEYS,
  ...ALLOWED_REACT_ICON_NAMES,
]);

function pickIcon(value: string | null): string | undefined {
  if (!value) return undefined;
  return ALLOWED_ICON_NAMES.has(value) ? value : undefined;
}

// Brand/product label aliases: when the model fails to assign an icon, try
// to recover one from the human-readable label (case- and space-insensitive).
const LABEL_ICON_ALIASES: Record<string, string> = {
  // OpenAI family
  codex: "SiOpenai",
  "openai codex": "SiOpenai",
  chatgpt: "SiOpenai",
  "chat gpt": "SiOpenai",
  gpt: "SiOpenai",
  "gpt-4": "SiOpenai",
  "gpt-4o": "SiOpenai",
  "gpt-5": "SiOpenai",
  o1: "SiOpenai",
  // Anthropic family
  claude: "SiClaude",
  "claude code": "SiClaude",
  "claude.ai": "SiClaude",
  anthropic: "SiAnthropic",
  // GitHub Copilot family
  copilot: "SiGithubcopilot",
  "github copilot": "SiGithubcopilot",
  "copilot chat": "SiGithubcopilot",
  // Other AI tools (no dedicated icon; use sensible fallbacks)
  cursor: "FiTerminal",
  windsurf: "FiTerminal",
  "v0.dev": "SiVercel",
  v0: "SiVercel",
  bolt: "SiVercel",
  perplexity: "SiPerplexity",
  gemini: "SiGooglegemini",
  "google gemini": "SiGooglegemini",
  bard: "SiGooglegemini",
  "hugging face": "SiHuggingface",
  huggingface: "SiHuggingface",
  langchain: "SiLangchain",
  llamaindex: "FiCpu",
  ollama: "FiCpu",
  // Frameworks/runtimes commonly missed
  "next.js": "SiNextdotjs",
  nextjs: "SiNextdotjs",
  "node.js": "SiNodedotjs",
  nodejs: "SiNodedotjs",
  "ci/cd": "SiGithubactions",
  cicd: "SiGithubactions",
};

function normalizeLabelKey(label: string): string {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function aliasIconFromLabel(label: string): string | undefined {
  const k = normalizeLabelKey(label);
  return LABEL_ICON_ALIASES[k];
}

function pickColor(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value) ? value : undefined;
}

// Brand color fallback keyed by react-icons name OR legacy short key.
// Used when the model omits or returns an invalid color.
const BRAND_COLORS: Record<string, string> = {
  // Languages
  SiJavascript: "#F7DF1E",
  js: "#F7DF1E",
  SiTypescript: "#3178C6",
  typescript: "#3178C6",
  SiPython: "#3776AB",
  SiGo: "#00ADD8",
  SiRust: "#DEA584",
  SiKotlin: "#7F52FF",
  SiSwift: "#F05138",
  SiCplusplus: "#00599C",
  SiC: "#A8B9CC",
  SiPhp: "#777BB4",
  SiRuby: "#CC342D",
  SiDart: "#0175C2",
  // Web core
  SiHtml5: "#E34F26",
  html: "#E34F26",
  SiCss3: "#1572B6",
  css: "#1572B6",
  SiSass: "#CC6699",
  scss: "#CC6699",
  SiTailwindcss: "#38BDF8",
  tailwind: "#38BDF8",
  // Frameworks
  SiReact: "#61DAFB",
  react: "#61DAFB",
  SiNextdotjs: "#FFFFFF",
  next: "#FFFFFF",
  SiAstro: "#FF5D01",
  astro: "#FF5D01",
  SiVuedotjs: "#42B883",
  SiNuxtdotjs: "#00DC82",
  SiAngular: "#DD0031",
  SiSvelte: "#FF3E00",
  SiNodedotjs: "#339933",
  node: "#339933",
  SiExpress: "#FFFFFF",
  SiNestjs: "#E0234E",
  SiDjango: "#0C4B33",
  SiFlask: "#FFFFFF",
  SiFastapi: "#009688",
  SiSpring: "#6DB33F",
  SiDotnet: "#512BD4",
  SiRubyonrails: "#D30001",
  // UI libs
  SiMui: "#007FFF",
  SiMaterialdesign: "#757575",
  SiChakraui: "#319795",
  SiRadixui: "#FFFFFF",
  SiShadcnui: "#FFFFFF",
  SiBootstrap: "#7952B3",
  SiFramer: "#0055FF",
  SiStorybook: "#FF4785",
  SiThreedotjs: "#FFFFFF",
  SiD3Dotjs: "#F9A03C",
  SiRedux: "#764ABC",
  // DBs
  SiMysql: "#4479A1",
  mysql: "#4479A1",
  SiMongodb: "#47A248",
  mongodb: "#47A248",
  SiPostgresql: "#4169E1",
  SiRedis: "#FF4438",
  SiSqlite: "#003B57",
  SiGraphql: "#E10098",
  SiPrisma: "#2D3748",
  SiSupabase: "#3ECF8E",
  // Cloud
  SiAmazon: "#FF9900",
  aws: "#FF9900",
  SiGooglecloud: "#4285F4",
  gcp: "#4285F4",
  SiFirebase: "#FFCA28",
  firebase: "#FFCA28",
  SiCloudflare: "#F38020",
  SiHeroku: "#430098",
  SiNetlify: "#00C7B7",
  SiDigitalocean: "#0080FF",
  SiRender: "#46E3B7",
  SiVercel: "#FFFFFF",
  vercel: "#FFFFFF",
  SiSalesforce: "#00A1E0",
  salesforce: "#00A1E0",
  SiVeeam: "#64748B",
  veeva: "#64748B",
  // DevOps / CI
  SiDocker: "#2496ED",
  SiKubernetes: "#326CE5",
  SiNginx: "#009639",
  SiTerraform: "#7B42BC",
  SiAnsible: "#EE0000",
  SiPrometheus: "#E6522C",
  SiGrafana: "#F46800",
  SiElasticsearch: "#005571",
  SiKibana: "#E8478B",
  SiApachekafka: "#231F20",
  SiRabbitmq: "#FF6600",
  SiCircleci: "#343434",
  SiTravisci: "#3EAAAF",
  SiJenkins: "#D24939",
  SiGithubactions: "#2088FF",
  // VCS
  SiGit: "#F05032",
  git: "#F05032",
  SiGithub: "#FFFFFF",
  github: "#FFFFFF",
  SiGitlab: "#FC6D26",
  gitlab: "#FC6D26",
  SiBitbucket: "#0052CC",
  // Testing
  SiJest: "#C21325",
  jest: "#C21325",
  SiCypress: "#69D3A7",
  cypress: "#69D3A7",
  SiSelenium: "#43B02A",
  SiVitest: "#6E9F18",
  SiPostman: "#FF6C37",
  SiInsomnia: "#4000BF",
  SiSwagger: "#85EA2D",
  // Project mgmt
  SiJira: "#0052CC",
  SiTrello: "#0079BF",
  SiConfluence: "#172B4D",
  SiNotion: "#FFFFFF",
  SiSlack: "#4A154B",
  // Design
  SiFigma: "#F24E1E",
  SiCanva: "#00C4CC",
  SiAdobephotoshop: "#31A8FF",
  SiAdobeillustrator: "#FF9A00",
  SiAdobexd: "#FF61F6",
  // Data / ML
  SiTensorflow: "#FF6F00",
  SiPytorch: "#EE4C2C",
  SiPandas: "#150458",
  SiNumpy: "#013243",
  SiScikitlearn: "#F7931E",
  SiJupyter: "#F37626",
  SiKaggle: "#20BEFF",
  SiOpencv: "#5C3EE8",
  SiKeras: "#D00000",
  // Mobile
  SiAndroid: "#3DDC84",
  SiIos: "#FFFFFF",
  SiFlutter: "#02569B",
  SiExpo: "#FFFFFF",
  // OS
  SiLinux: "#FCC624",
  SiUbuntu: "#E95420",
  SiApple: "#FFFFFF",
  // AI tools
  SiOpenai: "#10A37F",
  SiAnthropic: "#D97757",
  SiClaude: "#D97757",
  SiGithubcopilot: "#FFFFFF",
  SiPerplexity: "#1FB8CD",
  SiHuggingface: "#FFD21E",
  SiGooglegemini: "#1C69FF",
  SiLangchain: "#1C3C3C",
  // Security / auth
  SiAuth0: "#EB5424",
  // Misc
  SiObsidian: "#7C3AED",
  SiVeed: "#B5FF44",
  SiStripe: "#635BFF",
  SiPaypal: "#003087",
  SiTwilio: "#F22F46",
  SiSendgrid: "#1A82E2",
  SiWebpack: "#8DD6F9",
  SiVite: "#646CFF",
  SiBabel: "#F9DC3E",
  SiEslint: "#4B32C3",
  SiPrettier: "#F7B93E",
};

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
- Skills must be grouped into categories. Prefer reusing one of these canonical ids when applicable: frontend, backend, db, cloud_tools, testing, methodologies, devops. If the CV introduces a topic that does not fit any canonical id (for example: "AI tools", "design", "mobile", "data science", "security"), CREATE a new category with a stable kebab-case ascii id (e.g. "ai-tools", "design", "mobile", "data-science", "security"). Reuse ids from the existingCategoryIds hint when the topic matches semantically. Each category title must be localized in es and en.
- For each skill item, set "icon" to the EXACT react-icons component name from the allowedIcons list provided in the user message (e.g. "SiOpenai", "SiPython", "SiReact"). If no good match exists, return null. Do not invent names not present in allowedIcons.
- For each skill item, also set "color" to the brand hex color of that technology (e.g. OpenAI: "#10A37F", JavaScript: "#F7DF1E", TypeScript: "#3178C6", Python: "#3776AB", React: "#61DAFB", Hugging Face: "#FFD21E"). ALWAYS try to provide the brand color — even when "icon" is null — so the UI can render a colored monogram. Use null only if the item is a generic concept (e.g. "Communication", "Problem Solving") with no associated brand.
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

  const existingCategoryIds: Array<{ id: string; title: string }> = [];
  if (published?.skills?.en) {
    for (const cat of published.skills.en) {
      existingCategoryIds.push({ id: cat.id, title: cat.title });
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

    const userInstruction = `Extract and translate the attached CV PDF.

allowedIcons (use EXACT names for skill.icon, or null):
${JSON.stringify(ALLOWED_REACT_ICON_NAMES)}

existingIds hint (reuse these experience ids when a position matches semantically):
${JSON.stringify(existingIds, null, 2)}

existingCategoryIds hint (reuse these skill category ids when a topic matches; otherwise create new kebab-case ids for topics like AI tools, design, mobile, etc.):
${JSON.stringify(existingCategoryIds, null, 2)}`;

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
        items: c.items.map((it) => {
          const icon = aliasIconFromLabel(it.label) ?? pickIcon(it.icon);
          const color =
            pickColor(it.color) ?? (icon ? BRAND_COLORS[icon] : undefined);
          return {
            label: it.label,
            ...(icon ? { icon } : {}),
            ...(color ? { color } : {}),
          };
        }),
      })),
      en: extracted.skills.map<SkillCategory>((c) => ({
        id: c.id,
        title: c.title.en,
        items: c.items.map((it) => {
          const icon = aliasIconFromLabel(it.label) ?? pickIcon(it.icon);
          const color =
            pickColor(it.color) ?? (icon ? BRAND_COLORS[icon] : undefined);
          return {
            label: it.label,
            ...(icon ? { icon } : {}),
            ...(color ? { color } : {}),
          };
        }),
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
