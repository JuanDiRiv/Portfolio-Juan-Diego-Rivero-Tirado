"use client";

import { useEffect, useRef } from "react";

type ClickEventPayload = {
    tsMs: number;
    path: string;
    kind: "link" | "button" | "custom";
    href?: string;
    text?: string;
    trackId?: string;
    sessionId: string;
    referrer?: string;
};

function getOrCreateSessionId(): string {
    try {
        const key = "jdrt_session_id";
        const existing = window.localStorage.getItem(key);
        if (existing) return existing;
        const created = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
        window.localStorage.setItem(key, created);
        return created;
    } catch {
        return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
    }
}

function pickText(el: HTMLElement): string | undefined {
    const raw = (el.getAttribute("aria-label") || el.textContent || "").trim();
    if (!raw) return undefined;
    return raw.length > 140 ? `${raw.slice(0, 140)}…` : raw;
}

export function ClickTracker() {
    const queueRef = useRef<ClickEventPayload[]>([]);
    const pendingRef = useRef<ClickEventPayload[]>([]);
    const flushTimerRef = useRef<number | null>(null);
    const sessionIdRef = useRef<string | null>(null);
    const authRef = useRef<"unknown" | "admin" | "anon">("unknown");
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // Never track interactions inside the admin area.
        if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
            return;
        }

        sessionIdRef.current = getOrCreateSessionId();

        abortRef.current = new AbortController();
        const checkAdmin = async () => {
            try {
                const res = await fetch("/api/admin/me", {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                    signal: abortRef.current?.signal,
                });

                authRef.current = res.ok ? "admin" : "anon";
            } catch {
                // If the check fails (offline, aborted, etc.), default to tracking.
                authRef.current = "anon";
            }

            // If user is not admin, merge any pending events into the main queue.
            if (authRef.current === "anon" && pendingRef.current.length > 0) {
                queueRef.current.push(...pendingRef.current.splice(0, pendingRef.current.length));
            }
        };

        void checkAdmin();

        const flush = async () => {
            if (authRef.current !== "anon") return;
            const items = queueRef.current.splice(0, 25);
            if (items.length === 0) return;

            try {
                const payload = JSON.stringify({ events: items });
                const ok =
                    typeof navigator !== "undefined" &&
                    typeof navigator.sendBeacon === "function" &&
                    navigator.sendBeacon(
                        "/api/track/click",
                        new Blob([payload], { type: "application/json" })
                    );

                if (!ok) {
                    await fetch("/api/track/click", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: payload,
                        keepalive: true,
                    });
                }
            } catch {
                // Swallow errors: tracking must never break UX
            }
        };

        const scheduleFlush = () => {
            if (authRef.current !== "anon") return;
            if (flushTimerRef.current) return;
            flushTimerRef.current = window.setTimeout(async () => {
                flushTimerRef.current = null;
                await flush();
            }, 4000);
        };

        const onClick = (event: MouseEvent) => {
            if (authRef.current === "admin") return;
            const target = event.target as HTMLElement | null;
            if (!target) return;

            const el = target.closest<HTMLElement>("[data-track],a,button");
            if (!el) return;

            const trackId = el.getAttribute("data-track") || undefined;
            const isLink = el.tagName.toLowerCase() === "a";
            const isButton = el.tagName.toLowerCase() === "button";

            const href = isLink ? (el as HTMLAnchorElement).href : undefined;
            const kind: ClickEventPayload["kind"] = trackId
                ? "custom"
                : isLink
                    ? "link"
                    : isButton
                        ? "button"
                        : "custom";

            const payload: ClickEventPayload = {
                tsMs: Date.now(),
                path: window.location.pathname,
                kind,
                href,
                text: pickText(el),
                trackId,
                sessionId: sessionIdRef.current ?? "unknown",
                referrer: document.referrer || undefined,
            };

            // While auth state is unknown, collect events but do not send.
            if (authRef.current === "unknown") {
                pendingRef.current.push(payload);
                return;
            }

            if (authRef.current !== "anon") return;

            queueRef.current.push(payload);

            if (queueRef.current.length >= 10) {
                void flush();
                return;
            }

            scheduleFlush();
        };

        document.addEventListener("click", onClick, { capture: true });

        const onPageHide = () => {
            void flush();
        };
        window.addEventListener("pagehide", onPageHide);

        return () => {
            document.removeEventListener("click", onClick, { capture: true });
            window.removeEventListener("pagehide", onPageHide);
            if (abortRef.current) {
                abortRef.current.abort();
                abortRef.current = null;
            }
            if (flushTimerRef.current) {
                window.clearTimeout(flushTimerRef.current);
                flushTimerRef.current = null;
            }
            void flush();
        };
    }, []);

    return null;
}
