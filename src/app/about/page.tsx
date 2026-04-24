"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { useLocale } from "@/features/preferences/LocaleProvider";

export default function AboutPage() {
  const { locale, t } = useLocale();
  const p = profile[locale];

  return (
    <main>
      <Section className="pt-12 sm:pt-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm shadow-black/5 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {t.about.title}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {t.about.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {p.location && <Badge>{p.location}</Badge>}
                  <Badge>{p.socials.whatsapp.statusMessage}</Badge>
                </div>

                <p className="max-w-2xl text-base leading-7 text-foreground/90">
                  {p.summary}
                </p>
              </div>

              <div className="justify-self-center md:justify-self-end">
                <div className="relative aspect-square w-56 overflow-hidden rounded-3xl border border-border bg-muted shadow-sm shadow-black/5 sm:w-64">
                  <Image
                    src={p.headshot.src}
                    alt={p.headshot.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, 256px"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 sm:p-8">
              <h2 className="text-base font-semibold tracking-tight">
                {t.about.softSkillsTitle}
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
                {p.softSkills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 sm:p-8">
              <h2 className="text-base font-semibold tracking-tight">
                {t.about.learningTitle}
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
                {p.learningNow.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 sm:p-8 md:col-span-2 lg:col-span-1">
              <h2 className="text-base font-semibold tracking-tight">
                {t.about.hobbiesTitle}
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
                {p.hobbies.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
