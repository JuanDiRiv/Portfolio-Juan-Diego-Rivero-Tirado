"use client";

import Link from "next/link";
import Image from "next/image";
import type { JSX } from "react";
import { useMemo } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

import { useLanguage } from "@/context/LanguageContext";
import { projectDetails } from "@/data/projects";

type SocialLinkId = "linkedin" | "github";

type SocialLink = {
  id: SocialLinkId;
  href: string;
  icon: JSX.Element;
};

const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/juan-diego-rivero-tirado-95814423b/",
    icon: (
      <svg
        aria-hidden="true"
        height="20"
        width="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="transition-colors group-hover:text-[var(--accent)]"
      >
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h3.95v12H3Zm6.74 0H14v1.71h.05c.58-1.1 2-2.27 4.12-2.27 4.4 0 5.21 2.9 5.21 6.67V21H19.4v-5.24c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76V21h-3.95Z" />
      </svg>
    ),
  },
  {
    id: "github",
    href: "https://github.com/JuanDiRiv",
    icon: (
      <svg
        aria-hidden="true"
        height="20"
        width="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="transition-colors group-hover:text-[var(--accent)]"
      >
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.47v-1.64c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.89 1.52 2.34 1.08 2.9.83a2.1 2.1 0 0 1 .62-1.32c-2.22-.25-4.56-1.12-4.56-5a3.9 3.9 0 0 1 1.04-2.7 3.66 3.66 0 0 1 .1-2.66s.84-.27 2.75 1.02a9.43 9.43 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.54 1.36.2 2.38.1 2.66a3.91 3.91 0 0 1 1.04 2.7c0 3.9-2.34 4.73-4.57 4.98.36.31.68.92.68 1.86V21c0 .27.18.58.69.47A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
];

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "JavaScript",
  "REST APIs",
  "Bootstrap",
  "Material-UI",
  "Nest.js",
  "MongoDB",
  "MySQL",
  "Firebase",
  "Google Cloud",
  "Astro",
  "Git",
  "GitHub",
  "Figma",
  "Agile Methodologies",
  "Jest",
  "HTML5",
  "CSS3",
  "Sass",
  "Responsive Design",
  "SEO Best Practices",
  "Salesforce",
  "Veeva",
  "Kanban",
  "Technical leadership",
  "UI/UX Principles",
  "Training & Mentorship",
  "Process Optimization",

];

type BrandMarkProps = {
  label: string;
};

function BrandMark({ label }: BrandMarkProps) {
  return (
    <Link
      href="#about"
      aria-label={label}
      className="group relative flex flex-col items-center text-center leading-none"
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden
        className="font-logo text-[1.95rem] font-light uppercase tracking-[0.52em] text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-[2.5rem] sm:tracking-[0.7em]"
      >
        JDRT
      </span>
      <span
        aria-hidden
        className="mt-3 text-[0.54rem] uppercase tracking-[0.6em] text-[var(--muted-foreground)] transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-[0.62rem] sm:tracking-[0.72em]"
      >
        JUAN DIEGO RIVERO TIRADO
      </span>
    </Link>
  );
}

const copy = {
  en: {
    name: "Juan Diego Rivero Tirado",
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
    },
    languageToggleLabel: "Switch to Spanish",
    languageToggleShort: "ES",
    themeToggle: "Toggle theme",
    heroBadge: "Front-end developer",
    heroTitle: "I am Juan Diego Rivero Tirado,",
    heroDescription:
      " A front-end developer passionate about crafting innovative and responsive experiences, eager to learn new things every day, showcasing who I am through my work and effort.",
    primaryCta: "Explore projects",
    secondaryCta: "Start a conversation",
    currentFocusLabel: "Currently crafting",
    currentFocusValue: "Immersive dashboards & design systems",
    recentHighlightLabel: "Recent highlight",
    recentHighlightBody:
      "Led the interface vision for a spatial analytics suite adopted across 7 global product teams.",
    skillsHeading: "Skills & toolset",
    skillsDescription:
      "Technical abilities and knowledge required to design, develop, manage, and maintain technology and digital systems",
    projectsHeading: "Selected projects",
    projectsDescription:
      "Each build has its own stage. Explore the highlights and craft directly from here.",
    footerRights: "All rights reserved.",
    footerBuilt: "Built with Tailwind CSS and deployed with Vercel.",
    social: {
      linkedin: "LinkedIn profile",
      github: "GitHub profile",
    } as Record<SocialLinkId, string>,
  },
  es: {
    name: "Juan Diego Rivero Tirado",
    nav: {
      about: "Sobre mi",
      skills: "Habilidades",
      projects: "Proyectos", 
    },
    languageToggleLabel: "Cambiar a ingles",
    languageToggleShort: "EN",
    themeToggle: "Cambiar tema",
    heroBadge: "Desarrollador front-end",
    heroTitle: "Soy Juan Diego Rivero Tirado,  ",
    heroDescription:
      "Desarrollador Front-End apasionado, enfocado en crear experiencias innovadoras y responsivas, aprendiendo cada día y mostrando mi esencia mediante el trabajo y el esfuerzo.",
    primaryCta: "Explorar proyectos",
    secondaryCta: "Iniciar una conversacion",
    currentFocusLabel: "Actualmente creando",
    currentFocusValue: "Paneles inmersivos y sistemas de diseno",
    recentHighlightLabel: "Destacado reciente",
    recentHighlightBody:
      "Dirigi la vision de interfaz para una suite de analitica espacial adoptada por 7 equipos globales de producto.",
    skillsHeading: "Habilidades y stack",
    skillsDescription:
      "Habilidades técnicas y conocimientos necesarios para diseñar, desarrollar, gestionar y mantener la tecnología y los sistemas digitales.",
    projectsHeading: "Proyectos destacados",
    projectsDescription:
      "Cada proyecto tiene su propio escenario. Explora los aspectos destacados y el proceso directamente aqui.",
    footerRights: "Todos los derechos reservados.",
    footerBuilt: "Construido con Tailwind CSS y desplegado con Vercel.",
    social: {
      linkedin: "Perfil de LinkedIn",
      github: "Perfil de GitHub",
    } as Record<SocialLinkId, string>,
  },
} as const;

export default function Home() {
  const { language, toggleLanguage } = useLanguage();
  const t = copy[language];

  const currentYear = useMemo(() => new Date().getFullYear(), []);


  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="absolute top-64 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <BrandMark label={t.name} />
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a className="transition-colors hover:text-[var(--accent)]" href="#about">
              {t.nav.about}
            </a>
            <a className="transition-colors hover:text-[var(--accent)]" href="#skills">
              {t.nav.skills}
            </a>
            <a className="transition-colors hover:text-[var(--accent)]" href="#projects">
              {t.nav.projects}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={t.languageToggleLabel}
              onClick={toggleLanguage}
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-[color:var(--surface)] px-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted-foreground)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t.languageToggleShort}
            </button>
            <ThemeToggle
              ariaLabel={t.themeToggle}
              className="relative overflow-hidden border border-white/10 bg-[color:var(--surface)] text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)]"
            />
            <div className="md:hidden">
              <nav className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                <a className="transition-colors hover:text-[var(--accent)]" href="#about">
                  {t.nav.about}
                </a>
                <a className="transition-colors hover:text-[var(--accent)]" href="#skills">
                  {t.nav.skills}
                </a>
                <a className="transition-colors hover:text-[var(--accent)]" href="#projects">
                  {t.nav.projects}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-28 px-6 pb-24 pt-24 lg:px-8">
        <section
          id="about"
          className="relative grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-center"
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[color:var(--surface)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              {t.heroBadge}
            </div>
            <div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {t.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base text-[var(--muted-foreground)] sm:text-lg">
                {t.heroDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 rounded-full border border-transparent bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(56,189,248,0.35)]"
              >
                {t.primaryCta}
                <span className="text-xs font-bold uppercase tracking-[0.3em]">&rarr;</span>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=573124344686"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--surface)] p-8 shadow-2xl backdrop-blur">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                    {t.currentFocusLabel}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{t.currentFocusValue}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[color:var(--card)] p-5 shadow-inner">
                  <p className="text-sm font-semibold text-[var(--muted-foreground)]">
                    {t.recentHighlightLabel}
                  </p>
                  <p className="mt-3 text-base font-medium">
                    {t.recentHighlightBody}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[color:var(--card)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <span className="sr-only">{t.social[social.id]}</span>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.skillsHeading}
            </h2>
            <p className="max-w-2xl text-base text-[var(--muted-foreground)]">
              {t.skillsDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-[color:var(--muted)] px-5 py-2 text-sm font-medium tracking-tight text-[var(--muted-foreground)] backdrop-blur transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.projectsHeading}
            </h2>
            <p className="max-w-2xl text-base text-[var(--muted-foreground)]">
              {t.projectsDescription}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {projectDetails.map((project) => (
              <div
                key={project.slug}
                className="group relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--surface)] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)] hover:shadow-[0_30px_60px_rgba(15,23,42,0.45)]"
              >
                <div
                  className={`pointer-events-none absolute -top-24 left-1/2 h-52 w-[120%] -translate-x-1/2 transform bg-gradient-to-br ${project.accent} blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--card)] p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                      {project.previewTitle[language]}
                    </p>
                    <p className="mt-2 text-base font-semibold">
                      {project.previewSubtitle[language]}
                    </p>
                    <div className="mt-6 relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/5 bg-[color:var(--surface)]">
                      <Image
                        src={project.previewImage}
                        alt={project.previewAlt[language]}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {project.title[language]}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {project.description[language]}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 bg-[color:var(--card)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={project.ctaHref}
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-[color:var(--card)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--foreground)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {project.ctaLabel[language]}
                      <span aria-hidden className="text-sm">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-16 lg:px-8">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-[color:var(--surface)] p-8 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[color:var(--card)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <span className="sr-only">{t.social[social.id]}</span>
                {social.icon}
              </a>
            ))}
          </div>
          <div className="space-y-1 text-sm text-[var(--muted-foreground)]">
            <p>
              &copy; {currentYear} {t.name}. {t.footerRights}
            </p>
            <p>{t.footerBuilt}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}





