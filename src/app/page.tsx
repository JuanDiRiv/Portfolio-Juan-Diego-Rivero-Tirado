import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <FeaturedProjectsSection />
      <SkillsSection />
      <ContactCtaSection />
    </>
  );
}
