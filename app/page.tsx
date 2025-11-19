import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import FeaturedTemplatesSection from '@/components/sections/FeaturedTemplatesSection';
import PricingCTA from '@/components/sections/PricingCTA';
import CTASection from '@/components/sections/CTASection';
import { getSiteContent, getFeaturedTemplates } from '@/lib/data';

export default function Home() {
  const content = getSiteContent();
  const featuredTemplates = getFeaturedTemplates(3);

  return (
    <>
      <HeroSection content={content.hero} />
      <StatsSection />
      <FeaturedTemplatesSection templates={featuredTemplates} />
      <PricingCTA />
      <CTASection />
    </>
  );
}
