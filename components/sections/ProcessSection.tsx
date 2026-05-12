'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import { ProcessStep } from '@/types';
import { ReactElement } from 'react';
import { fadeUp, stagger } from '@/lib/animations';

interface ProcessSectionProps {
  steps: ProcessStep[];
}

const iconMap: { [key: string]: ReactElement } = {
  chat: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  select: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  edit: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  rocket: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

export default function ProcessSection({ steps }: ProcessSectionProps) {
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
            <GlassPill dot>תהליך פשוט ומהיר</GlassPill>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4">
            תהליך <span className="lg-text-shimmer">העבודה</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            4 שלבים פשוטים מהרעיון ועד אתר חי באינטרנט
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto"
        >
          {steps.map((step, idx) => (
            <motion.div key={step.step} variants={fadeUp}>
              <GlassCard variant="default" tilt squircle="lg" className="h-full p-6 sm:p-7 text-center relative">
                <div className="relative inline-flex items-center justify-center mb-5">
                  <div className="lg-surface lg-shallow squircle-md w-16 h-16 flex items-center justify-center text-[var(--primary)]">
                    <span className="relative z-10">{iconMap[step.icon] || iconMap['chat']}</span>
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-[var(--on-accent)] shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))',
                    }}
                  >
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-strong)] mb-2">{step.title}</h3>
                {step.duration && (
                  <div className="inline-flex items-center gap-1 mb-2.5 px-2.5 py-0.5 squircle-sm lg-surface lg-shallow text-[11px] font-semibold text-[var(--primary)]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="relative z-10">{step.duration}</span>
                  </div>
                )}
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.description}</p>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -left-4 -translate-y-1/2 text-[var(--primary)]">
                    <svg className="w-7 h-7 rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
