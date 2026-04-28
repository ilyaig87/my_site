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
        'דומיין ואחסון: 300 ₪/שנה',
        'עיצוב מותאם אישית: +500 ₪',
      ],
      highlighted: false,
      ctaText: 'דברו איתי',
    },
    {
      name: 'אתר תדמית',
      tagline: 'הבחירה המומלצת לעסקים',
      description: 'אתר מלא עם כל מה שצריך לנוכחות מקצועית',
      priceDisplay: '3,000 ₪',
      features: [
        'עד 4 דפים (דף בית + 3 דפים נוספים)',
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
        'דומיין ואחסון: 300 ₪/שנה',
        'דף נוסף: 300 ₪',
        'מסד נתונים (DB): מ-800 ₪ (בתיאום)',
      ],
      highlighted: true,
      ctaText: 'דברו איתי',
    },
    {
      name: 'אתר מורחב',
      tagline: 'לעסקים שרוצים יותר',
      description: 'אתר מלא עם יותר דפים ופיצ\'רים מתקדמים',
      priceDisplay: '5,000 ₪',
      features: [
        '5+ דפים',
        'עיצוב מותאם אישית במלואו',
        'התאמה מלאה למובייל וטאבלט',
        'גלריות מתקדמות',
        'בלוג (אופציונלי)',
        'אנימציות ואינטראקציות',
        'העלאה לדומיין שלכם',
        'חודשיים תיקוני באגים',
        'אופטימיזציה מתקדמת ל-SEO',
        'אינטגרציה עם כלים חיצוניים (Google Analytics, Pixel)',
      ],
      additions: [
        'דומיין ואחסון: 300 ₪/שנה',
        'דף נוסף: 250 ₪',
        'מסד נתונים (DB): מ-800 ₪ (בתיאום)',
        'פאנל ניהול תוכן: מ-1,200 ₪ (בתיאום)',
        'תחזוקה חודשית: 200 ₪/חודש',
      ],
      highlighted: false,
      ctaText: 'דברו איתי',
    },
  ];

  return (
    <section className="py-6 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-2 rounded-full bg-yellow-100 border border-yellow-300 text-gray-900 text-[10px] font-medium">
              <span>💰</span>
              <span>חבילות גמישות לכל תקציב</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black mb-1 text-gray-900">
              בחרו את החבילה המתאימה לכם
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              מחירים חד-פעמיים שקופים, ללא הפתעות
            </p>
          </div>

          {/* Tech advantage banner */}
          <div className="max-w-3xl mx-auto mb-4 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-gray-700">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span><b>אתר מהיר במיוחד</b> — נבנה ב-Next.js / React</span>
              </div>
              <span className="text-yellow-300 hidden md:inline">•</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span><b>SEO ידידותי</b> ל-Google</span>
              </div>
              <span className="text-yellow-300 hidden md:inline">•</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001z" />
                </svg>
                <span><b>אבטחה ויציבות</b> ברמה גבוהה</span>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-3 gap-3 items-stretch">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-lg p-3 transition-all duration-300 flex flex-col ${
                  pkg.highlighted
                    ? 'bg-yellow-50 border-2 border-yellow-400 shadow-xl md:-translate-y-1'
                    : 'bg-white border-2 border-gray-200 hover:border-yellow-300 hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {pkg.highlighted && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-lg whitespace-nowrap">
                      ⭐ הכי פופולרי
                    </div>
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center mb-3 mt-1">
                  <h3 className="text-base font-black mb-1 text-gray-900">
                    {pkg.name}
                  </h3>
                  <p className="text-xs font-semibold text-yellow-600 mb-1">
                    {pkg.tagline}
                  </p>
                  <p className="text-[11px] text-gray-600 mb-2 leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="text-2xl font-black text-gray-900">
                    {pkg.priceDisplay}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-1 mb-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-1.5">
                      <svg
                        className="w-3 h-3 text-yellow-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 text-[11px] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Additions */}
                {pkg.additions && pkg.additions.length > 0 && (
                  <div className="mb-3 pt-2 border-t border-gray-200">
                    <p className="text-[9px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                      תוספות אופציונליות
                    </p>
                    <ul className="space-y-1">
                      {pkg.additions.map((addition, additionIndex) => (
                        <li key={additionIndex} className="flex items-start gap-1.5">
                          <span className="text-yellow-600 text-[11px] font-bold">+</span>
                          <span className="text-gray-600 text-[11px] leading-relaxed">
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
                  size="sm"
                  className="w-full mt-auto"
                >
                  {pkg.ctaText}
                </Button>
              </div>
            ))}
          </div>

          {/* Complex projects note */}
          <div className="mt-4 max-w-3xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-[11px] text-gray-700 leading-relaxed text-center">
              <b>💡 פרויקט מורכב?</b> חנות מקוונת, מערכת הזמנות עם תשלום, אזור משתמשים מלא —
              לא נכנס לחבילות הסטנדרטיות. נשמח לשיחת תיאום ולתת הצעת מחיר מותאמת לפי המורכבות
            </p>
          </div>

          {/* Bottom Note */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-600 mb-2">
              לא בטוחים איזו חבילה מתאימה לכם?
            </p>
            <Button href="#contact" variant="outline" size="sm">
              שאלו אותנו
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
