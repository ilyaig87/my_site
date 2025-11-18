import { Template } from '@/types';

interface MiniShopProps {
  template: Template;
}

export default function MiniShop({ template }: MiniShopProps) {
  const { colors } = template;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Hero Section */}
      <section
        className="py-20 px-6"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            החנות המקוונת שלנו
          </h1>
          <p className="text-xl md:text-2xl mb-10">
            מוצרים ייחודיים באיכות הגבוהה ביותר, משלוח מהיר לכל הארץ
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 rounded-full font-semibold text-lg bg-white transition-all hover:scale-105" style={{ color: colors.primary }}>
              צפו בקטלוג
            </button>
            <button className="px-8 py-4 rounded-full font-semibold text-lg border-2 border-white text-white transition-all hover:scale-105">
              WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-6" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {['הכל', 'חדש', 'פופולרי', 'מבצעים', 'אביזרים', 'מתנות'].map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: category === 'הכל' ? colors.primary : '#ffffff',
                  color: category === 'הכל' ? '#ffffff' : colors.text,
                  border: `2px solid ${category === 'הכל' ? colors.primary : '#e5e7eb'}`
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
              'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
              'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80',
              'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
              'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
              'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80',
            ].map((image, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img src={image} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: colors.accent }}
                  >
                    -20%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>
                    {['שעון חכם', 'אוזניות', 'מצלמה', 'משקפיים', 'נעליים', 'תיק', 'בקבוק', 'טבעת'][idx]}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">תיאור קצר של המוצר המדהים הזה</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold" style={{ color: colors.primary }}>
                      ₪{[99, 149, 199, 79, 249, 129, 49, 89][idx]}
                    </span>
                    <span className="text-sm text-gray-400 line-through">₪{[129, 199, 259, 99, 329, 169, 69, 119][idx]}</span>
                  </div>
                  <button
                    className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                  >
                    🛒 הוסף לסל
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🚚', title: 'משלוח מהיר', desc: 'עד 3 ימי עסקים' },
              { icon: '💳', title: 'תשלום מאובטח', desc: 'כל אמצעי התשלום' },
              { icon: '↩️', title: 'החזרות בקלות', desc: '14 ימים להחזרה' },
              { icon: '💬', title: 'שירות לקוחות', desc: 'זמינים 24/7' },
            ].map((feature, index) => (
              <div key={index}>
                <div className="text-5xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: colors.primary }}>
                  {feature.title}
                </h3>
                <p className="text-sm opacity-70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-6xl mb-6">💬</div>
          <h2 className="text-4xl font-bold mb-6">
            יש שאלות? דברו איתנו
          </h2>
          <p className="text-xl mb-10 opacity-90">
            צוות השירות שלנו זמין בוואטסאפ לכל שאלה
          </p>
          <button
            className="px-12 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 inline-flex items-center gap-3"
            style={{ backgroundColor: '#25D366', color: '#ffffff' }}
          >
            <span>📱</span>
            <span>שלחו הודעה בוואטסאפ</span>
          </button>
        </div>
      </section>
    </div>
  );
}
