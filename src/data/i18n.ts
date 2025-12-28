import type { I18n, Locale } from "@/lib/types";

export const i18n: Record<Locale, I18n> = {
  es: {
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
      cv: "CV",
    },
    common: {
      copy: "Copiar",
      copied: "Copiado",
      download: "Descargar",
      emailMe: "Escríbeme",
      viewCv: "Ver CV",
      viewCode: "Ver código",
      github: "GitHub",
      linkedin: "LinkedIn",
      private: "Privado",
      theme: "Tema",
      language: "Idioma",
    },
    home: {
      featuredProjectsTitle: "Proyectos principales",
      skillsTitle: "Habilidades técnicas",
      contactCtaTitle: "¿Hablamos?",
      contactCtaBody:
        "Si quieres colaborar o tienes una oportunidad, escríbeme. Respondo lo antes posible.",
    },
    projects: {
      title: "Proyectos",
      subtitle:
        "Trabajo seleccionado y otros proyectos. Filtra por tecnología o tipo.",
      filtersTitle: "Filtros",
      filterByTech: "Tecnologías",
      filterByType: "Tipo",
      clear: "Limpiar",
      moreProjectsTitle: "Más trabajos",
    },
    about: {
      title: "Sobre mí",
      subtitle: "Resumen breve, habilidades blandas, aprendizaje y aficiones.",
      softSkillsTitle: "Habilidades blandas",
      learningTitle: "Estoy aprendiendo",
      hobbiesTitle: "Aficiones",
    },
    contact: {
      title: "Contacto",
      subtitle: "Email directo y enlaces profesionales.",
      emailTitle: "Email",
      socialsTitle: "Redes",
    },
    cv: {
      title: "CV",
      subtitle: "Vista previa y descarga del CV según el idioma.",
      missingPdf:
        "TODO: Añade los PDFs del CV en /public (cv-es.pdf y cv-en.pdf).",
      openInNewTab: "Abrir en otra pestaña",
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      cv: "Resume",
    },
    common: {
      copy: "Copy",
      copied: "Copied",
      download: "Download",
      emailMe: "Email me",
      viewCv: "View resume",
      viewCode: "View code",
      github: "GitHub",
      linkedin: "LinkedIn",
      private: "Private",
      theme: "Theme",
      language: "Language",
    },
    home: {
      featuredProjectsTitle: "Featured projects",
      skillsTitle: "Technical skills",
      contactCtaTitle: "Let’s talk",
      contactCtaBody:
        "If you want to collaborate or have an opportunity, email me. I’ll reply as soon as possible.",
    },
    projects: {
      title: "Projects",
      subtitle: "Selected work and more projects. Filter by tech or type.",
      filtersTitle: "Filters",
      filterByTech: "Technologies",
      filterByType: "Type",
      clear: "Clear",
      moreProjectsTitle: "More work",
    },
    about: {
      title: "About",
      subtitle: "Short bio, soft skills, learning and hobbies.",
      softSkillsTitle: "Soft skills",
      learningTitle: "Learning",
      hobbiesTitle: "Hobbies",
    },
    contact: {
      title: "Contact",
      subtitle: "Direct email and professional links.",
      emailTitle: "Email",
      socialsTitle: "Socials",
    },
    cv: {
      title: "Resume",
      subtitle: "Preview and download based on selected language.",
      missingPdf:
        "TODO: Add your resume PDFs into /public (cv-es.pdf and cv-en.pdf).",
      openInNewTab: "Open in new tab",
    },
  },
};
