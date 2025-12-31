"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/lib/icon";
import type { Project, ProjectLink } from "@/lib/types";
import { useLocale } from "@/features/preferences/LocaleProvider";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLocale();

  const demo = project.links?.demo;
  const repo = project.links?.repo;
  const code = project.links?.code;

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="relative aspect-16/10 w-full bg-muted md:aspect-auto md:h-full">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 220px"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="mt-1 flex flex-wrap gap-2">
            {demo?.href ? (
              <ButtonLink
                href={demo.href}
                external
                variant="primary"
                size="sm"
                ariaLabel={demo.label ?? "Demo"}
                dataTrack={`project_${project.id}_demo`}
              >
                {demo.label ?? "Demo"}
                <Icon name="external" className="h-4 w-4" />
              </ButtonLink>
            ) : null}

            {renderRepoLink(repo, t.common.github, t.common.private, `project_${project.id}_repo`)}
            {renderRepoLink(code, t.common.viewCode, t.common.private, `project_${project.id}_code`)}
          </div>
        </div>
      </div>
    </Card>
  );
}

function renderRepoLink(
  link: ProjectLink | undefined,
  fallbackLabel: string,
  privateLabel: string,
  trackId: string
) {
  if (!link) return null;

  const label = link.label ?? fallbackLabel;

  if (!link.href) {
    return (
      <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">
        {label}
        {link.private ? (
          <span className="rounded-full border border-border bg-card px-2 py-0.5 text-xs text-foreground">
            {privateLabel}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <a
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      data-track={trackId}
    >
      {label}
      {link.private ? (
        <span className="rounded-full border border-border bg-card px-2 py-0.5 text-xs text-foreground">
          {privateLabel}
        </span>
      ) : null}
      <Icon name="external" className="h-4 w-4" />
    </a>
  );
}
