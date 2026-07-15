import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { getSeoPage, getAllSeoSlugs, getAllSeoPages } from '@/lib/seoPages';

const SITE_URL = 'https://www.pixelia.co.il';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSeoSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return { title: 'עמוד לא נמצא' };
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      type: 'website',
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/services/${page.slug}`,
    },
  };
}

export default async function SeoServicePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const others = getAllSeoPages().filter((p) => p.slug !== page.slug);

  // Prefilled WhatsApp message names the page, so the owner knows which
  // landing page produced the lead straight from the chat itself.
  const whatsappHref = `https://wa.me/972546361555?text=${encodeURIComponent(
    `היי, ראיתי את העמוד "${page.badge}" באתר שלכם ואשמח לשמוע פרטים`
  )}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: page.h1Lead + ' ' + page.h1Highlight,
        provider: { '@type': 'Organization', name: 'Pixelia', url: SITE_URL },
        areaServed: 'IL',
        description: page.metaDescription,
        url: `${SITE_URL}/services/${page.slug}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative">
        <Container size="md">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-5">
              <GlassPill dot>{page.badge}</GlassPill>
            </div>
            <h1 className="mb-4 text-[var(--text-strong)]">
              {page.h1Lead} <span className="lg-text-shimmer">{page.h1Highlight}</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)] mb-7">{page.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/contact" variant="primary" size="lg">קבלו הצעה</Button>
              <Button href="/pricing" variant="glass" size="lg">למחירון</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Sections */}
      <section className="relative">
        <Container size="md">
          <div className="max-w-3xl mx-auto space-y-5">
            {page.sections.map((s) => (
              <GlassCard key={s.h2} variant="default" squircle="lg" className="p-6 sm:p-8">
                <h2 className="relative z-10 text-2xl font-bold text-[var(--text-strong)] mb-3">{s.h2}</h2>
                <p className="relative z-10 text-base text-[var(--text-default)] leading-relaxed">{s.body}</p>
                {s.bullets && (
                  <ul className="relative z-10 space-y-2 mt-4">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-[var(--text-default)]">
                        <svg className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-base leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Proof — the matching portfolio project (niche pages) */}
      {page.caseStudy && (
        <section className="relative">
          <Container size="md">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl mb-6 text-[var(--text-strong)] text-center">
                כבר בנינו כזה — <span className="lg-text-shimmer">תראו בעצמכם</span>
              </h2>
              <GlassCard variant="deep" squircle="lg" className="overflow-hidden">
                <a
                  href={page.caseStudy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 block group"
                  aria-label={`${page.caseStudy.name} — לצפייה באתר החי`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={page.caseStudy.image}
                      alt={`צילום מסך — ${page.caseStudy.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </a>
                <div className="relative z-10 p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-[var(--text-strong)] mb-1">{page.caseStudy.name}</h3>
                  <p className="text-sm text-[var(--primary)] font-medium mb-3">{page.caseStudy.tagline}</p>
                  <p className="text-base text-[var(--text-default)] leading-relaxed mb-5">{page.caseStudy.blurb}</p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button href={page.caseStudy.url} external variant="glass" size="sm">
                      לאתר החי ←
                    </Button>
                    <Link href="/#projects" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
                      עוד עבודות בפורטפוליו
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className="relative">
        <Container size="md">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl mb-6 text-[var(--text-strong)] text-center">שאלות נפוצות</h2>
            <div className="space-y-3">
              {page.faqs.map((f) => (
                <GlassCard key={f.q} variant="default" squircle="md" className="p-5">
                  <h3 className="relative z-10 font-bold text-[var(--text-strong)] mb-1.5">{f.q}</h3>
                  <p className="relative z-10 text-sm text-[var(--text-muted)] leading-relaxed">{f.a}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Internal links + CTA */}
      <section className="relative">
        <Container size="md">
          <GlassCard variant="deep" glow="primary" squircle="xl" className="max-w-3xl mx-auto p-8 text-center">
            <h2 className="relative z-10 text-2xl font-black text-[var(--text-strong)] mb-3">מוכנים להתחיל?</h2>
            <p className="relative z-10 text-[var(--text-muted)] mb-6">שיחה קצרה ללא התחייבות — ונחזור עם הצעה מדויקת.</p>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Button href={whatsappHref} external variant="primary" size="lg">דברו איתנו ב-WhatsApp</Button>
              <Button href="/contact" variant="glass" size="lg">או השאירו פרטים</Button>
            </div>
            <div className="relative z-10 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
              {others.map((o) => (
                <Link key={o.slug} href={`/services/${o.slug}`} className="hover:text-[var(--primary)] transition-colors">
                  {o.badge}
                </Link>
              ))}
              <Link href="/ai" className="hover:text-[var(--primary)] transition-colors">AI ואוטומציה</Link>
            </div>
          </GlassCard>
        </Container>
      </section>
    </>
  );
}
