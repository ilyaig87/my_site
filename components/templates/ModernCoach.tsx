import { Template } from '@/types';
import Button from '@/components/ui/Button';
import TemplateHeader from './common/TemplateHeader';
import TemplateFooter from './common/TemplateFooter';

export default function ModernCoach({ template }: { template: Template }) {
  return (
    <div className="min-h-screen">
      <TemplateHeader template={template} />
      {/* Inspirational Hero with Quote */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background with Parallax Feel */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
          }}
        ></div>

        {/* Soft Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${template.colors.primary}CC 0%, ${template.colors.secondary}99 100%)`
          }}
        ></div>

        <div className="relative max-w-5xl mx-auto px-6 z-10 text-white">
          {/* Inspirational Quote Section */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 italic">
                "השינוי שאתה רוצה לראות
                <br />
                <span className="font-bold" style={{ color: template.colors.accent }}>
                  מתחיל ממך"
                </span>
              </h1>
            </div>

            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: template.colors.accent }}></div>

            <p className="text-2xl md:text-3xl mb-4 font-semibold">
              אני כאן כדי להוביל אותך למקום שבו אתה רוצה להיות
            </p>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              קואצ'ינג אישי ומקצועי להשגת מטרות ופריצת גבולות
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button href="/contact" size="lg">
                בואו נדבר
              </Button>
              <button className="px-10 py-4 text-lg font-semibold border-2 border-white text-white rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105">
                סיפורי הצלחה
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center gap-12 flex-wrap text-center">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: template.colors.accent }}>10+</div>
              <div className="text-sm uppercase tracking-wider opacity-80">שנות ניסיון</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: template.colors.accent }}>200+</div>
              <div className="text-sm uppercase tracking-wider opacity-80">לקוחות מרוצים</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: template.colors.accent }}>95%</div>
              <div className="text-sm uppercase tracking-wider opacity-80">השגת מטרות</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16" style={{ color: template.colors.primary }}>
            תהליך העבודה
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['פגישת היכרות', 'הגדרת מטרות', 'תוכנית פעולה', 'ליווי והצלחה'].map((step, idx) => (
              <div key={idx} className="text-center relative">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: template.colors.primary }}
                >
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step}</h3>
                <p className="text-gray-600">תיאור קצר של כל שלב בתהליך</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${template.colors.primary}EE, ${template.colors.secondary}EE)` }}></div>

        <div className="relative max-w-6xl mx-auto px-4 text-white text-center z-10">
          <h2 className="text-5xl font-bold mb-12 drop-shadow-lg">התוצאות מדברות בעד עצמן</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '200+', text: 'לקוחות מרוצים' },
              { number: '95%', text: 'השגת מטרות' },
              { number: '10+', text: 'שנות ניסיון' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-6xl font-bold mb-2 drop-shadow-lg" style={{ color: template.colors.accent }}>{stat.number}</div>
                <div className="text-xl">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6" style={{ color: template.colors.primary }}>
            מוכן לשינוי?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            בואו נתחיל את המסע שלך להצלחה ביחד
          </p>
          <Button href="/contact" size="lg">
            קבע פגישת ייעוץ חינם
          </Button>
        </div>
      </section>

      <TemplateFooter template={template} />
    </div>
  );
}
