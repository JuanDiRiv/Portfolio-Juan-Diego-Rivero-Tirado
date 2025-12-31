"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/lib/icon";
import { profile } from "@/data/profile";
import { useLocale } from "@/features/preferences/LocaleProvider";

export default function ContactPage() {
  const { locale, t } = useLocale();
  const p = profile[locale];

  return (
    <main>
      <Section className="pt-10">
        <Container>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.contact.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {t.contact.subtitle}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
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
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-semibold tracking-tight">
                {t.contact.socialsTitle}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
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
