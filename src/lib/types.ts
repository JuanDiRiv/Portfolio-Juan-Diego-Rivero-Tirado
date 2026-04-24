export type Locale = "es" | "en";

export type ProjectLink = {
  label?: string;
  href?: string;
  private?: boolean;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  type?: string;
  technologies: string[];
  image: {
    src: string;
    alt: string;
  };
  links?: {
    demo?: ProjectLink;
    repo?: ProjectLink;
    code?: ProjectLink;
  };
  featured?: boolean;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights: string[];
  technologies: string[];
};

// Built-in canonical category ids. The model may generate additional kebab-case ids
// (e.g. "ai-tools", "design") when the CV introduces a topic not covered here.
export type CanonicalSkillCategoryId =
  | "frontend"
  | "backend"
  | "db"
  | "cloud_tools"
  | "testing"
  | "methodologies"
  | "devops";

export type SkillCategoryId = CanonicalSkillCategoryId | (string & {});

export type SkillItem = {
  label: string;
  // Either a curated short key or a react-icons component name (e.g. "SiOpenai").
  icon?: import("@/lib/icon").IconKey | string;
  // Optional brand color in hex (e.g. "#10A37F"). Used for the chip accent.
  color?: string;
};

export type SkillCategory = {
  id: SkillCategoryId;
  title: string;
  items: SkillItem[];
};

export type AboutFields = {
  summary: string;
  softSkills: string[];
  learningNow: string[];
  hobbies: string[];
};

export type SiteContent = {
  experience: Record<Locale, Experience[]>;
  skills: Record<Locale, SkillCategory[]>;
  about: Record<Locale, AboutFields>;
};

export type SiteContentDocStatus = "draft" | "published";

export type SiteContentDoc = SiteContent & {
  status: SiteContentDocStatus;
  updatedAt: number;
  publishedAt?: number;
  updatedBy?: string;
  sourceFileName?: string;
  model?: string;
};

export type Profile = {
  name: string;
  headline: string;
  email: string;
  location?: string;
  summary: string;
  headshot: {
    src: string;
    alt: string;
  };
  socials: {
    github: string;
    linkedin: string;
    whatsapp: {
      statusMessage: string;
      placeholder: string;
      chatMessage: string;
    };
  };
  cv: {
    es: string;
    en: string;
  };
  softSkills: string[];
  learningNow: string[];
  hobbies: string[];
};

export type I18n = {
  nav: {
    home: string;
    projects: string;
    about: string;
    experience: string;
    contact: string;
    cv: string;
  };
  common: {
    copy: string;
    copied: string;
    download: string;
    emailMe: string;
    viewCv: string;
    viewCode: string;
    github: string;
    linkedin: string;
    private: string;
    theme: string;
    language: string;
  };
  home: {
    featuredProjectsTitle: string;
    skillsTitle: string;
    experienceTitle: string;
    experienceSubtitle: string;
    present: string;
    contactCtaTitle: string;
    contactCtaBody: string;
  };
  projects: {
    title: string;
    subtitle: string;
    filtersTitle: string;
    filterByTech: string;
    filterByType: string;
    clear: string;
    moreProjectsTitle: string;
  };
  about: {
    title: string;
    subtitle: string;
    softSkillsTitle: string;
    learningTitle: string;
    hobbiesTitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailTitle: string;
    socialsTitle: string;
  };
  cv: {
    title: string;
    subtitle: string;
    missingPdf: string;
    openInNewTab: string;
  };
};
