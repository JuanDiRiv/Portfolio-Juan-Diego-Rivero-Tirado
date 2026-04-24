import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";

import { verifyAdminSessionCookie } from "@/lib/adminSession";
import { getAdminDb } from "@/lib/firebaseAdmin";
import {
  SITE_CONTENT_COLLECTION,
  SITE_CONTENT_DRAFT_DOC,
  SITE_CONTENT_PUBLISHED_DOC,
  invalidateSiteContent,
} from "@/lib/siteContent";
import type { SiteContentDoc } from "@/lib/types";

export const runtime = "nodejs";

export async function POST() {
  const admin = await verifyAdminSessionCookie();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminDb();
  const draftRef = db.collection(SITE_CONTENT_COLLECTION).doc(SITE_CONTENT_DRAFT_DOC);
  const draftSnap = await draftRef.get();
  if (!draftSnap.exists) {
    return NextResponse.json(
      { ok: false, error: "No draft to publish" },
      { status: 404 }
    );
  }

  const draft = draftSnap.data() as SiteContentDoc;
  const now = Date.now();

  const published: SiteContentDoc = {
    experience: draft.experience,
    skills: draft.skills,
    about: draft.about,
    status: "published",
    updatedAt: now,
    publishedAt: now,
    updatedBy: admin.email || admin.uid,
    sourceFileName: draft.sourceFileName,
    model: draft.model,
  };

  await db
    .collection(SITE_CONTENT_COLLECTION)
    .doc(SITE_CONTENT_PUBLISHED_DOC)
    .set({
      ...published,
      updatedAtTs: Timestamp.now(),
      publishedAtTs: Timestamp.now(),
    });

  // Remove the draft once promoted
  await draftRef.delete();

  invalidateSiteContent();

  return NextResponse.json({ ok: true, publishedAt: now });
}
