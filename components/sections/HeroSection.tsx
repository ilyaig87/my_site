'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { HeroContent } from '@/types';

interface HeroSectionProps {
  content: HeroContent;
}

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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="kicker">Pixelia · Web Studio</span>
          </motion.div>

          {/* Massive title */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            {content.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl sm:text-2xl md:text-3xl font-normal text-[var(--text-default)] mb-10 max-w-3xl mx-auto leading-tight"
          >
            {content.subtitle}
          </motion.p>

          {/* Description */}
          {content.description && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-[var(--text-muted)] mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {content.description}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.66, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
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
          </motion.div>

          {/* Trust strip — subtle proof signals, never shouting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-[var(--text-muted)]"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
              אספקה תוך 5–14 ימי עבודה
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
              מענה ראשון תוך 24 שעות
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
