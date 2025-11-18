import Link from 'next/link';
import Image from 'next/image';
import { getSiteContent, getNavItems } from '@/lib/data';
import Container from '@/components/ui/Container';

export default function Footer() {
  const content = getSiteContent();
  const navItems = getNavItems();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-200 bg-gray-50">
      <Container>
        <div className="relative py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            {/* About Section */}
            <div className="md:col-span-2">
              <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/logo.svg"
                    alt="SiteCraft Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-yellow-600 transition-all duration-300">
                  SiteCraft
                </h3>
              </Link>
              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                יוצרים אתרים מקצועיים לעסקים קטנים ובינוניים. בחר מתוך תבניות עיצוב מוכנות או צור עיצוב מותאם אישית - והעלה לאוויר תוך ימים ספורים.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href={`https://wa.me/${content.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href={`tel:${content.contact.phone}`}
                  className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-900">קישורים מהירים</h3>
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-all duration-300 relative group inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-900">יצירת קשר</h3>
              <div className="flex flex-col gap-4">
                <a
                  href={`tel:${content.contact.phone}`}
                  className="text-gray-600 hover:text-gray-900 transition-all duration-300 flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center group-hover:bg-yellow-100 transition-all">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm">{content.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="text-gray-600 hover:text-gray-900 transition-all duration-300 flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center group-hover:bg-yellow-100 transition-all">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm">{content.contact.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-col gap-6">
              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  מדיניות פרטיות
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  תנאי שימוש
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href="/accessibility"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  הצהרת נגישות
                </Link>
              </div>

              {/* Copyright */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-sm">
                  &copy; {currentYear} SiteCraft. כל הזכויות שמורות.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
