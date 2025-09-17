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
  previewImage: string;
  previewAlt: Localized<string>;
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
  ctaHref: string;
  ctaLabel: Localized<string>;
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "ecommerce-minimalista",
    accent: "from-sky-400/40 via-cyan-400/25 to-emerald-400/20",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "DummyJSON API"],
    previewTitle: {
      en: "Live catalogue",
      es: "Catalogo en vivo",
    },
    previewSubtitle: {
      en: "Powered by DummyJSON API",
      es: "Impulsado por DummyJSON API",
    },
    previewImage: "/projects/ecommerce-preview.svg",
    previewAlt: {
      en: "Overview preview of the minimalist ecommerce experience",
      es: "Vista general de la experiencia ecommerce minimalista",
    },
    title: {
      en: "Minimalist Ecommerce Experience",
      es: "Experiencia Ecommerce Minimalista",
    },
    description: {
      en: "Responsive storefront that consumes DummyJSON to showcase filters, pagination, product detail modals, and a playful checkout simulator.",
      es: "Tienda responsive que consume DummyJSON para mostrar filtros, paginacion, modales de detalle y un checkout simulado.",
    },
    heroHeadline: {
      en: "Shopping flow designed for clarity",
      es: "Flujo de compra disenado para la claridad",
    },
    heroSubheadline: {
      en: "From catalogue to checkout, the UI adapts to light and dark surfaces while keeping interactions immediate and friendly on any device.",
      es: "Del catalogo al checkout, la UI se adapta a modo claro y oscuro mientras mantiene interacciones inmediatas y amigables en cualquier dispositivo.",
    },
    timeline: {
      en: "One week product exploration",
      es: "Exploracion de producto de una semana",
    },
    role: {
      en: "Front-end developer",
      es: "Desarrollador front-end",
    },
    overview: {
      en: "Built a feature-rich ecommerce proof of concept that consumes the DummyJSON products endpoint, adding client side filtering, pagination, and a cart summary synced with a responsive layout.",
      es: "Construido un proof of concept ecommerce que consume el endpoint de productos de DummyJSON, agregando filtros en cliente, paginacion y un resumen de carrito sincronizado con un layout responsive.",
    },
    challenges: {
      en: [
        "Expose more than one hundred catalogue items without additional roundtrips or layout shifts.",
        "Keep product discovery fast with combined search, category, and price filters.",
        "Support a modal detail view, sticky cart, and theme switcher while staying accessible.",
      ],
      es: [
        "Exponer mas de cien items de catalogo sin viajes extra ni saltos de layout.",
        "Mantener el descubrimiento rapido con filtros combinados de busqueda, categoria y precio.",
        "Soportar un modal de detalle, carrito fijo y cambio de tema sin perder accesibilidad.",
      ],
    },
    solutions: {
      en: [
        "Implemented shared client state for search, category, and numeric price range with persistence on reset.",
        "Added request level pagination and UI controls that slice the in-memory list into twelve item pages.",
        "Centralized theme management with a reusable toggle and context that powers both the portfolio home and project page.",
      ],
      es: [
        "Implemente estado compartido en cliente para busqueda, categoria y rango de precios con reinicio controlado.",
        "Agregue paginacion en la UI para seccionar la lista en paginas de doce items.",
        "Centralice la gestion de tema con un toggle reutilizable y contexto que alimenta el home y la pagina del proyecto.",
      ],
    },
    outcomes: {
      en: [
        "Interactive filters respond in under 50ms on modern devices.",
        "Light and dark themes stay consistent across project and portfolio shells.",
        "Reusable card, cart, and modal patterns speed up future case-study builds.",
      ],
      es: [
        "Los filtros interactivos responden en menos de 50ms en dispositivos modernos.",
        "Los temas claro y oscuro se mantienen consistentes en el proyecto y el portafolio.",
        "Los patrones reutilizables de card, carrito y modal aceleran futuros case studies.",
      ],
    },
    metrics: [
      {
        label: { en: "Products rendered", es: "Productos renderizados" },
        value: "100 API items",
      },
      {
        label: { en: "Filter latency", es: "Latencia de filtros" },
        value: "<50ms",
      },
      {
        label: { en: "Supported themes", es: "Temas soportados" },
        value: "Light & Dark",
      },
    ],
    highlights: [
      {
        title: {
          en: "Filter playground",
          es: "Zona de filtros",
        },
        body: {
          en: "Search, category, and price sliders combine to keep browsing focused without extra fetches.",
          es: "Busqueda, categoria y rangos de precio se combinan para mantener la exploracion enfocada sin peticiones extra.",
        },
      },
      {
        title: {
          en: "Cart simulation",
          es: "Simulacion de carrito",
        },
        body: {
          en: "Sticky cart, quantity controls, and a friendly checkout toast simulate an end to end flow.",
          es: "Carrito fijo, control de cantidades y un toast amistoso simulan un flujo de compra completo.",
        },
      },
    ],
    ctaHref: "/Proyects/Ecommerce",
    ctaLabel: {
      en: "Visit project",
      es: "Ver proyecto",
    },
  },
];

