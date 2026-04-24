import { NextResponse } from "next/server";

import { verifyAdminSessionCookie } from "@/lib/adminSession";
import { getAdminDb } from "@/lib/firebaseAdmin";
import {
  SITE_CONTENT_COLLECTION,
  SITE_CONTENT_DRAFT_DOC,
} from "@/lib/siteContent";

export const runtime = "nodejs";

export async function POST() {
  const admin = await verifyAdminSessionCookie();
  if (!admin) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const db = getAdminDb();
  await db
    .collection(SITE_CONTENT_COLLECTION)
    .doc(SITE_CONTENT_DRAFT_DOC)
    .delete()
    .catch(() => undefined);

  return NextResponse.json({ ok: true });
}
