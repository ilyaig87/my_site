'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { getAllTemplates } from '@/lib/data';
import { Template } from '@/types';
import { useTemplateStats } from '@/hooks/useTemplateStats';
import { fadeUp, stagger } from '@/lib/animations';
import { cn } from '@/lib/cn';

export default function TemplatesPage() {
  const templates = getAllTemplates();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const cats = templates.map((t) => t.category);
    return ['all', ...Array.from(new Set(cats))];
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [templates, selectedCategory, searchQuery]);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <GlassPill dot dotColor="primary">{templates.length} טמפלייטים מקצועיים</GlassPill>
            </div>
            <h1 className="mb-5 text-[var(--text-strong)]">
              גלריית <span className="lg-text-shimmer">הטמפלייטים</span>
            </h1>
            <p className="text-xl font-semibold mb-4 text-[var(--primary)]">עיצובים מקצועיים לכל סוג עסק</p>
            <p className="text-lg text-[var(--text-muted)] mb-8 max-w-2xl mx-auto leading-relaxed">
              בחר טמפלייט מוכן, התאם אותו למותג שלך והעלה לאוויר תוך ימים ספורים
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="חפש טמפלייט..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="lg-input text-base pr-12"
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-faint)] pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2.5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-5 py-2.5 squircle-sm text-sm font-bold transition-all',
                    selectedCategory === category
                      ? 'text-[var(--on-accent)] scale-105 lg-glow-primary'
                      : 'lg-surface lg-shallow text-[var(--text-default)] hover:text-[var(--text-strong)]'
                  )}
                  style={
                    selectedCategory === category
                      ? { background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }
                      : undefined
                  }
                >
                  <span className="relative z-10">{getCategoryLabel(category)}</span>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Custom Design CTA */}
      <section className="relative">
        <Container>
          <GlassCard variant="deep" squircle="2xl" glow="primary" className="max-w-5xl mx-auto p-8 md:p-12">
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
                style={{ background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }}
              >
                <svg className="w-8 h-8 text-[var(--on-accent)]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h2 className="text-[var(--text-strong)] mb-4">רוצים משהו מיוחד יותר?</h2>
              <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed max-w-3xl mx-auto">
                הטמפלייטים שלנו הם נקודת התחלה מעולה — אבל אנחנו גם יכולים לעצב לכם אתר מותאם אישית לחלוטין שמשקף בדיוק את המותג והחזון שלכם
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'התאמה מלאה', desc: 'עיצוב שמותאם בדיוק לצרכים ולמותג שלכם' },
                { title: 'פונקציות ייחודיות', desc: 'תכונות מיוחדות שמתאימות בדיוק לעסק שלכם' },
                { title: 'אין הגבלות', desc: 'חופש מלא לממש כל רעיון ועיצוב' },
              ].map((item) => (
                <div key={item.title} className="lg-surface lg-shallow squircle-md p-5">
                  <h3 className="relative z-10 font-bold text-[var(--text-strong)] mb-2">{item.title}</h3>
                  <p className="relative z-10 text-sm text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                <span className="flex items-center gap-2">
                  בואו נדבר על עיצוב אישי
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={() => {
                  document.querySelector('#templates-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                המשיכו לעיין בטמפלייטים
              </Button>
            </div>
          </GlassCard>
        </Container>
      </section>

      {/* Grid */}
      <section id="templates-grid" className="relative">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-[var(--text-muted)] text-lg">
              נמצאו <span className="font-bold text-[var(--primary)]">{filteredTemplates.length}</span> טמפלייטים
            </p>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-3">לא נמצאו טמפלייטים</h3>
              <p className="text-[var(--text-muted)] mb-6">נסה לשנות את הסינון או החיפוש</p>
              <Button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                variant="primary"
                size="md"
              >
                אפס סינונים
              </Button>
            </div>
          ) : (
            <motion.div
              variants={stagger(0.06)}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTemplates.map((template) => (
                <motion.div key={template.id} variants={fadeUp}>
                  <TemplateCard template={template} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}

function TemplateCard({ template }: { template: Template }) {
  const { stats } = useTemplateStats(template.slug);

  return (
    <Link href={`/templates/${template.slug}`} className="group block h-full">
      <GlassCard variant="default" tilt squircle="lg" glow="none" className="h-full p-3 overflow-hidden">
        {/* Preview */}
        <div className="relative w-full aspect-[4/3] overflow-hidden squircle-md mb-4">
          <Image
            src={template.previewImage}
            alt={`תצוגה — ${template.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <GlassPill className="!py-1 !text-[10px]">{getCategoryLabel(template.category)}</GlassPill>
          </div>

          {/* Popularity */}
          {stats?.isPopular && (
            <div className="absolute top-3 left-3">
              <span
                className="px-2.5 py-1 squircle-sm text-[10px] font-bold text-[var(--on-accent)] flex items-center gap-1"
                style={{ background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                פופולרי
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <GlassPill className="!bg-[var(--primary)] !border-transparent text-[var(--on-accent)] font-bold">
                <span className="flex items-center gap-1.5">
                  צפה בטמפלייט
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </GlassPill>
            </div>
          </div>
        </div>

        <div className="px-2 pb-2">
          <h3 className="text-xl font-bold text-[var(--text-strong)] mb-2 group-hover:text-[var(--primary)] transition-colors">
            {template.name}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 leading-relaxed">{template.description}</p>

          <div className="lg-surface lg-shallow squircle-sm p-3 mb-4">
            <p className="relative z-10 text-[10px] text-[var(--text-faint)] mb-1 font-bold uppercase tracking-wide">
              מתאים במיוחד ל
            </p>
            <p className="relative z-10 text-sm text-[var(--text-default)] font-medium">
              {template.suitableFor.slice(0, 2).join(' • ')}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="lg-surface lg-shallow squircle-sm px-2 py-0.5 text-[10px] text-[var(--text-default)]"
              >
                <span className="relative z-10">{tag}</span>
              </span>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--glass-border-dim)] flex items-center justify-between">
            <span className="text-[10px] text-[var(--text-faint)] font-bold uppercase tracking-wide">פלטת צבעים</span>
            <div className="flex gap-1.5">
              <div
                className="w-6 h-6 rounded-md border border-[var(--glass-border-dim)] transition-transform group-hover:scale-110"
                style={{ backgroundColor: template.colors.primary }}
              />
              <div
                className="w-6 h-6 rounded-md border border-[var(--glass-border-dim)] transition-transform group-hover:scale-110"
                style={{ backgroundColor: template.colors.secondary }}
              />
              <div
                className="w-6 h-6 rounded-md border border-[var(--glass-border-dim)] transition-transform group-hover:scale-110"
                style={{ backgroundColor: template.colors.accent }}
              />
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

function getCategoryLabel(category: string): string {
  const labels: { [key: string]: string } = {
    all: 'הכל',
    business: 'עסקי',
    landing: 'דף נחיתה',
    portfolio: 'פורטפוליו',
    medical: 'רפואי',
    fitness: 'כושר',
    restaurant: 'מסעדה',
    professional: 'מקצועי',
    creative: 'קריאייטיב',
    ecommerce: 'חנות',
  };
  return labels[category] || category;
}
