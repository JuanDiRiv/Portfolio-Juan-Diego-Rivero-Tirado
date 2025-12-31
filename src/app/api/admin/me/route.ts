import { NextResponse } from "next/server";
import { verifyAdminSessionCookie } from "@/lib/adminSession";

export const runtime = "nodejs";

export async function GET() {
  const user = await verifyAdminSessionCookie();
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user });
}
