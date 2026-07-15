import Link from 'next/link';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { getAllRuPosts, formatDateRu } from '@/lib/blogRu';
import { breadcrumbList } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Блог — сайты, AI и автоматизация для бизнеса в Израиле',
  description:
    'Статьи на русском для владельцев бизнеса в Израиле: сколько стоит сайт, что такое AI-агенты, как не терять заявки. Практично и без воды.',
  alternates: {
    canonical: '/ru/blog',
    languages: { he: '/blog', ru: '/ru/blog' },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    title: 'Блог Pixelia на русском',
    description: 'Сайты, AI и автоматизация для бизнеса в Израиле — на русском.',
    url: 'https://www.pixelia.co.il/ru/blog',
  },
};

export default function RuBlogPage() {
  const posts = getAllRuPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbList([
        { name: 'Главная', path: '/ru' },
        { name: 'Блог', path: '/ru/blog' },
      ]),
    ],
  };

  return (
    <div dir="ltr" lang="ru">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-5">
              <GlassPill dot>Блог на русском</GlassPill>
            </div>
            <h1 className="mb-4 text-[var(--text-strong)]">
              Практично о сайтах <span className="lg-text-shimmer">и AI для бизнеса</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)]">
              Для владельцев бизнеса в Израиле — цены, технологии и решения, без воды
            </p>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {posts.map((post) => (
              <Link key={post.slug} href={`/ru/blog/${post.slug}`} className="group block">
                <GlassCard variant="default" squircle="lg" className="p-6 h-full flex flex-col">
                  <div className="relative z-10 flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <GlassPill key={tag}>{tag}</GlassPill>
                    ))}
                  </div>
                  <h2 className="relative z-10 text-lg font-bold text-[var(--text-strong)] group-hover:text-[var(--primary)] transition-colors leading-snug mb-2">
                    {post.title}
                  </h2>
                  <p className="relative z-10 text-sm text-[var(--text-muted)] leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <p className="relative z-10 text-xs text-[var(--text-faint)] mt-4">
                    {formatDateRu(post.date)} · {post.readingMinutes} мин чтения
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              href={`https://wa.me/972546361555?text=${encodeURIComponent('Здравствуйте! Мне нужен сайт для бизнеса.')}`}
              external
              variant="primary"
              size="lg"
            >
              Обсудить проект в WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
