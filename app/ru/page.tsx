import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';

const SITE_URL = 'https://www.pixelia.co.il';
const WHATSAPP = 'https://wa.me/972546361555?text=' + encodeURIComponent('Здравствуйте! Мне нужен сайт для бизнеса.');

export const metadata: Metadata = {
  title: 'Создание сайтов в Израиле — Pixelia | Сайты для бизнеса на русском',
  description:
    'Профессиональные сайты для бизнеса в Израиле: лендинги от 2 500 ₪, корпоративные сайты, AI-чатботы и автоматизация. Обслуживание на русском и иврите. Быстро, современно, без скрытых платежей.',
  keywords: [
    'создание сайтов Израиль',
    'сайт для бизнеса Израиль',
    'лендинг Израиль',
    'заказать сайт на русском',
    'разработка сайтов Израиль',
  ],
  alternates: {
    canonical: '/ru',
    languages: { he: '/', ru: '/ru' },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    title: 'Pixelia — создание сайтов в Израиле на русском',
    description: 'Лендинги, бизнес-сайты, AI-чатботы. Говорим по-русски и на иврите.',
    url: `${SITE_URL}/ru`,
    images: [
      {
        url: '/images/og/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pixelia — сайты для бизнеса в Израиле',
      },
    ],
  },
};

const packages = [
  {
    name: 'Starter',
    price: '2 500 ₪',
    desc: 'Одностраничный лендинг — идеален для рекламных кампаний и быстрого старта.',
    features: ['Современный дизайн', 'Адаптация под мобильные', 'Форма заявки + WhatsApp', 'Базовое SEO', 'Срок: 5–7 дней'],
  },
  {
    name: 'Business',
    price: '3 500 ₪',
    popular: true,
    desc: 'Полноценный сайт-визитка для бизнеса: до 3 страниц, галерея, формы.',
    features: ['До 3 страниц (доп. страница — 300 ₪)', 'Галерея работ', 'Продвинутые формы', 'SEO-оптимизация', 'Срок: 1–2 недели'],
  },
  {
    name: 'Premium',
    price: 'от 5 000 ₪',
    desc: 'Индивидуальный проект: интернет-магазин, личный кабинет, интеграции, AI.',
    features: ['Индивидуальный функционал', 'Интеграции и оплата', 'AI-чатбот по желанию', 'Полное сопровождение', 'Срок: 2–4 недели'],
  },
];

const services = [
  { title: 'Лендинги и сайты', desc: 'Быстрые современные сайты на Next.js — той же технологии, что у Netflix и TikTok.' },
  { title: 'AI-чатботы и автоматизация', desc: 'Умный бот отвечает клиентам 24/7, собирает заявки и экономит ваше время.' },
  { title: 'SEO и Google', desc: 'Настройка так, чтобы клиенты находили вас в Google — на русском и иврите.' },
];

const faqs = [
  {
    q: 'Вы правда говорите по-русски?',
    a: 'Да! Весь процесс — обсуждение, правки, поддержка — может проходить полностью на русском языке.',
  },
  {
    q: 'Сколько стоит сайт?',
    a: 'Лендинг — 2 500 ₪, бизнес-сайт — 3 500 ₪, индивидуальные проекты — от 5 000 ₪. Цена фиксируется до начала работы, без скрытых платежей.',
  },
  {
    q: 'Кому принадлежит сайт после оплаты?',
    a: 'Вам. Код и домен оформляются на ваше имя — вы не привязаны к нам ежемесячными платежами.',
  },
  {
    q: 'Как быстро будет готов сайт?',
    a: 'Лендинг — за 5–7 дней, сайт для бизнеса — за 1–2 недели. Перед началом вы получаете визуальное демо.',
  },
];

export default function RussianLandingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Создание сайтов для бизнеса в Израиле',
        provider: { '@type': 'Organization', name: 'Pixelia', url: SITE_URL },
        areaServed: 'IL',
        availableLanguage: ['ru', 'he'],
        description: metadata.description,
        url: `${SITE_URL}/ru`,
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
    <div dir="ltr" lang="ru">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative">
        <Container size="md">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-5">
              <GlassPill dot>Говорим по-русски 🇮🇱</GlassPill>
            </div>
            <h1 className="mb-4 text-[var(--text-strong)]">
              Сайт для вашего бизнеса — <span className="lg-text-shimmer">на русском языке</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)] mb-7">
              Профессиональные сайты для бизнеса в Израиле. Небольшая студия с высоким стандартом:
              современные технологии, личное сопровождение и честные цены — весь процесс на русском.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href={WHATSAPP} variant="primary" size="lg" external>
                Написать в WhatsApp
              </Button>
              <Button href="/contact" variant="glass" size="lg">
                Оставить заявку
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="relative">
        <Container size="md">
          <h2 className="text-3xl mb-8 text-[var(--text-strong)] text-center">Что мы делаем</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {services.map((s) => (
              <GlassCard key={s.title} variant="default" squircle="lg" className="p-6">
                <h3 className="relative z-10 text-xl font-bold text-[var(--text-strong)] mb-2">{s.title}</h3>
                <p className="relative z-10 text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="relative">
        <Container size="md">
          <h2 className="text-3xl mb-3 text-[var(--text-strong)] text-center">Пакеты и цены</h2>
          <p className="text-center text-[var(--text-muted)] mb-8">
            Разовая оплата. Код и домен — ваша собственность.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
            {packages.map((p) => (
              <GlassCard
                key={p.name}
                variant={p.popular ? 'deep' : 'default'}
                glow={p.popular ? 'primary' : undefined}
                squircle="lg"
                className="p-6 flex flex-col"
              >
                {p.popular && (
                  <div className="relative z-10 mb-3">
                    <GlassPill dot>Самый популярный</GlassPill>
                  </div>
                )}
                <h3 className="relative z-10 text-xl font-black text-[var(--text-strong)]">{p.name}</h3>
                <div className="relative z-10 text-3xl font-black text-[var(--primary)] my-2">{p.price}</div>
                <p className="relative z-10 text-sm text-[var(--text-muted)] mb-4">{p.desc}</p>
                <ul className="relative z-10 space-y-2 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-default)]">
                      <svg className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="relative z-10 mt-5">
                  <Button href={WHATSAPP} variant={p.popular ? 'primary' : 'glass'} size="md" external className="w-full">
                    Узнать подробнее
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative">
        <Container size="md">
          <h2 className="text-3xl mb-6 text-[var(--text-strong)] text-center">Частые вопросы</h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((f) => (
              <GlassCard key={f.q} variant="default" squircle="md" className="p-5">
                <h3 className="relative z-10 font-bold text-[var(--text-strong)] mb-1.5">{f.q}</h3>
                <p className="relative z-10 text-sm text-[var(--text-muted)] leading-relaxed">{f.a}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative">
        <Container size="md">
          <GlassCard variant="deep" glow="primary" squircle="xl" className="max-w-3xl mx-auto p-8 text-center">
            <h2 className="relative z-10 text-2xl font-black text-[var(--text-strong)] mb-3">
              Обсудим ваш проект?
            </h2>
            <p className="relative z-10 text-[var(--text-muted)] mb-6">
              Короткий разговор без обязательств — и вы получите точное предложение с ценой и сроками.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button href={WHATSAPP} variant="primary" size="lg" external>
                💬 WhatsApp — по-русски
              </Button>
              <Button href="/contact" variant="glass" size="lg">
                Форма заявки
              </Button>
            </div>
          </GlassCard>
        </Container>
      </section>
    </div>
  );
}
