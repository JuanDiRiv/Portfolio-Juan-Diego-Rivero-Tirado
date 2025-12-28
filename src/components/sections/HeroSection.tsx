"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/data/profile";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/lib/icon";

export function HeroSection() {
  const { locale, t } = useLocale();
  const p = profile[locale];

  return (
    <Section className="pt-12 sm:pt-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {p.name}
              </h1>
              <p className="text-base font-medium text-muted-foreground sm:text-lg">
                {p.headline}
              </p>
            </div>

            <div className="md:hidden">
              <div className="relative aspect-square w-56 overflow-hidden rounded-3xl border border-border bg-muted shadow-sm shadow-black/5 sm:w-64">
                <HeadshotImage
                  key={`mobile:${locale}:${p.headshot.src}`}
                  src={p.headshot.src}
                  alt={p.headshot.alt}
                />
              </div>
            </div>

            <p className="max-w-2xl text-base leading-7 text-foreground/90">
              {p.summary}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <a
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
                href={`mailto:${p.email}`}
              >
                {p.email}
              </a>
              <CopyButton value={p.email} />
              <ButtonLink href={`mailto:${p.email}`} variant="primary" size="sm">
                {t.common.emailMe}
              </ButtonLink>
              <ButtonLink href="/cv" variant="secondary" size="sm">
                {t.common.viewCv}
              </ButtonLink>
            </div>

            <div className="flex items-center gap-2">
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/80"
                href={p.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" className="h-5 w-5" />
                {t.common.github}
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/80"
                href={p.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="linkedin" className="h-5 w-5" />
                {t.common.linkedin}
              </a>
            </div>
          </div>

          <div className="hidden md:block md:justify-self-end">
            <div className="relative aspect-square w-65 overflow-hidden rounded-3xl border border-border bg-muted shadow-sm shadow-black/5 lg:w-[320px]">
              <HeadshotImage
                key={`desktop:${locale}:${p.headshot.src}`}
                src={p.headshot.src}
                alt={p.headshot.alt}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function HeadshotImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const safeSrc = hasError ? "/images/headshot-placeholder.svg" : src;

  return (
    <Image
      src={safeSrc}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 260px, 320px"
      priority
      unoptimized
      onError={() => setHasError(true)}
    />
  );
}
