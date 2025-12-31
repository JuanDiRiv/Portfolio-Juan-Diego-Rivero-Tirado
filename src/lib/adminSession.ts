import "server-only";

import { cookies } from "next/headers";
import { getAdminAuth, getAllowedAdminEmails } from "@/lib/firebaseAdmin";

export const ADMIN_SESSION_COOKIE = "admin_session";

export async function verifyAdminSessionCookie(): Promise<{
  uid: string;
  email?: string;
} | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(
      sessionCookie,
      true
    );

    const allowed = getAllowedAdminEmails();
    if (allowed.size > 0) {
      const email = decoded.email?.toLowerCase();
      if (!email || !allowed.has(email)) return null;
    }

    return { uid: decoded.uid, email: decoded.email };
  } catch {
    return null;
  }
}
