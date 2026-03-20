"use client";

import type { CSSProperties } from "react";

import { Container } from "@/components/ui/Container";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { skills } from "@/data/skills";
import { Icon, type IconKey } from "@/lib/icon";

const SKILL_ACCENTS: Partial<Record<IconKey, string>> = {
  html: "#E34F26",
  css: "#1572B6",
  scss: "#CC6699",
  tailwind: "#38BDF8",
  js: "#F7DF1E",
  typescript: "#3178C6",
  react: "#61DAFB",
  next: "#e4e4e7",
  astro: "#FF5D01",
  seo: "#00f0ff",
  node: "#339933",
  mysql: "#4479A1",
  mongodb: "#47A248",
  firebase: "#FFCA28",
  aws: "#FF9900",
  gcp: "#4285F4",
  salesforce: "#00A1E0",
  veeva: "#64748B",
  "cat-testing": "#39ff14",
  "cat-methods": "#00f0ff",
  "cat-devops": "#ff00e5",
  jest: "#C21325",
  cypress: "#69D3A7",
  git: "#F05032",
  gitlab: "#FC6D26",
  github: "#e4e4e7",
  vercel: "#e4e4e7",
  link: "#00f0ff",
};

type SkillAccentStyle = CSSProperties & { "--skill-accent"?: string };

export function SkillsSection() {
  const { locale, t } = useLocale();
  const categories = skills[locale];

  return (
    <AnimatedSection id="skills" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-3 mb-10">
          <span className="text-sm font-mono font-medium text-neon-green tracking-wider uppercase">
            {t.home.skillsTitle}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tech Stack
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((cat, i) => (
            <AnimatedDiv
              key={cat.id}
              delay={0.08 * (i + 1)}
              className="rounded-2xl border border-border/50 bg-card/50 p-5 transition-all hover:border-accent/20 glass"
            >
              <h3 className="text-sm font-semibold tracking-tight text-accent">
                {cat.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/50 px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-[color:var(--skill-accent,var(--accent))]/50 hover:text-[color:var(--skill-accent,var(--accent))] hover:shadow-[0_0_12px_rgba(var(--neon-cyan-rgb),0.12)]"
                    style={
                      item.icon
                        ? ({
                            "--skill-accent":
                              SKILL_ACCENTS[item.icon] ?? "var(--accent)",
                          } as SkillAccentStyle)
                        : undefined
                    }
                  >
                    {item.icon ? (
                      <span
                        className="flex items-center justify-center rounded-md p-0.5 transition-colors"
                        style={{
                          color: `var(--skill-accent, var(--accent))`,
                          backgroundColor: `color-mix(in srgb, var(--skill-accent, var(--accent)) 12%, transparent)`,
                        }}
                      >
                        <Icon name={item.icon} className="h-4 w-4" />
                      </span>
                    ) : null}
                    {item.label}
                  </span>
                ))}
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
