import Container from '@/components/ui/Container';
import { getSiteContent } from '@/lib/data';

export default function ContactTeaser() {
  const { contact } = getSiteContent();
  const phoneDigits = contact.phone.replace(/\D/g, '');
  const telHref = `tel:+972${phoneDigits.replace(/^0/, '')}`;
  const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'היי, אני מעוניין לבנות אתר'
  )}`;

  return (
    <section id="contact" className="py-8 md:py-12 bg-gradient-to-b from-yellow-50/40 via-yellow-50 to-white">
      <Container>
        <div className="max-w-4xl mx-auto bg-white border-2 border-yellow-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden hover:border-yellow-300 hover:shadow-2xl transition-all">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-50" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-60" />

          <div className="relative">
            {/* Top row: badge + headline */}
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-yellow-100 border border-yellow-300 text-gray-900 text-xs font-semibold uppercase tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span>זמינים עכשיו</span>
              </div>

              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 leading-tight">
                מוכנים להתחיל
                <br className="sm:hidden" />
                <span className="text-yellow-500"> את הפרויקט?</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                בחרו את הדרך הנוחה לכם — מענה תוך 24 שעות, ללא התחייבות
              </p>
            </div>

            {/* CTA buttons - bigger and more prominent */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-2xl mx-auto mb-6">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-green-500 hover:bg-green-400 text-white font-bold text-base rounded-2xl shadow-lg shadow-green-500/30 transition-all hover:scale-[1.03] hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="/contact"
                className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-base rounded-2xl shadow-lg shadow-yellow-400/30 transition-all hover:scale-[1.03] hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                השאירו פרטים
              </a>
              <a
                href={telHref}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 hover:border-gray-900 font-bold text-base rounded-2xl transition-all hover:scale-[1.03]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                התקשרו
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-600 pt-5 border-t border-gray-100">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ייעוץ ראשוני חינם</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ללא התחייבות</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>מענה תוך 24 שעות</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
