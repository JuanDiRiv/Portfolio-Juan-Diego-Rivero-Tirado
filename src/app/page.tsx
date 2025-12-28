import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjectsSection />
      <SkillsSection />
      <ContactCtaSection />
    </main>
  );
}
