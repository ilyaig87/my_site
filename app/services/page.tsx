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
      <section className="relative py-24 md:py-32 bg-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-yellow-50 border border-yellow-200 text-gray-900 text-sm font-medium">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>שירותים מקצועיים</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-gray-900">
              השירותים שלנו
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              אנחנו מתמחים בפיתוח אתרים מקצועיים לכל סוג של עסק
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 md:py-32 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.services.map((service) => (
              <Card key={service.id} hover className="h-full relative overflow-hidden group">
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-2xl mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  {service.priceRange && (
                    <div className="inline-block px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold text-lg shadow-md">
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
      <section className="relative py-24 md:py-32 bg-yellow-50">
        <Container>
          <div className="max-w-4xl mx-auto bg-white border-2 border-yellow-200 rounded-2xl p-8 md:p-12 lg:p-16 text-center shadow-lg">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 leading-tight">
              מעוניינים באחד השירותים?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              בואו נדבר על הצרכים שלכם ונמצא את הפתרון המושלם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
              >
                צרו קשר
              </Button>
              <Button
                href="/templates"
                variant="outline"
                size="lg"
              >
                צפו בטמפלייטים
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function getServiceIcon(icon: string): ReactElement {
  const icons: { [key: string]: ReactElement } = {
    rocket: (
      <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    briefcase: (
      <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    image: (
      <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    shopping: (
      <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  };
  return icons[icon] || icons['briefcase'];
}
