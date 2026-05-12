import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import FeaturedTemplatesSection from '@/components/sections/FeaturedTemplatesSection';
import PricingTeaser from '@/components/sections/PricingTeaser';
import ContactTeaser from '@/components/sections/ContactTeaser';
import { getSiteContent, getFeaturedTemplates } from '@/lib/data';

export default function Home() {
  const content = getSiteContent();
  const featuredTemplates = getFeaturedTemplates(3);

  return (
    <div className="home-sections">
      <HeroSection content={content.hero} />
      <ServicesSection />
      <ProjectsSection />
      <FeaturedTemplatesSection templates={featuredTemplates} />
      <PricingTeaser />
      <ContactTeaser />
    </div>
  );
}
