import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import TemplateRenderer from '@/components/templates/TemplateRenderer';
import TemplatePreview from '@/components/ui/TemplatePreview';
import { getTemplateBySlug, getAllTemplateSlugs, getSiteContent } from '@/lib/data';
import { Metadata } from 'next';

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllTemplateSlugs();
  return slugs;
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return {
      title: 'טמפלייט לא נמצא',
    };
  }

  return {
    title: `${template.name} - WebSites`,
    description: template.description,
  };
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  const siteContent = getSiteContent();

  if (!template) {
    notFound();
  }

  return (
    <>
      {/* Template Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Template Info */}
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4 text-sm font-medium">
                {getCategoryLabel(template.category)}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {template.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {template.longDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" size="lg">
                  אני רוצה את הטמפלייט הזה
                </Button>
                <Button href={`https://wa.me/${siteContent.contact.whatsapp}?text=היי, אני מעוניין בטמפלייט ${template.name}`} variant="outline" size="lg" external>
                  דברו איתי בוואטסאפ
                </Button>
              </div>
            </div>

            {/* Template Preview */}
            <div>
              <TemplatePreview template={template} showDeviceToggle={false} />
            </div>
          </div>
        </Container>
      </section>

      {/* Suitable For */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            מתאים במיוחד ל:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {template.suitableFor.map((item, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors"
              >
                <p className="text-gray-800 font-medium text-sm">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            מה כולל הטמפלייט הזה?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {template.features.map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Live Template Preview */}
      <section className="py-16 bg-white">
        <Container size="xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            תצוגה חיה של הטמפלייט
          </h2>
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-gray-200">
            <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-gray-400 text-sm">yourwebsite.com</span>
              </div>
            </div>
            <div className="max-h-[800px] overflow-y-auto">
              <TemplateRenderer template={template} />
            </div>
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            * זוהי תצוגה מקדימה. האתר הסופי יותאם לתכנים שלכם
          </p>
        </Container>
      </section>

      {/* Design Details */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Color Scheme */}
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">פלטת צבעים</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-lg shadow-md"
                    style={{ backgroundColor: template.colors.primary }}
                  ></div>
                  <div>
                    <p className="font-semibold text-gray-900">צבע ראשי</p>
                    <p className="text-gray-600 font-mono text-sm">{template.colors.primary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-lg shadow-md border-2 border-gray-200"
                    style={{ backgroundColor: template.colors.secondary }}
                  ></div>
                  <div>
                    <p className="font-semibold text-gray-900">צבע משני</p>
                    <p className="text-gray-600 font-mono text-sm">{template.colors.secondary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-lg shadow-md"
                    style={{ backgroundColor: template.colors.accent }}
                  ></div>
                  <div>
                    <p className="font-semibold text-gray-900">צבע הדגשה</p>
                    <p className="text-gray-600 font-mono text-sm">{template.colors.accent}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Typography */}
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">טיפוגרפיה</h3>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">פונט לכותרות</p>
                  <p className="text-3xl font-bold" style={{ fontFamily: template.typography.headingFont }}>
                    {template.typography.headingFont}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">פונט לטקסט רגיל</p>
                  <p className="text-xl" style={{ fontFamily: template.typography.bodyFont }}>
                    {template.typography.bodyFont}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">סגנון</p>
                  <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-full">
                    {getStyleLabel(template.typography.style)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-blue-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              מה אתם מקבלים?
            </h2>
            <ul className="space-y-4 text-lg md:text-xl mb-8">
              <li className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>אתר שנראה מקצועי ועובד מעולה</span>
              </li>
              <li className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>בסיס טוב לקידום אורגני ב-Google</span>
              </li>
              <li className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>תחזוקה ושינויים עתידיים בתיאום</span>
              </li>
            </ul>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              בואו נתחיל!
            </Button>
          </div>
        </Container>
      </section>
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
