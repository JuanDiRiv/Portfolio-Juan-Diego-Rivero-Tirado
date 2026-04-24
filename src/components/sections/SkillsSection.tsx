"use client";

import type { CSSProperties } from "react";

import { Container } from "@/components/ui/Container";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { Icon, type IconKey } from "@/lib/icon";
import type { Locale, SkillCategory } from "@/lib/types";

const SKILL_ACCENTS: Partial<Record<IconKey | string, string>> = {
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

// Per-category fallback icon pools. When an item lacks an icon, pick one
// deterministically from its category's pool using a hash of the label so
// the same label always gets the same icon (stable across renders).
const CATEGORY_ICON_POOLS: Record<string, string[]> = {
  frontend: ["FiCode", "FiLayers", "SiReact", "SiHtml5"],
  backend: ["FiServer", "FiCpu", "SiNodedotjs", "FiTerminal"],
  db: ["FiDatabase", "SiPostgresql", "SiMongodb", "FiBox"],
  cloud_tools: ["FiCloud", "SiAmazon", "SiGooglecloud", "FiServer"],
  testing: ["FiCheckCircle", "SiJest", "SiCypress", "FiActivity"],
  methodologies: ["FiUsers", "SiJira", "SiSlack", "SiNotion"],
  devops: ["FiGitBranch", "SiDocker", "SiKubernetes", "SiGithubactions"],
  "ai-tools": ["SiOpenai", "SiAnthropic", "SiHuggingface", "FiCpu"],
  ai: ["SiOpenai", "SiAnthropic", "SiHuggingface", "FiCpu"],
  mobile: ["FiSmartphone", "SiAndroid", "SiFlutter", "SiIos"],
  design: ["FiEdit2", "SiFigma", "SiCanva", "SiAdobexd"],
  security: ["FiShield", "SiAuth0", "FiBox", "FiCpu"],
  data: ["FiActivity", "SiPandas", "SiNumpy", "SiJupyter"],
  "data-science": ["FiActivity", "SiPandas", "SiNumpy", "SiJupyter"],
};

const DEFAULT_ICON_POOL = ["FiBox", "FiTool", "FiCpu", "FiLayers"];

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function fallbackIconFor(categoryId: string, label: string): string {
  const pool = CATEGORY_ICON_POOLS[categoryId] ?? DEFAULT_ICON_POOL;
  return pool[hashString(label) % pool.length];
}

// Parse #rgb / #rrggbb into 0-255 channels.
function parseHex(hex: string): [number, number, number] | null {
  const m = hex.trim().match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

// Relative luminance per WCAG (0 = black, 1 = white).
function luminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Returns the input color, or a lightened variant if it's too dark to be
// readable on the dark surface used for skill chips.
function ensureReadable(color: string | undefined): string {
  if (!color) return "var(--accent)";
  if (!color.startsWith("#")) return color;
  const rgb = parseHex(color);
  if (!rgb) return color;
  if (luminance(rgb) >= 0.18) return color;
  // Mix toward white to lift it above the dark background.
  const mix = (c: number) => Math.round(c + (255 - c) * 0.7);
  const [r, g, b] = rgb.map(mix);
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

export function SkillsSection({
  data,
}: {
  data: Record<Locale, SkillCategory[]>;
}) {
  const { locale, t } = useLocale();
  const categories = data[locale];

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
                {cat.items.map((item) => {
                  const iconName =
                    item.icon ?? fallbackIconFor(cat.id, item.label);
                  const rawAccent =
                    item.color ?? SKILL_ACCENTS[iconName];
                  const accent = ensureReadable(rawAccent);
                  return (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/50 px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-[color:var(--skill-accent,var(--accent))]/50 hover:text-[color:var(--skill-accent,var(--accent))] hover:shadow-[0_0_12px_rgba(var(--neon-cyan-rgb),0.12)]"
                      style={
                        { "--skill-accent": accent } as SkillAccentStyle
                      }
                    >
                      <span
                        className="flex items-center justify-center rounded-md p-0.5 transition-colors"
                        style={{
                          color: `var(--skill-accent, var(--accent))`,
                          backgroundColor: `color-mix(in srgb, var(--skill-accent, var(--accent)) 12%, transparent)`,
                        }}
                      >
                        <Icon name={iconName} className="h-4 w-4" />
                      </span>
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
