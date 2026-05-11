'use client';

import { useRef, useState } from 'react';
import packagesData from '@/data/packages.json';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';

const WHATSAPP_NUMBER = '972546361555';

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
  popular: boolean;
}

const optionalAddons = [
  { label: 'מסד נתונים (DB) — שמירת לידים, הרשמות', price: 'החל מ-800 ₪' },
  { label: 'פאנל ניהול תוכן פשוט', price: 'החל מ-1,200 ₪' },
  { label: 'דומיין + אחסון שנתי', price: '300 ₪/שנה' },
  { label: 'דף נוסף לאתר', price: '250-300 ₪' },
  { label: 'תחזוקה חודשית', price: 'החל מ-150 ₪/חודש' },
];

export default function Pricing() {
  const [pendingPackageId, setPendingPackageId] = useState<string | null>(null);
  const [packageStatus, setPackageStatus] = useState<Record<string, 'success' | 'error'>>({});
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [formError, setFormError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const packages: Package[] = packagesData as Package[];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(price);

  const buildWhatsAppLink = (pkg: Package) => {
    const lines = [
      `שלום, אני מעוניין/ת בחבילה: *${pkg.name}* (${formatPrice(pkg.price)})`,
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

  const handleSelectPackage = async (pkg: Package) => {
    if (!formData.name || !formData.email || !formData.phone) {
      setFormError('נא למלא שם, אימייל וטלפון לפני בחירת החבילה');
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
    setPendingPackageId(pkg.id);

    const whatsappUrl = buildWhatsAppLink(pkg);
    const whatsappWindow = window.open(whatsappUrl, '_blank');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `התעניינות בחבילה: ${pkg.name} (${formatPrice(pkg.price)}).\n${formData.notes || ''}`,
          source_page: '/pricing',
        }),
      });

      let data: { success?: boolean; error?: string } = {};
      try {
        data = await response.json();
      } catch {}

      const ok = response.ok && data.success !== false;
      setPackageStatus((prev) => ({ ...prev, [pkg.id]: ok ? 'success' : 'error' }));
    } catch (error) {
      console.error('Submit error:', error);
      setPackageStatus((prev) => ({ ...prev, [pkg.id]: 'error' }));
    } finally {
      setPendingPackageId(null);
      if (!whatsappWindow || whatsappWindow.closed) {
        window.location.href = whatsappUrl;
      }
    }
  };

  return (
    <>
      <section className="relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-5">
              <GlassPill dot>תמחור שקוף</GlassPill>
            </div>
            <h1 className="mb-4 text-[var(--text-strong)]">
              בחר את <span className="lg-text-shimmer">החבילה המתאימה</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              מלאו פרטים, בחרו חבילה — ותיפתח שיחת WhatsApp מוכנה לשליחה
            </p>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container>
          {/* Lead form */}
          <div ref={formRef}>
            <GlassCard variant="default" squircle="lg" className="max-w-4xl mx-auto p-6 sm:p-8 mb-10">
              <h3 className="text-xl font-bold mb-1 text-[var(--text-strong)] text-center">
                מלאו פרטים, ובחרו חבילה למטה
              </h3>
              <p className="text-center text-xs text-[var(--text-muted)] mb-5">
                לאחר הלחיצה על &quot;בחר חבילה&quot; — תיפתח שיחת WhatsApp מוכנה
              </p>
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
              {formError && <p className="mt-3 text-center font-medium text-red-400">{formError}</p>}
            </GlassCard>
          </div>

          {/* Packages */}
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto items-stretch">
            {packages.map((pkg) => (
              <GlassCard
                key={pkg.id}
                variant={pkg.popular ? 'deep' : 'default'}
                glow={pkg.popular ? 'primary' : 'none'}
                tilt
                squircle="lg"
                className={`relative h-full p-7 sm:p-8 flex flex-col ${pkg.popular ? 'sm:-translate-y-3' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span
                      className="px-4 py-1.5 rounded-full text-xs font-bold text-[var(--on-accent)] shadow-lg whitespace-nowrap"
                      style={{
                        background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))',
                      }}
                    >
                      פופולרי ביותר
                    </span>
                  </div>
                )}

                <div className="text-center mb-5">
                  <h3 className="text-2xl font-bold text-[var(--text-strong)] mb-2">{pkg.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">{pkg.description}</p>
                  <p className="text-xs font-semibold text-[var(--text-muted)] mb-1">החל מ-</p>
                  <div className="text-4xl font-black text-[var(--text-strong)] leading-none">
                    {formatPrice(pkg.price)}
                  </div>
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
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

                <Button
                  variant={pkg.popular ? 'primary' : 'glass'}
                  size="md"
                  fullWidth
                  onClick={() => handleSelectPackage(pkg)}
                  disabled={pendingPackageId === pkg.id}
                >
                  {pendingPackageId === pkg.id ? (
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
                      בחר חבילה ושלח פרטים
                    </span>
                  )}
                </Button>

                {packageStatus[pkg.id] === 'success' && (
                  <p className="mt-2 text-center text-xs text-green-400 font-medium">
                    ✓ הפרטים נשמרו — נפתחה שיחת WhatsApp
                  </p>
                )}
                {packageStatus[pkg.id] === 'error' && (
                  <p className="mt-2 text-center text-xs text-[var(--primary)] font-medium">
                    נפתחה שיחת WhatsApp — שלחו ההודעה ונחזור אליכם
                  </p>
                )}
              </GlassCard>
            ))}
          </div>

          {/* Optional addons */}
          <GlassCard variant="default" squircle="lg" glow="primary" className="max-w-5xl mx-auto mt-12 p-7 sm:p-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🧩</span>
              <h3 className="text-xl font-bold text-[var(--text-strong)] text-center">תוספות אופציונליות</h3>
            </div>
            <p className="text-center text-sm text-[var(--text-muted)] mb-1">
              כל תוספת מתווספת למחיר החבילה הבסיסית
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
                  <span
                    className="relative z-10 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-[var(--on-accent)]"
                    style={{ background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }}
                  >
                    +
                  </span>
                  <div className="relative z-10 flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-default)] leading-tight">{addon.label}</p>
                    <p className="text-xs font-bold text-[var(--primary)] mt-0.5">{addon.price}</p>
                  </div>
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
