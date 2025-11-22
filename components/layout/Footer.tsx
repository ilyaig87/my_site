import Link from 'next/link';
import Image from 'next/image';
import { getSiteContent } from '@/lib/data';
import Container from '@/components/ui/Container';

export default function Footer() {
  const content = getSiteContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="relative border-t border-yellow-200/50 bg-gradient-to-b from-white to-yellow-50/20">
      <Container>
        <div id="footer-wrapper" className="py-8">
          <div id="footer-layout" className="flex flex-col items-center gap-6 max-w-2xl mx-auto text-center">
            {/* Logo */}
            <Link href="/" className="group">
              <div id="footer-logo-container" className="relative h-12 w-32 transform group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo/pixelia_logo_color.png"
                  alt="Pixelia Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Social Links */}
            <div id="footer-social-links" className="flex gap-4">
              <a
                href={`tel:${content.contact.phone}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300"
                aria-label="Phone"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-600 hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${content.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>

            {/* Legal Links */}
            <div id="footer-legal-links" className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-orange-600 transition-colors">מדיניות פרטיות</Link>
              <span className="text-gray-400">•</span>
              <Link href="/terms" className="hover:text-orange-600 transition-colors">תנאי שימוש</Link>
              <span className="text-gray-400">•</span>
              <Link href="/accessibility" className="hover:text-orange-600 transition-colors">הצהרת נגישות</Link>
              <span className="text-gray-400">•</span>
              <Link
                href="/admin/login"
                className="hover:text-yellow-600 transition-colors opacity-60 hover:opacity-100"
                title="כניסה לאדמין"
              >
                Admin
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-500">
              &copy; {currentYear} Pixelia. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
