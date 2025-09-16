"use client";

import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";
import type { ProjectDetail } from "@/data/projects";

const copy = {
  en: {
    backLabel: "Back to portfolio",
    caseStudy: "Case study",
    timeline: "Timeline",
    role: "Role",
    stack: "Stack",
    challenges: "Challenges",
    solutions: "Solutions",
    outcomes: "Outcomes",
    highlights: "Highlights",
    moreExplorations: "More explorations",
    viewProject: "View project",
  },
  es: {
    backLabel: "Volver al portafolio",
    caseStudy: "Caso de estudio",
    timeline: "Cronograma",
    role: "Rol",
    stack: "Stack",
    challenges: "Desafios",
    solutions: "Soluciones",
    outcomes: "Resultados",
    highlights: "Momentos clave",
    moreExplorations: "Mas exploraciones",
    viewProject: "Ver proyecto",
  },
} as const;

export function ProjectCaseStudy({
  project,
  otherProjects,
}: {
  project: ProjectDetail;
  otherProjects: ProjectDetail[];
}) {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute -top-64 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br ${project.accent} blur-3xl`}
        />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-16 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 pb-24 pt-20 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)]"
          >
            &larr; {t.backLabel}
          </Link>
          <span className="rounded-full border border-white/10 bg-[color:var(--surface)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            {t.caseStudy}
          </span>
        </div>

        <section className="space-y-10">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {project.title[language]}
            </h1>
            <p className="max-w-3xl text-lg text-[var(--muted-foreground)]">
              {project.heroSubheadline[language]}
            </p>
          </div>
          <div className="grid gap-6 rounded-3xl border border-white/10 bg-[color:var(--surface)] p-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                {project.heroHeadline[language]}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                {project.overview[language]}
              </p>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-[color:var(--card)] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                  {t.timeline}
                </p>
                <p className="mt-2 text-sm font-semibold">{project.timeline[language]}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[color:var(--card)] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                  {t.role}
                </p>
                <p className="mt-2 text-sm font-semibold">{project.role[language]}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[color:var(--card)] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                  {t.stack}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label.en}
              className="rounded-3xl border border-white/10 bg-[color:var(--surface)] p-6 text-center shadow-lg shadow-black/10"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                {metric.label[language]}
              </p>
              <p className="mt-3 text-2xl font-semibold">{metric.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">{t.challenges}</h2>
            <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
              {project.challenges[language].map((challenge) => (
                <li
                  key={challenge}
                  className="relative rounded-2xl border border-white/10 bg-[color:var(--surface)] p-4 pl-6"
                >
                  <span className="absolute left-2 top-4 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">{t.solutions}</h2>
            <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
              {project.solutions[language].map((solution) => (
                <li
                  key={solution}
                  className="relative rounded-2xl border border-white/10 bg-[color:var(--surface)] p-4 pl-6"
                >
                  <span className="absolute left-2 top-4 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[color:var(--surface)] p-8">
          <h2 className="text-2xl font-semibold tracking-tight">{t.outcomes}</h2>
          <ul className="mt-6 space-y-3 text-sm text-[var(--muted-foreground)]">
            {project.outcomes[language].map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">{t.highlights}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {project.highlights.map((highlight) => (
              <div
                key={highlight.title.en}
                className="rounded-3xl border border-white/10 bg-[color:var(--surface)] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                  {highlight.title[language]}
                </p>
                <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                  {highlight.body[language]}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">{t.moreExplorations}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {otherProjects.map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--surface)] p-6 transition-transform duration-300 hover:-translate-y-2 hover:border-[var(--accent)]"
              >
                <div
                  className={`pointer-events-none absolute -top-20 right-0 h-40 w-40 translate-x-1/3 rounded-full bg-gradient-to-br ${item.accent} blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative z-10 space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                    {item.previewTitle[language]}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight">{item.title[language]}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {item.description[language]}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                    {t.viewProject}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
