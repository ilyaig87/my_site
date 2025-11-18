import Container from '@/components/ui/Container';
import { ProcessStep } from '@/types';
import { ReactElement } from 'react';

interface ProcessSectionProps {
  steps: ProcessStep[];
}

const iconMap: { [key: string]: ReactElement } = {
  chat: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  select: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  edit: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  rocket: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

export default function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-yellow-50 to-white">
      <Container>
        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-yellow-50 border border-yellow-200 text-gray-900 text-sm font-medium">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>תהליך פשוט ומהיר</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
              תהליך העבודה
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              4 שלבים פשוטים מהרעיון ועד אתר חי באינטרנט
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.step} className="relative group">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center h-full transition-all duration-300 hover:shadow-lg hover:border-yellow-300">
                  <div className="relative">
                    {/* Icon container */}
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                      <div className="w-full h-full bg-yellow-50 border-2 border-yellow-200 rounded-xl flex items-center justify-center text-yellow-600 transition-all duration-300 group-hover:bg-yellow-100 group-hover:border-yellow-300">
                        {/* Step number badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-black text-sm shadow-md">
                          {step.step}
                        </div>

                        <div>
                          {iconMap[step.icon] || iconMap['chat']}
                        </div>
                      </div>
                    </div>

                    {/* Step title */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {step.title}
                    </h3>

                    {/* Step description */}
                    <p className="text-gray-600 leading-relaxed text-base">
                      {step.description}
                    </p>

                    {/* Arrow for connecting steps (not on last item) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 -left-4 w-8 h-8 text-yellow-400">
                        <svg className="w-full h-full transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA hint */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 text-lg mb-6">
              מוכנים להתחיל? בואו נדבר על הפרויקט שלכם
            </p>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-yellow-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">תהליך מהיר ויעיל</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">תוצאות מקצועיות</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
