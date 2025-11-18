import { Template } from '@/types';
import TemplateHeader from './common/TemplateHeader';
import TemplateFooter from './common/TemplateFooter';

interface PhotographerProps {
  template: Template;
}

export default function Photographer({ template }: PhotographerProps) {
  const { colors } = template;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      <TemplateHeader template={template} />
      {/* Hero Section */}
      <section
        className="relative py-64 px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6" style={{ color: colors.accent }}>
            לוכדים רגעים שנשארים לנצח
          </h1>
          <p className="text-xl md:text-2xl mb-10 italic text-white">
            צילום אומנותי ומקצועי לכל אירוע
          </p>
          <button
            className="px-10 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
            style={{ backgroundColor: colors.accent, color: '#000000' }}
          >
            צפו בפורטפוליו
          </button>
        </div>
      </section>

      {/* Masonry Gallery - Pinterest Style */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {['הכל', 'חתונות', 'אירועים', 'תדמית', 'טבע'].map((category) => (
              <button
                key={category}
                className="px-5 py-2 text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor: category === 'הכל' ? colors.accent : 'transparent',
                  color: category === 'הכל' ? '#000000' : colors.text,
                  border: category === 'הכל' ? 'none' : `1px solid ${colors.text}33`
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid Layout */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[
              { img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80', tall: true },
              { img: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=600&q=80', tall: false },
              { img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80', tall: false },
              { img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', tall: true },
              { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', tall: false },
              { img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', tall: true },
              { img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80', tall: false },
              { img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80', tall: true },
              { img: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=600&q=80', tall: false },
              { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', tall: true },
              { img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', tall: false },
              { img: 'https://images.unsplash.com/photo-1543599538-a6c4483d8dd2?w=600&q=80', tall: false },
            ].map((item, idx) => (
              <div
                key={idx}
                className="break-inside-avoid mb-4 group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={item.img}
                    alt={`Gallery ${idx + 1}`}
                    className={`w-full ${item.tall ? 'h-96' : 'h-64'} object-cover transition-all duration-500 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Photographer */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div
            className="h-96 rounded-2xl"
            style={{ backgroundColor: colors.primary, opacity: 0.1 }}
          >
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              תמונת צלם
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6" style={{ color: colors.primary }}>
              אודות הצלם
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              צלם מקצועי עם ניסיון של למעלה מ-15 שנה בתחום הצילום האומנותי והמסחרי.
              מתמחה בצילומי חתונות, אירועים ותדמית.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              כל תמונה מספרת סיפור, וכל סיפור ראוי להיות מסופר בצורה הטובה ביותר.
              אני כאן כדי ללכוד את הרגעים המיוחדים שלכם.
            </p>
            <div className="flex gap-6">
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: colors.accent }}>500+</div>
                <div className="text-sm opacity-70">פרויקטים</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: colors.accent }}>15+</div>
                <div className="text-sm opacity-70">שנות ניסיון</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{ color: colors.accent }}>20+</div>
                <div className="text-sm opacity-70">פרסים</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Packages */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-4" style={{ color: colors.primary }}>
            חבילות צילום
          </h2>
          <p className="text-center text-lg mb-12 opacity-80">
            בחרו את החבילה המתאימה לכם
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'חבילה בסיסית', hours: '3 שעות', photos: '100 תמונות', price: '₪2,500' },
              { name: 'חבילה מורחבת', hours: '6 שעות', photos: '250 תמונות', price: '₪4,500' },
              { name: 'חבילה פרימיום', hours: '8 שעות', photos: '500 תמונות', price: '₪7,000' },
            ].map((pkg, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border-2 transition-all hover:shadow-2xl"
                style={{ borderColor: colors.primary, backgroundColor: '#ffffff' }}
              >
                <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
                  {pkg.name}
                </h3>
                <div className="space-y-4 mb-8">
                  <p className="text-lg">📸 {pkg.photos}</p>
                  <p className="text-lg">⏱️ {pkg.hours}</p>
                  <p className="text-lg">💿 אלבום דיגיטלי</p>
                  <p className="text-lg">✨ עריכה מקצועית</p>
                </div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold" style={{ color: colors.accent }}>
                    {pkg.price}
                  </div>
                </div>
                <button
                  className="w-full py-3 rounded-lg font-semibold transition-colors"
                  style={{ backgroundColor: colors.primary, color: colors.secondary }}
                >
                  צור קשר
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto text-center" style={{ color: colors.secondary }}>
          <h2 className="text-4xl font-serif font-bold mb-6">
            בואו ניצור יחד משהו מיוחד
          </h2>
          <p className="text-xl mb-10 opacity-90">
            צרו קשר עוד היום לקבלת הצעת מחיר
          </p>
          <button
            className="px-12 py-5 rounded-full font-bold text-lg transition-all hover:scale-105"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            שלחו הודעה
          </button>
        </div>
      </section>

      <TemplateFooter template={template} />
    </div>
  );
}
