import { Template } from '@/types';
import Button from '@/components/ui/Button';
import TemplateHeader from './common/TemplateHeader';
import TemplateFooter from './common/TemplateFooter';

export default function EventLanding({ template }: { template: Template }) {
  return (
    <div style={{ backgroundColor: template.colors.background }}>
      <TemplateHeader template={template} />
      {/* Hero with Countdown - Dramatic Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
          }}
        ></div>

        {/* Diagonal Accent Overlay */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
          }}
        ></div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-6 z-10 text-white text-center">
          {/* Badge */}
          <div className="inline-block px-6 py-3 mb-6 rounded-full text-lg font-bold" style={{
            backgroundColor: template.colors.accent,
            color: '#000000',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }}>
            ✨ אירוע השנה ✨
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 drop-shadow-2xl leading-tight">
            הכנס המשתלם
            <br />
            <span style={{ color: template.colors.accent }}>של 2025</span>
          </h1>

          <p className="text-2xl md:text-3xl mb-4 font-semibold drop-shadow-lg">
            15-16 במרץ • מרכז הירידים תל אביב
          </p>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            שני ימים של השראה, למידה ונטוורקינג עם המובילים בתעשייה
          </p>

          {/* Countdown Timer - Enhanced */}
          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto mb-12">
            {[
              { num: '15', label: 'ימים' },
              { num: '08', label: 'שעות' },
              { num: '42', label: 'דקות' },
              { num: '33', label: 'שניות' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="backdrop-blur-md p-6 rounded-2xl border-2 shadow-2xl"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: template.colors.accent
                }}
              >
                <div className="text-5xl md:text-6xl font-black mb-2" style={{ color: template.colors.accent }}>
                  {item.num}
                </div>
                <div className="text-sm md:text-base font-semibold uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="px-12 py-5 text-xl font-black uppercase rounded-lg shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-yellow-500/50"
              style={{
                backgroundColor: template.colors.accent,
                color: '#000000'
              }}
            >
              הרשמה עכשיו - 40% הנחה!
            </button>
            <button className="px-12 py-5 text-xl font-bold uppercase rounded-lg border-2 border-white text-white transition-all duration-300 hover:bg-white/10">
              צפה בתוכנית
            </button>
          </div>

          {/* Limited spots indicator */}
          <p className="mt-8 text-lg font-semibold animate-pulse" style={{ color: template.colors.accent }}>
            ⚡ נותרו רק 47 מקומות!
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16" style={{ color: template.colors.primary }}>המרצים שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">שם המרצה</h3>
                <p className="text-gray-600">מומחה בתחום</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: template.colors.secondary, color: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-8">לא להחמיץ!</h2>
          <Button href="/register" size="lg">
            הרשמה לכנס
          </Button>
        </div>
      </section>

      <TemplateFooter template={template} />
    </div>
  );
}
