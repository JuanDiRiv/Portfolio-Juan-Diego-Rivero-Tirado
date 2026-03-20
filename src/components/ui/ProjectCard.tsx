"use client";

import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import type { Project, ProjectLink } from "@/lib/types";
import { useLocale } from "@/features/preferences/LocaleProvider";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLocale();

  const demo = project.links?.demo;
  const repo = project.links?.repo;
  const code = project.links?.code;

  return (
    <div className="group overflow-hidden rounded-2xl border border-border/50 bg-card/50 transition-all hover:border-accent/30 hover:shadow-[0_0_30px_rgba(var(--neon-cyan-rgb),0.06)] glass">
      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <div className="relative aspect-16/10 w-full bg-muted/50 md:aspect-auto md:h-full overflow-hidden">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 240px"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold tracking-tight group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md border border-border/50 bg-background/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
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

            {renderRepoLink(
              repo,
              t.common.github,
              t.common.private,
              `project_${project.id}_repo`
            )}
            {renderRepoLink(
              code,
              t.common.viewCode,
              t.common.private,
              `project_${project.id}_code`
            )}
          </div>
        </div>
      </div>
    </div>
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
      <span className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-muted/50 px-3 py-2 text-sm font-medium text-muted-foreground">
        {label}
        {link.private ? (
          <span className="rounded-full border border-border/50 bg-card/50 px-2 py-0.5 text-xs text-foreground">
            {privateLabel}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <a
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-muted/50 px-3 py-2 text-sm font-medium text-foreground transition-all hover:border-accent/30 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      data-track={trackId}
    >
      {label}
      {link.private ? (
        <span className="rounded-full border border-border/50 bg-card/50 px-2 py-0.5 text-xs text-foreground">
          {privateLabel}
        </span>
      ) : null}
      <Icon name="external" className="h-4 w-4" />
    </a>
  );
}
