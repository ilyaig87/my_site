import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { getRuPostBySlug, getAllRuPostSlugs, getAllRuPosts, formatDateRu } from '@/lib/blogRu';
import { renderBlock } from '@/components/blog/PostBlocks';
import { breadcrumbList } from '@/lib/breadcrumbs';

const SITE_URL = 'https://www.pixelia.co.il';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllRuPostSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getRuPostBySlug(slug);
  if (!post) return { title: 'Статья не найдена' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/ru/blog/${post.slug}`,
      // hreflang pair with the Hebrew original
      languages: { he: `/blog/${post.heSlug}`, ru: `/ru/blog/${post.slug}` },
    },
    openGraph: {
      type: 'article',
      locale: 'ru_RU',
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/ru/blog/${post.slug}`,
    },
  };
}

export default async function RuBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getRuPostBySlug(slug);
  if (!post) notFound();

  const related = getAllRuPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: `${SITE_URL}/images/og/og-image.png`,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'ru',
        author: { '@type': 'Organization', name: 'Pixelia', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'Pixelia',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo/pixelia_logo_color.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/ru/blog/${post.slug}` },
        keywords: post.tags.join(', '),
      },
      breadcrumbList([
        { name: 'Главная', path: '/ru' },
        { name: 'Блог', path: '/ru/blog' },
        { name: post.title, path: `/ru/blog/${post.slug}` },
      ]),
    ],
  };

  return (
    <div dir="ltr" lang="ru">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative">
        <Container size="md">
          <article className="max-w-3xl mx-auto">
            <Link href="/ru/blog" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
              ← Назад в блог
            </Link>

            <div className="flex flex-wrap gap-1.5 mt-5 mb-4">
              {post.tags.map((tag) => (
                <GlassPill key={tag}>{tag}</GlassPill>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-strong)] leading-tight mb-3">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-[var(--text-faint)] mb-8">
              <span>{formatDateRu(post.date)}</span>
              <span>·</span>
              <span>{post.readingMinutes} мин чтения</span>
            </div>

            <div>{post.content.map(renderBlock)}</div>

            {/* Post-specific CTA */}
            <div className="lg-surface lg-deep squircle-lg p-6 sm:p-8 mt-10 text-center">
              <h3 className="relative z-10 text-xl font-bold text-[var(--text-strong)] mb-2">
                {post.cta.title}
              </h3>
              <p className="relative z-10 text-sm text-[var(--text-muted)] mb-5">
                {post.cta.body}
              </p>
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center">
                <Button href={post.cta.href} variant="glass" size="md">{post.cta.label}</Button>
                <Button
                  href={`https://wa.me/972546361555?text=${encodeURIComponent('Здравствуйте! Пишу из блога Pixelia.')}`}
                  external
                  variant="primary"
                  size="md"
                >
                  Написать в WhatsApp
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="relative">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-[var(--text-strong)] mb-5">Ещё из блога</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((p) => (
                  <Link key={p.slug} href={`/ru/blog/${p.slug}`} className="group block">
                    <div className="lg-surface lg-shallow squircle-md p-5 h-full">
                      <h3 className="relative z-10 font-bold text-[var(--text-strong)] group-hover:text-[var(--primary)] transition-colors mb-1.5 leading-snug">
                        {p.title}
                      </h3>
                      <p className="relative z-10 text-sm text-[var(--text-muted)] line-clamp-2">{p.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
