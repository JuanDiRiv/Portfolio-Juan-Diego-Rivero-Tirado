import { createElement, type ComponentType, type SVGProps } from "react";

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
    FiCpu,
    FiSmartphone,
    FiShield,
    FiTerminal,
    FiBox,
    FiTool,
    FiServer,
    FiActivity,
    FiEdit2,
} from "react-icons/fi";

import {
    SiJavascript,
    SiTypescript,
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
    SiCypress,
    SiGit,
    SiGithub,
    SiGitlab,
    SiVercel,
    SiOpenai,
    SiAnthropic,
    SiClaude,
    SiGithubcopilot,
    SiPerplexity,
    SiHuggingface,
    SiGooglegemini,
    SiLangchain,
    SiAuth0,
    SiObsidian,
    SiMaterialdesign,
    SiVeed,
    SiPython,
    SiDjango,
    SiFlask,
    SiFastapi,
    SiDocker,
    SiKubernetes,
    SiNginx,
    SiPostgresql,
    SiRedis,
    SiSqlite,
    SiGraphql,
    SiPrisma,
    SiSupabase,
    SiVuedotjs,
    SiAngular,
    SiSvelte,
    SiNuxtdotjs,
    SiExpress,
    SiNestjs,
    SiJira,
    SiNotion,
    SiSlack,
    SiFigma,
    SiLinux,
    SiUbuntu,
    SiApple,
    SiGo,
    SiRust,
    SiKotlin,
    SiSwift,
    SiCplusplus,
    SiC,
    SiPhp,
    SiRuby,
    SiRubyonrails,
    SiSpring,
    SiDotnet,
    SiRedux,
    SiStorybook,
    SiWebpack,
    SiVite,
    SiBabel,
    SiEslint,
    SiPrettier,
    SiBootstrap,
    SiMui,
    SiChakraui,
    SiRadixui,
    SiShadcnui,
    SiFramer,
    SiThreedotjs,
    SiD3Dotjs,
    SiSelenium,
    SiVitest,
    SiPostman,
    SiInsomnia,
    SiSwagger,
    SiTrello,
    SiConfluence,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiAdobexd,
    SiCanva,
    SiTensorflow,
    SiPytorch,
    SiPandas,
    SiNumpy,
    SiScikitlearn,
    SiJupyter,
    SiKaggle,
    SiOpencv,
    SiKeras,
    SiAndroid,
    SiIos,
    SiFlutter,
    SiDart,
    SiExpo,
    SiCloudflare,
    SiHeroku,
    SiNetlify,
    SiDigitalocean,
    SiRender,
    SiBitbucket,
    SiCircleci,
    SiTravisci,
    SiJenkins,
    SiGithubactions,
    SiTerraform,
    SiAnsible,
    SiPrometheus,
    SiGrafana,
    SiElasticsearch,
    SiKibana,
    SiApachekafka,
    SiRabbitmq,
    SiStripe,
    SiPaypal,
    SiTwilio,
    SiSendgrid,
    SiVeeam,
} from "react-icons/si";

// ---------- Static / canonical icon keys (used across the app for autocomplete) ----------
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
    | "cat-ai"
    | "cat-mobile"
    | "cat-design"
    | "cat-security"
    | "cat-data"
    // Legacy short aliases kept for the curated tech-stack list
    | "js"
    | "typescript"
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
    | "cypress"
    | "git"
    | "gitlab"
    | "vercel";

const LinkedInIcon: ComponentType<SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.4 23.5h4.2V7.9H.4v15.6ZM8.1 7.9h4v2.1h.1c.56-1.06 1.92-2.18 3.95-2.18 4.22 0 5 2.78 5 6.39v9.29h-4.2v-8.24c0-1.96-.04-4.48-2.73-4.48-2.73 0-3.15 2.13-3.15 4.34v8.38H8.1V7.9Z" />
    </svg>
);

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

// ---------- Curated short-key registry (kept for existing static callsites) ----------
const shortRegistry: Record<IconKey, IconComp> = {
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
    "cat-ai": FiCpu,
    "cat-mobile": FiSmartphone,
    "cat-design": FiEdit2,
    "cat-security": FiShield,
    "cat-data": FiActivity,

    js: SiJavascript,
    typescript: SiTypescript,
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
    veeva: SiVeeam,

    jest: SiJest,
    cypress: SiCypress,

    git: SiGit,
    gitlab: SiGitlab,
    vercel: SiVercel,
};

// ---------- Extended registry: react-icons by exact name (Si* / Fi*) ----------
// AI extraction returns names from this allow-list. Add more as needed.
const reactIconsRegistry: Record<string, IconComp> = {
    // Si*
    SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiAstro, SiHtml5, SiCss3,
    SiSass, SiTailwindcss, SiNodedotjs, SiMysql, SiMongodb, SiFirebase, SiAmazon,
    SiGooglecloud, SiSalesforce, SiJest, SiCypress, SiGit, SiGithub, SiGitlab,
    SiVercel, SiOpenai, SiAnthropic, SiClaude, SiGithubcopilot, SiPerplexity,
    SiHuggingface, SiGooglegemini, SiLangchain, SiAuth0, SiObsidian,
    SiMaterialdesign, SiVeed, SiPython, SiDjango,
    SiFlask, SiFastapi, SiDocker, SiKubernetes, SiNginx, SiPostgresql, SiRedis,
    SiSqlite, SiGraphql, SiPrisma, SiSupabase, SiVuedotjs, SiAngular, SiSvelte,
    SiNuxtdotjs, SiExpress, SiNestjs, SiJira, SiNotion, SiSlack, SiFigma,
    SiLinux, SiUbuntu, SiApple, SiGo, SiRust, SiKotlin, SiSwift, SiCplusplus,
    SiC, SiPhp, SiRuby, SiRubyonrails, SiSpring, SiDotnet, SiRedux, SiStorybook,
    SiWebpack, SiVite, SiBabel, SiEslint, SiPrettier, SiBootstrap, SiMui,
    SiChakraui, SiRadixui, SiShadcnui, SiFramer, SiThreedotjs, SiD3Dotjs,
    SiPlaywright: FiCheckCircle,
    SiSelenium, SiVitest, SiPostman, SiInsomnia, SiSwagger,
    SiTrello, SiConfluence, SiAdobephotoshop, SiAdobeillustrator, SiAdobexd,
    SiCanva, SiTensorflow, SiPytorch, SiPandas, SiNumpy, SiScikitlearn,
    SiJupyter, SiKaggle, SiOpencv, SiKeras, SiAndroid, SiIos, SiFlutter,
    SiDart, SiExpo, SiCloudflare, SiHeroku, SiNetlify, SiDigitalocean, SiRender,
    SiBitbucket, SiCircleci, SiTravisci, SiJenkins, SiGithubactions,
    SiTerraform, SiAnsible, SiPrometheus, SiGrafana, SiElasticsearch, SiKibana,
    SiApachekafka, SiRabbitmq, SiStripe, SiPaypal, SiTwilio, SiSendgrid,
    SiVeeam,

    // Fi* (generic fallbacks)
    FiCode, FiDatabase, FiCloud, FiCheckCircle, FiLayers, FiGitBranch, FiLink,
    FiUsers, FiSearch, FiCpu, FiSmartphone, FiShield, FiTerminal, FiBox, FiTool,
    FiServer, FiActivity, FiSun, FiMoon, FiGlobe, FiCopy, FiExternalLink,
    FiEdit2,
};

// All react-icons names available to the AI extractor (used in the prompt).
export const ALLOWED_REACT_ICON_NAMES: ReadonlyArray<string> = Object.keys(
    reactIconsRegistry,
);

function resolveIcon(name: string): IconComp | null {
    if (name in shortRegistry) return shortRegistry[name as IconKey];
    if (name in reactIconsRegistry) return reactIconsRegistry[name];
    return null;
}

export function Icon({
    name,
    className,
    "aria-hidden": ariaHidden = true,
}: {
    name: string;
    className?: string;
    "aria-hidden"?: boolean;
}) {
    const Comp = resolveIcon(name) ?? FiBox;
    return createElement(Comp, {
        className,
        "aria-hidden": ariaHidden,
        focusable: "false",
    });
}
