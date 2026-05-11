import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import TemplateRenderer from '@/components/templates/TemplateRenderer';
import { getTemplateBySlug, getAllTemplateSlugs, getSiteContent } from '@/lib/data';
import { Metadata } from 'next';
import TemplateViewTracker from '@/components/TemplateViewTracker';

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTemplateSlugs();
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return { title: 'טמפלייט לא נמצא' };
  return {
    title: `${template.name} - Pixelia`,
    description: template.description,
  };
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  const siteContent = getSiteContent();

  if (!template) notFound();

  return (
    <>
      <section className="relative">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-5">
              <GlassPill dot>{getCategoryLabel(template.category)}</GlassPill>
            </div>
            <h1 className="mb-5 text-[var(--text-strong)]">{template.name}</h1>
            <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed max-w-3xl mx-auto">
              {template.longDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                אני רוצה את הטמפלייט הזה
              </Button>
              <Button
                href={`https://wa.me/${siteContent.contact.whatsapp}?text=היי, אני מעוניין בטמפלייט ${template.name}`}
                variant="glass"
                size="lg"
                external
              >
                דברו איתי בוואטסאפ
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Suitable for */}
      <section className="relative">
        <Container>
          <h2 className="mb-10 text-center">מתאים במיוחד ל:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto">
            {template.suitableFor.map((item, i) => (
              <div key={i} className="lg-surface lg-shallow squircle-md p-4 text-center">
                <p className="relative z-10 text-[var(--text-default)] font-medium text-sm">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="relative">
        <Container>
          <h2 className="mb-12 text-center">מה כולל הטמפלייט הזה?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {template.features.map((feature, i) => (
              <GlassCard key={i} variant="default" squircle="lg" className="text-center p-7 sm:p-8">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 text-[var(--on-accent)]"
                  style={{ background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-strong)] mb-3">{feature.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Live preview */}
      <section className="relative">
        <Container size="xl">
          <h2 className="mb-8 text-center">תצוגה חיה של הטמפלייט</h2>
          <GlassCard variant="deep" squircle="xl" className="max-w-6xl mx-auto overflow-hidden p-2">
            <div className="relative z-10 squircle-lg overflow-hidden bg-white">
              <div
                className="px-4 py-2.5 flex items-center gap-2"
                style={{ background: '#1a1a1f' }}
              >
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-gray-400 text-xs">yourwebsite.com</span>
                </div>
              </div>
              <div className="max-h-[800px] overflow-y-auto">
                <TemplateRenderer template={template} />
              </div>
            </div>
          </GlassCard>
          <p className="text-center text-[var(--text-muted)] mt-4 text-sm">
            * זוהי תצוגה מקדימה. האתר הסופי יותאם לתכנים שלכם
          </p>
        </Container>
      </section>

      {/* Design details */}
      <section className="relative">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <GlassCard variant="default" squircle="lg" className="p-7 sm:p-8">
              <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-6">פלטת צבעים</h3>
              <div className="space-y-4">
                {[
                  { color: template.colors.primary, label: 'צבע ראשי' },
                  { color: template.colors.secondary, label: 'צבע משני' },
                  { color: template.colors.accent, label: 'צבע הדגשה' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-xl border border-[var(--glass-border-dim)]"
                      style={{ backgroundColor: c.color }}
                    />
                    <div>
                      <p className="font-semibold text-[var(--text-strong)]">{c.label}</p>
                      <p className="text-[var(--text-muted)] font-mono text-sm">{c.color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard variant="default" squircle="lg" className="p-7 sm:p-8">
              <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-6">טיפוגרפיה</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-muted)] mb-2">פונט לכותרות</p>
                  <p className="text-2xl font-bold text-[var(--text-strong)]" style={{ fontFamily: template.typography.headingFont }}>
                    {template.typography.headingFont}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-muted)] mb-2">פונט לטקסט רגיל</p>
                  <p className="text-lg text-[var(--text-default)]" style={{ fontFamily: template.typography.bodyFont }}>
                    {template.typography.bodyFont}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-muted)] mb-2">סגנון</p>
                  <GlassPill>{getStyleLabel(template.typography.style)}</GlassPill>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </section>

      {/* What you get */}
      <section className="relative">
        <Container>
          <GlassCard variant="deep" squircle="2xl" glow="primary" className="max-w-3xl mx-auto p-10 md:p-12 text-center">
            <h2 className="mb-7">מה אתם מקבלים?</h2>
            <ul className="space-y-3 text-lg mb-8 text-[var(--text-default)]">
              {['אתר שנראה מקצועי ועובד מעולה', 'בסיס טוב לקידום אורגני ב-Google', 'תחזוקה ושינויים עתידיים בתיאום'].map(
                (item) => (
                  <li key={item} className="flex items-center justify-center gap-2.5">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
            <Button href="/contact" variant="primary" size="lg">
              בואו נתחיל!
            </Button>
          </GlassCard>
        </Container>
      </section>

      <TemplateViewTracker templateSlug={template.slug} templateName={template.name} />
    </>
  );
}

function getCategoryLabel(category: string): string {
  const labels: { [key: string]: string } = {
    business: 'עסקי',
    landing: 'דף נחיתה',
    portfolio: 'פורטפוליו',
    medical: 'רפואי',
    fitness: 'כושר',
    restaurant: 'מסעדה',
    professional: 'מקצועי',
    creative: 'קריאייטיב',
    ecommerce: 'חנות',
  };
  return labels[category] || category;
}

function getStyleLabel(style: string): string {
  const labels: { [key: string]: string } = {
    modern: 'מודרני',
    classic: 'קלאסי',
    playful: 'משחקי',
    professional: 'מקצועי',
  };
  return labels[style] || style;
}
