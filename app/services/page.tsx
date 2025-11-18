import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProcessSection from '@/components/sections/ProcessSection';
import { getSiteContent } from '@/lib/data';
import { Metadata } from 'next';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'שירותים - WebSites',
  description: 'סוגי האתרים שאנחנו בונים ותהליך העבודה',
};

export default function ServicesPage() {
  const content = getSiteContent();

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80)',
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
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>שירותים מקצועיים</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-2xl">
                השירותים שלנו
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-cyan-50 leading-relaxed max-w-3xl mx-auto">
              אנחנו מתמחים בפיתוח אתרים מקצועיים לכל סוג של עסק
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent pointer-events-none"></div>

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.services.map((service) => (
              <Card key={service.id} hover className="h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600 rounded-2xl mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  {service.priceRange && (
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg">
                      {service.priceRange}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <ProcessSection steps={content.process} />

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
                מעוניינים באחד השירותים?
              </h2>
              <p className="text-xl md:text-2xl text-cyan-50 mb-8 leading-relaxed">
                בואו נדבר על הצרכים שלכם ונמצא את הפתרון המושלם
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-cyan-50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50"
                >
                  צרו קשר
                </Button>
                <Button
                  href="/templates"
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/50 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  צפו בטמפלייטים
                </Button>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400"></div>
      </section>
    </>
  );
}

function getServiceIcon(icon: string): ReactElement {
  const icons: { [key: string]: ReactElement } = {
    rocket: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    briefcase: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    image: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    shopping: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  };
  return icons[icon] || icons['briefcase'];
}
