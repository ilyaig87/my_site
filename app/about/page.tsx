import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import BenefitsSection from '@/components/sections/BenefitsSection';
import { getSiteContent } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'אודות — סטודיו לעיצוב ובניית אתרים | Pixelia',
  description: 'הסטודיו, הניסיון והטכנולוגיות שאיתן אנחנו מעצבים ובונים אתרים מקצועיים לעסקים.',
};

const PIXELIA_LETTER_COLORS = ['#FCD34D', '#FBBF24', '#F59E0B', '#FB923C', '#F472B6', '#A78BFA', '#8B5CF6'];

// The stack, grouped by what the client actually needs — not by tool name.
// Colours match the package colour identity used across the site.
const TECH_GROUPS = [
  {
    title: 'פיתוח בהתאמה אישית',
    desc: 'אתרים מהירים במיוחד שנבנים בדיוק בשבילכם, בטכנולוגיות שמניעות את האתרים הגדולים בעולם.',
    color: '#2563eb',
    items: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  },
  {
    title: 'אתרי תדמית עם ניהול תוכן עצמאי',
    desc: 'רוצים לעדכן טקסטים ותמונות לבד, בלי לתלות במתכנת? גם לזה יש לכם בית אצלנו.',
    color: '#4f46e5',
    items: ['WordPress', 'Elementor', 'Wix Studio'],
  },
  {
    title: 'חנויות ומסחר אונליין',
    desc: 'מכירה אונליין מקצה לקצה — קטלוג, עגלה, סליקה ומשלוחים.',
    color: '#c026d3',
    items: ['Shopify', 'WooCommerce'],
  },
  {
    title: 'אוטומציות, חיבורים ו-AI',
    desc: 'מה שעסקים מחפשים עכשיו: מערכות חכמות שעונות ללקוחות ועובדות בשבילכם 24/7.',
    color: '#0d9488',
    items: ['צ\'אטבוטים חכמים', 'סוכני AI', 'WhatsApp API', 'מערכות CRM', 'Make'],
  },
];

function renderPixeliaTitle(title: string) {
  const idx = title.indexOf('Pixelia');
  if (idx === -1) return title;
  const before = title.slice(0, idx);
  const after = title.slice(idx + 'Pixelia'.length);
  return (
    <>
      {before}
      <span className="font-black">
        {'PIXELIA'.split('').map((letter, i) => (
          <span key={i} style={{ color: PIXELIA_LETTER_COLORS[i] }}>
            {letter}
          </span>
        ))}
      </span>
      {after}
    </>
  );
}

export default function AboutPage() {
  const content = getSiteContent();

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-5">
              <GlassPill dot>ניסיון ומקצועיות</GlassPill>
            </div>
            <h1 className="mb-5 text-[var(--text-strong)]">{renderPixeliaTitle(content.about.title)}</h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
              {content.about.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Experience & Technologies */}
      <section className="relative">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Experience */}
            <GlassCard variant="default" tilt squircle="lg" glow="primary" className="p-8 sm:p-10">
              <div className="mb-4">
                <GlassPill dot>ניסיון</GlassPill>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black mb-3 text-[var(--text-strong)] leading-tight">
                איך אנחנו עובדים — בקצרה
              </h2>
              <p className="text-base text-[var(--text-muted)] mb-6 leading-relaxed">
                ארבע הבטחות שמלוות כל פרויקט שאנחנו לוקחים. בלי גימיקים, בלי הפתעות, ובלי תיווך.
              </p>

              <ul className="space-y-3 mb-6">
                {content.about.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="lg-surface lg-shallow squircle-sm w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[var(--primary)] relative z-10" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-[var(--text-default)] leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[var(--glass-border-dim)]">
                {[
                  { stat: '5+', label: 'שנות ניסיון' },
                  { stat: '24/7', label: 'מענה חכם ללקוחות' },
                  { stat: '7 ימים', label: 'אספקה ממוצעת' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-2xl font-black lg-text-shimmer">{item.stat}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Technologies — grouped by what the client needs, not by tool name */}
            <GlassCard variant="default" tilt squircle="lg" glow="cool" className="p-8 sm:p-10">
              <div className="mb-4">
                <GlassPill dot dotColor="cool">הכלים הנכונים לכל צורך</GlassPill>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black mb-3 text-[var(--text-strong)] leading-tight">
                לא מתחילים מהטכנולוגיה — מתחילים מהצורך שלכם
              </h2>
              <p className="text-base text-[var(--text-muted)] mb-6 leading-relaxed">
                לכל סוג פרויקט יש את הכלי המתאים לו. אנחנו שולטים בכולם — ובוחרים יחד אתכם את מה שנכון לעסק, לא את מה שנוח לנו.
              </p>

              <div className="space-y-5 mb-6">
                {TECH_GROUPS.map((group) => (
                  <div key={group.title}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: group.color }} />
                      <h3 className="text-base font-bold text-[var(--text-strong)]">{group.title}</h3>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mb-2 mr-4">{group.desc}</p>
                    <div className="flex flex-wrap gap-2 mr-4">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="squircle-sm px-3 py-1.5 text-[13px] font-bold"
                          style={{
                            background: `color-mix(in oklab, ${group.color} 9%, transparent)`,
                            color: `color-mix(in oklab, ${group.color} 80%, var(--text-strong))`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[var(--glass-border-dim)]">
                {[
                  { stat: '100%', label: 'רספונסיבי' },
                  { stat: 'A+', label: 'ביצועים' },
                  { stat: 'SSL', label: 'אבטחה' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-2xl font-black lg-text-shimmer">{item.stat}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
      </section>

      <BenefitsSection benefits={content.whyChooseMe} />

      {/* CTA */}
      <section className="relative">
        <Container>
          <GlassCard variant="deep" squircle="xl" glow="primary" className="max-w-3xl mx-auto p-8 sm:p-12 text-center">
            <h2 className="mb-3 text-[var(--text-strong)]">מוכנים להתחיל את הפרויקט שלכם?</h2>
            <p className="text-base text-[var(--text-muted)] mb-7 max-w-xl mx-auto">
              קבלו הצעת מחיר תוך 24 שעות — בלי התחייבות, בלי הפתעות
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/quote" variant="primary" size="lg">
                קבלו הצעת מחיר
              </Button>
              <Button href="https://wa.me/972546361555" external variant="glass" size="lg">
                דברו איתנו ב-WhatsApp
              </Button>
            </div>
          </GlassCard>
        </Container>
      </section>
    </>
  );
}
