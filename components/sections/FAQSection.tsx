'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { FAQ_ITEMS, type FAQItem } from '@/lib/faqData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqs: FAQItem[] = FAQ_ITEMS;

  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'general', label: 'כללי' },
    { id: 'pricing', label: 'תמחור' },
    { id: 'technical', label: 'טכני' },
    { id: 'support', label: 'תמיכה' },
  ];

  const filteredFaqs = selectedCategory === 'all' ? faqs : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <>
      <section className="relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-5">
              <GlassPill dot dotColor="cool">FAQ</GlassPill>
            </div>
            <h1 className="mb-4">
              שאלות <span className="lg-text-shimmer">נפוצות</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)]">כל מה שרציתם לדעת על בניית אתר</p>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setOpenIndex(null);
                  }}
                  className={cn(
                    'px-5 py-2 squircle-sm font-bold text-sm transition-all',
                    selectedCategory === category.id
                      ? 'text-[var(--on-accent)] scale-105 lg-glow-primary'
                      : 'lg-surface lg-shallow text-[var(--text-default)]'
                  )}
                  style={
                    selectedCategory === category.id
                      ? { background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }
                      : undefined
                  }
                >
                  <span className="relative z-10">{category.label}</span>
                </button>
              ))}
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <GlassCard key={index} variant="default" squircle="md" className="overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-right hover:bg-white/5 transition-colors relative z-10"
                  >
                    <span className="font-semibold text-[var(--text-strong)] text-base pr-4">{faq.question}</span>
                    <svg
                      className={cn(
                        'w-5 h-5 text-[var(--primary)] transition-transform duration-300 flex-shrink-0',
                        openIndex === index && 'rotate-180'
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-1 text-[var(--text-muted)] leading-relaxed relative z-10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              ))}
            </div>

            {/* Bottom CTA */}
            <GlassCard variant="deep" squircle="lg" glow="primary" className="mt-12 p-8 text-center">
              <p className="text-base text-[var(--text-muted)] mb-5">לא מצאתם את מה שחיפשתם?</p>
              <Button href="https://wa.me/972546361555" external variant="primary" size="lg">
                שאלו אותנו ב-WhatsApp
              </Button>
            </GlassCard>
          </div>
        </Container>
      </section>
    </>
  );
}
