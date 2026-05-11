'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import { fadeUp, stagger } from '@/lib/animations';

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'דף נחיתה או אתר מלא',
    description:
      'דף נחיתה למבצע / קמפיין, או אתר מלא עד 5+ דפים. עיצוב מקצועי, התאמה מושלמת למובייל.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
      </svg>
    ),
    title: 'תבנית או עיצוב אישי',
    description:
      'תבחרו תבנית מוכנה ונתאים לצבעים ותוכן שלכם, או עיצוב מותאם מאפס לפי המיתוג שלכם.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    title: 'העלאה לדומיין',
    description:
      'נעלה את האתר לדומיין שלכם, או נעזור לרכוש דומיין חדש. האתר באוויר ופעיל מהיום הראשון.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: 'תוספת Database',
    description:
      'טפסים עם שמירת מידע, מערכת הזמנות או ניהול תוכן — אפשר להוסיף בתוספת תשלום.',
  },
];

export default function ServicesSection() {
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
            <GlassPill dot>השירותים שלנו</GlassPill>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4">
            מה אנחנו עושים <span className="lg-text-shimmer">בשבילכם</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            מהשיחה הראשונה ועד הקליק האחרון, אנחנו לידכם בכל שלב
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeUp}>
              <GlassCard variant="default" tilt squircle="lg" className="h-full p-7 sm:p-8 group">
                <div className="flex flex-col gap-4">
                  <div
                    className="lg-surface lg-shallow squircle-md w-14 h-14 flex items-center justify-center text-[var(--primary)] group-hover:rotate-6 transition-transform duration-500"
                  >
                    <span className="relative z-10">{service.icon}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-strong)]">
                    {service.title}
                  </h3>
                  <p className="text-base text-[var(--text-muted)] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
