import { Metadata } from 'next';
import Link from 'next/link';
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
    priceNote: 'разовая оплата',
    desc: 'Одностраничный лендинг — идеален для рекламных кампаний и быстрого старта.',
    features: ['Современный дизайн', 'Адаптация под мобильные', 'Форма заявки + WhatsApp', 'Базовое SEO', 'Срок: до 5 рабочих дней'],
  },
  {
    name: 'Business',
    price: 'Индивидуальный расчёт',
    priceNote: 'расскажите о проекте — вернёмся с точным предложением',
    popular: true,
    desc: 'Полноценный сайт-визитка для бизнеса: несколько страниц, галерея, формы.',
    features: ['Несколько страниц с навигацией', 'Галерея работ', 'Продвинутые формы', 'SEO-оптимизация', 'Срок: 1–2 недели'],
  },
  {
    name: 'Premium',
    price: 'Индивидуальный расчёт',
    priceNote: 'цена зависит от объёма и функционала',
    desc: 'Индивидуальный проект: интернет-магазин, личный кабинет, интеграции, AI.',
    features: ['Индивидуальный функционал', 'Интеграции и оплата', 'Блог / CMS', 'Полное сопровождение', 'Срок: 2–4 недели'],
  },
  {
    name: 'AI и автоматизация',
    price: 'Индивидуальный расчёт',
    priceNote: 'как дополнение к сайту или отдельный проект',
    desc: 'Умные чатботы, автоматизация бизнеса и AI-агенты, которые работают 24/7.',
    features: ['AI-чатбот для сайта и WhatsApp', 'Автоматический сбор заявок', 'Бизнес-автоматизации (CRM, почта)', 'Интеграция AI в ваши системы', 'Обучение и сопровождение'],
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
    a: 'Лендинг — 2 500 ₪ (разовая оплата). Бизнес-сайты, индивидуальные проекты и AI-решения рассчитываются персонально: короткий разговор — и в течение 24 часов вы получаете точное предложение. Цена фиксируется до начала работы, без скрытых платежей.',
  },
  {
    q: 'Кому принадлежит сайт после оплаты?',
    a: 'Вам. Код и домен оформляются на ваше имя — вы не привязаны к нам ежемесячными платежами.',
  },
  {
    q: 'Как быстро будет готов сайт?',
    a: 'Лендинг — до 5 рабочих дней, а часто и быстрее (зависит от сложности). Сайт для бизнеса — 1–2 недели. Перед началом вы получаете визуальное демо.',
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
          {/* Starter — фиксированная цена, отдельной широкой карточкой */}
          <div className="max-w-5xl mx-auto mb-5">
            <GlassCard variant="default" squircle="lg" className="p-6 sm:p-7">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                <div className="md:flex-1">
                  <h3 className="text-xl font-black text-[var(--text-strong)]">{packages[0].name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{packages[0].desc}</p>
                </div>
                <div className="md:text-center">
                  <div className="text-3xl font-black text-[var(--primary)] leading-none">{packages[0].price}</div>
                  <p className="text-xs text-[var(--text-faint)] mt-1">{packages[0].priceNote}</p>
                </div>
                <div className="md:flex-1">
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {packages[0].features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-default)]">
                        <svg className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button href={WHATSAPP} variant="primary" size="md" external>
                  Заказать
                </Button>
              </div>
            </GlassCard>
          </div>

          {/* Индивидуальные пакеты — три в ряд */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
            {packages.slice(1).map((p) => (
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
                <div className={`relative z-10 font-black text-[var(--primary)] my-2 ${p.price.includes('₪') ? 'text-3xl' : 'text-xl leading-snug'}`}>{p.price}</div>
                {p.priceNote && <p className="relative z-10 text-xs text-[var(--text-faint)] mb-2">{p.priceNote}</p>}
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
            <div className="relative z-10 mt-6">
              <Link href="/ru/blog" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
                Читайте наш блог на русском →
              </Link>
            </div>
          </GlassCard>
        </Container>
      </section>
    </div>
  );
}
