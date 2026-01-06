import type { Locale, Project } from "@/lib/types";

type LocalizedProjects = Record<Locale, Project[]>;

export const projects: LocalizedProjects = {
  es: [
    {
      id: "project-1",
      title: "Sitio web educativo - San Marco CDI",
      description:
        "Sitio web desarrollado para San Marco CDI, una institución educativa enfocada en brindar educación de calidad a niños y niñas en edad preescolar y básica primaria. El sitio web sirve como plataforma informativa para padres y tutores, proporcionando detalles sobre los programas educativos, Además, incluye una sección de contacto para consultas y matrículas.",
      type: "web",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Material UI"],
      image: {
        src: "/projects/san-marco-cdi.png",
        alt: "Thumbnail del proyecto San Marco CDI",
      },
      links: {
        demo: { label: "Sitio Web", href: "https://www.sanmarcocdi.edu.co/" },
        repo: { label: "Repo", href: undefined, private: true },
        code: { label: "Ver código", href: undefined, private: true },
      },
      featured: true,
    },
    {
      id: "project-2",
      title: "Qr Code Generator",
      description:
        "Generador de códigos QR en línea que permite a los usuarios crear códigos QR personalizados de manera rápida y sencilla. La aplicación web ofrece una interfaz intuitiva donde los usuarios pueden ingresar la información que desean codificar, como URL, texto o datos de contacto. Además, proporciona opciones de personalización, como colores y estilos de diseño. Una vez generado, el código QR se puede descargar en varios formatos para su uso en diferentes contextos.",
      type: "web",
      technologies: ["React", "Next.js", "TypeScript", "SCSS"],
      image: {
        src: "/projects/qrcode.png",
        alt: "Imagen del proyecto Qr Code Generator",
      },
      links: {
        demo: {
          label: "Demo",
          href: "https://qr-code-generator-chi-ten.vercel.app/editor",
        },
        repo: {
          label: "Repo",
          href: "https://github.com/JuanDiRiv/qr-code-generator",
        },
        code: {
          label: "Ver código",
          href: "https://github.com/JuanDiRiv/qr-code-generator",
        },
      },
      featured: true,
    },
    // {
    //   id: "project-3",
    //   title: "[Proyecto 3]",
    //   description:
    //     "TODO: Enfatiza experiencia real: performance, DX, accesibilidad, UI.",
    //   type: "web",
    //   technologies: ["Next.js", "SEO", "A11y"],
    //   image: {
    //     src: "/projects/project-placeholder-3.svg",
    //     alt: "Imagen del proyecto 3 (placeholder)",
    //   },
    //   links: {
    //     demo: { label: "Demo", href: undefined },
    //     repo: { label: "Repo", href: undefined, private: true },
    //     code: { label: "Ver código", href: undefined, private: true },
    //   },
    //   featured: true,
    // },
    // {
    //   id: "project-4",
    //   title: "[Otro proyecto]",
    //   description: "TODO: Proyecto secundario (más trabajo).",
    //   type: "tool",
    //   technologies: ["Node.js", "TypeScript"],
    //   image: {
    //     src: "/projects/project-placeholder-4.svg",
    //     alt: "Imagen del proyecto 4 (placeholder)",
    //   },
    //   links: {
    //     repo: { label: "Repo", href: undefined, private: true },
    //     code: { label: "Ver código", href: undefined, private: true },
    //   },
    //   featured: false,
    // },
  ],
  en: [
    {
      id: "project-1",
      title: "Educational Website - San Marco CDI",
      description:
        "Website developed for San Marco CDI, an educational institution focused on providing quality education to preschool and primary school children. The website serves as an informative platform for parents and guardians, providing details about educational programs. Additionally, it includes a contact section for inquiries and enrollments.",
      type: "web",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Material UI"],
      image: {
        src: "/projects/san-marco-cdi.png",
        alt: "San Marco CDI project thumbnail",
      },
      links: {
        demo: { label: "Website", href: "https://www.sanmarcocdi.edu.co/" },
        repo: { label: "Repo", href: undefined, private: true },
        code: { label: "View code", href: undefined, private: true },
      },
      featured: true,
    },
    {
      id: "project-2",
      title: "Qr Code Generator",
      description:
        "Online QR code generator that allows users to create customized QR codes quickly and easily. The web application offers an intuitive interface where users can enter the information they want to encode, such as URLs, text, or contact details. Additionally, it provides customization options, such as colors and design styles. Once generated, the QR code can be downloaded in various formats for use in different contexts.",
      type: "web",
      technologies: ["React", "Next.js", "TypeScript", "SCSS"],
      image: {
        src: "/projects/qrcode.png",
        alt: "Qr Code Generator project image",
      },
      links: {
        demo: {
          label: "Demo",
          href: "https://qr-code-generator-chi-ten.vercel.app/editor",
        },
        repo: {
          label: "Repo",
          href: "https://github.com/JuanDiRiv/qr-code-generator",
        },
        code: {
          label: "Ver código",
          href: "https://github.com/JuanDiRiv/qr-code-generator",
        },
      },
      featured: true,
    },
    // {
    //   id: "project-3",
    //   title: "[Project 3]",
    //   description:
    //     "TODO: Highlight real experience: performance, DX, accessibility, UI.",
    //   type: "web",
    //   technologies: ["Next.js", "SEO", "A11y"],
    //   image: {
    //     src: "/projects/project-placeholder-3.svg",
    //     alt: "Project 3 image (placeholder)",
    //   },
    //   links: {
    //     demo: { label: "Demo", href: undefined },
    //     repo: { label: "Repo", href: undefined, private: true },
    //     code: { label: "View code", href: undefined, private: true },
    //   },
    //   featured: true,
    // },
    // {
    //   id: "project-4",
    //   title: "[Other project]",
    //   description: "TODO: Secondary project (more work).",
    //   type: "tool",
    //   technologies: ["Node.js", "TypeScript"],
    //   image: {
    //     src: "/projects/project-placeholder-4.svg",
    //     alt: "Project 4 image (placeholder)",
    //   },
    //   links: {
    //     repo: { label: "Repo", href: undefined, private: true },
    //     code: { label: "View code", href: undefined, private: true },
    //   },
    //   featured: false,
    // },
  ],
};

export function getFeaturedProjects(locale: Locale) {
  return projects[locale].filter((p) => p.featured);
}

export function getMoreProjects(locale: Locale) {
  return projects[locale].filter((p) => !p.featured);
}
