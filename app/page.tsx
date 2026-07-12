import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FeaturedTemplatesSection from '@/components/sections/FeaturedTemplatesSection';
import PricingTeaser from '@/components/sections/PricingTeaser';
import ContactTeaser from '@/components/sections/ContactTeaser';
import { getSiteContent, getFeaturedTemplates } from '@/lib/data';
import type { Metadata } from 'next';

// hreflang: tell Google the Russian landing page is the ru-language
// alternate of the homepage (and vice versa, declared in app/ru/page.tsx).
export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { he: '/', ru: '/ru' } },
};

export default function Home() {
  const content = getSiteContent();
  const featuredTemplates = getFeaturedTemplates(3);

  return (
    <div className="home-sections">
      <HeroSection content={content.hero} />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FeaturedTemplatesSection templates={featuredTemplates} />
      <PricingTeaser />
      <ContactTeaser />
    </div>
  );
}
