import Link from 'next/link';
import Image from 'next/image';
import { getSiteContent } from '@/lib/data';
import Container from '@/components/ui/Container';

const LEGAL_LINKS = [
  { label: 'פרטיות', href: '/privacy' },
  { label: 'תנאי שימוש', href: '/terms' },
  { label: 'נגישות', href: '/accessibility' },
];

export default function Footer() {
  const content = getSiteContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="relative mt-20 sm:mt-24 isolate overflow-hidden"
    >
      {/* Hairline accent at the very top edge — echoes the site beam */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40"
      />

      {/* Soft accent glow behind the brand block */}
      <div
        aria-hidden="true"
        className="absolute -top-20 right-[12%] w-[22rem] h-[22rem] rounded-full blur-3xl pointer-events-none opacity-[0.10] dark:opacity-[0.16]"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 65%)' }}
      />

      <Container>
        <div className="relative pt-10 pb-7 sm:pt-12 sm:pb-8">
          {/* ─── Top row — brand + contact pills ─── */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7 md:gap-8">
            {/* Brand block */}
            <div className="flex flex-col items-start gap-3">
              <Link href="/" className="inline-block group" aria-label="Pixelia — חזרה לדף הבית">
                <div className="relative h-11 w-36 transition-opacity duration-300 group-hover:opacity-85">
                  <Image
                    src="/images/logo/pixelia_logo_color.png"
                    alt="Pixelia"
                    fill
                    className="object-contain object-right"
                  />
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-[var(--text-muted)] max-w-md">
                סטודיו פיתוח אתרים. מהרעיון ועד אתר חי באוויר — מהיר, מדויק, מרשים.
              </p>
            </div>

            {/* Contact pills */}
            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${content.contact.phone}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs text-[var(--text-default)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                aria-label={`התקשרו ${content.contact.phone}`}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
                <span dir="ltr">{content.contact.phone}</span>
              </a>
              <a
                href={`https://wa.me/${content.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs text-[var(--text-default)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs text-[var(--text-default)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                aria-label={`Email ${content.contact.email}`}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                אימייל
              </a>
            </div>
          </div>

          {/* ─── Bottom strip ─── */}
          <div className="mt-8 pt-5 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-[var(--text-faint)]">
              © {currentYear} Pixelia. כל הזכויות שמורות.
            </p>

            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[var(--text-strong)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
