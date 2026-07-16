import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מחשבון הצעת מחיר לבניית אתר: הערכה מיידית',
  description:
    'קבלו הערכת מחיר ראשונית לבניית אתר תוך דקה: בחרו סוג אתר, מספר עמודים ופיצ\'רים — ותקבלו טווח מחיר שקוף. ההצעה הסופית בשיחה קצרה.',
  keywords: ['הצעת מחיר אתר', 'מחשבון מחיר אתר', 'כמה עולה אתר', 'מחיר בניית אתר'],
  alternates: { canonical: '/quote' },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
