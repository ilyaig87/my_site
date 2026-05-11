import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import BenefitsSection from '@/components/sections/BenefitsSection';
import { getSiteContent } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'אודות - Pixelia',
  description: 'קצת עלינו, הניסיון והטכנולוגיות שאנחנו עובדים איתן - בניית אתרים מקצועיים לעסקים',
};

const PIXELIA_LETTER_COLORS = ['#FCD34D', '#FBBF24', '#F59E0B', '#FB923C', '#F472B6', '#A78BFA', '#8B5CF6'];

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
          <div className="text-center max-w-3xl mx-auto">
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
                5+ שנות ניסיון בפיתוח אתרים
              </h2>
              <p className="text-base text-[var(--text-muted)] mb-6 leading-relaxed">
                מתמחים בבניית אתרים מודרניים, מהירים ובעלי חוויית משתמש מצוינת לעסקים בכל גודל
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
                  { stat: '∞', label: 'ליווי אישי' },
                  { stat: '100%', label: 'תמיכה' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-2xl font-black lg-text-shimmer">{item.stat}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Technologies */}
            <GlassCard variant="default" tilt squircle="lg" glow="cool" className="p-8 sm:p-10">
              <div className="mb-4">
                <GlassPill dot dotColor="cool">סטאק טכנולוגי</GlassPill>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black mb-3 text-[var(--text-strong)] leading-tight">
                הטכנולוגיות שאנחנו עובדים איתן
              </h2>
              <p className="text-base text-[var(--text-muted)] mb-6 leading-relaxed">
                אלה הכלים שמעולים עבור רוב הפרויקטים שלנו. הסוד הוא לא ברשימה — אלא ביכולת להתאים את הטכנולוגיה לדרישות שלכם.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {content.about.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="lg-surface lg-shallow squircle-sm px-3 py-1.5 text-sm font-bold text-[var(--text-strong)]"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full" />
                      {tech}
                    </span>
                  </span>
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
              בואו נדבר ונראה איך אפשר להביא את העסק שלכם לאינטרנט
            </p>
            <Button href="/contact" variant="primary" size="lg">
              צרו קשר עכשיו
            </Button>
          </GlassCard>
        </Container>
      </section>
    </>
  );
}
