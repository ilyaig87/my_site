import { Template } from '@/types';
import Button from '@/components/ui/Button';

export default function ModernCoach({ template }: { template: Template }) {
  return (
    <div className="min-h-screen">
      {/* Hero with Gradient */}
      <section
        className="relative py-64 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${template.colors.primary}DD 0%, ${template.colors.secondary}DD 100%)` }}></div>

        <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl" style={{ fontFamily: template.typography.headingFont }}>
            השגת מטרות זה כאן
          </h1>
          <p className="text-2xl mb-8">
            אני כאן כדי להוביל אותך למקום שבו אתה רוצה להיות
          </p>
          <div className="flex gap-4 justify-center">
            <Button href="/contact" size="lg">
              התחל עכשיו
            </Button>
            <Button href="#about" size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              קרא עוד
            </Button>
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
    </div>
  );
}
