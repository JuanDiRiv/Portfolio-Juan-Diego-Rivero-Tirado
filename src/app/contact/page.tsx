"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/lib/icon";
import { profile } from "@/data/profile";
import { useLocale } from "@/features/preferences/LocaleProvider";

export default function ContactPage() {
  const { locale, t } = useLocale();
  const p = profile[locale];

  return (
    <main>
      <Section className="pt-12 sm:pt-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm shadow-black/5 sm:p-8">
            <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {t.contact.title}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {t.contact.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {p.location && <Badge>{p.location}</Badge>}
                  <Badge>{p.socials.whatsapp.statusMessage}</Badge>
                </div>
              </div>

              <Card className="p-6">
                <h2 className="text-base font-semibold tracking-tight">
                  {t.contact.emailTitle}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium"
                    href={`mailto:${p.email}`}
                    data-track="contact_email_address"
                  >
                    {p.email}
                  </a>
                  <CopyButton value={p.email} trackId="contact_email_copy" />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <ButtonLink
                    href={`mailto:${p.email}`}
                    variant="primary"
                    size="sm"
                    dataTrack="contact_email_cta"
                  >
                    {t.common.emailMe}
                  </ButtonLink>
                  <ButtonLink
                    href="/cv"
                    variant="secondary"
                    size="sm"
                    dataTrack="contact_cv"
                  >
                    {t.common.viewCv}
                  </ButtonLink>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-6">
            <Card className="p-6 sm:p-8">
              <h2 className="text-base font-semibold tracking-tight">
                {t.contact.socialsTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {p.headline}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/80"
                  href={p.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="contact_social_github"
                >
                  <Icon name="github" className="h-5 w-5" />
                  {t.common.github}
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/80"
                  href={p.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="contact_social_linkedin"
                >
                  <Icon name="linkedin" className="h-5 w-5" />
                  {t.common.linkedin}
                </a>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
