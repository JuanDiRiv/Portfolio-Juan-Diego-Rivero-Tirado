"use client";

import { Container } from "@/components/ui/Container";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/lib/icon";
import { profile } from "@/data/profile";
import { useLocale } from "@/features/preferences/LocaleProvider";

export function ContactCtaSection() {
  const { locale, t } = useLocale();
  const p = profile[locale];

  return (
    <AnimatedSection id="contact" className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 sm:p-12 glass">
          {/* Decorative glow orbs */}
          <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-neon-cyan/10 blur-[80px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-neon-magenta/10 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <AnimatedDiv delay={0.1}>
              <span className="text-sm font-mono font-medium text-accent tracking-wider uppercase">
                {t.home.contactCtaTitle}
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {locale === "es"
                  ? "Trabajemos juntos"
                  : "Let's work together"}
              </h2>
              <p className="mt-3 max-w-lg mx-auto text-sm leading-6 text-muted-foreground">
                {t.home.contactCtaBody}
              </p>
            </AnimatedDiv>

            <AnimatedDiv
              delay={0.2}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <ButtonLink
                href={`mailto:${p.email}`}
                variant="primary"
                size="md"
                dataTrack="cta_email_cta"
              >
                {t.common.emailMe}
              </ButtonLink>
              <CopyButton value={p.email} trackId="cta_email_copy" />
            </AnimatedDiv>

            <AnimatedDiv
              delay={0.3}
              className="flex items-center gap-3"
            >
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-3 py-2 text-sm font-medium text-foreground transition-all hover:border-accent/50 hover:shadow-[0_0_10px_rgba(var(--neon-cyan-rgb),0.15)]"
                href={p.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                data-track="cta_social_github"
              >
                <Icon name="github" className="h-5 w-5" />
                {t.common.github}
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-3 py-2 text-sm font-medium text-foreground transition-all hover:border-accent/50 hover:shadow-[0_0_10px_rgba(var(--neon-cyan-rgb),0.15)]"
                href={p.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-track="cta_social_linkedin"
              >
                <Icon name="linkedin" className="h-5 w-5" />
                {t.common.linkedin}
              </a>
            </AnimatedDiv>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
