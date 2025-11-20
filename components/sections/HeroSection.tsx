import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { HeroContent } from '@/types';

interface HeroSectionProps {
  content: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-yellow-50 to-white py-6 md:py-8">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Simple Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-2 rounded-full bg-yellow-50 border border-yellow-200 text-gray-900 text-[10px] font-medium">
            <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
            <span>בחר טמפלייט או עצב משהו משלך</span>
          </div>

          {/* Clean Title */}
          <h1 className="text-2xl md:text-3xl font-black mb-2 leading-tight text-gray-900">
            {content.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg font-bold mb-2 text-gray-700">
            {content.subtitle}
          </p>

          {/* Description */}
          <p className="text-xs md:text-sm text-gray-600 mb-4 leading-relaxed max-w-2xl mx-auto">
            {content.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-2 mb-4 mx-auto w-fit">
            <Button href="/templates" size="lg">
              {content.primaryCTA}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              {content.secondaryCTA}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-[10px]">
              <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>תמיכה מלאה</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>העלאה מהירה</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
