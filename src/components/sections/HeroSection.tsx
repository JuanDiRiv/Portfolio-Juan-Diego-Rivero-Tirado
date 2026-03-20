"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/lib/icon";

export function HeroSection() {
  const { locale, t } = useLocale();
  const p = profile[locale];

  return (
    <section className="relative min-h-dvh flex items-center gradient-bg grid-pattern overflow-hidden">
      {/* Decorative orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-neon-magenta/10 blur-[120px]" />

      <Container className="relative z-10 py-20 pt-28">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex flex-col gap-3">
              <motion.span
                className="text-sm font-mono font-medium text-accent tracking-wider uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {p.headline}
              </motion.span>
              <motion.h1
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {p.name.split(" ").map((word, i) => (
                  <span key={i}>
                    {i === 0 || i === 1 ? (
                      <span className="dark:neon-glow text-accent">{word} </span>
                    ) : (
                      <span>{word} </span>
                    )}
                  </span>
                ))}
              </motion.h1>
            </div>

            {/* Mobile headshot */}
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-3xl border border-border/50 bg-muted shadow-lg sm:w-64 dark:neon-border">
                <HeadshotImage
                  key={`mobile:${locale}:${p.headshot.src}`}
                  src={p.headshot.src}
                  alt={p.headshot.alt}
                />
              </div>
            </motion.div>

            <motion.p
              className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {p.summary}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <ButtonLink
                href={`mailto:${p.email}`}
                variant="primary"
                size="md"
                dataTrack="hero_email_cta"
              >
                {t.common.emailMe}
              </ButtonLink>
              <CopyButton value={p.email} trackId="hero_email_copy" />
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-3 py-2 text-sm font-medium text-foreground transition-all hover:border-accent/50 hover:shadow-[0_0_10px_rgba(var(--neon-cyan-rgb),0.15)]"
                href={p.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_social_github"
              >
                <Icon name="github" className="h-5 w-5" />
                {t.common.github}
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-3 py-2 text-sm font-medium text-foreground transition-all hover:border-accent/50 hover:shadow-[0_0_10px_rgba(var(--neon-cyan-rgb),0.15)]"
                href={p.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_social_linkedin"
              >
                <Icon name="linkedin" className="h-5 w-5" />
                {t.common.linkedin}
              </a>
            </motion.div>
          </motion.div>

          {/* Desktop headshot */}
          <motion.div
            className="hidden md:block md:justify-self-end"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative aspect-square w-72 overflow-hidden rounded-3xl border border-border/50 bg-muted shadow-2xl lg:w-[340px] dark:neon-border">
              <HeadshotImage
                key={`desktop:${locale}:${p.headshot.src}`}
                src={p.headshot.src}
                alt={p.headshot.alt}
              />
              {/* Neon border glow effect */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
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
      sizes="(max-width: 768px) 260px, 340px"
      priority
      unoptimized
      onError={() => setHasError(true)}
    />
  );
}
