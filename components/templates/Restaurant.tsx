import { Template } from '@/types';

interface RestaurantProps {
  template: Template;
}

export default function Restaurant({ template }: RestaurantProps) {
  const { colors } = template;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Hero Section */}
      <section
        className="relative py-56 px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: `${colors.primary}AA` }}></div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-2xl">
            חוויה קולינרית בלתי נשכחת
          </h1>
          <p className="text-2xl mb-8 italic text-white drop-shadow">
            מסעדה המשלבת מסורת עם חדשנות
          </p>
          <p className="text-lg max-w-3xl mx-auto mb-10 leading-relaxed text-white drop-shadow">
            גלו את הטעמים המיוחדים שלנו, שפים מקצועיים מכינים כל מנה באהבה ובתשומת לב לפרטים הקטנים
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="px-10 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: colors.accent, color: '#ffffff' }}
            >
              הזמנת שולחן
            </button>
            <button
              className="px-10 py-4 rounded-full font-semibold text-lg border-2 border-white text-white transition-all hover:scale-105 hover:bg-white/10"
            >
              צפו בתפריט
            </button>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-serif font-bold text-center mb-4" style={{ color: colors.primary }}>
            מהתפריט שלנו
          </h2>
          <p className="text-center text-lg mb-16 italic opacity-80">
            מבחר המנות המומלצות ביותר
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: 'סטייק אנטריקוט', desc: 'בשר איכותי בצליה מושלמת עם ירקות עונתיים', price: '₪120', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80' },
              { name: 'פסטה טרייה', desc: 'פסטה עבודת יד עם רטבי שף מיוחדים', price: '₪85', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80' },
              { name: 'דגים טריים', desc: 'דגי הים הטריים ביותר במיטב הכנה', price: '₪95', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80' },
              { name: 'סלט שף', desc: 'ירקות טריים עם רטב ייחודי של הבית', price: '₪55', image: 'https://images.unsplash.com/photo-1481931715705-36f1d8c0f59e?w=400&q=80' },
            ].map((dish, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 rounded-2xl transition-all hover:shadow-xl"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="w-32 h-32 rounded-xl flex-shrink-0 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-serif font-bold" style={{ color: colors.primary }}>
                      {dish.name}
                    </h3>
                    <span className="text-2xl font-bold" style={{ color: colors.accent }}>
                      {dish.price}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{dish.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6" style={{ color: colors.primary }}>
              הסיפור שלנו
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              מסעדה משפחתית הפועלת כבר 20 שנה. אנחנו מאמינים שאוכל טוב מתחיל עם חומרי גלם איכותיים
              ומסתיים עם הכנה קפדנית ואהבה רבה.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              השפים שלנו עובדים בלי לאות כדי להביא לכם את הטעמים הכי טובים והחוויה הכי מושלמת.
            </p>
            <button
              className="px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: colors.accent, color: '#ffffff' }}
            >
              קראו עוד
            </button>
          </div>
          <div
            className="h-96 rounded-2xl"
            style={{ backgroundColor: colors.primary, opacity: 0.1 }}
          >
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              תמונת מסעדה
            </div>
          </div>
        </div>
      </section>

      {/* Hours & Contact */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto text-center" style={{ color: colors.secondary }}>
          <h2 className="text-4xl font-serif font-bold mb-8">
            שעות פתיחה
          </h2>
          <div className="text-xl space-y-2 mb-12">
            <p>ראשון - חמישי: 12:00 - 23:00</p>
            <p>שישי - שבת: 11:00 - 00:00</p>
          </div>
          <button
            className="px-12 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-2xl"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            הזמינו שולחן עכשיו
          </button>
        </div>
      </section>
    </div>
  );
}
