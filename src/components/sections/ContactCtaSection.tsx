"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/CopyButton";
import { profile } from "@/data/profile";
import { useLocale } from "@/features/preferences/LocaleProvider";

export function ContactCtaSection() {
  const { locale, t } = useLocale();
  const p = profile[locale];

  return (
    <Section>
      <Container>
        <Card className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {t.home.contactCtaTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t.home.contactCtaBody}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium"
                href={`mailto:${p.email}`}
                data-track="cta_email_address"
              >
                {p.email}
              </a>
              <CopyButton value={p.email} trackId="cta_email_copy" />
              <ButtonLink
                href={`mailto:${p.email}`}
                external={false}
                size="md"
                dataTrack="cta_email_cta"
              >
                {t.common.emailMe}
              </ButtonLink>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
