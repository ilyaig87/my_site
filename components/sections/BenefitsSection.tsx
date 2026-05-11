'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import { Benefit } from '@/types';
import { ReactElement } from 'react';
import { fadeUp, stagger } from '@/lib/animations';

interface BenefitsSectionProps {
  benefits: Benefit[];
}

const iconMap: { [key: string]: ReactElement } = {
  palette: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  mobile: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  zap: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  support: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
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
            <GlassPill dot dotColor="cool">למה לבחור בנו</GlassPill>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4">
            הסיבות ל<span className="lg-text-shimmer">אמון בנו</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            שירות מקצועי ואישי שמבטיח שתקבלו אתר שעובד בדיוק כמו שצריך
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto"
        >
          {benefits.map((benefit, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassCard variant="default" tilt squircle="lg" className="h-full p-6 sm:p-7 text-center group">
                <div className="lg-surface lg-shallow squircle-md w-14 h-14 inline-flex items-center justify-center mb-5 text-[var(--primary)] group-hover:rotate-6 transition-transform duration-500">
                  <span className="relative z-10">{iconMap[benefit.icon] || iconMap['palette']}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-strong)] mb-2.5">{benefit.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{benefit.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
