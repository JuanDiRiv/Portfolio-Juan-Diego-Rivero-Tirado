import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturedProjectsSection />
      <SkillsSection />
      <ContactCtaSection />
    </main>
  );
}
