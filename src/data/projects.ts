import type { Language } from "@/types/language";

type Localized<T> = Record<Language, T>;

export type ProjectMetric = {
  label: Localized<string>;
  value: string;
};

export type ProjectHighlight = {
  title: Localized<string>;
  body: Localized<string>;
};

export type ProjectDetail = {
  slug: string;
  accent: string;
  technologies: string[];
  previewTitle: Localized<string>;
  previewSubtitle: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  heroHeadline: Localized<string>;
  heroSubheadline: Localized<string>;
  timeline: Localized<string>;
  role: Localized<string>;
  overview: Localized<string>;
  challenges: Localized<string[]>;
  solutions: Localized<string[]>;
  outcomes: Localized<string[]>;
  metrics: ProjectMetric[];
  highlights: ProjectHighlight[];
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "immersive-analytics",
    accent: "from-cyan-400/40 via-blue-500/30 to-indigo-600/20",
    technologies: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS"],
    previewTitle: {
      en: "Real-time Pulse",
      es: "Pulso en tiempo real",
    },
    previewSubtitle: {
      en: "Synced with live metrics",
      es: "Sincronizado con metricas en vivo",
    },
    title: {
      en: "Immersive Analytics Dashboard",
      es: "Panel de Analitica Inmersiva",
    },
    description: {
      en: "A data story platform that blends motion, depth, and live insights to help product teams make better decisions in real time.",
      es: "Una plataforma de historias de datos que mezcla movimiento, profundidad y metricas en vivo para ayudar a los equipos de producto a decidir en tiempo real.",
    },
    heroHeadline: {
      en: "Making data stories impossible to ignore",
      es: "Haciendo imposibles de ignorar las historias de datos",
    },
    heroSubheadline: {
      en: "Transforming dense telemetry into a cinematic, decision-ready analytics suite for high-velocity product teams.",
      es: "Transformando telemetria densa en una suite analitica cinematografica lista para decisiones de equipos de producto de alta velocidad.",
    },
    timeline: {
      en: "16-week product initiative",
      es: "Iniciativa de producto de 16 semanas",
    },
    role: {
      en: "Lead Frontend & Experience Designer",
      es: "Lider Front-End y disenador de experiencias",
    },
    overview: {
      en: "Partnered with data scientists to build an executive dashboard that visualizes product health with interactive depth, real-time context, and accessible storytelling.",
      es: "Colabore con cientificos de datos para construir un panel ejecutivo que visualiza la salud del producto con profundidad interactiva, contexto en vivo y narrativa accesible.",
    },
    challenges: {
      en: [
        "Data tables delivered little narrative or prioritization for executives.",
        "The analytics stack produced millions of events per hour, demanding thoughtful performance strategies.",
        "Stakeholders wanted a premium feel without sacrificing accessibility or responsiveness.",
      ],
      es: [
        "Las tablas de datos ofrecian poca narrativa o priorizacion para directivos.",
        "La plataforma analitica generaba millones de eventos por hora, exigiendo estrategias de rendimiento cuidadosas.",
        "Los interesados querian una sensacion premium sin sacrificar accesibilidad ni respuesta.",
      ],
    },
    solutions: {
      en: [
        "Crafted a 3D systems map anchored by WebGL and motion primitives to surface causal relationships between signals.",
        "Implemented streaming data virtualization and skeleton loading states to keep frame rates above 55fps on mid-tier devices.",
        "Built a themable component kit that met WCAG 2.2 AA while preserving the cinematic atmosphere.",
      ],
      es: [
        "Disene un mapa de sistemas 3D apoyado en WebGL y primitivas de movimiento para revelar relaciones causales entre senales.",
        "Implemente virtualizacion de datos en streaming y estados de carga esqueleticos para mantener la tasa de cuadros sobre 55fps en dispositivos medios.",
        "Construimos un kit de componentes tematizable que cumplio con WCAG 2.2 AA sin perder la atmosfera cinematografica.",
      ],
    },
    outcomes: {
      en: [
        "Cut time-to-insight by 37% during weekly readiness reviews.",
        "Increased dashboard adoption to 84% of the product organization within the first release cycle.",
        "Recognized internally with the \"Data Storytelling\" award for experiential impact.",
      ],
      es: [
        "Reducimos el tiempo para obtener insights en 37% durante las revisiones semanales.",
        "Aumentamos la adopcion del panel al 84% de la organizacion de producto en el primer ciclo.",
        "Reconocido internamente con el premio \"Data Storytelling\" por su impacto experiencial.",
      ],
    },
    metrics: [
      {
        label: { en: "Latency", es: "Latencia" },
        value: "<120ms",
      },
      {
        label: { en: "FPS", es: "FPS" },
        value: "60fps steady",
      },
      {
        label: { en: "Teams onboarded", es: "Equipos incorporados" },
        value: "7 squads",
      },
    ],
    highlights: [
      {
        title: {
          en: "Immersive systems map",
          es: "Mapa de sistemas inmersivo",
        },
        body: {
          en: "A spatial overview reveals service dependencies with interactive heat trails fed by live telemetry streams.",
          es: "Una vista espacial revela dependencias de servicios con rastros interactivos alimentados por telemetria en vivo.",
        },
      },
      {
        title: {
          en: "Narrative snapshots",
          es: "Instantaneas narrativas",
        },
        body: {
          en: "Curated story beats translate complex trends into executive-ready insights with motion-driven emphasis.",
          es: "Momentos narrativos curados convierten tendencias complejas en insights listos para directivos con enfasis guiado por movimiento.",
        },
      },
    ],
  },
  {
    slug: "neon-commerce-lab",
    accent: "from-pink-500/40 via-fuchsia-500/30 to-purple-600/20",
    technologies: ["Next.js", "Framer Motion", "Stripe", "Tailwind CSS"],
    previewTitle: {
      en: "Dynamic Lighting",
      es: "Iluminacion dinamica",
    },
    previewSubtitle: {
      en: "Personalized product views",
      es: "Vistas de producto personalizadas",
    },
    title: {
      en: "Neon Commerce Lab",
      es: "Laboratorio de Comercio Neon",
    },
    description: {
      en: "An experimental storefront with ambient lighting, custom 3D product configurators, and adaptive micro-interactions across devices.",
      es: "Una tienda experimental con iluminacion ambiental, configuradores 3D a medida y microinteracciones adaptativas en cada dispositivo.",
    },
    heroHeadline: {
      en: "Turning shopping into a cinematic playground",
      es: "Convirtiendo las compras en un escenario cinematografico",
    },
    heroSubheadline: {
      en: "Reimagining e-commerce with reactive lighting, tactile feedback, and an adaptive checkout pipeline built for conversion.",
      es: "Reimaginando el e-commerce con iluminacion reactiva, retroalimentacion tactil y un checkout adaptable pensado para convertir.",
    },
    timeline: {
      en: "12-week immersive prototype",
      es: "Prototipo inmersivo de 12 semanas",
    },
    role: {
      en: "Senior Frontend Engineer",
      es: "Ingeniero Front-End senior",
    },
    overview: {
      en: "Designed and delivered a retail experience lab for a consumer electronics brand exploring high-fidelity product storytelling on the web.",
      es: "Disene y entregue un laboratorio de experiencia retail para una marca de electronica que explora historias de producto de alta fidelidad en la web.",
    },
    challenges: {
      en: [
        "Static product pages failed to communicate premium craftsmanship.",
        "Checkout abandonment hovered above 70% on mobile.",
        "Marketing needed modular landing configurations to support weekly drops.",
      ],
    
      es: [
        "Las paginas estaticas no comunicaban la manufactura premium.",
        "El abandono del checkout superaba el 70% en mobile.",
        "Marketing necesitaba configuraciones modulares para soportar lanzamientos semanales.",
      ],
    },
    solutions: {
      en: [
        "Built a lighting engine that responds to cursor and scroll positions, simulating showroom reflections on materials.",
        "Redesigned checkout with an adaptive, thumb-friendly flow that maintains context while syncing with Stripe in the background.",
        "Created a drag-and-drop layout composer that maps editorial blocks to headless CMS entries in seconds.",
      ],
      es: [
        "Construimos un motor de iluminacion que responde al cursor y al scroll, simulando reflejos de sala de exhibicion sobre los materiales.",
        "Redisenamos el checkout con un flujo adaptable y amigable para el pulgar que mantiene el contexto mientras se sincroniza con Stripe en segundo plano.",
        "Creamos un compositor de layouts drag-and-drop que asigna bloques editoriales al CMS headless en segundos.",
      ],
    },
    outcomes: {
      en: [
        "Raised conversion on hero product lines by 28% in controlled testing.",
        "Reduced checkout time by 42% on mobile thanks to anticipatory inputs and biometric payments.",
        "Gave the marketing team a no-code configuration panel to launch campaigns twice as fast.",
      ],
      es: [
        "Incrementamos la conversion en las lineas principales de producto en 28% durante pruebas controladas.",
        "Reducimos el tiempo de checkout en 42% en mobile gracias a entradas anticipadas y pagos biometricos.",
        "Entregamos al equipo de marketing un panel sin codigo para lanzar campañas el doble de rapido.",
      ],
    },
    metrics: [
      {
        label: { en: "Conversion lift", es: "Incremento de conversion" },
        value: "+28%",
      },
      {
        label: { en: "Checkout time", es: "Tiempo de checkout" },
        value: "-42%",
      },
      {
        label: { en: "New layouts", es: "Nuevos layouts" },
        value: "14 weekly",
      },
    ],
    highlights: [
      {
        title: {
          en: "Ambient mood engine",
          es: "Motor de ambiente",
        },
        body: {
          en: "Neon gradients mirror product finishes and respond to user gestures for an immersive browsing feel.",
          es: "Gradientes neon reflejan los acabados del producto y responden a los gestos del usuario para una navegacion inmersiva.",
        },
      },
      {
        title: {
          en: "Adaptive checkout",
          es: "Checkout adaptable",
        },
        body: {
          en: "Contextual micro-interactions anticipate input focus and reduce friction on small screens.",
          es: "Microinteracciones contextuales anticipan el foco y reducen friccion en pantallas pequenas.",
        },
      },
    ],
  },
  {
    slug: "orion-design-system",
    accent: "from-amber-400/40 via-orange-500/30 to-rose-500/20",
    technologies: ["TypeScript", "Storybook", "Radix UI", "Tailwind CSS"],
    previewTitle: {
      en: "Design Tokens",
      es: "Tokens de diseno",
    },
    previewSubtitle: {
      en: "Versioned for every platform",
      es: "Versionados para cada plataforma",
    },
    title: {
      en: "Orion Design System",
      es: "Sistema de Diseno Orion",
    },
    description: {
      en: "A scalable interface kit with motion blueprints, accessibility guardrails, and a visual playground for cross-team collaboration.",
      es: "Un kit de interfaces escalable con planos de movimiento, guias de accesibilidad y un espacio visual para la colaboracion entre equipos.",
    },
    heroHeadline: {
      en: "A design system built for momentum",
      es: "Un sistema de diseno creado para el impulso",
    },
    heroSubheadline: {
      en: "Aligning product, brand, and engineering with a modular design system that evolves alongside ambitious releases.",
      es: "Alineando producto, marca e ingenieria con un sistema de diseno modular que evoluciona junto a lanzamientos ambiciosos.",
    },
    timeline: {
      en: "20-week multi-platform rollout",
      es: "Despliegue multiplataforma de 20 semanas",
    },
    role: {
      en: "Design Systems Engineer",
      es: "Ingeniero de sistemas de diseno",
    },
    overview: {
      en: "Developed a unified component library and documentation ecosystem powering marketing, product, and internal tooling teams.",
      es: "Desarrolle una biblioteca de componentes unificada y un ecosistema de documentacion para marketing, producto y herramientas internas.",
    },
    challenges: {
      en: [
        "Competing design languages created fragmentation across the portfolio.",
        "Release velocity suffered from duplicated effort and inconsistent accessibility standards.",
        "Stakeholders required guardrails without limiting experimentation.",
      ],
      es: [
        "Lenguajes de diseno en competencia generaban fragmentacion en el portafolio.",
        "La velocidad de lanzamiento sufria por esfuerzos duplicados y estandares de accesibilidad inconsistentes.",
        "Los interesados necesitaban barandillas sin limitar la experimentacion.",
      ],
    },
    solutions: {
      en: [
        "Shipped a cross-framework token pipeline with automated regression snapshots for color, motion, and typography.",
        "Established accessibility contracts validated through GitHub Actions and Storybook a11y reports.",
        "Introduced a playground for designers to remix patterns while staying within the guardrails.",
      ],
      es: [
        "Entregamos un pipeline de tokens multi framework con capturas de regresion automatizadas para color, movimiento y tipografia.",
        "Establecimos contratos de accesibilidad validados con GitHub Actions y reportes a11y de Storybook.",
        "Introducimos un playground para que los disenadores mezclen patrones manteniendose dentro de las barandillas.",
      ],
    },
    outcomes: {
      en: [
        "Accelerated feature delivery by 35% across supported teams.",
        "Improved accessibility audit pass rates from 62% to 96%.",
        "Unified branding across 9 digital properties within one quarter.",
      ],
      es: [
        "Aceleramos la entrega de funcionalidades en 35% entre los equipos soportados.",
        "Mejoramos las auditorias de accesibilidad de 62% a 96%.",
        "Unificamos la marca en 9 propiedades digitales en un trimestre.",
      ],
    },
    metrics: [
      {
        label: { en: "Release velocity", es: "Velocidad de lanzamiento" },
        value: "+35%",
      },
      {
        label: { en: "Audit pass", es: "Exito en auditoria" },
        value: "96%",
      },
      {
        label: { en: "Teams served", es: "Equipos atendidos" },
        value: "9 squads",
      },
    ],
    highlights: [
      {
        title: {
          en: "Token pipeline",
          es: "Pipeline de tokens",
        },
        body: {
          en: "Single source of truth publishes tokens to web, iOS, and Android with semantic fallbacks.",
          es: "Una unica fuente publica tokens a web, iOS y Android con respaldos semanticos.",
        },
      },
      {
        title: {
          en: "Living documentation",
          es: "Documentacion viva",
        },
        body: {
          en: "Interactive guidelines stitched into Storybook keep design and engineering aligned with real usage data.",
          es: "Guia interactiva integrada en Storybook mantiene diseno e ingenieria alineados con datos de uso reales.",
        },
      },
    ],
  },
];
