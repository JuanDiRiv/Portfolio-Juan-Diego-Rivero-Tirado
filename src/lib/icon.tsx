import type { ComponentType, SVGProps } from "react";

import {
    FiExternalLink,
    FiCopy,
    FiSun,
    FiMoon,
    FiGlobe,
    FiCode,
    FiDatabase,
    FiCloud,
    FiCheckCircle,
    FiLayers,
    FiGitBranch,
    FiLink,
    FiUsers,
    FiSearch,
} from "react-icons/fi";

import {
    SiJavascript,
    SiReact,
    SiNextdotjs,
    SiAstro,
    SiHtml5,
    SiCss3,
    SiSass,
    SiTailwindcss,
    SiNodedotjs,
    SiMysql,
    SiMongodb,
    SiFirebase,
    SiAmazon,
    SiGooglecloud,
    SiSalesforce,
    SiJest,
    SiGit,
    SiGithub,
    SiGitlab,
    SiVercel,
} from "react-icons/si";

export type IconKey =
    | "theme-light"
    | "theme-dark"
    | "globe"
    | "copy"
    | "external"
    | "search"
    | "link"
    | "github"
    | "linkedin"
    | "cat-frontend"
    | "cat-backend"
    | "cat-db"
    | "cat-cloud"
    | "cat-testing"
    | "cat-methods"
    | "cat-devops"
    | "js"
    | "react"
    | "next"
    | "astro"
    | "html"
    | "css"
    | "scss"
    | "tailwind"
    | "seo"
    | "node"
    | "mysql"
    | "mongodb"
    | "firebase"
    | "aws"
    | "gcp"
    | "salesforce"
    | "veeva"
    | "jest"
    | "git"
    | "gitlab"
    | "vercel";

const LinkedInIcon: ComponentType<SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.4 23.5h4.2V7.9H.4v15.6ZM8.1 7.9h4v2.1h.1c.56-1.06 1.92-2.18 3.95-2.18 4.22 0 5 2.78 5 6.39v9.29h-4.2v-8.24c0-1.96-.04-4.48-2.73-4.48-2.73 0-3.15 2.13-3.15 4.34v8.38H8.1V7.9Z" />
    </svg>
);

const registry: Record<IconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
    "theme-light": FiSun,
    "theme-dark": FiMoon,
    globe: FiGlobe,
    copy: FiCopy,
    external: FiExternalLink,
    search: FiSearch,
    link: FiLink,

    github: SiGithub,
    linkedin: LinkedInIcon,

    "cat-frontend": FiCode,
    "cat-backend": FiLayers,
    "cat-db": FiDatabase,
    "cat-cloud": FiCloud,
    "cat-testing": FiCheckCircle,
    "cat-methods": FiUsers,
    "cat-devops": FiGitBranch,

    js: SiJavascript,
    react: SiReact,
    next: SiNextdotjs,
    astro: SiAstro,
    html: SiHtml5,
    css: SiCss3,
    scss: SiSass,
    tailwind: SiTailwindcss,
    seo: FiSearch,

    node: SiNodedotjs,

    mysql: SiMysql,
    mongodb: SiMongodb,
    firebase: SiFirebase,

    aws: SiAmazon,
    gcp: SiGooglecloud,
    salesforce: SiSalesforce,
    veeva: FiLink,

    jest: SiJest,

    git: SiGit,
    gitlab: SiGitlab,
    vercel: SiVercel,
};

export function Icon({
    name,
    className,
    "aria-hidden": ariaHidden = true,
}: {
    name: IconKey;
    className?: string;
    "aria-hidden"?: boolean;
}) {
    const Comp = registry[name];
    return <Comp className={className} aria-hidden={ariaHidden} focusable="false" />;
}
