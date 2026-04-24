import { AboutPageContent } from "@/app/about/AboutPageContent";
import { getSiteContent } from "@/lib/siteContent";

export default async function AboutPage() {
  const content = await getSiteContent();
  return <AboutPageContent about={content.about} />;
}
