import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { getPostBySlug, getAllPostSlugs, getAllPosts, formatDateHe, type Block } from '@/lib/blog';

const SITE_URL = 'https://www.pixelia.co.il';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'מאמר לא נמצא' };
  return {
    title: `${post.title}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} className="text-2xl font-bold text-[var(--text-strong)] mt-8 mb-3">
          {block.text}
        </h2>
      );
    case 'p':
      return (
        <p key={i} className="text-base text-[var(--text-default)] leading-relaxed mb-4">
          {block.text}
        </p>
      );
    case 'ul':
      return (
        <ul key={i} className="space-y-2 mb-4">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-[var(--text-default)]">
              <svg className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote key={i} className="lg-surface lg-shallow squircle-md p-5 my-6 text-[var(--text-strong)] font-medium border-r-4 border-[var(--primary)]">
          <span className="relative z-10">{block.text}</span>
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'he-IL',
    author: { '@type': 'Organization', name: 'Pixelia', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Pixelia',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo/pixelia_logo_color.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative">
        <Container size="md">
          <article className="max-w-3xl mx-auto">
            <Link href="/blog" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
              → חזרה לבלוג
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
              <span>{formatDateHe(post.date)}</span>
              <span>·</span>
              <span>{post.readingMinutes} דק׳ קריאה</span>
            </div>

            <div>{post.content.map(renderBlock)}</div>

            {/* CTA */}
            <div className="lg-surface lg-deep squircle-lg p-6 sm:p-8 mt-10 text-center">
              <h3 className="relative z-10 text-xl font-bold text-[var(--text-strong)] mb-2">
                רוצים מערכת AI או אוטומציה לעסק שלכם?
              </h3>
              <p className="relative z-10 text-sm text-[var(--text-muted)] mb-5">
                ב-Pixelia בונים מערכות חכמות שעובדות בשבילכם. בואו נדבר על מה שמתאים לכם.
              </p>
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center">
                <Button href="/ai" variant="glass" size="md">השירות שלנו</Button>
                <Button href="/contact" variant="primary" size="md">דברו איתנו</Button>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="relative">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-[var(--text-strong)] mb-5">עוד מהבלוג</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
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
    </>
  );
}
