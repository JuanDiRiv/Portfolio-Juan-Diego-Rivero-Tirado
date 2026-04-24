"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Locale, SiteContentDoc } from "@/lib/types";

type Status = "idle" | "uploading" | "success" | "error";

export type CvUploadPanelProps = {
  initialDraft: SiteContentDoc | null;
  publishedUpdatedAt?: number;
  publishedAt?: number;
  publishedSourceFileName?: string;
};

function formatTs(ts?: number) {
  if (!ts) return "—";
  try {
    return new Date(ts).toLocaleString("es-ES");
  } catch {
    return String(ts);
  }
}

export function CvUploadPanel({
  initialDraft,
  publishedUpdatedAt,
  publishedAt,
  publishedSourceFileName,
}: CvUploadPanelProps) {
  const [draft, setDraft] = useState<SiteContentDoc | null>(initialDraft);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [previewLocale, setPreviewLocale] = useState<Locale>("es");
  const [pending, startTransition] = useTransition();

  async function onProcess() {
    if (!file) return;
    setStatus("uploading");
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/cv/process", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setStatus("error");
        setError(data?.error || `Error ${res.status}`);
        return;
      }
      setDraft(data.draft as SiteContentDoc);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function onPublish() {
    if (!draft) return;
    if (!window.confirm("¿Publicar este draft? Reemplazará el contenido público.")) return;
    startTransition(async () => {
      const res = await fetch("/api/admin/cv/publish", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        window.alert(data?.error || `Error ${res.status}`);
        return;
      }
      setDraft(null);
      setFile(null);
      setStatus("idle");
      window.alert("Publicado correctamente. Recarga la página pública para ver los cambios.");
    });
  }

  async function onDiscard() {
    if (!draft) return;
    if (!window.confirm("¿Descartar el draft actual?")) return;
    startTransition(async () => {
      const res = await fetch("/api/admin/cv/discard", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        window.alert(data?.error || `Error ${res.status}`);
        return;
      }
      setDraft(null);
      setStatus("idle");
    });
  }

  return (
    <div className="mt-8 grid gap-4">
      <Card className="p-5">
        <h2 className="text-lg font-semibold tracking-tight">CV → IA → Sitio</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sube un PDF del CV (ES o EN, máx 8MB). La IA lo extrae, traduce a ambos
          idiomas y crea un draft. Revisa y pulsa <strong>Publicar</strong> para
          actualizar el sitio.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            disabled={status === "uploading"}
            className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-accent/10 file:px-3 file:py-2 file:text-accent hover:file:bg-accent/20"
          />
          <Button
            onClick={onProcess}
            disabled={!file || status === "uploading"}
          >
            {status === "uploading" ? "Procesando…" : "Analizar con IA"}
          </Button>
        </div>

        {status === "error" && error && (
          <p className="mt-3 text-sm text-red-500">Error: {error}</p>
        )}
        {status === "success" && (
          <p className="mt-3 text-sm text-emerald-500">
            Draft generado. Revísalo abajo y publica cuando esté listo.
          </p>
        )}

        <div className="mt-5 grid gap-1 border-t border-border/50 pt-4 text-xs text-muted-foreground">
          <div>
            Última publicación:{" "}
            <span className="font-mono text-foreground/80">
              {formatTs(publishedAt ?? publishedUpdatedAt)}
            </span>
          </div>
          {publishedSourceFileName && (
            <div>
              Fuente publicada:{" "}
              <span className="font-mono text-foreground/80">
                {publishedSourceFileName}
              </span>
            </div>
          )}
        </div>
      </Card>

      {draft && (
        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                Draft pendiente de publicar
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Generado el {formatTs(draft.updatedAt)} desde{" "}
                <span className="font-mono">{draft.sourceFileName}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onDiscard}
                disabled={pending}
              >
                Descartar
              </Button>
              <Button onClick={onPublish} disabled={pending}>
                {pending ? "Publicando…" : "Publicar"}
              </Button>
            </div>
          </div>

          <div className="mt-4 inline-flex rounded-lg border border-border/60 p-1 text-xs">
            {(["es", "en"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setPreviewLocale(lang)}
                className={`rounded-md px-3 py-1 font-medium transition-colors ${
                  previewLocale === lang
                    ? "bg-accent/15 text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <DraftPreview draft={draft} locale={previewLocale} />
        </Card>
      )}
    </div>
  );
}

function DraftPreview({
  draft,
  locale,
}: {
  draft: SiteContentDoc;
  locale: Locale;
}) {
  const exp = draft.experience[locale] ?? [];
  const skills = draft.skills[locale] ?? [];
  const about = draft.about[locale];

  return (
    <div className="mt-4 grid gap-5">
      <section>
        <h4 className="text-sm font-semibold text-accent">
          About ({exp.length} experiencias · {skills.length} categorías)
        </h4>
        {about && (
          <div className="mt-2 space-y-2 text-sm text-muted-foreground">
            <p>{about.summary}</p>
            <PreviewList title="Soft skills" items={about.softSkills} />
            <PreviewList title="Aprendiendo" items={about.learningNow} />
            <PreviewList title="Hobbies" items={about.hobbies} />
          </div>
        )}
      </section>

      <section>
        <h4 className="text-sm font-semibold text-accent">Experiencia</h4>
        <ul className="mt-2 space-y-3">
          {exp.map((e) => (
            <li
              key={e.id}
              className="rounded-lg border border-border/40 p-3 text-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-medium">
                  {e.role}{" "}
                  <span className="text-muted-foreground">@ {e.company}</span>
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {e.startDate} → {e.endDate ?? "present"}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                id: <span className="font-mono">{e.id}</span>
                {e.location ? ` · ${e.location}` : ""}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {e.description}
              </p>
              {e.highlights.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              {e.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {e.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border/50 bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-sm font-semibold text-accent">Skills</h4>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {skills.map((cat) => (
            <div
              key={cat.id}
              className="rounded-lg border border-border/40 p-3 text-sm"
            >
              <div className="font-medium">{cat.title}</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {cat.items.map((it) => (
                  <span
                    key={it.label}
                    className="rounded-md border border-border/50 bg-background/50 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {it.label}
                    {it.icon ? (
                      <span className="ml-1 text-[10px] opacity-60">
                        ({it.icon})
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PreviewList({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <span className="text-xs font-medium text-foreground/80">{title}:</span>{" "}
      <span className="text-xs">{items.join(" · ")}</span>
    </div>
  );
}
