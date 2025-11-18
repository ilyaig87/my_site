import { Template } from '@/types';
import TemplateHeader from './common/TemplateHeader';
import TemplateFooter from './common/TemplateFooter';

interface CreativeAgencyProps {
  template: Template;
}

export default function CreativeAgency({ template }: CreativeAgencyProps) {
  const { colors } = template;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      <TemplateHeader template={template} />
      {/* Hero Section */}
      <section
        className="relative py-56 px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary}DD 0%, ${colors.accent}DD 100%)` }}></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-7xl md:text-8xl font-black mb-6 text-white uppercase tracking-tight drop-shadow-2xl">
            Create<br />Amazing<br />Things
          </h1>
          <p className="text-2xl md:text-3xl mb-10 text-white">
            סוכנות קריאייטיבית שהופכת רעיונות למציאות
          </p>
          <button className="px-12 py-5 rounded-full font-bold text-xl bg-white transition-all hover:scale-110 shadow-2xl" style={{ color: colors.primary }}>
            בואו נדבר
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-20 bg-white"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-20 bg-white"></div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4 uppercase" style={{ color: colors.primary }}>
            מה אנחנו עושים
          </h2>
          <p className="text-center text-lg mb-16 opacity-80" style={{ color: colors.text }}>
            שירותים קריאייטיביים מקיפים
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'עיצוב מותג', icon: '🎨', desc: 'יצירת זהות ויזואלית ייחודית ובולטת' },
              { title: 'פיתוח דיגיטלי', icon: '💻', desc: 'אתרים ואפליקציות חדשניים' },
              { title: 'שיווק דיגיטלי', icon: '📱', desc: 'קמפיינים יצירתיים ומותאמים אישית' },
              { title: 'יצירת תוכן', icon: '✨', desc: 'תוכן ויזואלי וכתוב שמספר סיפור' },
              { title: 'וידאו ואנימציה', icon: '🎬', desc: 'הפקות וידאו וגרפיקה מרהיבות' },
              { title: 'אסטרטגיה', icon: '🎯', desc: 'ייעוץ אסטרטגי לצמיחה' },
            ].map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl transition-all hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}
                ></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
                    {service.title}
                  </h3>
                  <p className="opacity-80" style={{ color: colors.text }}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 uppercase" style={{ color: colors.primary }}>
            הפרויקטים שלנו
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', title: 'פרויקט Creative Wave' },
              { image: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=800&q=80', title: 'מיתוג Color Burst' },
              { image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80', title: 'עיצוב Digital Flow' },
              { image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=800&q=80', title: 'קמפיין Brand Studio' },
            ].map((project, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-all cursor-pointer group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}
                  >
                    <span className="text-white font-bold text-2xl">צפה בפרויקט →</span>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
                    {project.title}
                  </h3>
                  <p className="opacity-70" style={{ color: colors.text }}>עיצוב מותג מלא ופיתוח דיגיטלי</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Process Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4 uppercase" style={{ color: colors.primary }}>
            התהליך שלנו
          </h2>
          <p className="text-center text-lg mb-16 opacity-80" style={{ color: colors.text }}>
            מרעיון להשקה ב-4 שלבים
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'מחקר', desc: 'הבנת הצרכים והמטרות' },
              { step: '02', title: 'עיצוב', desc: 'פיתוח קונספט ויזואלי' },
              { step: '03', title: 'ביצוע', desc: 'הפקה והטמעה' },
              { step: '04', title: 'השקה', desc: 'פרסום ומעקב' },
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-7xl font-black mb-4 opacity-20"
                  style={{ color: colors.accent }}
                >
                  {phase.step}
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
                  {phase.title}
                </h3>
                <p className="opacity-80" style={{ color: colors.text }}>{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-28 px-6"
        style={{
          background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-6 uppercase text-white">
            יש לכם רעיון?
          </h2>
          <p className="text-2xl mb-12 text-white opacity-90">
            בואו נהפוך אותו למציאות מדהימה
          </p>
          <button
            className="px-16 py-6 rounded-full font-black text-2xl uppercase transition-all hover:scale-110 shadow-2xl"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            Let's Talk!
          </button>
        </div>
      </section>

      <TemplateFooter template={template} />
    </div>
  );
}
