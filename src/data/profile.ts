import type { Locale, Profile } from "@/lib/types";

type LocalizedProfile = Record<Locale, Profile>;

export const profile: LocalizedProfile = {
  es: {
    name: "Juan Diego Rivero Tirado",
    headline: "SSR Front-End Developer | React, Next.js, TypeScript",
    email: "juandirivero@gmail.com",
    location: "TODO: Ciudad, País",
    summary:
      "SSR Front-End Developer con +4 años de experiencia desarrollando aplicaciones web modernas utilizando React, Next.js y TypeScript. Enfocado en la creación de UI escalables, optimizadas y accesibles, con experiencia en Tailwind CSS, design systems y consumo de APIs, dentro de entornos ágiles.",
    headshot: {
      src: "/images/headshot.png",
      alt: "Foto de perfil de Juan Diego Rivero Tirado",
    },
    socials: {
      github: "https://github.com/JuanDiRiv",
      linkedin:
        "https://www.linkedin.com/in/juan-diego-rivero-tirado-95814423b/",
    },
    cv: {
      // Recomendado: 2 PDFs para ES/EN.
      // Colócalos en /public (ver README).
      es: "/pdf/cv-es.pdf",
      en: "/pdf/cv-en.pdf",
    },
    softSkills: [
      "Comunicación clara y orientada a contexto",
      "Pensamiento crítico y resolución de problemas",
      "Ownership y foco en calidad",
      "Colaboración con diseño y backend",
    ],
    learningNow: [
      "TODO: Accesibilidad avanzada (WCAG)",
      "TODO: Testing (Playwright / RTL)",
      "TODO: Performance (Core Web Vitals)",
    ],
    hobbies: ["TODO: Fotografía", "TODO: Lectura", "TODO: Running"],
  },
  en: {
    name: "Juan Diego Rivero Tirado",
    headline: "SSR Front-End Developer | React, Next.js, TypeScript",
    email: "juandirivero@gmail.com",
    location: "TODO: City, Country",
    summary:
      "SSR Front-End Developer with 4+ years of experience building modern web applications using React, Next.js, and TypeScript. Focused on creating scalable, high-performance, and accessible UIs, with experience in Tailwind CSS, design systems, and API consumption, working within agile environments.",
    headshot: {
      src: "/images/headshot.png",
      alt: "Profile photo of Juan Diego Rivero Tirado",
    },
    socials: {
      github: "https://github.com/JuanDiRiv",
      linkedin:
        "https://www.linkedin.com/in/juan-diego-rivero-tirado-95814423b/",
    },
    cv: {
      es: "/pdf/cv-es.pdf",
      en: "/pdf/cv-en.pdf",
    },
    softSkills: [
      "Clear communication and context sharing",
      "Critical thinking and problem solving",
      "Ownership with quality focus",
      "Cross-functional collaboration",
    ],
    learningNow: [
      "TODO: Advanced accessibility (WCAG)",
      "TODO: Testing (Playwright / RTL)",
      "TODO: Performance (Core Web Vitals)",
    ],
    hobbies: ["TODO: Photography", "TODO: Reading", "TODO: Running"],
  },
};
