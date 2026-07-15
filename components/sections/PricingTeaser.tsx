'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { fadeUp, stagger } from '@/lib/animations';

interface Tier {
  name: string;
  price?: string;
  custom?: boolean;
  subtitle: string;
  points: string[];
  icon: React.ReactNode;
  highlighted?: boolean;
}

// One solid accent per package; rendered as a soft tint so the cards stay calm.
const ACCENTS: Record<string, string> = {
  Starter: '#2563eb',
  Business: '#4f46e5',
  Premium: '#c026d3',
  'AI ואוטומציה': '#0d9488',
};

const Check = () => (
  <svg className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const tiers: Tier[] = [
  {
    name: 'Starter',
    price: '2,500',
    subtitle: 'דף נחיתה אחד ממוקד המרה',
    points: ['עמוד אחד ממוקד — עד 5 סקשנים', 'טופס לידים + כפתור WhatsApp', 'באוויר תוך עד 5 ימי עסקים'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    name: 'Business',
    custom: true,
    subtitle: 'אתר עסקי מלא עם כמה עמודים',
    points: ['מספר עמודים וניווט מלא', 'גלריית עבודות ותמונות', 'SEO מלא + Google Analytics'],
    highlighted: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Premium',
    custom: true,
    subtitle: 'אתר מתקדם לפי הצרכים',
    points: ['בלוג / מערכת ניהול תוכן', 'אנימציות ואינטגרציות', 'עיצוב פרימיום לפי דרישה'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'AI ואוטומציה',
    custom: true,
    subtitle: 'צ\'אטבוטים ואוטומציות לעסק',
    points: ['צ\'אטבוט AI לאתר ולוואטסאפ', 'לכידת לידים אוטומטית', 'אוטומציות שחוסכות שעות'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
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
          className="text-center mb-8 sm:mb-10"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <GlassPill dot>תמחור הוגן, שקוף וללא הפתעות</GlassPill>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4">
            תקציב ברור <span className="lg-text-shimmer">והחלטה קלה</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            בחרו חבילה שמתאימה לכם, או דברו איתנו על משהו שתפור בדיוק לעסק שלכם
          </motion.p>
        </motion.div>

        {/* All packages — two per row, same tall card for everyone */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto mb-10"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
            >
              <GlassCard
                variant={tier.highlighted ? 'deep' : 'default'}
                tilt
                glow={tier.highlighted ? 'primary' : 'none'}
                squircle="lg"
                className="relative h-full p-7 sm:p-8 flex flex-col"
              >
                {/* Header row — badge sits inline so every title shares the same line */}
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="squircle-md w-10 h-10 flex-shrink-0 flex items-center justify-center"
                      style={{
                        background: `color-mix(in oklab, ${ACCENTS[tier.name]} 12%, transparent)`,
                        color: ACCENTS[tier.name],
                      }}
                    >
                      {tier.icon}
                    </div>
                    <h3 className="text-xl font-black text-[var(--text-strong)] leading-tight whitespace-nowrap">
                      {tier.name}
                    </h3>
                  </div>
                  {tier.highlighted && (
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }}
                    >
                      ★ הכי פופולרי
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-4 min-h-[1.25rem]">{tier.subtitle}</p>

                <div className="mb-5 pb-5 border-b border-[var(--glass-border-dim)] min-h-[4.5rem]">
                  {tier.custom ? (
                    <>
                      <p className="text-xl font-black text-[var(--primary)] leading-tight">הצעת מחיר מותאמת</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">שיחה קצרה — הצעה מדויקת תוך 24 שעות</p>
                    </>
                  ) : (
                    <>
                      <p className="text-3xl font-black text-[var(--text-strong)] leading-none">₪{tier.price}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1.5">מחיר חד-פעמי, ללא תשלומים חודשיים</p>
                    </>
                  )}
                </div>

                <ul className="space-y-2.5">
                  {tier.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-[var(--text-default)]">
                      <Check />
                      {pt}
                    </li>
                  ))}
                </ul>
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
              פרויקט מותאם אישית
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </Button>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-4 text-center max-w-2xl mx-auto">
          כל עסק הוא עולם — ולכן ב-Business, Premium ו-AI המחיר נקבע יחד אתכם, לפי ההיקף והצרכים בפועל. שיחה קצרה, הצעה מדויקת תוך 24 שעות, ובלי הפתעות בהמשך.
        </p>
      </Container>
    </section>
  );
}
