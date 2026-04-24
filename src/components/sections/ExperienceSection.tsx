"use client";

import { Container } from "@/components/ui/Container";
import {
  AnimatedSection,
  AnimatedDiv,
} from "@/components/ui/AnimatedSection";
import { useLocale } from "@/features/preferences/LocaleProvider";
import type { Experience, Locale } from "@/lib/types";

export function ExperienceSection({
  data,
}: {
  data: Record<Locale, Experience[]>;
}) {
  const { locale, t } = useLocale();
  const items = data[locale];

  return (
    <AnimatedSection id="experience" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-3 mb-12">
          <span className="text-sm font-mono font-medium text-neon-magenta tracking-wider uppercase">
            {t.home.experienceTitle}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.home.experienceSubtitle}
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-neon-magenta to-neon-green opacity-30 sm:left-1/2 sm:-translate-x-px" />

          <div className="flex flex-col gap-12">
            {items.map((item, i) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={i}
                presentLabel={t.home.present}
              />
            ))}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}

function TimelineItem({
  item,
  index,
  presentLabel,
}: {
  item: Experience;
  index: number;
  presentLabel: string;
}) {
  const isLeft = index % 2 === 0;
  const neonColors = ["accent", "neon-magenta", "neon-green"] as const;
  const color = neonColors[index % neonColors.length];

  const colorMap = {
    accent: {
      dot: "bg-accent shadow-[0_0_10px_rgba(var(--neon-cyan-rgb),0.5)]",
      border: "hover:border-accent/30 hover:shadow-[0_0_25px_rgba(var(--neon-cyan-rgb),0.08)]",
      badge: "border-accent/20 text-accent",
      highlight: "bg-neon-cyan",
    },
    "neon-magenta": {
      dot: "bg-neon-magenta shadow-[0_0_10px_rgba(var(--neon-magenta-rgb),0.5)]",
      border: "hover:border-neon-magenta/30 hover:shadow-[0_0_25px_rgba(var(--neon-magenta-rgb),0.08)]",
      badge: "border-neon-magenta/20 text-neon-magenta",
      highlight: "bg-neon-magenta",
    },
    "neon-green": {
      dot: "bg-neon-green shadow-[0_0_10px_rgba(var(--neon-green-rgb),0.5)]",
      border: "hover:border-neon-green/30 hover:shadow-[0_0_25px_rgba(var(--neon-green-rgb),0.08)]",
      badge: "border-neon-green/20 text-neon-green",
      highlight: "bg-neon-green",
    },
  };

  const c = colorMap[color];

  const startFormatted = formatDate(item.startDate);
  const endFormatted = item.endDate ? formatDate(item.endDate) : presentLabel;

  return (
    <div className="relative grid grid-cols-[40px_1fr] sm:grid-cols-2 gap-4 sm:gap-8">
      {/* Dot on the timeline */}
      <div className="absolute left-[12px] top-6 z-10 sm:left-1/2 sm:-translate-x-1/2">
        <span
          className={`block h-3.5 w-3.5 rounded-full ring-4 ring-background ${c.dot}`}
        />
      </div>

      {/* Spacer for alternating layout on desktop */}
      <div className={`hidden sm:block ${isLeft ? "order-2" : "order-1"}`} />

      {/* Card */}
      <AnimatedDiv
        delay={0.15 * (index + 1)}
        className={`col-start-2 sm:col-start-auto ${isLeft ? "order-1 sm:text-right" : "order-2"}`}
      >
        <div
          className={`rounded-2xl border border-border/50 bg-card/50 p-6 transition-all glass ${c.border}`}
        >
          {/* Date badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-medium ${c.badge}`}
          >
            {startFormatted} — {endFormatted}
          </span>

          {/* Role & company */}
          <h3 className="mt-3 text-lg font-semibold tracking-tight">
            {item.role}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {item.companyUrl ? (
              <a
                href={item.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-border underline-offset-2 transition-colors hover:text-accent"
              >
                {item.company}
              </a>
            ) : (
              item.company
            )}
            {item.location ? ` · ${item.location}` : ""}
          </p>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>

          {/* Highlights */}
          <ul className={`mt-4 space-y-2 ${isLeft ? "sm:text-right" : ""}`}>
            {item.highlights.map((h) => (
              <li
                key={h}
                className={`flex items-start gap-2 text-sm leading-6 text-muted-foreground ${isLeft ? "sm:flex-row-reverse" : ""}`}
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${c.highlight}`}
                />
                {h}
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div
            className={`mt-4 flex flex-wrap gap-1.5 ${isLeft ? "sm:justify-end" : ""}`}
          >
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md border border-border/50 bg-background/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </AnimatedDiv>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
