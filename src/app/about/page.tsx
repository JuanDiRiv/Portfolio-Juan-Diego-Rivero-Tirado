"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { profile } from "@/data/profile";
import { useLocale } from "@/features/preferences/LocaleProvider";

export default function AboutPage() {
  const { locale, t } = useLocale();
  const p = profile[locale];

  return (
    <main>
      <Section className="pt-10">
        <Container>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.about.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {t.about.subtitle}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-base font-semibold tracking-tight">
                {t.about.softSkillsTitle}
              </h2>
              <ul className="mt-3 list-disc pl-5 text-sm leading-6 text-muted-foreground">
                {p.softSkills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-semibold tracking-tight">
                {t.about.learningTitle}
              </h2>
              <ul className="mt-3 list-disc pl-5 text-sm leading-6 text-muted-foreground">
                {p.learningNow.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 md:col-span-2">
              <h2 className="text-base font-semibold tracking-tight">
                {t.about.hobbiesTitle}
              </h2>
              <ul className="mt-3 list-disc pl-5 text-sm leading-6 text-muted-foreground">
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
