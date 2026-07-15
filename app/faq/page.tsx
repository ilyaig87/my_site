import FAQSection from '@/components/sections/FAQSection';
import { FAQ_ITEMS } from '@/lib/faqData';

export const metadata = {
  title: 'שאלות נפוצות',
  description: 'כל מה שרציתם לדעת על בניית אתרים עם Pixelia - שאלות ותשובות',
  alternates: { canonical: '/faq' },
};

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FAQSection />
    </main>
  );
}
