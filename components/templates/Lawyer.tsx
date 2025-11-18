import { Template } from '@/types';

interface LawyerProps {
  template: Template;
}

export default function Lawyer({ template }: LawyerProps) {
  const { colors } = template;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Hero Section */}
      <section
        className="relative py-48 px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1528747045269-390fe33c19d2?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: `${colors.primary}DD` }}></div>

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg">
              ייצוג משפטי ברמה הגבוהה ביותר
            </h1>
            <p className="text-xl mb-8 leading-relaxed drop-shadow">
              משרד עורכי דין מוביל עם ניסיון של למעלה מ-25 שנה בכל תחומי המשפט
            </p>
            <div className="flex gap-4">
              <button
                className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
                style={{ backgroundColor: colors.accent, color: '#ffffff' }}
              >
                ייעוץ ראשוני חינם
              </button>
              <button className="px-8 py-4 rounded-lg font-semibold border-2 border-white text-white transition-all hover:scale-105 hover:bg-white/10">
                תחומי עיסוק
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-4" style={{ color: colors.primary }}>
            תחומי התמחות
          </h2>
          <p className="text-center text-lg mb-16 opacity-80">
            מומחיות משפטית בכל התחומים
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'משפט אזרחי', icon: '⚖️', desc: 'ייצוג בתביעות אזרחיות, חוזים ונזיקין' },
              { title: 'משפט מסחרי', icon: '💼', desc: 'ליווי עסקאות, מיזוגים ורכישות' },
              { title: 'משפט פלילי', icon: '🔒', desc: 'הגנה פלילית מקצועית ומסורה' },
              { title: 'דיני משפחה', icon: '👨‍👩‍👧', desc: 'גירושין, משמורת וחלוקת רכוש' },
              { title: 'דיני עבודה', icon: '🤝', desc: 'ייצוג עובדים ומעסיקים' },
              { title: 'נדל"ן ומקרקעין', icon: '🏢', desc: 'עסקאות נדל"ן והסכמי שכירות' },
            ].map((area, index) => (
              <div
                key={index}
                className="p-8 rounded-xl border-2 transition-all hover:shadow-xl hover:scale-105"
                style={{ borderColor: colors.secondary, backgroundColor: '#ffffff' }}
              >
                <div className="text-5xl mb-4">{area.icon}</div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
                  {area.title}
                </h3>
                <p className="opacity-80 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-16" style={{ color: colors.primary }}>
            למה לבחור בנו
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '25+', label: 'שנות ניסיון' },
              { number: '1000+', label: 'לקוחות מרוצים' },
              { number: '95%', label: 'אחוז הצלחה' },
              { number: '24/7', label: 'זמינות' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-3" style={{ color: colors.accent }}>
                  {stat.number}
                </div>
                <div className="text-lg font-semibold opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-4" style={{ color: colors.primary }}>
            עורכי הדין שלנו
          </h2>
          <p className="text-center text-lg mb-16 opacity-80">
            צוות משפטי מקצועי ומנוסה
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&q=80', name: 'עו"ד דוד כהן', position: 'שותף בכיר' },
              { image: 'https://images.unsplash.com/photo-1531498680898-915b3c7e07bf?w=600&q=80', name: 'עו"ד שרה לוי', position: 'שותפה מייסדת' },
              { image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&q=80', name: 'עו"ד מיכאל גולן', position: 'שותף בכיר' },
            ].map((lawyer, idx) => (
              <div key={idx} className="text-center">
                <div className="w-48 h-48 mx-auto rounded-lg mb-6 overflow-hidden shadow-lg">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
                  {lawyer.name}
                </h3>
                <p className="text-lg mb-3" style={{ color: colors.accent }}>
                  {lawyer.position}
                </p>
                <p className="opacity-80 max-w-sm mx-auto">
                  מתמחה במשפט אזרחי ומסחרי עם ניסיון של 15 שנה
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-serif font-bold mb-6">
            זקוקים לייעוץ משפטי?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            קבעו פגישת ייעוץ ראשונית ללא התחייבות
          </p>
          <button
            className="px-12 py-5 rounded-lg font-bold text-lg transition-all hover:scale-105"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            צרו קשר עוד היום
          </button>
        </div>
      </section>
    </div>
  );
}
