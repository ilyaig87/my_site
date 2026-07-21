import Link from 'next/link';
import { Metadata } from 'next';
import { ReactElement } from 'react';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';

const SITE_URL = 'https://www.pixelia.co.il';

export const metadata: Metadata = {
  title: 'סוכני AI (Agents), צ\'אטבוטים ואוטומציה לעסקים',
  description:
    'Pixelia בונה לעסקים סוכני AI (AI Agents), צ\'אטבוטים חכמים ואוטומציות: מענה ללקוחות 24/7 בעברית, סינון לידים, חיבור CRM ויצירת תוכן אוטומטית. חוסכים זמן וסוגרים יותר לקוחות.',
  keywords: [
    'סוכני AI',
    'AI Agents',
    'סוכן AI לעסק',
    'צ\'אטבוט לעסק',
    'צ\'אטבוט AI',
    'אוטומציה לעסקים',
    'אוטומציה עסקית',
    'בוט לוואטסאפ',
    'מערכות AI לעסקים',
    'בינה מלאכותית לעסקים',
  ],
  alternates: { canonical: '/ai' },
  openGraph: {
    type: 'website',
    title: 'סוכני AI, צ\'אטבוטים ואוטומציה לעסקים',
    description: 'סוכני AI (Agents), צ\'אטבוטים חכמים ואוטומציות עסקיות — מותאמים לעסק שלכם.',
    url: `${SITE_URL}/ai`,
  },
};

interface Capability {
  icon: ReactElement;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-3.5-7.1M21 4v4h-4M9 18l-4 3v-3" />
      </svg>
    ),
    title: 'סוכני AI (Agents)',
    description: 'עובד דיגיטלי שזמין 24/7: עונה ללקוחות בעברית טבעית, מסנן לידים, קובע פגישות ומבצע משימות בפועל — באתר ובוואטסאפ.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'אוטומציות עסקיות',
    description: 'חיבור הכלים שלכם — טפסים, CRM, מייל ווואטסאפ — כך שהם עובדים ביחד אוטומטית (Make / Zapier / n8n).',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'עוזר AI על המידע שלכם',
    description: 'בוט שמכיר את המוצרים, המחירים והשאלות הנפוצות של העסק — ועונה ללקוחות בדיוק לפי המידע שלכם.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'יצירת תוכן אוטומטית',
    description: 'תיאורי מוצר, פוסטים לרשתות, מיילים ותשובות לביקורות — טיוטות איכותיות בשניות במקום שעות.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'אינטגרציית AI במערכות קיימות',
    description: 'סיכום פניות, סיווג אוטומטי, חיפוש חכם והטמעת יכולות AI במערכות שכבר יש לכם.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'דשבורדים ודוחות אוטומטיים',
    description: 'סיכומים שבועיים, מעקב לידים ודוחות שמגיעים אליכם לבד — שליטה מלאה בלי עבודה ידנית.',
  },
];

const useCases = [
  { who: 'קליניקה / עסק שירות', what: 'בוט שקובע תורים ושולח תזכורות אוטומטיות — פחות ביטולים, פחות טלפונים.' },
  { who: 'חנות / יבואן', what: 'מענה אוטומטי על מלאי ומחירים, ופולואו-אפ לעגלות נטושות.' },
  { who: 'נותן שירות מקצועי', what: 'סינון לידים אוטומטי — מגיעים אליכם רק הפניות הרלוונטיות, מתואמות ומסוכמות.' },
];

const audiences = [
  {
    tag: 'לפרטיים',
    title: 'עוזר אישי חכם שעובד בשבילכם',
    items: [
      'סדר במיילים — סיווג, סיכום וטיוטות תשובה אוטומטיות',
      'מענה אוטומטי בוואטסאפ כשאתם עסוקים',
      'סיכום מסמכים, חוזים ומאמרים ארוכים בשניות',
      'תזכורות חכמות ומעקב משימות אישי',
      'יצירת תוכן — מכתבים, קורות חיים ופוסטים',
      'עזרה בטפסים ובבירוקרטיה, בשפה פשוטה',
    ],
  },
  {
    tag: 'לעסקים',
    title: 'עובדים דיגיטליים שפועלים 24/7',
    items: [
      'סוכן AI שעונה ללקוחות באתר ובוואטסאפ, קובע פגישות ומסנן לידים',
      'חיבור הכלים שלכם — טפסים, CRM, מייל ווואטסאפ — שעובדים יחד לבד',
      'בוט שמכיר את המוצרים והמחירים שלכם ועונה בדיוק לפי המידע שלכם',
      'הודעות יזומות: תזכורות תורים, פולואו-אפ ללידים וגבייה',
      'דוחות וסיכומים שבועיים שמגיעים אליכם אוטומטית',
      'יצירת תוכן שיווקי — תיאורי מוצר, פוסטים ותשובות לביקורות',
    ],
  },
];

const faqs = [
  {
    q: 'אני לא חברה גדולה — זה מתאים גם לעסק קטן?',
    a: 'בדיוק להפך. אוטומציה ו-AI הם היתרון הכי גדול לעסק קטן, כי הם נותנים לכם להתנהל כמו צוות שלם בלי לגייס אנשים.',
  },
  {
    q: 'כמה זה עולה?',
    a: 'יש עלות הקמה חד-פעמית (בנייה והתאמה) ועלות שימוש שוטפת קטנה לפי כמות השימוש. נבנה הצעה מדויקת ושקופה אחרי שיחה קצרה שבה נבין מה אתם צריכים.',
  },
  {
    q: 'המערכת רצה אצלי או אצלכם?',
    a: 'המערכות נבנות ומתארחות עבורכם — אתם פשוט נהנים מהתוצאה. הכל על שמכם ובבעלותכם.',
  },
  {
    q: 'באיזה טכנולוגיות אתם משתמשים?',
    a: 'מודלים מובילים של AI (כמו Claude) יחד עם כלי אוטומציה כמו Make, Zapier ו-n8n, ופיתוח מותאם ב-Next.js לפי הצורך.',
  },
];

export default function AiServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'סוכני AI (AI Agents), צ\'אטבוטים ואוטומציה לעסקים',
        serviceType: 'AI Agents, Chatbots & Business Automation',
        provider: { '@type': 'Organization', name: 'Pixelia', url: SITE_URL },
        areaServed: 'IL',
        description:
          'בניית סוכני AI (AI Agents) לעסקים: צ\'אטבוט חכם לאתר ולוואטסאפ, אוטומציות עסקיות, חיבור CRM ויצירת תוכן אוטומטית.',
        url: `${SITE_URL}/ai`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-5">
              <GlassPill dot>סוכני AI · Agents · אוטומציה</GlassPill>
            </div>
            <h1 className="mb-4 text-[var(--text-strong)]">
              אתר זה ההתחלה. <span className="lg-text-shimmer">סוכני AI</span> זה היתרון.
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-3">
              היום אתר כבר יש לכולם — מה שבאמת מזיז את העסק זה סוכני AI (Agents) ואוטומציה: עובדים
              דיגיטליים שפועלים בשבילכם 24/7, עונים ללקוחות, מסננים לידים וחוסכים לכם שעות בשבוע.
            </p>
            <p className="text-base font-semibold text-[var(--text-strong)] max-w-2xl mx-auto mb-7">
              ב-Pixelia בונים לכם בדיוק את זה — מותאם לעסק, פשוט לתפעול.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/contact" variant="primary" size="lg">קבלו הצעה</Button>
              <Button href="/blog" variant="glass" size="lg">קראו עוד בבלוג</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What we build */}
      <section className="relative">
        <Container>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl mb-2 text-[var(--text-strong)]">מה אנחנו בונים</h2>
            <p className="text-sm text-[var(--text-muted)]">מערכות חכמות שמתחברות בדיוק לצרכים של העסק שלכם</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {capabilities.map((c) => (
              <GlassCard key={c.title} variant="default" tilt squircle="lg" className="h-full p-6">
                <div
                  className="lg-surface lg-shallow squircle-md w-12 h-12 flex items-center justify-center mb-4"
                  style={{ color: 'var(--primary)' }}
                >
                  <span className="relative z-10">{c.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-strong)] mb-2">{c.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{c.description}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Who it's for — individuals & businesses */}
      <section className="relative">
        <Container>
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex justify-center mb-4">
              <GlassPill dot>גם לפרטיים · גם לעסקים</GlassPill>
            </div>
            <h2 className="text-3xl sm:text-4xl mb-2 text-[var(--text-strong)]">מה אפשר לעשות</h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              הרעיון פשוט: כל דבר חוזר, ידני ומעייף — אפשר להעביר ל-AI שיעשה אותו בשבילכם. הנה איך זה נראה, בין אם אתם אדם פרטי או עסק.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {audiences.map((a) => (
              <GlassCard key={a.tag} variant="default" tilt squircle="lg" className="h-full p-7">
                <GlassPill dot>{a.tag}</GlassPill>
                <h3 className="text-xl font-bold text-[var(--text-strong)] mt-4 mb-4">{a.title}</h3>
                <ul className="space-y-2.5">
                  {a.items.map((it) => (
                    <li key={it} className="relative z-10 flex items-start gap-2.5 text-sm text-[var(--text-default)] leading-relaxed">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Use cases */}
      <section className="relative">
        <Container>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl mb-2 text-[var(--text-strong)]">איך זה נראה בעסק אמיתי</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {useCases.map((u) => (
              <GlassCard key={u.who} variant="default" squircle="lg" className="h-full p-6">
                <p className="relative z-10 text-sm font-bold text-[var(--primary)] mb-2">{u.who}</p>
                <p className="relative z-10 text-base text-[var(--text-default)] leading-relaxed">{u.what}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative">
        <Container size="md">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl mb-6 text-[var(--text-strong)] text-center">שאלות נפוצות</h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <GlassCard key={f.q} variant="default" squircle="md" className="p-5">
                  <h3 className="relative z-10 font-bold text-[var(--text-strong)] mb-1.5">{f.q}</h3>
                  <p className="relative z-10 text-sm text-[var(--text-muted)] leading-relaxed">{f.a}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative">
        <Container size="md">
          <GlassCard variant="deep" glow="primary" squircle="xl" className="max-w-3xl mx-auto p-8 sm:p-10 text-center">
            <h2 className="relative z-10 text-2xl sm:text-3xl font-black text-[var(--text-strong)] mb-3">
              בואו נבנה לעסק שלכם מערכת חכמה
            </h2>
            <p className="relative z-10 text-[var(--text-muted)] mb-6 max-w-xl mx-auto">
              שיחה קצרה, בלי התחייבות — נבין מה אפשר לאוטמט אצלכם ונחזור עם הצעה מדויקת.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Button href="/contact" variant="primary" size="lg">דברו איתנו</Button>
              <Button href="/" variant="glass" size="lg">חזרה לדף הבית</Button>
            </div>
            <div className="relative z-10 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
              <Link href="/services/ai-agents" className="hover:text-[var(--primary)] transition-colors">סוכני AI · Agents</Link>
              <Link href="/services/business-automation" className="hover:text-[var(--primary)] transition-colors">אוטומציה לעסקים</Link>
              <Link href="/services/ai-chatbot" className="hover:text-[var(--primary)] transition-colors">צ&apos;אטבוט AI</Link>
            </div>
          </GlassCard>
        </Container>
      </section>
    </>
  );
}
