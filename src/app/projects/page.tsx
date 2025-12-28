"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { projects as projectsData } from "@/data/projects";

export default function ProjectsPage() {
  const { locale, t } = useLocale();
  const all = projectsData[locale];

  const techOptions = useMemo(
    () =>
      Array.from(new Set(all.flatMap((p) => p.technologies))).sort((a, b) =>
        a.localeCompare(b)
      ),
    [all]
  );

  const typeOptions = useMemo(
    () =>
      Array.from(new Set(all.map((p) => p.type).filter(Boolean)))
        .map(String)
        .sort((a, b) => a.localeCompare(b)),
    [all]
  );

  const [selectedTech, setSelectedTech] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const filtered = all.filter((p) => {
    const techOk = selectedTech ? p.technologies.includes(selectedTech) : true;
    const typeOk = selectedType ? p.type === selectedType : true;
    return techOk && typeOk;
  });

  const featured = filtered.filter((p) => p.featured);
  const more = filtered.filter((p) => !p.featured);

  return (
    <main>
      <Section className="pt-10">
        <Container>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.projects.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {t.projects.subtitle}
          </p>

          <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3 sm:items-end">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-muted-foreground">
                {t.projects.filterByTech}
              </label>
              <select
                className="h-10 rounded-xl border border-border bg-background px-3 text-sm"
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
              >
                <option value="">—</option>
                {techOptions.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-muted-foreground">
                {t.projects.filterByType}
              </label>
              <select
                className="h-10 rounded-xl border border-border bg-background px-3 text-sm"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">—</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setSelectedTech("");
                  setSelectedType("");
                }}
              >
                {t.projects.clear}
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          {more.length > 0 ? (
            <>
              <h2 className="mt-12 text-xl font-semibold tracking-tight sm:text-2xl">
                {t.projects.moreProjectsTitle}
              </h2>
              <div className="mt-6 grid gap-4">
                {more.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </>
          ) : null}
        </Container>
      </Section>
    </main>
  );
}
