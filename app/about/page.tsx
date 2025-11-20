import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BenefitsSection from '@/components/sections/BenefitsSection';
import { getSiteContent } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'אודות - Pixelia',
  description: 'קצת עלינו, הניסיון והטכנולוגיות שאנחנו עובדים איתן - בניית אתרים מקצועיים לעסקים',
};

export default function AboutPage() {
  const content = getSiteContent();

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-yellow-50 to-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-yellow-50 border border-yellow-200 text-gray-900 text-sm font-medium">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>נסיון וניסיון</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-gray-900">
              {content.about.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {content.about.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Experience & Technologies */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-white to-yellow-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Experience */}
            <Card hover className="relative overflow-hidden group">
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-400 rounded-2xl mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black mb-4 text-gray-900">
                    {content.about.experience}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {content.about.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-lg">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Technologies */}
            <Card hover className="relative overflow-hidden group">
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-400 rounded-2xl mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black mb-4 text-gray-900">
                    הטכנולוגיות שלנו
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {content.about.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-5 py-3 bg-yellow-50 text-yellow-700 rounded-xl font-semibold border border-yellow-200 hover:bg-yellow-100 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <BenefitsSection benefits={content.whyChooseMe} />

      {/* CTA */}
      <section className="relative py-24 md:py-32 bg-yellow-50">
        <Container>
          <div className="max-w-4xl mx-auto bg-white border-2 border-yellow-200 rounded-2xl p-8 md:p-12 lg:p-16 text-center shadow-lg">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 leading-tight">
              מוכנים להתחיל את הפרויקט שלכם?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              בואו נדבר ונראה איך אפשר להביא את העסק שלכם לאינטרנט
            </p>
            <Button
              href="/contact"
              variant="primary"
              size="lg"
            >
              צרו קשר עכשיו
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
