import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function PricingSection() {
  const packages = [
    {
      name: 'דף בודד',
      tagline: 'Landing Page מושלם',
      description: 'דף נחיתה יחיד למבצע, קמפיין או מוצר בודד',
      priceDisplay: '1,500 ₪',
      features: [
        'דף נחיתה יחיד (Landing Page)',
        'בחירת תבנית מהגלריה + התאמה אישית',
        'התאמה מלאה למובייל וטאבלט',
        'טופס יצירת קשר / לידים',
        'העלאה לדומיין שלכם',
        'חודש תיקוני באגים (לא שינויים)',
        'אופטימיזציה בסיסית ל-SEO',
      ],
      additions: [
        '+ דומיין ואחסון: 150 ₪/שנה',
        '+ עיצוב מותאם אישית: +500 ₪',
      ],
      highlighted: false,
      ctaText: 'בואו נדבר',
    },
    {
      name: 'אתר קטן',
      tagline: 'הכי פופולרי',
      description: 'אתר תדמית מלא לעסקים קטנים ובינוניים',
      priceDisplay: '2,500 ₪',
      features: [
        'עד 3 דפים (דף בית + 2 דפים נוספים)',
        'בחירת תבנית או עיצוב אישי',
        'התאמה מלאה למובייל וטאבלט',
        'טופס יצירת קשר',
        'גלריה / תמונות',
        'העלאה לדומיין שלכם',
        'חודש תיקוני באגים',
        'אופטימיזציה מלאה ל-SEO',
        'אינטגרציה עם WhatsApp',
      ],
      additions: [
        '+ דומיין ואחסון: 150 ₪/שנה',
        '+ דף נוסף: 300 ₪',
        '+ מסד נתונים (DB): 800 ₪',
      ],
      highlighted: true,
      ctaText: 'דברו איתי',
    },
    {
      name: 'אתר מורחב',
      tagline: 'לעסקים שרוצים יותר',
      description: 'אתר מלא עם יותר דפים ופיצ\'רים מתקדמים',
      priceDisplay: '4,000 ₪',
      features: [
        '5+ דפים',
        'עיצוב מותאם אישית במלואו',
        'התאמה מלאה למובייל וטאבלט',
        'גלריות מתקדמות',
        'בלוג (אופציונלי)',
        'אנימציות ואינטראקציות',
        'העלאה לדומיין שלכם',
        'חודש תיקוני באגים',
        'אופטימיזציה מתקדמת ל-SEO',
        'אינטגרציה עם כלים חיצוניים',
      ],
      additions: [
        '+ דומיין ואחסון: 150 ₪/שנה',
        '+ דף נוסף: 250 ₪',
        '+ מסד נתונים (DB): כלול',
        '+ תחזוקה חודשית: 200 ₪/חודש',
      ],
      highlighted: false,
      ctaText: 'בואו נדבר',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-yellow-100 border border-yellow-300 text-gray-900 text-sm font-semibold">
              <span>💰</span>
              <span>חבילות גמישות לכל תקציב</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900">
              בחרו את החבילה המתאימה לכם
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              המחירים שקופים וללא הפתעות. העלאה לדומיין כלולה
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-xl p-6 transition-all duration-300 ${
                  pkg.highlighted
                    ? 'bg-yellow-50 border-4 border-yellow-400 shadow-2xl md:-translate-y-2'
                    : 'bg-white border-2 border-gray-200 hover:border-yellow-300 hover:shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                      ⭐ הכי פופולרי
                    </div>
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center mb-6 mt-2">
                  <h3 className="text-2xl font-black mb-2 text-gray-900">
                    {pkg.name}
                  </h3>
                  <p className="text-sm font-semibold text-yellow-600 mb-2">
                    {pkg.tagline}
                  </p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="text-3xl font-black text-gray-900">
                    {pkg.priceDisplay}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Additions */}
                {pkg.additions && pkg.additions.length > 0 && (
                  <div className="mb-6 pt-4 border-t-2 border-gray-200">
                    <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">
                      תוספות אופציונליות
                    </p>
                    <ul className="space-y-1.5">
                      {pkg.additions.map((addition, additionIndex) => (
                        <li key={additionIndex} className="flex items-start gap-2">
                          <span className="text-yellow-600 text-sm font-bold">+</span>
                          <span className="text-gray-600 text-sm leading-relaxed">
                            {addition}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  href="#contact"
                  variant={pkg.highlighted ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                >
                  {pkg.ctaText}
                </Button>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-12 text-center">
            <p className="text-base text-gray-600 mb-4">
              לא בטוחים איזו חבילה מתאימה לכם?
            </p>
            <Button href="#contact" variant="outline" size="lg">
              שאלו אותנו
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
