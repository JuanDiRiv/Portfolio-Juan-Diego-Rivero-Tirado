import { redirect } from "next/navigation";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { verifyAdminSessionCookie } from "@/lib/adminSession";
import { AdminDashboard, type AdminClickRow } from "@/app/admin/AdminDashboard";

export const runtime = "nodejs";

function asString(value: unknown): string | undefined {
    return typeof value === "string" ? value : undefined;
}

function asNumber(value: unknown): number | undefined {
    return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export default async function AdminPage() {
    const user = await verifyAdminSessionCookie();
    if (!user) redirect("/admin/login");

    const db = getAdminDb();

    const sinceMs = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;

    const snap = await db
        .collection("clickEvents")
        .where("tsMs", ">=", sinceMs)
        .orderBy("tsMs", "desc")
        .limit(500)
        .get();

    const rows: AdminClickRow[] = snap.docs.map((d) => {
        const raw = d.data() as Record<string, unknown>;

        return {
            id: d.id,
            tsMs: asNumber(raw.tsMs),
            path: asString(raw.path),
            kind: asString(raw.kind),
            href: asString(raw.href),
            text: asString(raw.text),
            trackId: asString(raw.trackId),
            sessionId: asString(raw.sessionId),
        };
    });

    return <AdminDashboard rows={rows} />;
}
