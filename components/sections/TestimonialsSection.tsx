import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import { getSiteContent } from '@/lib/data';

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-[var(--text-faint)]'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

/**
 * Social-proof section. Renders nothing until real client testimonials are
 * added to site-content.json under "testimonials" — never show fake reviews.
 */
export default function TestimonialsSection() {
  const testimonials = getSiteContent().testimonials ?? [];
  if (testimonials.length === 0) return null;

  return (
    <section className="relative">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex justify-center mb-4">
            <GlassPill dot>לקוחות מספרים</GlassPill>
          </div>
          <h2 className="mb-4">
            מה אומרים <span className="lg-text-shimmer">הלקוחות שלנו</span>
          </h2>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            התוצאה הכי טובה שלנו היא לקוח שממליץ הלאה
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <GlassCard key={t.id} variant="default" squircle="lg" className="p-6 flex flex-col">
              <div className="relative z-10 flex gap-0.5 mb-3" aria-label={`דירוג ${t.rating} מתוך 5`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} filled={i <= t.rating} />
                ))}
              </div>
              <p className="relative z-10 text-[var(--text-default)] leading-relaxed flex-1 mb-4">
                “{t.content}”
              </p>
              <div className="relative z-10">
                <div className="font-bold text-[var(--text-strong)]">{t.name}</div>
                <div className="text-sm text-[var(--text-muted)]">
                  {t.role}
                  {t.company ? ` · ${t.company}` : ''}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
