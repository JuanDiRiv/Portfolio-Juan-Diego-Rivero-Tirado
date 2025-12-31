"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleToggle } from "@/components/ui/LocaleToggle";
import { ButtonLink } from "@/components/ui/button";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { siteConfig } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Brand />
        <Nav />
      </Container>
    </header>
  );
}

function Brand() {
  const { locale } = useLocale();

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={locale === "es" ? "Ir al inicio" : "Go home"}
      data-track="brand_home"
    >
      <span className="h-8 w-8 rounded-xl bg-accent text-accent-foreground grid place-items-center">
        <Image
          src="/images/logo-jdrt.svg"
          alt={siteConfig.brandInitial}
          width={24}
          height={24}
          className="h-6 w-6"
          priority
        />
      </span>
      <span className="hidden text-sm font-semibold tracking-tight sm:inline">
        {siteConfig.brand}
      </span>
    </Link>
  );
}

function Nav() {
  const { t } = useLocale();

  return (
    <div className="flex items-center gap-2">
      <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
        <NavLink href="/" trackId="nav_home">{t.nav.home}</NavLink>
        <NavLink href="/projects" trackId="nav_projects">{t.nav.projects}</NavLink>
        <NavLink href="/about" trackId="nav_about">{t.nav.about}</NavLink>
        <NavLink href="/contact" trackId="nav_contact">{t.nav.contact}</NavLink>
      </nav>

      <div className="flex items-center gap-1">
        <ButtonLink
          href="/cv"
          variant="secondary"
          size="sm"
          ariaLabel={t.nav.cv}
          dataTrack="nav_cv"
        >
          {t.nav.cv}
        </ButtonLink>
        <LocaleToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
  trackId,
}: {
  href: string;
  children: string;
  trackId?: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      data-track={trackId}
    >
      {children}
    </Link>
  );
}
