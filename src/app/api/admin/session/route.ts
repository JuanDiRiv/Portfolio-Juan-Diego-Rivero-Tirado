import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminAuth, getAllowedAdminEmails } from "@/lib/firebaseAdmin";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminSession";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { idToken?: string };
    const idToken = body.idToken;
    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);

    const allowed = getAllowedAdminEmails();
    if (allowed.size > 0) {
      const email = decoded.email?.toLowerCase();
      if (!email || !allowed.has(email)) {
        return NextResponse.json({ error: "Not authorized" }, { status: 403 });
      }
    }

    // 5 days
    const expiresIn = 5 * 24 * 60 * 60 * 1000;
    const sessionCookie = await getAdminAuth().createSessionCookie(idToken, {
      expiresIn,
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: ADMIN_SESSION_COOKIE,
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(expiresIn / 1000),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 401 }
    );
  }
}
