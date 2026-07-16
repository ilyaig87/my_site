import Link from 'next/link';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import { getAllPosts, formatDateHe } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'בלוג: AI, אוטומציה ובניית אתרים לעסקים',
  description:
    'מדריכים וטיפים על AI, אוטומציה עסקית, צ\'אטבוטים ובניית אתרים חכמים לעסקים קטנים בישראל.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="relative">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-5">
              <GlassPill dot>הבלוג של Pixelia</GlassPill>
            </div>
            <h1 className="mb-4 text-[var(--text-strong)]">
              AI, אוטומציה <span className="lg-text-shimmer">ועסקים חכמים</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              איך להשתמש ב-AI ובאוטומציה כדי לחסוך זמן, לסגור יותר לקוחות ולעבוד חכם יותר.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <GlassCard variant="default" tilt squircle="lg" className="h-full p-6 flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="lg-surface lg-shallow squircle-sm px-2 py-0.5 text-[10px] text-[var(--text-default)]"
                      >
                        <span className="relative z-10">{tag}</span>
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-[var(--text-strong)] group-hover:text-[var(--primary)] transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--text-faint)] mt-auto">
                    <span>{formatDateHe(post.date)}</span>
                    <span>{post.readingMinutes} דק׳ קריאה</span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
