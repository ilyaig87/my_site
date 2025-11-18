import { Template } from '@/types';

interface PhotographerProps {
  template: Template;
}

export default function Photographer({ template }: PhotographerProps) {
  const { colors } = template;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
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

      {/* Portfolio Gallery Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 mb-12">
            {['הכל', 'חתונות', 'אירועים', 'תדמית', 'טבע'].map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: category === 'הכל' ? colors.accent : colors.secondary,
                  color: category === 'הכל' ? '#ffffff' : colors.text
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80',
              'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=600&q=80',
              'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80',
              'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
              'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80',
              'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=600&q=80',
              'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80',
              'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
              'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80',
              'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=600&q=80',
              'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80',
              'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
            ].map((image, idx) => (
              <div
                key={idx}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={image}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
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
    </div>
  );
}
