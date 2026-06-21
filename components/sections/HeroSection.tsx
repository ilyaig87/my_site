import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { HeroContent } from '@/types';

interface HeroSectionProps {
  content: HeroContent;
}

/**
 * Server-rendered hero. The entrance animation is driven by pure CSS
 * (see .animate-fade-* in globals.css) instead of framer-motion, so the
 * LCP <h1> is present and paints immediately in the SSR HTML rather than
 * waiting for the JS bundle to hydrate. The h1 itself starts with no delay
 * to keep LCP as fast as possible; the rest stagger in around it.
 */
export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden hero-beam">
      {/* The signature diagonal beams come from the layout-level SiteBeam,
          which renders on every page. Only the radial vignette stays here
          to anchor the hero text. */}
      <div aria-hidden className="beam-vignette" />

      <Container>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Kicker */}
          <div className="mb-8 animate-fade-down">
            <span className="kicker">Pixelia · Web Studio</span>
          </div>

          {/* Massive title — LCP element, no entrance delay */}
          <h1 className="mb-8 animate-fade-up">{content.title}</h1>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl md:text-3xl font-normal text-[var(--text-default)] mb-10 max-w-3xl mx-auto leading-tight animate-fade-up"
            style={{ animationDelay: '0.12s' }}
          >
            {content.subtitle}
          </p>

          {/* Description */}
          {content.description && (
            <p
              className="text-base sm:text-lg text-[var(--text-muted)] mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.22s' }}
            >
              {content.description}
            </p>
          )}

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-up"
            style={{ animationDelay: '0.32s' }}
          >
            <Button href="/contact" size="lg" variant="accent">
              {content.primaryCTA}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button href="/#projects" size="lg" variant="outline">
              {content.secondaryCTA}
            </Button>
          </div>

          {/* Trust strip — subtle proof signals, never shouting */}
          <div
            className="mt-14 flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-[var(--text-muted)] animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
              אספקה תוך 5–14 ימי עבודה
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
              מענה ראשון תוך 24 שעות
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
