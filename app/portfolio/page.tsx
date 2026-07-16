import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { getAllProjects } from '@/lib/projects';
import { breadcrumbList } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'פורטפוליו: קייסים מלאים של אתרים שבנינו',
  description:
    'הצצה לעבודות של Pixelia: קייסים מלאים — האתגר, הפתרון והתוצאה — של אתרים חיים שבנינו לעסקים בישראל, עם קישור לכל אתר באוויר.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  const projects = getAllProjects();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbList([
        { name: 'בית', path: '/' },
        { name: 'פורטפוליו', path: '/portfolio' },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-5">
              <GlassPill dot dotColor="primary">באוויר ומייצרים תוצאות</GlassPill>
            </div>
            <h1 className="mb-4 text-[var(--text-strong)]">
              הקייסים <span className="lg-text-shimmer">המלאים שלנו</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)]">
              לא רק צילומי מסך — הסיפור המלא של כל פרויקט: האתגר, הפתרון והתוצאה
            </p>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group block">
                <GlassCard variant="default" squircle="lg" className="overflow-hidden h-full">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`תצוגת אתר ${project.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative z-10 p-5">
                    <h2 className="text-lg font-bold text-[var(--text-strong)] group-hover:text-[var(--primary)] transition-colors mb-1">
                      {project.name}
                    </h2>
                    <p className="text-sm font-medium text-[var(--primary)] mb-2">{project.tagline}</p>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <span className="text-sm font-semibold text-[var(--text-default)] group-hover:text-[var(--primary)] transition-colors">
                      לקייס המלא ←
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/quote" variant="primary" size="lg">
              רוצים להיות הקייס הבא? קבלו הצעה
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
