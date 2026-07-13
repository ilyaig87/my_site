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
    { category: 'general', question: 'כמה זמן לוקח לבנות אתר?', answer: 'תלוי בחבילה: Starter (דף נחיתה) - 5-7 ימי עבודה. Business - 1-2 שבועות. Premium - 2-4 שבועות לפי ההיקף. הזמנים תלויים גם בזמינות התכנים והתמונות מצדכם.' },
    { category: 'general', question: 'האם ניתן לערוך את האתר עצמאית לאחר ההשקה?', answer: 'ניתן להוסיף פאנל ניהול תוכן (CMS) כתוספת לכל אתר לעדכון עצמאי, או שנעדכן עבורכם בקלות.' },
    { category: 'pricing', question: 'כמה עולה אתר?', answer: 'דף נחיתה (Starter) — 2,500 ₪ חד-פעמי. אתר עסקי (Business), אתר מתקדם (Premium) ומערכות AI ואוטומציה מתומחרים בהתאמה אישית — כי כל עסק שונה בהיקף ובצרכים. איך זה עובד? שיחה קצרה, ותוך 24 שעות תקבלו הצעה מדויקת ושקופה. המחיר שנסגר הוא המחיר שתשלמו — בלי הפתעות ובלי תשלומים חודשיים נסתרים.' },
    { category: 'pricing', question: 'מה כולל המחיר?', answer: 'המחיר כולל: עיצוב מותאם, פיתוח ב-Next.js / React, התאמה רספונסיבית מלאה, אופטימיזציה ל-SEO, העלאה לדומיין שלכם, אבטחת SSL וליווי צמוד עם תיקונים לאחר ההשקה. דומיין ואחסון שנתי - 300 ₪ כתוספת.' },
    { category: 'pricing', question: 'האם יש תשלומים חודשיים נסתרים?', answer: 'לא! המחיר חד-פעמי. דומיין ואחסון הם תוספת שנתית של 300 ₪. אין עלויות נסתרות או התחייבות חודשית.' },
    { category: 'pricing', question: 'מה התוספות האופציונליות לחבילה?', answer: 'כל התוספות מופיעות בעמוד המחירים תחת "תוספות אופציונליות" — דומיין ואחסון, מערכת הזמנות, חנות ותשלומים, אזור משתמשים, ותחזוקה חודשית. הכל שקוף ומופיע לפני שמתחילים.' },
    { category: 'pricing', question: 'יש הנחה לעמותות או עסקים בתחילת הדרך?', answer: 'כן. אנחנו מציעים הנחות מיוחדות לעמותות, סטארטאפים בתחילת דרכם, ועסקים זעירים. צרו קשר ב-WhatsApp או במייל ונסכם בהתאם לצורך שלכם.' },
    { category: 'technical', question: 'האם האתר יהיה מותאם למובייל?', answer: 'בהחלט. כל אתר שאנחנו בונים הוא רספונסיבי לחלוטין - נראה מושלם במחשב, טאבלט וסלולר.' },
    { category: 'technical', question: 'באילו טכנולוגיות אתם בונים את האתר?', answer: 'Next.js / React, TypeScript ו-Tailwind CSS. אלה הטכנולוגיות המודרניות בתעשייה - אתרים מהירים במיוחד, ידידותיים ל-SEO ב-Google, מאובטחים.' },
    { category: 'technical', question: 'מה לגבי SEO וקידום אורגני?', answer: 'ב-Starter נכלל SEO בסיסי + Open Graph. ב-Business — SEO מלא, Schema.org ו-Google Analytics. ב-Premium — SEO טכני מתקדם, Pixel ואופטימיזציה מקיפה של Core Web Vitals.' },
    { category: 'technical', question: 'איך מטפלים בדומיין ואחסון?', answer: 'ניתן להעלות לדומיין שלכם הקיים ללא תוספת. אם אין לכם, נטפל ברכישה והקמה ב-300 ₪ לשנה (כולל אחסון ו-SSL). חשוב לדעת: אתם הבעלים הרשומים של הדומיין — לא אנחנו.' },
    { category: 'support', question: 'מה קורה אם משהו נשבר באתר אחרי ההשקה?', answer: 'אנחנו מלווים אתכם גם לאחר ההשקה ומתקנים כל תקלה שתתגלה. להמשך טיפול שוטף ניתן להוסיף תחזוקה חודשית (החל מ-150 ₪/חודש).' },
    { category: 'support', question: 'מה ההבדל בין תיקוני באגים לשינויים?', answer: 'תיקון באג = משהו לא פועל כפי שסוכם. שינוי = הוספה או החלפה של תוכן. התיקונים כלולים בליווי שלאחר ההשקה; שינויים מתומחרים בנפרד.' },
    { category: 'support', question: 'איך מעדכנים תוכן באתר אחרי ההשקה?', answer: 'ניתן להוסיף פאנל ניהול תוכן (CMS) לעדכון עצמאי כתוספת לכל אתר. נעביר הדרכה אישית בסיום הפרויקט.' },
    { category: 'general', question: 'האם אתם מספקים את תוכן האתר?', answer: 'אנחנו עוזרים בעריכה ושיפור של תוכן קיים ללא תשלום נוסף. כתיבת תוכן שיווקי מלא היא שירות נפרד בתוספת תשלום.' },
    { category: 'general', question: 'איך מתבצע התשלום?', answer: 'לאחר שיחת תיאום וסיכום פרטי הפרויקט, נשלח אליכם קישור לחשבונית מאובטחת. ניתן לשלם בכרטיס אשראי, ביט או בהעברה בנקאית.' },
    { category: 'general', question: 'מי בעצם בונה לי את האתר? מתכנת בודד או צוות?', answer: 'מתכנת בודד שמלווה אתכם מההתחלה ועד הסוף, בלי תיווך של מנהל פרויקט. זה לא מקרה — זאת בחירה: תקשורת ישירה היא היתרון הכי חשוב שיש לנו. אתם תמיד מדברים עם מי שבונה את האתר בפועל.' },
    { category: 'general', question: 'האתר והקוד שייכים לי או לכם אחרי ההשקה?', answer: 'האתר, הקוד, הדומיין והאחסון — הכל על שמכם ובבעלותכם המלאה. אנחנו לא נועלים אתכם בשום מערכת קניינית. אם תרצו בעתיד לעבור למפתח אחר, אתם לוקחים את כל הקוד אתכם.' },
    { category: 'general', question: 'אפשר לראות לקוחות אמיתיים שעבדו אתכם?', answer: 'בוודאי. ראו את העבודות שלנו בעמוד הבית (סקציית "אתרים שכבר באוויר"). אם תרצו לשמוע מהם ישירות — נשמח לקשר אתכם בשיחה לפני שתחליטו. בקשו ב-WhatsApp.' },
    { category: 'support', question: 'מה אם אני לא מרוצה מהעיצוב?', answer: 'לפני שמתחילים פיתוח, אתם מאשרים דמו ויזואלי. עד לאישור — אפשר לבקש שינויים בחופשיות, ללא תוספת תשלום. אחרי אישור הדמו, שינויי עיצוב גדולים מתומחרים בנפרד.' },
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
