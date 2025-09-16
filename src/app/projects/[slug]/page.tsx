import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { projectDetails } from "@/data/projects";

import type { ProjectDetail } from "@/data/projects";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projectDetails.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projectDetails.find((entry) => entry.slug === params.slug);

  if (!project) {
    return {
      title: "Project | Juan Diego Rivero Tirado",
      description: "Case study from the portfolio of Juan Diego Rivero Tirado.",
    };
  }

  return {
    title: `${project.title.en} | Juan Diego Rivero Tirado`,
    description: project.description.en,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectDetails.find((entry) => entry.slug === params.slug);

  if (!project) {
    notFound();
  }

  const otherProjects: ProjectDetail[] = projectDetails.filter(
    (entry) => entry.slug !== project.slug
  );

  return <ProjectCaseStudy project={project} otherProjects={otherProjects} />;
}
