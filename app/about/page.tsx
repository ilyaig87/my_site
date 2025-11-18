import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getSiteContent } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'אודות - WebSites',
  description: 'קצת עלינו, הניסיון והטכנולוגיות שאנחנו עובדים איתן',
};

export default function AboutPage() {
  const content = getSiteContent();

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-cyan-900/85 to-blue-800/90"></div>

        {/* Animated background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <Container>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass border border-white/20 text-white/90 text-sm font-medium">
              <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>נסיון וניסיון</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-2xl">
                {content.about.title}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-cyan-50 leading-relaxed max-w-3xl mx-auto">
              {content.about.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Experience & Technologies */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent pointer-events-none"></div>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Experience */}
            <Card hover className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600 rounded-2xl mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                    {content.about.experience}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {content.about.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-600 rounded-2xl mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 bg-clip-text text-transparent">
                    הטכנולוגיות שלנו
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {content.about.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-5 py-3 bg-gradient-to-br from-blue-100 to-cyan-50 text-blue-700 rounded-xl font-semibold hover:from-blue-200 hover:to-cyan-100 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
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

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700"></div>

        {/* Animated background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <Container>
          <div className="relative z-10">
            <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 lg:p-16 border-2 border-white/20 text-center">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
                מוכנים להתחיל את הפרויקט שלכם?
              </h2>
              <p className="text-xl md:text-2xl text-cyan-50 mb-8 leading-relaxed">
                בואו נדבר ונראה איך אפשר להביא את העסק שלכם לאינטרנט
              </p>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-cyan-50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                צרו קשר עכשיו
              </Button>
            </div>
          </div>
        </Container>

        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400"></div>
      </section>
    </>
  );
}
