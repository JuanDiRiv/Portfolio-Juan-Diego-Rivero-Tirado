"use client";

import { Container } from "@/components/ui/Container";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";
import { useLocale } from "@/features/preferences/LocaleProvider";
import type { AboutFields, Locale } from "@/lib/types";

export function AboutSection({
  data,
}: {
  data: Record<Locale, AboutFields>;
}) {
  const { locale, t } = useLocale();
  const p = data[locale];

  return (
    <AnimatedSection id="about" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-3 mb-10">
          <span className="text-sm font-mono font-medium text-accent tracking-wider uppercase">
            {t.about.title}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.about.subtitle}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatedDiv
            delay={0.1}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 transition-all hover:border-accent/30 hover:shadow-[0_0_20px_rgba(var(--neon-cyan-rgb),0.08)] glass"
          >
            <h3 className="text-base font-semibold tracking-tight text-accent">
              {t.about.softSkillsTitle}
            </h3>
            <ul className="mt-4 space-y-2">
              {p.softSkills.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" />
                  {s}
                </li>
              ))}
            </ul>
          </AnimatedDiv>

          <AnimatedDiv
            delay={0.2}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 transition-all hover:border-neon-magenta/30 hover:shadow-[0_0_20px_rgba(var(--neon-magenta-rgb),0.08)] glass"
          >
            <h3 className="text-base font-semibold tracking-tight text-neon-magenta">
              {t.about.learningTitle}
            </h3>
            <ul className="mt-4 space-y-2">
              {p.learningNow.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-magenta" />
                  {s}
                </li>
              ))}
            </ul>
          </AnimatedDiv>

          <AnimatedDiv
            delay={0.3}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 transition-all hover:border-neon-green/30 hover:shadow-[0_0_20px_rgba(var(--neon-green-rgb),0.08)] glass md:col-span-2 lg:col-span-1"
          >
            <h3 className="text-base font-semibold tracking-tight text-neon-green">
              {t.about.hobbiesTitle}
            </h3>
            <ul className="mt-4 space-y-2">
              {p.hobbies.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-green" />
                  {h}
                </li>
              ))}
            </ul>
          </AnimatedDiv>
        </div>
      </Container>
    </AnimatedSection>
  );
}
