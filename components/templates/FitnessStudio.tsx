import { Template } from '@/types';

interface FitnessStudioProps {
  template: Template;
}

export default function FitnessStudio({ template }: FitnessStudioProps) {
  const { colors } = template;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Hero Section */}
      <section
        className="relative py-56 px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary}DD 0%, ${colors.secondary}DD 100%)` }}></div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-6xl md:text-7xl font-black mb-6 uppercase text-white drop-shadow-2xl">
            התחל את המסע שלך
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-semibold drop-shadow-lg" style={{ color: colors.accent }}>
            הפוך לגרסה הטובה ביותר של עצמך
          </p>
          <p className="text-xl mb-10 text-white max-w-2xl mx-auto drop-shadow">
            סטודיו כושר מתקדם עם מאמנים מקצועיים, ציוד חדיש ואווירה מוטיבציונית
          </p>
          <button
            className="px-12 py-5 rounded-full font-bold text-xl uppercase transition-all hover:scale-110 shadow-2xl"
            style={{ backgroundColor: colors.accent, color: colors.secondary }}
          >
            הצטרף עכשיו
          </button>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4 uppercase" style={{ color: colors.primary }}>
            השיעורים שלנו
          </h2>
          <p className="text-center text-lg mb-16 opacity-80">
            מגוון רחב של אימונים לכל רמה
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'HIIT', time: '45 דקות', level: 'מתקדם', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80' },
              { name: 'פילאטיס', time: '60 דקות', level: 'כל הרמות', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80' },
              { name: 'יוגא', time: '60 דקות', level: 'מתחילים', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80' },
              { name: 'ספינינג', time: '45 דקות', level: 'ביניים', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80' },
              { name: 'TRX', time: '50 דקות', level: 'מתקדם', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80' },
              { name: 'אימון כוח', time: '60 דקות', level: 'כל הרמות', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80' },
            ].map((classItem, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={classItem.image}
                    alt={classItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: colors.primary }}>
                    {classItem.name}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-lg font-semibold">⏱️ {classItem.time}</p>
                    <p className="text-lg font-semibold" style={{ color: colors.accent }}>
                      📊 {classItem.level}
                    </p>
                  </div>
                  <button
                    className="w-full py-3 rounded-lg font-bold uppercase transition-colors"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                  >
                    לוח זמנים
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 uppercase text-white">
            חבילות מחירים
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'בסיסי', price: '₪299', period: 'לחודש' },
              { name: 'פרימיום', price: '₪499', period: 'לחודש', popular: true },
              { name: 'VIP', price: '₪799', period: 'לחודש' },
            ].map((plan, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl text-center relative"
                style={{
                  backgroundColor: plan.popular ? colors.accent : '#ffffff',
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full font-bold text-sm"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                  >
                    הכי פופולרי
                  </div>
                )}
                <h3 className="text-2xl font-black mb-4 uppercase" style={{ color: plan.popular ? colors.secondary : colors.primary }}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-5xl font-black" style={{ color: plan.popular ? colors.secondary : colors.primary }}>
                    {plan.price}
                  </span>
                  <span className="text-lg opacity-80">/{plan.period}</span>
                </div>
                <button
                  className="w-full py-4 rounded-lg font-bold uppercase transition-all hover:scale-105"
                  style={{
                    backgroundColor: plan.popular ? colors.secondary : colors.primary,
                    color: plan.popular ? colors.primary : '#ffffff'
                  }}
                >
                  הצטרף
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-5xl font-black mb-6 uppercase">
            מוכן להתחיל?
          </h2>
          <p className="text-2xl mb-10">
            קבל שיעור ניסיון חינם עכשיו!
          </p>
          <button
            className="px-12 py-5 rounded-full font-bold text-xl uppercase transition-all hover:scale-110 shadow-2xl"
            style={{ backgroundColor: colors.accent, color: colors.secondary }}
          >
            צור קשר
          </button>
        </div>
      </section>
    </div>
  );
}
