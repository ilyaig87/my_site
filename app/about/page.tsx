import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BenefitsSection from '@/components/sections/BenefitsSection';
import { getSiteContent } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'אודות - Pixelia',
  description: 'קצת עלינו, הניסיון והטכנולוגיות שאנחנו עובדים איתן - בניית אתרים מקצועיים לעסקים',
};

// Render "Pixelia" with the per-letter colors of the logo (blue → teal → green → yellow → orange)
const PIXELIA_LETTER_COLORS = ['#1E78C8', '#2EA88A', '#1E78C8', '#2EA88A', '#7FBE3A', '#F2C53D', '#F39323'];

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
          <span key={i} style={{ color: PIXELIA_LETTER_COLORS[i] }}>{letter}</span>
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
      <section className="relative py-6 md:py-8 bg-gradient-to-b from-yellow-50 to-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-2 rounded-full bg-yellow-50 border border-yellow-200 text-gray-900 text-[10px] font-medium">
              <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
              <span>ניסיון ומקצועיות</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black mb-2 leading-tight text-gray-900">
              {renderPixeliaTitle(content.about.title)}
            </h1>

            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              {content.about.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Experience & Technologies */}
      <section className="py-8 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {/* Experience */}
            <div className="relative bg-white border-2 border-yellow-200 rounded-2xl p-6 md:p-8 shadow-lg overflow-hidden group hover:border-yellow-300 hover:shadow-xl transition-all">
              {/* Subtle background pattern */}
              <div className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 bg-yellow-100 rounded-full blur-3xl opacity-60" />

              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-4 rounded-full bg-yellow-100 border border-yellow-300 text-gray-900 text-[10px] font-semibold uppercase tracking-wide">
                  <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ניסיון
                </div>

                <h2 className="text-2xl md:text-3xl font-black mb-2 text-gray-900 leading-tight">
                  5+ שנות ניסיון בפיתוח אתרים
                </h2>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  מתמחים בבניית אתרים מודרניים, מהירים ובעלי חוויית משתמש מצוינת לעסקים בכל גודל
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-5">
                  {content.about.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-100 border border-yellow-300">
                        <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-700 leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Stat row */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-xl font-black text-yellow-600">5+</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">שנות ניסיון</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black text-yellow-600">∞</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">ליווי אישי</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black text-yellow-600">100%</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">תמיכה</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies - Bright featured card */}
            <div className="relative bg-white border-2 border-yellow-200 rounded-2xl p-6 md:p-8 shadow-lg overflow-hidden group hover:border-yellow-300 hover:shadow-xl transition-all">
              {/* Subtle background pattern */}
              <div className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 bg-yellow-100 rounded-full blur-3xl opacity-60" />

              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-4 rounded-full bg-yellow-100 border border-yellow-300 text-gray-900 text-[10px] font-semibold uppercase tracking-wide">
                  <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                  </svg>
                  סטאק טכנולוגי מודרני
                </div>

                <h2 className="text-2xl md:text-3xl font-black mb-2 text-gray-900 leading-tight">
                  הטכנולוגיות שאנחנו עובדים איתן
                </h2>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  אתרים מהירים, מאובטחים ובעלי SEO מצוין — נבנים מכלים שמובילים את התעשייה
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {content.about.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-yellow-50 to-yellow-100 text-gray-900 rounded-lg text-sm font-bold border border-yellow-200 hover:from-yellow-100 hover:to-yellow-200 hover:scale-105 transition-all shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stat row */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-xl font-black text-yellow-600">100%</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">רספונסיבי</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black text-yellow-600">A+</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">דירוג ביצועים</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black text-yellow-600">SSL</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">אבטחה מתקדמת</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <BenefitsSection benefits={content.whyChooseMe} />

      {/* CTA */}
      <section className="py-6 bg-gradient-to-b from-gray-50 to-yellow-50">
        <Container>
          <div className="max-w-2xl mx-auto bg-white border-2 border-yellow-200 rounded-xl p-4 md:p-6 text-center shadow-sm">
            <h2 className="text-lg md:text-xl font-black mb-1.5 text-gray-900 leading-tight">
              מוכנים להתחיל את הפרויקט שלכם?
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              בואו נדבר ונראה איך אפשר להביא את העסק שלכם לאינטרנט
            </p>
            <Button
              href="/contact"
              variant="primary"
              size="sm"
            >
              צרו קשר עכשיו
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
