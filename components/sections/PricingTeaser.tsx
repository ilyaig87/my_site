'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { fadeUp, stagger } from '@/lib/animations';

const breathingAnimate = {
  scale: [1, 1.015, 1] as number[],
};

const breathingTransition = {
  duration: 4,
  ease: 'easeInOut' as const,
  repeat: Infinity,
};

interface Tier {
  name: string;
  price: string;
  subtitle: string;
  bestFor: string;
  icon: React.ReactNode;
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'דף בודד',
    price: '1,500',
    subtitle: 'Landing Page ממוקד',
    bestFor: 'קמפיין · מוצר · שירות',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    name: 'אתר תדמית',
    price: '3,000',
    subtitle: 'אתר מלא לעסקים',
    bestFor: 'עד 4 דפים · גלריה · SEO',
    highlighted: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'אתר מורחב',
    price: '5,000',
    subtitle: 'פתרון מקצה לקצה',
    bestFor: '5+ דפים · DB · אנימציות',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function PricingTeaser() {
  return (
    <section className="relative">
      <Container>
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <GlassPill dot>המחיר שתראו הוא המחיר שתשלמו</GlassPill>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4">
            תקציב ברור <span className="lg-text-shimmer">והחלטה קלה</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            בחרו חבילה שמתאימה לכם, או דברו איתנו על משהו שתפור בדיוק לעסק שלכם
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto mb-10"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              animate={tier.highlighted ? breathingAnimate : undefined}
              transition={tier.highlighted ? breathingTransition : undefined}
              className={tier.highlighted ? 'sm:-translate-y-3' : ''}
            >
              <GlassCard
                variant={tier.highlighted ? 'deep' : 'default'}
                tilt
                glow={tier.highlighted ? 'primary' : 'none'}
                squircle="lg"
                className="relative h-full p-7 sm:p-8"
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span
                      className="px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[var(--on-accent)] flex items-center gap-1.5 shadow-lg"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--primary-bright), var(--primary))',
                      }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      הכי פופולרי
                    </span>
                  </div>
                )}

                <div
                  className="lg-surface lg-shallow squircle-md w-12 h-12 flex items-center justify-center mb-5"
                  style={
                    tier.highlighted
                      ? {
                          background:
                            'linear-gradient(135deg, var(--primary-bright), var(--primary))',
                          color: 'var(--on-accent)',
                        }
                      : { color: 'var(--primary)' }
                  }
                >
                  <span className="relative z-10">{tier.icon}</span>
                </div>

                <h3 className="text-2xl font-black text-[var(--text-strong)] leading-tight mb-1">
                  {tier.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-5">{tier.subtitle}</p>

                <div className="mb-5 pb-5 border-b border-[var(--glass-border-dim)]">
                  <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">החל מ-</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-[var(--text-strong)] leading-none tracking-tight">
                      ₪{tier.price}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-default)] leading-relaxed flex items-start gap-2">
                  <svg className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{tier.bestFor}</span>
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
          <Button href="/pricing" variant="glass" size="md" fullWidth>
            ראו פירוט החבילות
          </Button>
          <Button href="/contact" variant="accent" size="md" fullWidth>
            <span className="flex items-center gap-2 justify-center">
              להצעת מחיר מותאמת
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </Button>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
          המחיר הסופי תלוי במורכבות ובתוספות שתבחרו
        </p>
      </Container>
    </section>
  );
}
