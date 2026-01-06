"use client";

import Link from "next/link";
import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleToggle } from "@/components/ui/LocaleToggle";
import { Button, ButtonLink } from "@/components/ui/button";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { siteConfig } from "@/data/site";
import { IconMenu, IconX } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

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
  const pathname = usePathname();

  return <NavContent key={pathname} t={t} />;
}

function NavContent({
  t,
}: {
  t: {
    nav: {
      home: string;
      projects: string;
      about: string;
      contact: string;
      cv: string;
    };
  };
}) {
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const links = useMemo(
    () => [
      { href: "/", label: t.nav.home, trackId: "nav_home" },
      { href: "/projects", label: t.nav.projects, trackId: "nav_projects" },
      { href: "/about", label: t.nav.about, trackId: "nav_about" },
      { href: "/contact", label: t.nav.contact, trackId: "nav_contact" },
    ],
    [t.nav.about, t.nav.contact, t.nav.home, t.nav.projects]
  );

  return (
    <div className="relative flex items-center gap-2">
      <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
        {links.map((l) => (
          <NavLink key={l.href} href={l.href} trackId={l.trackId}>
            {l.label}
          </NavLink>
        ))}
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

      <div className="md:hidden">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((v) => !v)}
          data-track="nav_menu"
          className="cursor-pointer"
        >
          {isOpen ? (
            <IconX className="h-5 w-5" />
          ) : (
            <IconMenu className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div
        id={menuId}
        role="dialog"
        aria-label="Menú"
        aria-hidden={!isOpen}
        className={cn(
          "absolute right-0 top-[calc(100%+0.5rem)] w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-border bg-background/95 p-2 shadow-sm backdrop-blur md:hidden",
          "origin-top-right transform-gpu transition-all duration-150 ease-out",
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-[0.98] opacity-0 pointer-events-none"
        )}
      >
        <nav aria-label="Primary mobile" className="grid gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              data-track={l.trackId}
              onClick={() => setIsOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
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
