import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { getSiteContent } from "@/lib/siteContent";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <HeroSection />
      <AboutSection data={content.about} />
      <ExperienceSection data={content.experience} />
      <FeaturedProjectsSection />
      <SkillsSection data={content.skills} />
      <ContactCtaSection />
    </>
  );
}
