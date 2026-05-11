'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { Template } from '@/types';
import { fadeUp, stagger } from '@/lib/animations';

interface FeaturedTemplatesSectionProps {
  templates: Template[];
}

export default function FeaturedTemplatesSection({ templates }: FeaturedTemplatesSectionProps) {
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
            <GlassPill dot dotColor="cool">נקודת פתיחה ייחודית</GlassPill>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4">
            תבנית שהופכת <span className="lg-text-shimmer">לאתר שלכם</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            לא קופי-פייסט — כל תבנית נצבעת, נכתבת ומותאמת סביב המותג שלכם
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto mb-10"
        >
          {templates.map((template) => (
            <motion.div key={template.id} variants={fadeUp}>
              <Link href={`/templates/${template.slug}`} className="group block h-full">
                <GlassCard variant="default" tilt squircle="lg" className="h-full p-3">
                  {/* Preview */}
                  <div className="relative aspect-[3/2] overflow-hidden squircle-md mb-4">
                    <Image
                      src={template.previewImage}
                      alt={`תצוגה - ${template.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="px-2 pb-2">
                    <h3 className="text-lg font-bold text-[var(--text-strong)] group-hover:text-[var(--primary)] transition-colors mb-1.5">
                      {template.name}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="lg-surface lg-shallow squircle-sm px-2 py-0.5 text-[10px] text-[var(--text-default)]"
                        >
                          <span className="relative z-10">{tag}</span>
                        </span>
                      ))}
                    </div>

                    {/* Color palette */}
                    <div className="flex gap-1.5">
                      <div
                        className="w-5 h-5 rounded-full lg-surface lg-shallow"
                        style={{ backgroundColor: template.colors.primary }}
                        title={template.colors.primary}
                      />
                      <div
                        className="w-5 h-5 rounded-full lg-surface lg-shallow"
                        style={{ backgroundColor: template.colors.secondary }}
                        title={template.colors.secondary}
                      />
                      <div
                        className="w-5 h-5 rounded-full lg-surface lg-shallow"
                        style={{ backgroundColor: template.colors.accent }}
                        title={template.colors.accent}
                      />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Button href="/templates" size="lg" variant="primary">
            <span className="flex items-center gap-2">
              צפה בכל הטמפלייטים
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
