import type { Locale, SkillCategory } from "@/lib/types";

type LocalizedSkills = Record<Locale, SkillCategory[]>;

export const skills: LocalizedSkills = {
  es: [
    {
      id: "frontend",
      title: "Front-end",
      items: [
        { label: "JavaScript", icon: "js" },
        { label: "React.js", icon: "react" },
        { label: "Next.js", icon: "next" },
        { label: "Astro", icon: "astro" },
        { label: "HTML", icon: "html" },
        { label: "CSS", icon: "css" },
        { label: "SCSS", icon: "scss" },
        { label: "Tailwind CSS", icon: "tailwind" },
        { label: "SEO", icon: "seo" },
      ],
    },
    {
      id: "backend",
      title: "Back-end",
      items: [
        { label: "Node.js", icon: "node" },
        { label: "REST API", icon: "link" },
      ],
    },
    {
      id: "db",
      title: "DB",
      items: [
        { label: "MySQL", icon: "mysql" },
        { label: "MongoDB", icon: "mongodb" },
        { label: "Firebase", icon: "firebase" },
      ],
    },
    {
      id: "cloud_tools",
      title: "Cloud & Platforms",
      items: [
        { label: "AWS", icon: "aws" },
        { label: "Google Cloud", icon: "gcp" },
        { label: "Firebase", icon: "firebase" },
        { label: "Salesforce", icon: "salesforce" },
        { label: "Veeva", icon: "veeva" },
      ],
    },
    {
      id: "testing",
      title: "Testing",
      items: [
        { label: "Testing automatizado", icon: "cat-testing" },
        { label: "Jest", icon: "jest" },
      ],
    },
    {
      id: "methodologies",
      title: "Metodologías & Soft Skills",
      items: [
        { label: "Agile", icon: "cat-methods" },
        { label: "Scrum", icon: "cat-methods" },
        { label: "Kanban", icon: "cat-methods" },
        { label: "Clean Code", icon: "cat-methods" },
        { label: "Team Work", icon: "cat-methods" },
      ],
    },
    {
      id: "devops",
      title: "Control de versiones, CI/CD y despliegue",
      items: [
        { label: "GitLab", icon: "gitlab" },
        { label: "Git", icon: "git" },
        { label: "GitHub", icon: "github" },
        { label: "Vercel", icon: "vercel" },
      ],
    },
  ],
  en: [
    {
      id: "frontend",
      title: "Front-end",
      items: [
        { label: "JavaScript", icon: "js" },
        { label: "React.js", icon: "react" },
        { label: "Next.js", icon: "next" },
        { label: "Astro", icon: "astro" },
        { label: "HTML", icon: "html" },
        { label: "CSS", icon: "css" },
        { label: "SCSS", icon: "scss" },
        { label: "Tailwind CSS", icon: "tailwind" },
        { label: "SEO", icon: "seo" },
      ],
    },
    {
      id: "backend",
      title: "Back-end",
      items: [
        { label: "Node.js", icon: "node" },
        { label: "REST API", icon: "link" },
      ],
    },
    {
      id: "db",
      title: "DB",
      items: [
        { label: "MySQL", icon: "mysql" },
        { label: "MongoDB", icon: "mongodb" },
        { label: "Firebase", icon: "firebase" },
      ],
    },
    {
      id: "cloud_tools",
      title: "Cloud & Platforms",
      items: [
        { label: "AWS", icon: "aws" },
        { label: "Google Cloud", icon: "gcp" },
        { label: "Firebase", icon: "firebase" },
        { label: "Salesforce", icon: "salesforce" },
        { label: "Veeva", icon: "veeva" },
      ],
    },
    {
      id: "testing",
      title: "Testing",
      items: [
        { label: "Automated testing", icon: "cat-testing" },
        { label: "Jest", icon: "jest" },
      ],
    },
    {
      id: "methodologies",
      title: "Methodologies & Soft Skills",
      items: [
        { label: "Agile", icon: "cat-methods" },
        { label: "Scrum", icon: "cat-methods" },
        { label: "Kanban", icon: "cat-methods" },
        { label: "Clean Code", icon: "cat-methods" },
        { label: "Team Work", icon: "cat-methods" },
      ],
    },
    {
      id: "devops",
      title: "Version Control, CI/CD & Deploy",
      items: [
        { label: "GitLab", icon: "gitlab" },
        { label: "Git", icon: "git" },
        { label: "GitHub", icon: "github" },
        { label: "Vercel", icon: "vercel" },
      ],
    },
  ],
};
