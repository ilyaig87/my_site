import FAQSection from '@/components/sections/FAQSection';

export const metadata = {
  title: 'שאלות נפוצות | Pixelia',
  description: 'כל מה שרציתם לדעת על בניית אתרים עם Pixelia - שאלות ותשובות',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <FAQSection />
    </main>
  );
}
