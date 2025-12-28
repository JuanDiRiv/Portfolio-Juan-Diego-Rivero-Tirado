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

export type SkillCategory = {
  id:
    | "frontend"
    | "backend"
    | "db"
    | "cloud_tools"
    | "testing"
    | "methodologies"
    | "devops";
  title: string;
  items: Array<{ label: string; icon?: import("@/lib/icon").IconKey }>;
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
