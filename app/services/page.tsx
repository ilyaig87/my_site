import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import ProcessSection from '@/components/sections/ProcessSection';
import { getSiteContent } from '@/lib/data';
import { Metadata } from 'next';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'שירותים - Pixelia',
  description: 'סוגי האתרים שאנחנו בונים ב-Pixelia ותהליך העבודה המקצועי שלנו',
};

export default function ServicesPage() {
  const content = getSiteContent();

  return (
    <>
      <section className="relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-5">
              <GlassPill dot>שירותים מקצועיים</GlassPill>
            </div>
            <h1 className="mb-4 text-[var(--text-strong)]">
              <span className="lg-text-shimmer">השירותים</span> שלנו
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-3">
              ארבעה סוגי אתרים — והליווי שמלווה אותם. מחירים מפורטים מופיעים בעמוד התמחור.
            </p>
            <p className="text-base font-semibold text-[var(--text-strong)] max-w-2xl mx-auto">
              לא בטוחים מה מתאים? נשמח להמליץ בשיחה קצרה — ללא התחייבות.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {content.services.map((service) => (
              <GlassCard key={service.id} variant="default" tilt squircle="lg" className="h-full p-7 sm:p-9 group">
                <div className="flex items-start gap-5 mb-5">
                  <div
                    className="lg-surface lg-shallow squircle-md w-16 h-16 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500"
                    style={{ color: 'var(--primary)' }}
                  >
                    <span className="relative z-10">{getServiceIcon(service.icon)}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-strong)] leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-[var(--text-muted)] mb-5 leading-relaxed">{service.description}</p>

                {service.suitableFor && (
                  <div className="lg-surface lg-shallow squircle-md p-4 mb-5">
                    <p className="relative z-10 text-sm text-[var(--text-default)] leading-relaxed">
                      {service.suitableFor}
                    </p>
                  </div>
                )}

                <ul className="space-y-2.5">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[var(--text-default)]">
                      <svg className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      <ProcessSection steps={content.process} />

      <section className="relative">
        <Container>
          <GlassCard variant="deep" squircle="xl" glow="primary" className="max-w-3xl mx-auto p-8 sm:p-12 text-center">
            <h2 className="mb-3">מעוניינים באחד השירותים?</h2>
            <p className="text-base text-[var(--text-muted)] mb-7 max-w-xl mx-auto">
              דברו איתנו ונתאים יחד את הפתרון המושלם — מענה ראשון תוך 24 שעות
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/quote" variant="primary" size="lg">
                קבלו הצעת מחיר
              </Button>
              <Button
                href="https://wa.me/972546361555"
                external
                variant="glass"
                size="lg"
              >
                דברו איתנו ב-WhatsApp
              </Button>
            </div>
          </GlassCard>
        </Container>
      </section>
    </>
  );
}

function getServiceIcon(icon: string): ReactElement {
  const icons: { [key: string]: ReactElement } = {
    rocket: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    briefcase: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    image: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    shopping: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  };
  return icons[icon] || icons['briefcase'];
}
