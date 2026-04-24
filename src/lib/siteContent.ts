import "server-only";

import { unstable_cache, revalidateTag } from "next/cache";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { experience as fallbackExperience } from "@/data/experience";
import { skills as fallbackSkills } from "@/data/skills";
import { profile as fallbackProfile } from "@/data/profile";
import type {
  AboutFields,
  Experience,
  Locale,
  SiteContent,
  SiteContentDoc,
  SkillCategory,
} from "@/lib/types";

export const SITE_CONTENT_TAG = "site-content";
export const SITE_CONTENT_COLLECTION = "siteContent";
export const SITE_CONTENT_PUBLISHED_DOC = "cv";
export const SITE_CONTENT_DRAFT_DOC = "cv_draft";

function fallbackAboutFor(locale: Locale): AboutFields {
  const p = fallbackProfile[locale];
  return {
    summary: p.summary,
    softSkills: p.softSkills,
    learningNow: p.learningNow,
    hobbies: p.hobbies,
  };
}

function fallbackSiteContent(): SiteContent {
  return {
    experience: {
      es: fallbackExperience.es,
      en: fallbackExperience.en,
    },
    skills: {
      es: fallbackSkills.es,
      en: fallbackSkills.en,
    },
    about: {
      es: fallbackAboutFor("es"),
      en: fallbackAboutFor("en"),
    },
  };
}

function isSiteContentShape(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    !!v.experience &&
    typeof v.experience === "object" &&
    !!v.skills &&
    typeof v.skills === "object" &&
    !!v.about &&
    typeof v.about === "object"
  );
}

// Convert any non-plain values (Firestore Timestamp, Date, class instances) into
// values safe to cross the Server -> Client component boundary.
function toPlain<T>(value: T): T {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map((v) => toPlain(v)) as unknown as T;
  if (typeof value !== "object") return value;

  const obj = value as unknown as {
    toMillis?: () => number;
    toDate?: () => Date;
  };
  if (typeof obj.toMillis === "function") {
    return obj.toMillis() as unknown as T;
  }
  if (value instanceof Date) {
    return value.getTime() as unknown as T;
  }

  const proto = Object.getPrototypeOf(value);
  if (proto === Object.prototype || proto === null) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === undefined) continue;
      out[k] = toPlain(v);
    }
    return out as T;
  }

  // Fallback for other class instances: round-trip through JSON.
  try {
    return JSON.parse(JSON.stringify(value)) as T;
  } catch {
    return value;
  }
}

async function readPublishedFromFirestore(): Promise<SiteContent> {
  try {
    const db = getAdminDb();
    const snap = await db
      .collection(SITE_CONTENT_COLLECTION)
      .doc(SITE_CONTENT_PUBLISHED_DOC)
      .get();
    if (!snap.exists) return fallbackSiteContent();
    const data = snap.data();
    if (!isSiteContentShape(data)) return fallbackSiteContent();
    return {
      experience: data.experience as Record<Locale, Experience[]>,
      skills: data.skills as Record<Locale, SkillCategory[]>,
      about: data.about as Record<Locale, AboutFields>,
    };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[siteContent] falling back to hardcoded data:", err);
    }
    return fallbackSiteContent();
  }
}

const cachedSiteContent = unstable_cache(
  async () => readPublishedFromFirestore(),
  ["site-content"],
  { tags: [SITE_CONTENT_TAG], revalidate: 300 },
);

export async function getSiteContent(): Promise<SiteContent> {
  return cachedSiteContent();
}

export async function getDraftSiteContent(): Promise<SiteContentDoc | null> {
  try {
    const db = getAdminDb();
    const snap = await db
      .collection(SITE_CONTENT_COLLECTION)
      .doc(SITE_CONTENT_DRAFT_DOC)
      .get();
    if (!snap.exists) return null;
    const data = snap.data();
    if (!isSiteContentShape(data)) return null;
    return toPlain(data) as SiteContentDoc;
  } catch {
    return null;
  }
}

export async function getPublishedDoc(): Promise<SiteContentDoc | null> {
  try {
    const db = getAdminDb();
    const snap = await db
      .collection(SITE_CONTENT_COLLECTION)
      .doc(SITE_CONTENT_PUBLISHED_DOC)
      .get();
    if (!snap.exists) return null;
    const data = snap.data();
    if (!isSiteContentShape(data)) return null;
    return toPlain(data) as SiteContentDoc;
  } catch {
    return null;
  }
}

export function invalidateSiteContent() {
  revalidateTag(SITE_CONTENT_TAG, "max");
}
