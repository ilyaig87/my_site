import { Template } from '@/types';
import Button from '@/components/ui/Button';

interface ClassicBusinessProps {
  template: Template;
}

export default function ClassicBusiness({ template }: ClassicBusinessProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative py-48 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: template.typography.headingFont }}>
            פתרונות עסקיים מקצועיים
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90" style={{ fontFamily: template.typography.bodyFont }}>
            אנחנו מספקים שירותים איכותיים לעסקים בכל הגדלים
          </p>
          <Button
            href="/contact"
            size="lg"
            className="inline-block"
          >
            בואו נדבר
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: template.colors.primary, fontFamily: template.typography.headingFont }}>
            השירותים שלנו
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'ייעוץ עסקי',
                image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&q=80'
              },
              {
                title: 'פתרונות דיגיטליים',
                image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80'
              },
              {
                title: 'ליווי אישי',
                image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80'
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: template.colors.primary }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    אנחנו מספקים שירות מקצועי ואיכותי שמתאים בדיוק לצרכים שלכם.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20" style={{ backgroundColor: template.colors.primary }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '500+', label: 'לקוחות מרוצים' },
              { number: '15', label: 'שנות ניסיון' },
              { number: '98%', label: 'שביעות רצון' },
              { number: '24/7', label: 'תמיכה' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold mb-2" style={{ color: template.colors.accent }}>
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: template.colors.primary }}>
            מה הלקוחות שלנו אומרים
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-lg">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-6 h-6" style={{ color: template.colors.accent }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-lg">
                  "שירות מעולה ומקצועי! הצוות ליווה אותנו לאורך כל הדרך והתוצאות מדברות בעד עצמן."
                </p>
                <div className="font-semibold" style={{ color: template.colors.primary }}>
                  שם הלקוח
                </div>
                <div className="text-gray-600">מנכ\"ל, חברת דוגמה</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: template.colors.accent }}>
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">מוכנים להתחיל?</h2>
          <p className="text-xl mb-8">בואו נדבר על איך נוכל לעזור לעסק שלכם לצמוח</p>
          <Button
            href="/contact"
            size="lg"
            className="bg-white hover:bg-gray-100 text-blue-600"
          >
            צרו קשר עכשיו
          </Button>
        </div>
      </section>
    </div>
  );
}
