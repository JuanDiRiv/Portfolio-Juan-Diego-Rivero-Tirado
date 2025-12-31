import { NextResponse } from "next/server";
import { FieldPath } from "firebase-admin/firestore";
import { verifyAdminSessionCookie } from "@/lib/adminSession";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const admin = await verifyAdminSessionCookie();
  if (!admin) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = (await req.json().catch(() => null)) as {
    sessionId?: string;
  } | null;
  const sessionId = (body?.sessionId || "").trim();
  if (!sessionId || sessionId === "ALL" || sessionId === "unknown") {
    return NextResponse.json(
      { ok: false, error: "Invalid sessionId" },
      { status: 400 }
    );
  }

  const db = getAdminDb();

  // Safety guard to avoid accidental huge deletes from one click.
  const MAX_DELETE = 50000;
  const PAGE_SIZE = 500;

  let deleted = 0;
  let lastDocId: string | null = null;

  while (deleted < MAX_DELETE) {
    let query = db
      .collection("clickEvents")
      .where("sessionId", "==", sessionId)
      .orderBy(FieldPath.documentId())
      .limit(PAGE_SIZE);

    if (lastDocId) {
      query = query.startAfter(lastDocId);
    }

    const snap = await query.get();
    if (snap.empty) break;

    const batch = db.batch();
    for (const doc of snap.docs) {
      batch.delete(doc.ref);
    }

    await batch.commit();

    deleted += snap.size;
    lastDocId = snap.docs[snap.docs.length - 1]!.id;

    if (snap.size < PAGE_SIZE) break;
  }

  return NextResponse.json({
    ok: true,
    deleted,
    truncated: deleted >= MAX_DELETE,
  });
}
