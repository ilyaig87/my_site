import FAQSection from '@/components/sections/FAQSection';

export const metadata = {
  title: 'שאלות נפוצות | SiteCraft',
  description: 'כל מה שרצית לדעת על בניית אתרים - שאלות ותשובות',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <FAQSection />
    </main>
  );
}
