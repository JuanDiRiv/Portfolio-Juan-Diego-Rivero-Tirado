import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

type IncomingEvent = {
  tsMs?: number;
  path?: string;
  kind?: "link" | "button" | "custom";
  href?: string;
  text?: string;
  trackId?: string;
  sessionId?: string;
  referrer?: string;
};

function clampText(input: unknown, max: number) {
  if (typeof input !== "string") return undefined;
  const v = input.trim();
  if (!v) return undefined;
  return v.length > max ? `${v.slice(0, max)}…` : v;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      events?: IncomingEvent[];
    } | null;
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }
    const events = Array.isArray(body.events) ? body.events.slice(0, 50) : [];
    if (events.length === 0) {
      return NextResponse.json({ ok: true, stored: 0 });
    }

    const userAgent = req.headers.get("user-agent") || undefined;
    const forwardedFor = req.headers.get("x-forwarded-for") || undefined;

    const db = getAdminDb();
    const batch = db.batch();

    for (const e of events) {
      const path = clampText(e.path, 200) ?? "/";
      const kind =
        e.kind === "link" || e.kind === "button" || e.kind === "custom"
          ? e.kind
          : "custom";

      const href = clampText(e.href, 500);
      const text = clampText(e.text, 200);
      const trackId = clampText(e.trackId, 120);
      const sessionId = clampText(e.sessionId, 120);
      const referrer = clampText(e.referrer, 500);
      const userAgentClean = clampText(userAgent, 400);
      const forwardedForClean = clampText(forwardedFor, 200);

      const docRef = db.collection("clickEvents").doc();
      const data: Record<string, unknown> = {
        receivedAt: new Date(),
        tsMs: typeof e.tsMs === "number" ? e.tsMs : Date.now(),
        path,
        kind,
      };

      if (href) data.href = href;
      if (text) data.text = text;
      if (trackId) data.trackId = trackId;
      if (sessionId) data.sessionId = sessionId;
      if (referrer) data.referrer = referrer;
      if (userAgentClean) data.userAgent = userAgentClean;
      if (forwardedForClean) data.forwardedFor = forwardedForClean;

      batch.set(docRef, data);
    }

    await batch.commit();

    return NextResponse.json({ ok: true, stored: events.length });
  } catch (error) {
    const isProd = process.env.NODE_ENV === "production";
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      isProd ? { ok: false } : { ok: false, error: message },
      { status: 500 }
    );
  }
}
