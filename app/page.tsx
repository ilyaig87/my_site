import HeroSection from '@/components/sections/HeroSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import FeaturedTemplatesSection from '@/components/sections/FeaturedTemplatesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CTASection from '@/components/sections/CTASection';
import { getSiteContent, getFeaturedTemplates } from '@/lib/data';

export default function Home() {
  const content = getSiteContent();
  const featuredTemplates = getFeaturedTemplates(3);

  return (
    <>
      <HeroSection content={content.hero} />
      <BenefitsSection benefits={content.whyChooseMe} />
      <FeaturedTemplatesSection templates={featuredTemplates} />
      <ProcessSection steps={content.process} />
      <CTASection />
    </>
  );
}
