'use client';

import { useRef, useState, type ReactNode } from 'react';
import packagesData from '@/data/packages.json';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { trackEvent, trackWhatsAppClick } from '@/lib/ga';

const WHATSAPP_NUMBER = '972546361555';

// One solid accent per package — colour identity shared with the homepage teaser,
// rendered as a soft tint so the cards stay calm.
const PKG_ACCENTS: Record<string, string> = {
  starter: '#2563eb',
  business: '#4f46e5',
  premium: '#c026d3',
  ai: '#0d9488',
};

// Package icons, matching the homepage pricing teaser for a consistent look.
const PKG_ICONS: Record<string, ReactNode> = {
  starter: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  business: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  premium: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  ai: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
};

function isValidIsraeliPhone(value: string) {
  const cleaned = value.replace(/[\s-]/g, '');
  return cleaned.length === 10 && /^0(5\d|7[2-9])\d{7}$/.test(cleaned);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

interface Package {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  priceFrom?: boolean;
  popular: boolean;
  customQuote?: boolean;
}

const optionalAddons = [
  { label: 'רכישה וניהול דומיין (על שמכם)', price: '150 ₪/שנה' },
  { label: 'אחסון האתר — משולם ישירות לספק', price: 'לפי המסלול שתבחרו · נעזור לבחור ולהקים' },
  { label: 'מערכת הזמנות / קביעת תורים', price: 'בהצעת מחיר' },
  { label: 'חנות ותשלומים אונליין (Stripe)', price: 'בהצעת מחיר' },
  { label: 'אזור משתמשים / התחברות', price: 'בהצעת מחיר' },
  { label: 'תחזוקה חודשית', price: 'החל מ-150 ₪/חודש' },
];

export default function Pricing() {
  const [pendingPackageId, setPendingPackageId] = useState<string | null>(null);
  const [packageStatus, setPackageStatus] = useState<Record<string, 'success' | 'error'>>({});
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [formError, setFormError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const packages: Package[] = packagesData as Package[];
  const selectedPackage = packages.find((p) => p.id === selectedPackageId) ?? null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(price);

  // What to show for the price: custom-quote has no fixed price; "from" packages
  // start at the listed price and go up by scope.
  const priceLabel = (pkg: Package) =>
    pkg.customQuote
      ? 'הצעת מחיר מותאמת'
      : `${pkg.priceFrom ? 'החל מ-' : ''}${formatPrice(pkg.price)}`;

  const buildWhatsAppLink = (pkg: Package) => {
    const lines = [
      `שלום, אני מעוניין/ת בחבילה: *${pkg.name}* (${priceLabel(pkg)})`,
      '',
      `שם: ${formData.name}`,
      `מייל: ${formData.email}`,
      `טלפון: ${formData.phone}`,
    ];
    if (formData.notes.trim()) {
      lines.push('', `פרטים: ${formData.notes.trim()}`);
    }
    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  const focusFirstInvalid = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      if (!formData.name) nameRef.current?.focus();
      else if (!formData.email) emailRef.current?.focus();
      else if (!formData.phone) phoneRef.current?.focus();
    }, 300);
  };

  // Step 1: user picks a package. Just selects + scrolls down to the form.
  // No validation, no sending — just sets intent so they can complete details.
  const choosePackage = (pkg: Package) => {
    setSelectedPackageId(pkg.id);
    setFormError('');
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        if (!formData.name) nameRef.current?.focus();
        else if (!formData.email) emailRef.current?.focus();
        else if (!formData.phone) phoneRef.current?.focus();
      }, 450);
    }, 50);
  };

  // Step 2: user submits the form. Validates, sends to API, opens WhatsApp.
  const submitForm = async () => {
    if (!selectedPackage) {
      setFormError('נא לבחור חבילה למעלה');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      setFormError('נא למלא שם, אימייל וטלפון');
      focusFirstInvalid();
      return;
    }
    if (!isValidEmail(formData.email)) {
      setFormError('כתובת אימייל לא תקינה');
      emailRef.current?.focus();
      return;
    }
    if (!isValidIsraeliPhone(formData.phone)) {
      setFormError('מספר טלפון חייב להכיל 10 ספרות (לדוגמה: 054-6361555)');
      phoneRef.current?.focus();
      return;
    }

    setFormError('');
    setPendingPackageId(selectedPackage.id);

    // The pricing flow is the highest-intent conversion on the site: the user
    // picked a package, left details AND opens a WhatsApp chat — report both.
    trackEvent('generate_lead', { method: 'pricing_package', package: selectedPackage.name });
    trackWhatsAppClick('pricing_package_form');

    const whatsappUrl = buildWhatsAppLink(selectedPackage);
    const whatsappWindow = window.open(whatsappUrl, '_blank');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `התעניינות בחבילה: ${selectedPackage.name} (${priceLabel(selectedPackage)}).\n${formData.notes || ''}`,
          source_page: '/pricing',
        }),
      });

      let data: { success?: boolean; error?: string } = {};
      try {
        data = await response.json();
      } catch {}

      const ok = response.ok && data.success !== false;
      setPackageStatus((prev) => ({ ...prev, [selectedPackage.id]: ok ? 'success' : 'error' }));
    } catch (error) {
      console.error('Submit error:', error);
      setPackageStatus((prev) => ({ ...prev, [selectedPackage.id]: 'error' }));
    } finally {
      setPendingPackageId(null);
      if (!whatsappWindow || whatsappWindow.closed) {
        window.location.href = whatsappUrl;
      }
    }
  };

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-5">
              <GlassPill dot>תמחור שקוף</GlassPill>
            </div>
            <h1 className="mb-4 text-[var(--text-strong)]">
              בחרו את <span className="lg-text-shimmer">החבילה המתאימה</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-3">
              שני שלבים פשוטים: בחרו חבילה, השאירו פרטים — ותיפתח שיחת WhatsApp מוכנה
            </p>
            <p className="text-base font-semibold text-[var(--text-strong)] max-w-2xl mx-auto">
              בלי הפתעות. המחיר שראיתם הוא המחיר שתשלמו. ייעוץ ראשוני חינם.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── Step 1: pick a package ─── */}
      <section className="relative">
        <Container>
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex justify-center mb-3">
              <GlassPill>שלב 1 מתוך 2</GlassPill>
            </div>
            <h2 className="text-3xl sm:text-4xl mb-2 text-[var(--text-strong)]">
              בחרו חבילה
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              לחיצה על החבילה תגלגל אתכם אוטומטית לשלב הפרטים
            </p>
          </div>

          {/* One shared explainer instead of repeating it inside every card */}
          <p className="text-center text-sm text-[var(--text-muted)] max-w-2xl mx-auto mb-6">
            Starter במחיר קבוע. Business, Premium ו-AI נבנים <span className="font-semibold text-[var(--text-strong)]">בהתאמה אישית</span> —
            ספרו לנו מה אתם צריכים ותקבלו הצעה מדויקת תוך 24 שעות.
          </p>

          {/* All packages — two per row, same tall card for everyone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto items-stretch">
            {packages.map((pkg) => (
              <GlassCard
                key={pkg.id}
                variant={pkg.popular ? 'deep' : 'default'}
                glow={pkg.popular ? 'primary' : selectedPackageId === pkg.id ? 'primary' : 'none'}
                tilt
                squircle="lg"
                className={`relative h-full p-7 sm:p-8 flex flex-col ${selectedPackageId === pkg.id ? 'ring-2 ring-[var(--accent)]' : ''}`}
              >
                <div className="mb-5">
                  {/* Header row — badge sits inline so all titles share the same line */}
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="squircle-md w-10 h-10 flex-shrink-0 flex items-center justify-center"
                        style={{
                          background: `color-mix(in oklab, ${PKG_ACCENTS[pkg.id]} 12%, transparent)`,
                          color: PKG_ACCENTS[pkg.id],
                        }}
                      >
                        {PKG_ICONS[pkg.id]}
                      </div>
                      <h3 className="text-xl font-bold text-[var(--text-strong)] whitespace-nowrap">{pkg.name}</h3>
                    </div>
                    {pkg.popular && (
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }}
                      >
                        ★ פופולרי ביותר
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mb-4 min-h-[3.75rem]">{pkg.description}</p>
                  {pkg.customQuote ? (
                    <GlassPill dot>הצעת מחיר מותאמת · תוך 24 שעות</GlassPill>
                  ) : (
                    <>
                      {pkg.priceFrom && (
                        <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">החל מ-</p>
                      )}
                      <div className="text-4xl font-black text-[var(--text-strong)] leading-none">
                        {formatPrice(pkg.price)}
                      </div>
                    </>
                  )}
                </div>

                <ul className="space-y-2 mb-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-[var(--text-default)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {pkg.notIncluded && pkg.notIncluded.length > 0 && (
                  <div className="mb-6 pt-3 border-t border-[var(--glass-border-dim)]">
                    <p className="text-[11px] font-bold text-[var(--text-faint)] uppercase tracking-wide mb-2">
                      {pkg.customQuote ? 'אפשר להוסיף — לפי הצורך' : 'לא כלול בחבילה'}
                    </p>
                    <ul className="space-y-1.5">
                      {pkg.notIncluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--text-muted)]">
                          <svg
                            className="w-4 h-4 text-[var(--text-faint)] flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-[13px] leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  variant={selectedPackageId === pkg.id ? 'primary' : pkg.popular ? 'primary' : 'glass'}
                  size="md"
                  fullWidth
                  className="mt-auto"
                  onClick={() => choosePackage(pkg)}
                >
                  <span className="flex items-center justify-center gap-2">
                    {selectedPackageId === pkg.id ? (
                      <>✓ נבחרה — המשיכו לפרטים</>
                    ) : pkg.customQuote ? (
                      <>בואו נדבר</>
                    ) : (
                      <>בחרו חבילה זו</>
                    )}
                  </span>
                </Button>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Step 2: leave details ─── */}
      <section className="relative" id="pricing-step-2">
        <Container>
          <div ref={formRef} className="scroll-mt-24">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <GlassPill>שלב 2 מתוך 2</GlassPill>
              </div>
              <h2 className="text-3xl sm:text-4xl mb-2 text-[var(--text-strong)]">
                השאירו פרטים
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                נחזור אליכם בהקדם — תיפתח גם שיחת WhatsApp מוכנה לשליחה
              </p>
            </div>

            <GlassCard variant="default" squircle="lg" className="max-w-3xl mx-auto p-6 sm:p-8">
              {/* Selected package badge */}
              {selectedPackage ? (
                <div className="lg-surface lg-shallow squircle-md flex items-center justify-between gap-3 p-3 sm:p-4 mb-6">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[var(--on-accent)] font-bold"
                      style={{ background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }}
                    >
                      ✓
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--text-muted)]">החבילה שנבחרה</p>
                      <p className="font-bold text-[var(--text-strong)] truncate">
                        {selectedPackage.name}
                        <span className="font-normal text-[var(--text-muted)] text-sm mr-2">
                          · {priceLabel(selectedPackage)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPackageId(null)}
                    className="flex-shrink-0 text-xs text-[var(--text-muted)] hover:text-[var(--text-strong)] underline underline-offset-4 transition-colors"
                  >
                    שנו
                  </button>
                </div>
              ) : (
                <div className="lg-surface lg-shallow squircle-md p-3 sm:p-4 mb-6 text-center">
                  <p className="text-sm text-[var(--text-muted)]">
                    טרם בחרתם חבילה.{' '}
                    <button
                      type="button"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-[var(--accent)] hover:text-[var(--text-strong)] underline underline-offset-4 font-medium"
                    >
                      בחרו חבילה למעלה
                    </button>
                  </p>
                </div>
              )}

              {/* Privacy reassurance */}
              <p className="text-xs text-[var(--text-faint)] mb-3 text-center">
                הפרטים נשארים אצלנו בלבד. שולחים אליכם ל-WhatsApp ברגע שתבחרו חבילה — אפס ספאם.
              </p>

              {/* Fields */}
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="שם מלא *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="lg-input"
                />
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="אימייל *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="lg-input"
                />
                <input
                  ref={phoneRef}
                  type="tel"
                  placeholder="טלפון *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="lg-input"
                  maxLength={11}
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
              <textarea
                placeholder="ספרו קצת על העסק (אופציונלי) — איזה אתר, מה הציפיות..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="lg-input mt-3 resize-none"
              />

              {/* Submit */}
              <div className="mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={submitForm}
                  disabled={pendingPackageId !== null}
                >
                  {pendingPackageId !== null ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      שולח...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                      </svg>
                      שלחו פרטים ופתחו WhatsApp
                    </span>
                  )}
                </Button>
              </div>

              {formError && (
                <p className="mt-3 text-center font-medium text-red-400">{formError}</p>
              )}

              {selectedPackage && packageStatus[selectedPackage.id] === 'success' && (
                <p className="mt-3 text-center text-sm text-green-400 font-medium">
                  ✓ הפרטים נשמרו — נפתחה שיחת WhatsApp
                </p>
              )}
              {selectedPackage && packageStatus[selectedPackage.id] === 'error' && (
                <p className="mt-3 text-center text-sm text-[var(--primary)] font-medium">
                  נפתחה שיחת WhatsApp — שלחו ההודעה ונחזור אליכם
                </p>
              )}
            </GlassCard>
          </div>
        </Container>
      </section>

      {/* ─── Optional addons ─── */}
      <section className="relative">
        <Container>
          {/* Optional addons */}
          <GlassCard variant="default" squircle="lg" glow="primary" className="max-w-5xl mx-auto mt-12 p-7 sm:p-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🧩</span>
              <h3 className="text-xl font-bold text-[var(--text-strong)] text-center">תוספות אופציונליות</h3>
            </div>
            <p className="text-center text-sm text-[var(--text-muted)] mb-1">
              כל תוספת מתווספת למחיר החבילה הבסיסית. <b>שימו לב:</b> מחירי החבילות אינם כוללים דומיין ואחסון.
            </p>
            <p className="text-center text-xs text-[var(--text-faint)] mb-6">
              <b>תוספות מתקדמות מתואמות בשיחה</b> לפי המורכבות והצורך
            </p>

            <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {optionalAddons.map((addon) => (
                <div
                  key={addon.label}
                  className="lg-surface lg-shallow squircle-md flex items-center gap-3 px-4 py-3"
                >
                  <div className="relative z-10 flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-default)] leading-tight">{addon.label}</p>
                    <p className="text-xs font-bold text-[var(--primary)] mt-0.5">{addon.price}</p>
                  </div>
                  <span
                    className="relative z-10 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-[var(--on-accent)]"
                    style={{ background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }}
                  >
                    +
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 lg-surface lg-shallow squircle-md p-4">
              <p className="relative z-10 text-sm text-[var(--text-default)] leading-relaxed">
                <b>💡 לא מצאתם בדיוק מה שחיפשתם?</b> זה בסדר — כל פרויקט שונה. ספרו לנו מה אתם צריכים, ונתאים לכם פתרון.
              </p>
            </div>
          </GlassCard>
        </Container>
      </section>
    </>
  );
}
