import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

interface Tier {
  name: string;
  price: string;
  subtitle: string;
  bestFor: string;
  icon: React.ReactNode;
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'דף בודד',
    price: '1,500',
    subtitle: 'Landing Page ממוקד',
    bestFor: 'קמפיין · מוצר · שירות',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    name: 'אתר תדמית',
    price: '3,000',
    subtitle: 'הבחירה הפופולרית',
    bestFor: 'עד 4 דפים · גלריה · SEO',
    highlighted: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'אתר מורחב',
    price: '5,000',
    subtitle: 'פתרון מקצה לקצה',
    bestFor: '5+ דפים · DB · אנימציות',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function PricingTeaser() {
  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-gray-50 via-white to-yellow-50/40">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-yellow-100 border border-yellow-300 text-gray-900 text-xs font-semibold">
              <span>💰</span>
              <span>תמחור שקוף, ללא הפתעות</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 text-gray-900">
              חבילות לכל סוג עסק
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              המחיר הסופי נקבע לפי הצורך — נשמח לתת הצעת מחיר מותאמת אישית
            </p>
          </div>

          {/* Tier cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-5 md:p-6 transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gradient-to-br from-yellow-50 via-white to-yellow-50 border-2 border-yellow-400 shadow-xl sm:-translate-y-2 hover:shadow-2xl'
                    : 'bg-white border-2 border-gray-200 hover:border-yellow-300 hover:shadow-lg shadow-sm'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-[11px] font-bold shadow-md whitespace-nowrap inline-flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      הכי פופולרי
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                  tier.highlighted
                    ? 'bg-yellow-400 text-gray-900 shadow-md'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {tier.icon}
                </div>

                {/* Name + subtitle */}
                <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight">
                  {tier.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mb-3">
                  {tier.subtitle}
                </p>

                {/* Price */}
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <p className="text-[11px] font-semibold text-gray-500 mb-0.5">
                    החל מ-
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-black text-gray-900 leading-none">
                      ₪{tier.price}
                    </span>
                  </div>
                </div>

                {/* What's included */}
                <p className="text-xs text-gray-700 leading-relaxed flex items-start gap-1.5">
                  <svg className="w-3.5 h-3.5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{tier.bestFor}</span>
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-stretch sm:items-center max-w-lg mx-auto">
            <Button href="/pricing" variant="outline" size="md" className="w-full sm:w-auto">
              ראו פירוט החבילות
            </Button>
            <Button href="/contact" size="md" className="w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                להצעת מחיר מותאמת
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            </Button>
          </div>
          <p className="text-[11px] md:text-xs text-gray-500 mt-3 text-center">
            המחיר הסופי תלוי במורכבות ובתוספות שתבחרו
          </p>
        </div>
      </Container>
    </section>
  );
}
