'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import { fadeUp, stagger } from '@/lib/animations';

interface Project {
  name: string;
  url: string;
  domain: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  tags: string[];
}

const projects: Project[] = [
  {
    name: 'חן שעיה — שירותי כמאות',
    url: 'https://www.chenshaya.com/',
    domain: 'chenshaya.com',
    tagline: 'אתר תדמית לחברת כמאות והנדסה',
    description:
      'אתר תדמית מקצועי לחברה המתמחה בחישובי כמויות, כתבי מכרזים וניתוחי מחיר. עיצוב נקי ומכובד שמדגיש מקצועיות.',
    image: '/images/projects/chenshaya.png',
    highlights: ['עיצוב מודרני ונקי', 'גלריית פרויקטים', 'טופס יצירת קשר', 'מותאם מובייל'],
    tags: ['אתר תדמית', 'הנדסה', 'B2B'],
  },
  {
    name: 'פז השקעות',
    url: 'https://www.paz-invest.co.il/',
    domain: 'paz-invest.co.il',
    tagline: 'אתר לחברת מימון פיננסי',
    description:
      'אתר לחברה ותיקה (30+ שנה) המתמחה בהלוואות חוץ בנקאיות, ניכיון שיקים ומימון פרויקטים בנדל"ן.',
    image: '/images/projects/paz-invest.png',
    highlights: ['דפי שירותים מפורטים', 'CTA חזקים', 'אופטימיזציה ל-SEO', 'טפסי בקשה'],
    tags: ['אתר תדמית', 'פיננסים', 'לידים'],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative scroll-mt-24">
      <Container>
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <GlassPill dot dotColor="primary">באוויר ומייצרים תוצאות</GlassPill>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4">
            העבודה שלנו <span className="lg-text-shimmer">מדברת בעד עצמה</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            אתרים חיים שמושכים לקוחות, יוצרים אמון וסוגרים עסקאות
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project) => (
            <motion.div key={project.url} variants={fadeUp}>
              <GlassCard
                as="a"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                tilt
                squircle="lg"
                className="block group overflow-hidden"
              >
                {/* Browser frame */}
                <div className="relative overflow-hidden squircle-md mb-5">
                  <div className="flex items-center gap-1.5 px-3 py-2 lg-surface lg-shallow border-b border-[var(--glass-border-dim)]" style={{ borderRadius: 0 }}>
                    <div className="flex gap-1 relative z-10">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="relative z-10 flex-1 mx-2 px-3 py-1 lg-surface lg-shallow rounded-md text-[11px] text-[var(--text-muted)] truncate text-left" dir="ltr">
                      {project.domain}
                    </div>
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`תצוגת אתר ${project.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <GlassPill className="!bg-[var(--primary)] !border-transparent text-[var(--on-accent)] font-bold">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          צפו באתר החי
                        </span>
                      </GlassPill>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-2">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-xl font-bold text-[var(--text-strong)] group-hover:text-[var(--primary)] transition-colors">
                      {project.name}
                    </h3>
                    <span className="text-xs text-[var(--text-faint)]" dir="ltr">
                      {project.domain}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--primary)] mb-2.5">{project.tagline}</p>
                  <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">{project.description}</p>

                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-1.5 text-xs text-[var(--text-default)]">
                        <svg className="w-3 h-3 text-[var(--primary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="lg-surface lg-shallow squircle-sm px-2.5 py-0.5 text-[11px] text-[var(--text-default)]"
                      >
                        <span className="relative z-10">{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
