import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-yellow-50">
      <Container>
        <div className="relative z-10">
          {/* Card wrapper */}
          <div className="max-w-4xl mx-auto bg-white border-2 border-yellow-200 rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl">
            {/* Icon badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 border border-yellow-300 text-gray-900 text-sm font-medium">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>הזדמנות מצוינת</span>
              </div>
            </div>

            {/* Main content */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-gray-900 leading-tight">
                רוצה אתר שנראה טוב
                <br />
                <span className="text-yellow-600">
                  ועובד מעולה?
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
                בואו נדבר ונמצא את הפתרון המושלם לעסק שלך - טמפלייט או עיצוב מותאם
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                טמפלייטים מוכנים לבחירה או עיצוב מותאם אישית, תהליך עבודה מהיר ותמיכה מלאה
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                href="/contact"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  השאר פרטים
                </span>
              </Button>
              <Button
                href="/templates"
                variant="outline"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  צפה בטמפלייטים
                </span>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">תמיכה מלאה</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">העלאה מהירה</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
