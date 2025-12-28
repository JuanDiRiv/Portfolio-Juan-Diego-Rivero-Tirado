import type { Locale, Project } from "@/lib/types";

type LocalizedProjects = Record<Locale, Project[]>;

export const projects: LocalizedProjects = {
  es: [
    {
      id: "project-1",
      title: "[Proyecto 1]",
      description:
        "TODO: Descripción clara del problema, tu rol y el resultado (sin métricas inventadas).",
      type: "web",
      technologies: ["Next.js", "TypeScript", "Tailwind"],
      image: {
        src: "/projects/project-placeholder-1.svg",
        alt: "Imagen del proyecto 1 (placeholder)",
      },
      links: {
        demo: { label: "Demo", href: undefined },
        repo: { label: "Repo", href: undefined, private: true },
        code: { label: "Ver código", href: undefined, private: true },
      },
      featured: true,
    },
    {
      id: "project-2",
      title: "[Proyecto 2]",
      description:
        "TODO: Qué construiste, con qué stack y por qué decisiones técnicas.",
      type: "web",
      technologies: ["React", "TypeScript", "Testing"],
      image: {
        src: "/projects/project-placeholder-2.svg",
        alt: "Imagen del proyecto 2 (placeholder)",
      },
      links: {
        demo: { label: "Demo", href: undefined },
        repo: { label: "Repo", href: undefined },
        code: { label: "Ver código", href: undefined },
      },
      featured: true,
    },
    {
      id: "project-3",
      title: "[Proyecto 3]",
      description:
        "TODO: Enfatiza experiencia real: performance, DX, accesibilidad, UI.",
      type: "web",
      technologies: ["Next.js", "SEO", "A11y"],
      image: {
        src: "/projects/project-placeholder-3.svg",
        alt: "Imagen del proyecto 3 (placeholder)",
      },
      links: {
        demo: { label: "Demo", href: undefined },
        repo: { label: "Repo", href: undefined, private: true },
        code: { label: "Ver código", href: undefined, private: true },
      },
      featured: true,
    },
    {
      id: "project-4",
      title: "[Otro proyecto]",
      description: "TODO: Proyecto secundario (más trabajo).",
      type: "tool",
      technologies: ["Node.js", "TypeScript"],
      image: {
        src: "/projects/project-placeholder-4.svg",
        alt: "Imagen del proyecto 4 (placeholder)",
      },
      links: {
        repo: { label: "Repo", href: undefined, private: true },
        code: { label: "Ver código", href: undefined, private: true },
      },
      featured: false,
    },
  ],
  en: [
    {
      id: "project-1",
      title: "[Project 1]",
      description:
        "TODO: Clear description: problem, your role, and outcome (no made-up metrics).",
      type: "web",
      technologies: ["Next.js", "TypeScript", "Tailwind"],
      image: {
        src: "/projects/project-placeholder-1.svg",
        alt: "Project 1 image (placeholder)",
      },
      links: {
        demo: { label: "Demo", href: undefined },
        repo: { label: "Repo", href: undefined, private: true },
        code: { label: "View code", href: undefined, private: true },
      },
      featured: true,
    },
    {
      id: "project-2",
      title: "[Project 2]",
      description:
        "TODO: What you built, stack used, and key technical decisions.",
      type: "web",
      technologies: ["React", "TypeScript", "Testing"],
      image: {
        src: "/projects/project-placeholder-2.svg",
        alt: "Project 2 image (placeholder)",
      },
      links: {
        demo: { label: "Demo", href: undefined },
        repo: { label: "Repo", href: undefined },
        code: { label: "View code", href: undefined },
      },
      featured: true,
    },
    {
      id: "project-3",
      title: "[Project 3]",
      description:
        "TODO: Highlight real experience: performance, DX, accessibility, UI.",
      type: "web",
      technologies: ["Next.js", "SEO", "A11y"],
      image: {
        src: "/projects/project-placeholder-3.svg",
        alt: "Project 3 image (placeholder)",
      },
      links: {
        demo: { label: "Demo", href: undefined },
        repo: { label: "Repo", href: undefined, private: true },
        code: { label: "View code", href: undefined, private: true },
      },
      featured: true,
    },
    {
      id: "project-4",
      title: "[Other project]",
      description: "TODO: Secondary project (more work).",
      type: "tool",
      technologies: ["Node.js", "TypeScript"],
      image: {
        src: "/projects/project-placeholder-4.svg",
        alt: "Project 4 image (placeholder)",
      },
      links: {
        repo: { label: "Repo", href: undefined, private: true },
        code: { label: "View code", href: undefined, private: true },
      },
      featured: false,
    },
  ],
};

export function getFeaturedProjects(locale: Locale) {
  return projects[locale].filter((p) => p.featured);
}

export function getMoreProjects(locale: Locale) {
  return projects[locale].filter((p) => !p.featured);
}
