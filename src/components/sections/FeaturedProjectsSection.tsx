"use client";

import { Container } from "@/components/ui/Container";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { projects as projectsData } from "@/data/projects";

export function FeaturedProjectsSection() {
  const { locale, t } = useLocale();
  const all = projectsData[locale];

  return (
    <AnimatedSection id="projects" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-3 mb-10">
          <span className="text-sm font-mono font-medium text-neon-magenta tracking-wider uppercase">
            {t.home.featuredProjectsTitle}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {locale === "es" ? "Trabajo seleccionado" : "Selected work"}
          </h2>
        </div>

        <div className="grid gap-6">
          {all.map((p, i) => (
            <AnimatedDiv key={p.id} delay={0.1 * (i + 1)}>
              <ProjectCard project={p} />
            </AnimatedDiv>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
