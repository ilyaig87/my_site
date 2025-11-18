import { Template } from '@/types';
import TemplateHeader from './common/TemplateHeader';
import TemplateFooter from './common/TemplateFooter';

interface RealEstateProps {
  template: Template;
}

export default function RealEstate({ template }: RealEstateProps) {
  const { colors } = template;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      <TemplateHeader template={template} />
      {/* Modern Fullwidth Hero with Search */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to right, ${colors.primary}EE 0%, ${colors.primary}88 50%, transparent 100%)`
        }}></div>

        <div className="relative max-w-7xl mx-auto px-6 z-10 w-full">
          <div className="max-w-2xl text-white">
            <div className="inline-block px-4 py-2 mb-6 rounded-full text-sm font-semibold" style={{
              backgroundColor: colors.accent,
              color: '#000000'
            }}>
              מצא את הנכס המושלם
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              הבית של החלומות
              <br />
              <span style={{ color: colors.accent }}>מחכה לך</span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 opacity-90">
              למעלה מ-500 נכסים פרימיום למכירה והשכרה
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-xl">
              <div className="flex gap-4 flex-wrap mb-4">
                <button className="px-6 py-2 rounded-lg font-semibold transition-colors" style={{
                  backgroundColor: colors.primary,
                  color: '#ffffff'
                }}>
                  קנייה
                </button>
                <button className="px-6 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
                  השכרה
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="עיר או שכונה"
                  className="px-4 py-3 rounded-lg border border-gray-300 text-gray-900"
                />
                <select className="px-4 py-3 rounded-lg border border-gray-300 text-gray-900">
                  <option>סוג נכס</option>
                  <option>דירה</option>
                  <option>בית</option>
                  <option>פנטהאוז</option>
                </select>
              </div>
              <button
                className="w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: colors.accent,
                  color: '#000000'
                }}
              >
                חיפוש נכסים
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: colors.primary }}>
            נכסים נבחרים
          </h2>
          <p className="text-center text-lg mb-12 opacity-80">
            מבחר הנכסים האיכותיים ביותר באזור
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&q=80', title: 'דירת גן מפוארת', price: '₪2.5M', rooms: 5, size: 150 },
              { image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', title: 'דירת פנטהאוז', price: '₪3.2M', rooms: 6, size: 200 },
              { image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80', title: 'דירת 4 חדרים', price: '₪1.8M', rooms: 4, size: 120 },
              { image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&q=80', title: 'דופלקס מרווח', price: '₪2.9M', rooms: 5, size: 180 },
              { image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', title: 'דירת יוקרה', price: '₪4.5M', rooms: 7, size: 250 },
              { image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80', title: 'דירת סטודיו', price: '₪1.2M', rooms: 2, size: 60 },
            ].map((property, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105" style={{ backgroundColor: '#ffffff' }}>
                <div className="h-64 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold" style={{ color: colors.text }}>{property.title}</h3>
                    <span className="text-2xl font-bold" style={{ color: colors.primary }}>{property.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">תל אביב, רחוב הרצל {123 + idx}</p>
                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <span>🛏️ {property.rooms} חדרים</span>
                    <span>📐 {property.size} מ"ר</span>
                    <span>🏢 קומה 3</span>
                  </div>
                  <button
                    className="w-full py-3 rounded-lg font-semibold transition-colors hover:opacity-90"
                    style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                  >
                    פרטים נוספים
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>
            מוכנים למצוא את הנכס המושלם?
          </h2>
          <p className="text-xl mb-8 opacity-80">
            הסוכנים המקצועיים שלנו כאן לעזור לכם בכל שלב
          </p>
          <button
            className="px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            style={{ backgroundColor: colors.primary, color: colors.secondary }}
          >
            צרו קשר עכשיו
          </button>
        </div>
      </section>

      <TemplateFooter template={template} />
    </div>
  );
}
