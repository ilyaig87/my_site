'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import { getSiteContent } from '@/lib/data';
import { fadeUp, stagger } from '@/lib/animations';

export default function ContactTeaser() {
  const { contact } = getSiteContent();
  const phoneDigits = contact.phone.replace(/\D/g, '');
  const telHref = `tel:+972${phoneDigits.replace(/^0/, '')}`;
  const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'היי, אני מעוניין לבנות אתר'
  )}`;

  return (
    <section id="contact" className="relative">
      <Container>
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          <GlassCard variant="deep" squircle="2xl" glow="primary" className="p-8 sm:p-12 md:p-16 relative overflow-hidden">
            {/* Decorative orbs inside the card */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                opacity: 0.3,
                filter: 'blur(40px)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, var(--accent-warm) 0%, transparent 70%)',
                opacity: 0.25,
                filter: 'blur(50px)',
              }}
            />

            <div className="relative z-10 text-center">
              <motion.div variants={fadeUp} className="flex justify-center mb-6">
                <GlassPill dot dotColor="green">זמינים עכשיו</GlassPill>
              </motion.div>

              <motion.h2 variants={fadeUp} className="mb-5">
                תנו לאתר שלכם <span className="lg-text-shimmer">להתחיל לעבוד בשבילכם</span>
              </motion.h2>

              <motion.p variants={fadeUp} className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
                תשובה אמיתית מאדם אמיתי תוך 24 שעות, בלי בוטים ובלי שיחת מכירות
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-3xl mx-auto mb-8"
              >
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-white transition-transform hover:scale-[1.03] squircle-md lg-glow-green"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #34d399, #16a34a)',
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>

                <a
                  href="/contact"
                  className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 squircle-md text-base font-bold text-[var(--on-accent)] transition-transform hover:scale-[1.03] lg-glow-primary"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--primary-bright) 0%, var(--primary) 100%)',
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  השאירו פרטים
                </a>

                <a
                  href={telHref}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 squircle-md text-base font-bold lg-surface lg-shallow text-[var(--text-strong)] transition-transform hover:scale-[1.03]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[var(--accent-cool)]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    התקשרו
                  </span>
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5">
                <GlassPill>ייעוץ ראשוני בחינם</GlassPill>
                <GlassPill>אפס מחויבות</GlassPill>
                <GlassPill>מענה תוך 24 שעות</GlassPill>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  );
}
