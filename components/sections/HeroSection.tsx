import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { HeroContent } from '@/types';

interface HeroSectionProps {
  content: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-yellow-50 to-white py-24 md:py-32 lg:py-40">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Simple Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-yellow-50 border border-yellow-200 text-gray-900 text-sm font-medium">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span>בחר טמפלייט או עצב משהו משלך</span>
          </div>

          {/* Clean Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-gray-900">
            {content.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 text-gray-700">
            {content.subtitle}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            {content.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button href="/templates" size="lg">
              {content.primaryCTA}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              {content.secondaryCTA}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>תמיכה מלאה</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
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
