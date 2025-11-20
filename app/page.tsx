import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturedTemplatesSection from '@/components/sections/FeaturedTemplatesSection';
import PricingSection from '@/components/sections/PricingSection';
import PricingCTA from '@/components/sections/PricingCTA';
import CTASection from '@/components/sections/CTASection';
import ContactSection from '@/components/sections/ContactSection';
import { getSiteContent, getFeaturedTemplates } from '@/lib/data';

export default function Home() {
  const content = getSiteContent();
  const featuredTemplates = getFeaturedTemplates(3);

  return (
    <>
      <HeroSection content={content.hero} />
      <StatsSection />
      <ServicesSection />
      <FeaturedTemplatesSection templates={featuredTemplates} />
      <PricingSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
