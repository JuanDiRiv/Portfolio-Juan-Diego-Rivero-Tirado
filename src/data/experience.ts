import type { Experience, Locale } from "@/lib/types";

export const experience: Record<Locale, Experience[]> = {
  es: [
    {
      id: "publicis",
      role: "SSR Front-End Engineer Specialist",
      company: "Publicis Groupe (Publicis Global Delivery)",
      location: "Bogota, Colombia",
      startDate: "2023-09",
      endDate: "2025-12",
      description:
        "Entrega de aplicaciones enterprise en React y Next.js para clientes farmaceuticos globales, con foco en SSR, SEO y optimizacion de performance.",
      highlights: [
        "Entregue mas de 30 aplicaciones enterprise en React y Next.js, reduciendo tiempos de carga en 60% y aumentando puntajes de Lighthouse entre 40-60%",
        "Construi design systems y sistemas de UI escalables con Tailwind CSS y Sass, reutilizados en multiples lineas de producto",
        "Automatice flujos front-end y procesos de UI, reduciendo operaciones manuales en 70% y mejorando el time-to-release",
        "Integre soluciones front-end con APIs seguras y servicios en Node.js, garantizando cumplimiento e integridad de datos",
        "Implemente 2 integraciones de datos en tiempo real entre el front-end y Salesforce, mejorando la consistencia de la informacion",
        "Mejore UX, accesibilidad y engagement en aproximadamente 30%, brindando mentoria tecnica y promoviendo estandares de clean code",
      ],
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Sass",
        "Node.js",
        "Salesforce",
      ],
    },
    {
      id: "fr-consulting",
      role: "Front-End Developer",
      company: "F/R Consulting & Training",
      location: "Argentina & Bogota, Colombia",
      startDate: "2023-07",
      endDate: "2023-08",
      description:
        "Desarrollo de interfaces graficas para scripts conversacionales y dashboards interactivos.",
      highlights: [
        "Desarrolle una interfaz grafica para scripts conversacionales usando React.js y Cytoscape.js, permitiendo la creacion y visualizacion de flujos de chatbots",
        "Implemente librerias de visualizacion de datos para dashboards interactivos, reduciendo el tiempo de analisis para clientes en 40%",
        "Brinde mentoria y talleres sobre React, Next.js y APIs REST, fomentando buenas practicas y acelerando la integracion de nuevos desarrolladores",
      ],
      technologies: [
        "React",
        "Cytoscape.js",
        "Next.js",
        "REST APIs",
        "Data Visualization",
      ],
    },
    {
      id: "san-marco",
      role: "Front-End Developer",
      company: "San Marco CDI",
      location: "Cajica, Colombia",
      startDate: "2022-01",
      endDate: "2023-08",
      description:
        "Migracion y optimizacion del sitio web institucional a Next.js.",
      highlights: [
        "Migre y optimice el sitio web institucional a Next.js, reduciendo los tiempos de carga en 60% y mejorando el posicionamiento SEO y accesibilidad",
      ],
      technologies: ["Next.js", "React", "CSS", "SEO"],
    },
    {
      id: "digital-house",
      role: "Full-Stack Developer",
      company: "Digital House",
      location: "Argentina",
      startDate: "2021-08",
      endDate: "2023-07",
      description:
        "Desarrollo de aplicaciones web full-stack priorizando arquitectura front-end y UX.",
      highlights: [
        "Desarrolle aplicaciones web utilizando React, Node.js y MongoDB, priorizando arquitectura front-end y UX",
        "Construi una billetera digital con Next.js y servicios cloud, soportando pagos y transferencias",
        "Cree una plataforma de reservas hoteleras con React y Java/Spring Boot, implementando testing automatizado con Jest",
        "Gestione repositorios y flujos de CI/CD con GitLab, mejorando la velocidad de entrega en 25%",
      ],
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "Jest",
        "GitLab",
      ],
    },
  ],
  en: [
    {
      id: "publicis",
      role: "SSR Front-End Engineer Specialist",
      company: "Publicis Groupe (Publicis Global Delivery)",
      location: "Bogota, Colombia",
      startDate: "2023-09",
      endDate: "2025-12",
      description:
        "Delivered enterprise applications in React and Next.js for global pharmaceutical clients, leveraging SSR, SEO, and performance optimization.",
      highlights: [
        "Delivered 30+ enterprise applications in React and Next.js, reducing load times by 60% and boosting Lighthouse scores by 40-60%",
        "Built scalable design systems and UI libraries with Tailwind CSS and Sass, reused across multiple product lines",
        "Automated front-end workflows and UI processes, reducing manual operations by 70% and improving time-to-release",
        "Integrated front-end solutions with secure APIs and Node.js services, ensuring compliance and data integrity",
        "Implemented 2 real-time data integrations between the front-end and Salesforce, improving data consistency and UX",
        "Improved UX, accessibility, and engagement by ~30%, while providing technical mentorship and promoting clean code standards",
      ],
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Sass",
        "Node.js",
        "Salesforce",
      ],
    },
    {
      id: "fr-consulting",
      role: "Front-End Developer",
      company: "F/R Consulting & Training",
      location: "Argentina & Bogota, Colombia",
      startDate: "2023-07",
      endDate: "2023-08",
      description:
        "Built graphical interfaces for conversational scripts and interactive dashboards.",
      highlights: [
        "Developed a graphical interface for conversational scripts using React.js and Cytoscape.js, enabling chatbot flow creation and visualization",
        "Implemented data visualization libraries for interactive dashboards, reducing client analysis time by 40%",
        "Provided mentorship and workshops on React, Next.js, and REST APIs, fostering best practices and accelerating new developer onboarding",
      ],
      technologies: [
        "React",
        "Cytoscape.js",
        "Next.js",
        "REST APIs",
        "Data Visualization",
      ],
    },
    {
      id: "san-marco",
      role: "Front-End Developer",
      company: "San Marco CDI",
      location: "Cajica, Colombia",
      startDate: "2022-01",
      endDate: "2023-08",
      description:
        "Migrated and optimized the institutional website to Next.js.",
      highlights: [
        "Migrated and optimized the institutional website to Next.js, reducing load times by 60% and improving SEO ranking and accessibility",
      ],
      technologies: ["Next.js", "React", "CSS", "SEO"],
    },
    {
      id: "digital-house",
      role: "Full-Stack Developer",
      company: "Digital House",
      location: "Argentina",
      startDate: "2021-08",
      endDate: "2023-07",
      description:
        "Built full-stack web applications prioritizing front-end architecture and UX.",
      highlights: [
        "Developed web applications using React, Node.js, and MongoDB, prioritizing front-end architecture and UX",
        "Built a digital wallet with Next.js and cloud services, supporting payments and transfers",
        "Created a hotel booking platform with React and Java/Spring Boot, implementing automated testing with Jest",
        "Managed repositories and CI/CD workflows with GitLab, improving delivery speed by 25%",
      ],
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "Java",
        "Spring Boot",
        "Jest",
        "GitLab",
      ],
    },
  ],
};
