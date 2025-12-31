"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/card";
import { AdminLogoutButton } from "@/app/admin/AdminLogoutButton";
import { Button } from "@/components/ui/button";

export type AdminClickRow = {
    id: string;
    tsMs?: number;
    path?: string;
    kind?: string;
    href?: string;
    text?: string;
    trackId?: string;
    sessionId?: string;
};

const TRACK_LABELS: Record<string, string> = {
    brand_home: "Logo: ir al inicio",
    nav_home: "Navbar: inicio",
    nav_projects: "Navbar: proyectos",
    nav_about: "Navbar: sobre mí",
    nav_contact: "Navbar: contacto",
    toggle_locale: "Cambiar idioma",
    toggle_theme: "Cambiar tema (día/noche)",

    nav_cv: "Abrir CV (navbar)",
    hero_cv: "Ver CV (hero)",
    cv_open_new_tab: "CV: abrir en nueva pestaña",
    cv_download: "CV: descargar",

    hero_email_address: "Email (hero): click en dirección",
    hero_email_copy: "Email (hero): copiar",
    hero_email_cta: "Email (hero): botón \"Envíame un email\"",

    cta_email_address: "Email (CTA): click en dirección",
    cta_email_copy: "Email (CTA): copiar",
    cta_email_cta: "Email (CTA): botón \"Envíame un email\"",

    contact_email_address: "Email (contacto): click en dirección",
    contact_email_copy: "Email (contacto): copiar",
    contact_social_github: "GitHub (contacto)",
    contact_social_linkedin: "LinkedIn (contacto)",

    hero_social_github: "GitHub (hero)",
    hero_social_linkedin: "LinkedIn (hero)",
    footer_social_github: "GitHub (footer)",
    footer_social_linkedin: "LinkedIn (footer)",

    projects_filter_clear: "Proyectos: limpiar filtros",
};

function resolveActionLabel(r: AdminClickRow): { label: string; detail?: string } {
    const trackId = (r.trackId || "").trim();
    if (trackId) {
        const projectMatch = trackId.match(/^project_(.+)_(demo|repo|code)$/);
        if (projectMatch) {
            const [, projectId, action] = projectMatch;
            const actionLabel =
                action === "demo" ? "Demo" : action === "repo" ? "Repo" : "Código";
            return {
                label: `Proyecto ${projectId}: ${actionLabel}`,
                detail: trackId,
            };
        }

        return {
            label: TRACK_LABELS[trackId] || "Acción custom",
            detail: trackId,
        };
    }

    const text = (r.text || "").trim();
    if (text) return { label: text };

    const href = (r.href || "").trim();
    if (href) return { label: href };

    const kind = (r.kind || "").trim();
    if (kind) return { label: kind };

    return { label: "—" };
}

function formatDate(tsMs: number) {
    try {
        return new Date(tsMs).toLocaleString("es-ES");
    } catch {
        return String(tsMs);
    }
}

function shortId(id: string) {
    if (id.length <= 10) return id;
    return `${id.slice(0, 10)}…`;
}

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function dayKeyLocal(tsMs: number) {
    const d = new Date(tsMs);
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatDayLabel(key: string) {
    // key: YYYY-MM-DD
    const [y, m, d] = key.split("-").map((v) => Number(v));
    const dt = new Date(y, (m || 1) - 1, d || 1);
    try {
        return dt.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" });
    } catch {
        return key;
    }
}

export function AdminDashboard({ rows }: { rows: AdminClickRow[] }) {
    const [allRows, setAllRows] = useState<AdminClickRow[]>(rows);
    const [selectedSessionId, setSelectedSessionId] = useState<string>("ALL");
    const [deleting, setDeleting] = useState(false);

    const sessionIds = useMemo(() => {
        const set = new Set<string>();
        for (const r of allRows) {
            const sid = (r.sessionId || "").trim();
            if (sid && sid !== "unknown") set.add(sid);
        }
        return [...set].sort();
    }, [allRows]);

    useEffect(() => {
        if (selectedSessionId === "ALL") return;
        if (!sessionIds.includes(selectedSessionId)) {
            setSelectedSessionId("ALL");
        }
    }, [selectedSessionId, sessionIds]);

    const filteredRows = useMemo(() => {
        if (selectedSessionId === "ALL") return allRows;
        return allRows.filter((r) => (r.sessionId || "").trim() === selectedSessionId);
    }, [allRows, selectedSessionId]);

    const { total, uniqueVisitors, topPaths, topHrefs, kinds } = useMemo(() => {
        const total = filteredRows.length;
        const uniqueSessions = new Set<string>();
        const byPath = new Map<string, number>();
        const byKind = new Map<string, number>();
        const byHref = new Map<string, number>();

        for (const r of filteredRows) {
            const sid = (r.sessionId || "").trim();
            if (sid && sid !== "unknown") uniqueSessions.add(sid);

            const path = r.path || "/";
            byPath.set(path, (byPath.get(path) || 0) + 1);

            const kind = r.kind || "custom";
            byKind.set(kind, (byKind.get(kind) || 0) + 1);

            if (r.href) byHref.set(r.href, (byHref.get(r.href) || 0) + 1);
        }

        const topPaths = [...byPath.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
        const topHrefs = [...byHref.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
        const kinds = [...byKind.entries()].sort((a, b) => b[1] - a[1]);

        return {
            total,
            uniqueVisitors: uniqueSessions.size,
            topPaths,
            topHrefs,
            kinds,
        };
    }, [filteredRows]);

    const visitorsByDay = useMemo(() => {
        // Last 7 days (local), oldest -> newest
        const days: string[] = [];
        const now = new Date();
        for (let i = 6; i >= 0; i -= 1) {
            const d = new Date(now);
            d.setDate(now.getDate() - i);
            const key = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
            days.push(key);
        }

        const byDay = new Map<string, Set<string>>();
        for (const k of days) byDay.set(k, new Set());

        for (const r of filteredRows) {
            const sid = (r.sessionId || "").trim();
            if (!sid || sid === "unknown") continue;
            const ts = r.tsMs;
            if (!ts) continue;
            const k = dayKeyLocal(ts);
            if (!byDay.has(k)) continue;
            byDay.get(k)!.add(sid);
        }

        const series = days.map((k) => ({
            day: k,
            count: byDay.get(k)?.size ?? 0,
        }));
        const max = Math.max(1, ...series.map((s) => s.count));
        return { series, max };
    }, [filteredRows]);

    return (
        <Container className="py-10">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Clicks últimos 7 días (máx. 500 eventos cargados).
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">Ver:</span>
                        <select
                            className="h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                            value={selectedSessionId}
                            onChange={(e) => setSelectedSessionId(e.target.value)}
                        >
                            <option value="ALL">Totales (todos)</option>
                            {sessionIds.map((sid) => (
                                <option key={sid} value={sid} title={sid}>
                                    {shortId(sid)}
                                </option>
                            ))}
                        </select>


                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={selectedSessionId === "ALL" || deleting}
                            onClick={async () => {
                                if (selectedSessionId === "ALL") return;
                                const ok = window.confirm(
                                    "¿Eliminar TODOS los clicks de este usuario (sessionId seleccionado)?"
                                );
                                if (!ok) return;

                                setDeleting(true);
                                try {
                                    const res = await fetch("/api/admin/clicks/delete", {
                                        method: "POST",
                                        headers: { "content-type": "application/json" },
                                        body: JSON.stringify({ sessionId: selectedSessionId }),
                                    });

                                    const data = await res.json().catch(() => null);
                                    if (!res.ok) {
                                        window.alert(data?.error || "No se pudo eliminar.");
                                        return;
                                    }

                                    setAllRows((prev) =>
                                        prev.filter(
                                            (r) => (r.sessionId || "").trim() !== selectedSessionId
                                        )
                                    );
                                    setSelectedSessionId("ALL");

                                    const msg = data?.truncated
                                        ? `Se eliminaron ${data?.deleted ?? 0} eventos (truncado).`
                                        : `Se eliminaron ${data?.deleted ?? 0} eventos.`;
                                    window.alert(msg);
                                } finally {
                                    setDeleting(false);
                                }
                            }}
                        >
                            {deleting ? "Eliminando…" : "Eliminar clicks de este usuario"}
                        </Button>
                    </div>
                </div>
                <AdminLogoutButton />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Card className="p-5">
                    <div className="text-sm text-muted-foreground">Total clicks</div>
                    <div className="mt-2 text-3xl font-semibold">{total}</div>
                </Card>
                <Card className="p-5">
                    <div className="text-sm text-muted-foreground">Visitantes únicos</div>
                    <div className="mt-2 text-3xl font-semibold">{uniqueVisitors}</div>
                    <div className="mt-2 text-xs text-muted-foreground">
                        Basado en sessionId (mismo navegador/dispositivo).
                    </div>
                </Card>
            </div>

            <Card className="mt-4 p-5">
                <div className="flex items-baseline justify-between gap-4">
                    <div className="text-sm font-medium">Visitantes únicos por día</div>
                    <div className="text-xs text-muted-foreground">Últimos 7 días</div>
                </div>

                <div className="mt-4 grid gap-3">
                    <div className="flex h-28 items-end gap-2">
                        {visitorsByDay.series.map((d) => {
                            const pct = Math.round((d.count / visitorsByDay.max) * 100);
                            return (
                                <div key={d.day} className="flex w-full flex-col items-center gap-2">
                                    <div className="relative flex h-20 w-full items-end">
                                        <div
                                            className="w-full rounded-md bg-accent"
                                            style={{ height: `${Math.max(6, pct)}%` }}
                                            title={`${d.day}: ${d.count}`}
                                        />
                                    </div>
                                    <div className="flex w-full justify-between text-[11px] text-muted-foreground">
                                        <span>{formatDayLabel(d.day)}</span>
                                        <span className="font-medium text-foreground/80">{d.count}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-xs text-muted-foreground">
                        Cuenta sessionIds que hicieron al menos 1 evento ese día.
                    </div>
                </div>
            </Card>

            <Card className="mt-4 p-5">
                <div className="text-sm text-muted-foreground">Por tipo</div>
                <div className="mt-2 space-y-1 text-sm">
                    {kinds.length === 0 ? (
                        <div className="text-muted-foreground">Sin datos todavía.</div>
                    ) : (
                        kinds.map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-4">
                                <span className="text-muted-foreground">{k}</span>
                                <span className="font-medium">{v}</span>
                            </div>
                        ))
                    )}
                </div>
            </Card>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <Card className="p-5">
                    <div className="text-sm font-medium">Top páginas</div>
                    <div className="mt-3 space-y-2 text-sm">
                        {topPaths.length === 0 ? (
                            <div className="text-muted-foreground">Sin datos todavía.</div>
                        ) : (
                            topPaths.map(([path, count]) => (
                                <div key={path} className="flex justify-between gap-4">
                                    <span className="text-muted-foreground">{path}</span>
                                    <span className="font-medium">{count}</span>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                <Card className="p-5">
                    <div className="text-sm font-medium">Top links (href)</div>
                    <div className="mt-3 space-y-2 text-sm">
                        {topHrefs.length === 0 ? (
                            <div className="text-muted-foreground">Sin datos todavía.</div>
                        ) : (
                            topHrefs.map(([href, count]) => (
                                <div key={href} className="flex justify-between gap-4">
                                    <span className="truncate text-muted-foreground" title={href}>
                                        {href}
                                    </span>
                                    <span className="font-medium">{count}</span>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>

            <Card className="mt-4 p-5">
                <div className="text-sm font-medium">Últimos eventos</div>
                <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-muted-foreground">
                                <th className="py-2 pr-4">Fecha</th>
                                <th className="py-2 pr-4">Página</th>
                                <th className="py-2 pr-4">Acción</th>
                                <th className="py-2 pr-4">Tipo</th>
                                <th className="py-2">Href</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRows.slice(0, 25).map((r) => (
                                <tr key={r.id} className="border-t border-border/70">
                                    <td className="py-2 pr-4 text-muted-foreground">
                                        {formatDate(r.tsMs || 0)}
                                    </td>
                                    <td className="py-2 pr-4">{r.path || "/"}</td>
                                    <td className="py-2 pr-4">
                                        {(() => {
                                            const { label, detail } = resolveActionLabel(r);
                                            return (
                                                <div className="flex flex-col">
                                                    <span className="truncate" title={label}>
                                                        {label}
                                                    </span>
                                                    {detail ? (
                                                        <span className="text-xs text-muted-foreground" title={detail}>
                                                            {detail}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            );
                                        })()}
                                    </td>
                                    <td className="py-2 pr-4 text-muted-foreground">
                                        {r.kind || "custom"}
                                    </td>
                                    <td className="py-2 text-muted-foreground">
                                        {r.href ? (
                                            <span className="truncate" title={r.href}>
                                                {r.href}
                                            </span>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Container>
    );
}
