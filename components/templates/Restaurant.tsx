import { Template } from '@/types';
import TemplateHeader from './common/TemplateHeader';
import TemplateFooter from './common/TemplateFooter';

interface RestaurantProps {
  template: Template;
}

export default function Restaurant({ template }: RestaurantProps) {
  const { colors } = template;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      <TemplateHeader template={template} />
      {/* Split Screen Hero */}
      <section className="relative min-h-screen flex">
        {/* Left Side - Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-12" style={{ backgroundColor: colors.primary }}>
          <div className="max-w-xl text-white">
            <div className="border-t-4 border-b-4 py-6 mb-8" style={{ borderColor: colors.accent }}>
              <h1 className="text-6xl md:text-7xl font-serif font-bold text-center">
                Brasserie
              </h1>
            </div>
            <p className="text-2xl mb-6 italic text-center" style={{ color: colors.accent }}>
              מטבח ים תיכוני עכשווי
            </p>
            <p className="text-lg leading-relaxed mb-8 text-center opacity-90">
              חוויה קולינרית בלתי נשכחת עם שפים עטורי פרסים
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-8 py-3 font-semibold text-lg transition-all duration-300 hover:tracking-wider"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  border: `2px solid ${colors.accent}`
                }}
              >
                הזמנת שולחן
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div
          className="hidden md:block w-1/2"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </section>

      {/* Elegant Menu Section */}
      <section className="py-24 px-6" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block border-b-2 pb-4 mb-4" style={{ borderColor: colors.accent }}>
              <h2 className="text-5xl font-serif font-bold" style={{ color: colors.primary }}>
                התפריט
              </h2>
            </div>
            <p className="text-lg italic opacity-70">
              מנות השף המומלצות
            </p>
          </div>

          <div className="space-y-8">
            {[
              { name: 'קרפצ\'יו בקר', desc: 'פרוסות בשר בקר דקות, שמן טרופלס, פרמזן', price: '₪68' },
              { name: 'טרטר סלמון', desc: 'סלמון טרי, אבוקדו, שמן זית וליים', price: '₪78' },
              { name: 'ריזוטו פטריות', desc: 'אורז ארבוריו, פטריות יער, פרמזן', price: '₪92' },
              { name: 'אנטריקוט 300 גרם', desc: 'בשר בקר מיושן, ירקות עונתיים, רוטב יין', price: '₪145' },
              { name: 'דג ים על הגריל', desc: 'דג טרי של היום, טאבולה ים תיכונית', price: '₪125' },
              { name: 'פסטה טריפה שחורה', desc: 'פירות ים, עגבניות שרי, בזיליקום', price: '₪98' },
            ].map((dish, index) => (
              <div key={index} className="border-b border-gray-300 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-serif font-semibold" style={{ color: colors.primary }}>
                    {dish.name}
                  </h3>
                  <span className="text-2xl font-serif font-semibold" style={{ color: colors.accent }}>
                    {dish.price}
                  </span>
                </div>
                <p className="text-base opacity-70 italic">{dish.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              className="px-10 py-4 font-serif font-semibold text-lg transition-all duration-300 hover:tracking-wider border-2"
              style={{
                color: colors.primary,
                borderColor: colors.primary,
                backgroundColor: 'transparent'
              }}
            >
              תפריט מלא
            </button>
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

      <TemplateFooter template={template} />
    </div>
  );
}
