"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { getFeaturedProjects } from "@/data/projects";

export function FeaturedProjectsSection() {
  const { locale, t } = useLocale();
  const featured = getFeaturedProjects(locale);

  return (
    <Section>
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t.home.featuredProjectsTitle}
          </h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            {t.nav.projects}
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
