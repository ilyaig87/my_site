import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import FeaturedTemplatesSection from '@/components/sections/FeaturedTemplatesSection';
import PricingSection from '@/components/sections/PricingSection';
import ContactSection from '@/components/sections/ContactSection';
import { getSiteContent, getFeaturedTemplates } from '@/lib/data';

export default function Home() {
  const content = getSiteContent();
  const featuredTemplates = getFeaturedTemplates(3);

  return (
    <>
      <HeroSection content={content.hero} />
      <ServicesSection />
      <ProjectsSection />
      <FeaturedTemplatesSection templates={featuredTemplates} />
      <PricingSection />
      <ContactSection />
    </>
  );
}
