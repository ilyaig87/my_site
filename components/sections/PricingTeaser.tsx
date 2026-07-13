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

const ACCENTS: Record<string, string> = {
  Starter: 'linear-gradient(135deg, #38bdf8, #2563eb)',
  Business: 'linear-gradient(135deg, #2563eb, #7c3aed)',
  Premium: 'linear-gradient(135deg, #7c3aed, #db2777)',
  'AI ואוטומציה': 'linear-gradient(135deg, #14b8a6, #22c55e)',
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
    points: ['עמוד אחד ממוקד — עד 5 סקשנים', 'טופס לידים + כפתור WhatsApp', 'באוויר תוך 5–7 ימי עבודה'],
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

        {/* Starter — the fixed-price package, featured on its own row */}
        {tiers[0] && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="max-w-5xl mx-auto mb-5 sm:mb-6"
          >
            <GlassCard variant="deep" glow="primary" squircle="lg" className="relative p-7 sm:p-8">
              <div aria-hidden className="absolute top-0 inset-x-6 h-[3px] rounded-full" style={{ background: ACCENTS.Starter }} />
              <div className="relative z-10 grid md:grid-cols-[1.1fr_1fr_auto] items-center gap-6 md:gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="squircle-md w-11 h-11 flex-shrink-0 flex items-center justify-center text-white shadow-md" style={{ background: ACCENTS.Starter }}>
                      {tiers[0].icon}
                    </div>
                    <h3 className="text-2xl font-black text-[var(--text-strong)] leading-tight">{tiers[0].name}</h3>
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{tiers[0].subtitle}</p>
                </div>
                <ul className="space-y-2">
                  {tiers[0].points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-[var(--text-default)]">
                      <Check />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">מחיר חד-פעמי</p>
                  <div className="text-4xl sm:text-5xl font-black text-[var(--text-strong)] leading-none tracking-tight mb-3">
                    ₪{tiers[0].price}
                  </div>
                  <Button href="/pricing" variant="primary" size="sm">התחילו עכשיו</Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Custom-quote tiers — three in a row */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto mb-10"
        >
          {tiers.slice(1).map((tier) => (
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
                {/* Package colour accent */}
                <div aria-hidden className="absolute top-0 inset-x-6 h-[3px] rounded-full" style={{ background: ACCENTS[tier.name] }} />

                {/* Header row — badge sits inline so every title shares the same line */}
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="squircle-md w-11 h-11 flex-shrink-0 flex items-center justify-center text-white shadow-md"
                      style={{ background: ACCENTS[tier.name] }}
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
                <p className="text-sm text-[var(--text-muted)] mb-5 min-h-[2.5rem]">{tier.subtitle}</p>

                <ul className="space-y-2.5 mb-6">
                  {tier.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-[var(--text-default)]">
                      <Check />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-[var(--glass-border-dim)] flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[var(--primary)]">נשמח לפרטים</span>
                  <span className="text-xs text-[var(--text-muted)]">הצעה תוך 24 שעות</span>
                </div>
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
