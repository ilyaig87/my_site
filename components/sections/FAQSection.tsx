'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqs: FAQItem[] = [
    { category: 'general', question: 'כמה זמן לוקח לבנות אתר?', answer: 'תלוי בחבילה: דף בודד - 5-7 ימי עבודה, אתר תדמית - 7-14 ימי עבודה, אתר מורחב - 2-3 שבועות. הזמנים תלויים גם בזמינות התכנים והתמונות מצדכם.' },
    { category: 'general', question: 'האם ניתן לערוך את האתר עצמאית לאחר ההשקה?', answer: 'באתר המורחב ניתן לכלול פאנל ניהול תוכן בסיסי שמאפשר לערוך טקסטים ותמונות. בחבילות האחרות אפשר להוסיף פאנל ניהול כתוספת לחבילה, או שנעדכן עבורכם בקלות.' },
    { category: 'pricing', question: 'כמה עולה אתר?', answer: 'יש 3 חבילות עיקריות: דף בודד החל מ-1,500 ₪, אתר תדמית החל מ-3,000 ₪ (הפופולרי), אתר מורחב החל מ-5,000 ₪. המחירים חד-פעמיים. המחיר הסופי נקבע לפי הצורך.' },
    { category: 'pricing', question: 'מה כולל המחיר?', answer: 'המחיר כולל: עיצוב מלא, פיתוח ב-Next.js / React, התאמה רספונסיבית מלאה, אופטימיזציה ל-SEO, העלאה לדומיין שלכם, אבטחת SSL וחודש תיקוני באגים. דומיין ואחסון שנתי - 300 ₪ כתוספת.' },
    { category: 'pricing', question: 'האם יש תשלומים חודשיים נסתרים?', answer: 'לא! המחיר חד-פעמי. דומיין ואחסון הם תוספת שנתית של 300 ₪. אין עלויות נסתרות או התחייבות חודשית.' },
    { category: 'pricing', question: 'מה התוספות האופציונליות לחבילה?', answer: 'דומיין ואחסון: 300 ₪/שנה. דף נוסף: 250-300 ₪. מסד נתונים (DB): החל מ-800 ₪. פאנל ניהול תוכן: החל מ-1,200 ₪. תחזוקה חודשית: החל מ-150 ₪/חודש.' },
    { category: 'pricing', question: 'יש הנחה לעמותות או עסקים בתחילת הדרך?', answer: 'כן. אנחנו מציעים הנחות מיוחדות לעמותות, סטארטאפים בתחילת דרכם, ועסקים זעירים. צרו קשר ב-WhatsApp או במייל ונסכם בהתאם לצורך שלכם.' },
    { category: 'technical', question: 'האם האתר יהיה מותאם למובייל?', answer: 'בהחלט. כל אתר שאנחנו בונים הוא רספונסיבי לחלוטין - נראה מושלם במחשב, טאבלט וסלולר.' },
    { category: 'technical', question: 'באילו טכנולוגיות אתם בונים את האתר?', answer: 'Next.js / React, TypeScript ו-Tailwind CSS. אלה הטכנולוגיות המודרניות בתעשייה - אתרים מהירים במיוחד, ידידותיים ל-SEO ב-Google, מאובטחים.' },
    { category: 'technical', question: 'מה לגבי SEO וקידום אורגני?', answer: 'בחבילת דף בודד נכלל SEO בסיסי. באתר תדמית - SEO מלא ושילוב Google Analytics. באתר מורחב - SEO מתקדם, Analytics, Facebook Pixel ואינטגרציות.' },
    { category: 'technical', question: 'איך מטפלים בדומיין ואחסון?', answer: 'ניתן להעלות לדומיין שלכם הקיים ללא תוספת. אם אין לכם, נטפל ברכישה והקמה ב-300 ₪ לשנה (כולל אחסון ו-SSL).' },
    { category: 'support', question: 'מה קורה אם משהו נשבר באתר אחרי ההשקה?', answer: 'בכל החבילות כלול חודש של תיקוני באגים (חודשיים בחבילה המורחבת). לאחר מכן ניתן להמשיך לתחזוקה חודשית (החל מ-150 ₪/חודש).' },
    { category: 'support', question: 'מה ההבדל בין תיקוני באגים לשינויים?', answer: 'תיקון באג = משהו לא פועל כפי שסוכם. שינוי = הוספה או החלפה של תוכן. תיקוני באגים כלולים בתקופת האחריות, שינויים מתומחרים בנפרד.' },
    { category: 'support', question: 'איך מעדכנים תוכן באתר אחרי ההשקה?', answer: 'באתר המורחב ניתן לכלול פאנל ניהול תוכן בסיסי לעדכון טקסטים ותמונות באופן עצמאי. נעביר הדרכה אישית בסיום הפרויקט.' },
    { category: 'general', question: 'האם אתם מספקים את תוכן האתר?', answer: 'אנחנו עוזרים בעריכה ושיפור של תוכן קיים ללא תשלום נוסף. כתיבת תוכן שיווקי מלא היא שירות נפרד בתוספת תשלום.' },
    { category: 'general', question: 'איך מתבצע התשלום?', answer: 'לאחר שיחת תיאום וסיכום פרטי הפרויקט, נשלח אליכם קישור לחשבונית מאובטחת. ניתן לשלם בכרטיס אשראי, ביט או בהעברה בנקאית.' },
  ];

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
            <p className="text-lg text-[var(--text-muted)]">כל מה שרצית לדעת על בניית אתר</p>
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
              <p className="text-base text-[var(--text-muted)] mb-5">לא מצאת את מה שחיפשת?</p>
              <Button href="https://wa.me/972546361555" external variant="primary" size="lg">
                שאלו אותי ב-WhatsApp
              </Button>
            </GlassCard>
          </div>
        </Container>
      </section>
    </>
  );
}
