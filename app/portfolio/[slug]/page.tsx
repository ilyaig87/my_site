import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { getProjectBySlug, getAllProjectSlugs, getAllProjects } from '@/lib/projects';
import { breadcrumbList } from '@/lib/breadcrumbs';

const SITE_URL = 'https://www.pixelia.co.il';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'פרויקט לא נמצא' };
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      type: 'website',
      title: project.metaTitle,
      description: project.metaDescription,
      url: `${SITE_URL}/portfolio/${project.slug}`,
      images: [{ url: project.image }],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const others = getAllProjects().filter((p) => p.slug !== project.slug).slice(0, 3);

  const whatsappHref = `https://wa.me/972546361555?text=${encodeURIComponent(
    `היי, ראיתי את הקייס של ${project.name} ואשמח לאתר כזה לעסק שלי`
  )}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        url: project.url,
        image: `${SITE_URL}${project.image}`,
        keywords: project.tags.join(', '),
        creator: { '@type': 'Organization', name: 'Pixelia', url: SITE_URL },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/portfolio/${project.slug}` },
      },
      breadcrumbList([
        { name: 'בית', path: '/' },
        { name: 'פורטפוליו', path: '/portfolio' },
        { name: project.name, path: `/portfolio/${project.slug}` },
      ]),
    ],
  };

  // Challenge → solution → result, rendered as three distinct steps.
  const steps = [
    { label: 'האתגר', body: project.challenge },
    { label: 'הפתרון', body: project.solution.intro, bullets: project.solution.bullets },
    { label: 'התוצאה', body: project.result },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative">
        <Container size="md">
          <div className="max-w-3xl mx-auto text-center">
            <Link href="/portfolio" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
              → כל הקייסים
            </Link>
            <div className="flex justify-center gap-1.5 mt-5 mb-4 flex-wrap">
              {project.tags.map((tag) => (
                <GlassPill key={tag}>{tag}</GlassPill>
              ))}
            </div>
            <h1 className="mb-3 text-[var(--text-strong)]">
              {project.name} — <span className="lg-text-shimmer">{project.tagline}</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)]">{project.description}</p>
          </div>
        </Container>
      </section>

      {/* Screenshot in a browser frame, linking to the live site */}
      <section className="relative">
        <Container size="md">
          <div className="max-w-3xl mx-auto">
            <GlassCard variant="deep" squircle="lg" className="overflow-hidden">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 block group"
                aria-label={`${project.name} — לצפייה באתר החי`}
              >
                <div className="flex items-center gap-1.5 px-3 py-2 lg-surface lg-shallow border-b border-[var(--glass-border-dim)]" style={{ borderRadius: 0 }}>
                  <div className="flex gap-1 relative z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="relative z-10 flex-1 mx-2 px-3 py-1 lg-surface lg-shallow rounded-md text-[11px] text-[var(--text-muted)] truncate text-left" dir="ltr">
                    {project.domain}
                  </div>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`צילום מסך — ${project.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              </a>
              <div className="relative z-10 p-5 flex flex-wrap items-center justify-between gap-3">
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-1.5 text-xs text-[var(--text-default)]">
                      <svg className="w-3 h-3 text-[var(--primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <Button href={project.url} external variant="glass" size="sm">
                  לאתר החי ←
                </Button>
              </div>
            </GlassCard>
          </div>
        </Container>
      </section>

      {/* Challenge → Solution → Result */}
      <section className="relative">
        <Container size="md">
          <div className="max-w-3xl mx-auto space-y-5">
            {steps.map((step, i) => (
              <GlassCard key={step.label} variant="default" squircle="lg" className="p-6 sm:p-8">
                <div className="relative z-10 flex items-center gap-3 mb-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-[var(--on-accent)]"
                    style={{ background: 'radial-gradient(circle at 30% 30%, var(--primary-bright), var(--primary))' }}
                  >
                    {i + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-[var(--text-strong)]">{step.label}</h2>
                </div>
                <p className="relative z-10 text-base text-[var(--text-default)] leading-relaxed">{step.body}</p>
                {step.bullets && (
                  <ul className="relative z-10 space-y-2 mt-4">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[var(--text-default)]">
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

      {/* CTA + internal links */}
      <section className="relative">
        <Container size="md">
          <GlassCard variant="deep" glow="primary" squircle="xl" className="max-w-3xl mx-auto p-8 text-center">
            <h2 className="relative z-10 text-2xl font-black text-[var(--text-strong)] mb-3">
              רוצים אתר כזה לעסק שלכם?
            </h2>
            <p className="relative z-10 text-[var(--text-muted)] mb-6">
              שיחה קצרה ללא התחייבות — דמו לאישור לפני שמתחילים, והצעה מדויקת תוך 24 שעות.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Button href={whatsappHref} external variant="primary" size="lg">דברו איתנו ב-WhatsApp</Button>
              <Button href="/pricing" variant="glass" size="lg">למחירון</Button>
            </div>
            <div className="relative z-10 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
              <Link href={project.serviceLink.href} className="hover:text-[var(--primary)] transition-colors">
                {project.serviceLink.label}
              </Link>
              {others.map((o) => (
                <Link key={o.slug} href={`/portfolio/${o.slug}`} className="hover:text-[var(--primary)] transition-colors">
                  קייס: {o.name}
                </Link>
              ))}
            </div>
          </GlassCard>
        </Container>
      </section>
    </>
  );
}
