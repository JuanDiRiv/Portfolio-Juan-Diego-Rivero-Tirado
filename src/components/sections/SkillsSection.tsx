"use client";

import type { CSSProperties } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { skills } from "@/data/skills";
import { Icon, type IconKey } from "@/lib/icon";

const SKILL_ACCENTS: Partial<Record<IconKey, string>> = {
  html: "#E34F26",
  css: "#1572B6",
  scss: "#CC6699",
  tailwind: "#38BDF8",
  js: "color-mix(in oklab, #F7DF1E 85%, var(--foreground))",
  react: "#61DAFB",
  next: "color-mix(in oklab, #000000 70%, var(--foreground))",
  astro: "#FF5D01",
  seo: "#2563EB",

  node: "#339933",
  mysql: "#4479A1",
  mongodb: "#47A248",
  firebase: "color-mix(in oklab, #FFCA28 85%, var(--foreground))",

  aws: "#FF9900",
  gcp: "#4285F4",
  salesforce: "#00A1E0",
  veeva: "#64748B",

  "cat-testing": "#22C55E",
  "cat-methods": "#14B8A6",
  "cat-devops": "#A855F7",

  jest: "#C21325",
  git: "#F05032",
  gitlab: "#FC6D26",
  github: "#6E5494",
  vercel: "color-mix(in oklab, #000000 70%, var(--foreground))",
  link: "#0EA5E9",
};

type SkillAccentStyle = CSSProperties & { "--skill-accent"?: string };

export function SkillsSection() {
  const { locale, t } = useLocale();
  const categories = skills[locale];

  return (
    <Section>
      <Container>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {t.home.skillsTitle}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {categories.map((cat) => (
            <Card key={cat.id} className="p-5">
              <h3 className="text-base font-semibold tracking-tight">
                {cat.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <Badge
                    key={item.label}
                    className={
                      item.icon
                        ? "transition-colors hover:text-[color:var(--skill-accent)] hover:border-[color:var(--skill-accent)]"
                        : undefined
                    }
                    style={
                      item.icon
                        ? ({
                          "--skill-accent": SKILL_ACCENTS[item.icon] ?? "var(--accent)",
                        } as SkillAccentStyle)
                        : undefined
                    }
                  >
                    <span className="inline-flex items-center gap-2">
                      {item.icon ? (
                        <Icon name={item.icon} className="h-4 w-4" />
                      ) : null}
                      {item.label}
                    </span>
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
