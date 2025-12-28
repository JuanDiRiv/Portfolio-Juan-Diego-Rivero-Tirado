"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { profile } from "@/data/profile";

export default function CvPage() {
  const { locale, t } = useLocale();
  const p = profile[locale];
  const cvUrl = locale === "es" ? p.cv.es : p.cv.en;

  return (
    <main>
      <Section className="pt-10">
        <Container>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.cv.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {t.cv.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <ButtonLink href={cvUrl} external variant="secondary" size="sm">
              {t.cv.openInNewTab}
            </ButtonLink>
            <ButtonLink href={cvUrl} external variant="primary" size="sm">
              {t.common.download}
            </ButtonLink>
          </div>


          <Card className="mt-6 overflow-hidden">
            <div className="h-[75vh] w-full">
              <object
                data={cvUrl}
                type="application/pdf"
                className="h-full w-full"
                aria-label={t.cv.title}
              >

              </object>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
