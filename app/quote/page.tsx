'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import GlassCard from '@/components/ui/GlassCard';
import GlassPill from '@/components/ui/GlassPill';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

function isValidIsraeliPhone(value: string) {
  const cleaned = value.replace(/[\s-]/g, '');
  return cleaned.length === 10 && /^0(5\d|7[2-9])\d{7}$/.test(cleaned);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const websiteTypes = [
  { id: 'landing', label: 'דף נחיתה', description: 'דף יחיד ממוקד המרה', basePrice: 2500 },
  { id: 'business', label: 'אתר תדמית', description: 'נוכחות עסקית מלאה', basePrice: 4500 },
  { id: 'portfolio', label: 'פורטפוליו', description: 'הצגת עבודות', basePrice: 4500 },
  { id: 'premium', label: 'אתר פרימיום', description: 'חוויית מותג מורחבת', basePrice: 8500 },
  { id: 'custom', label: 'פרויקט מותאם אישית', description: 'מוצר דיגיטלי מלא', basePrice: 18000 },
];

const pageRanges = [
  { id: '1', label: 'עמוד אחד', multiplier: 1 },
  { id: '2-5', label: '2-5 עמודים', multiplier: 1.2 },
  { id: '6-10', label: '6-10 עמודים', multiplier: 1.5 },
  { id: '10+', label: '10+ עמודים', multiplier: 2 },
];

const features = [
  { id: 'contact_form', label: 'טופס יצירת קשר', price: 0 },
  { id: 'blog', label: 'בלוג', price: 1500 },
  { id: 'booking', label: 'מערכת הזמנות', price: 2000 },
  { id: 'multilingual', label: 'רב-לשוני', price: 1000 },
  { id: 'animations', label: 'אנימציות מתקדמות', price: 800 },
  { id: 'seo', label: 'אופטימיזציה ל-SEO', price: 1200 },
];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    websiteType: '',
    numPages: '',
    selectedFeatures: [] as string[],
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
  });
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const calculatePrice = () => {
    const type = websiteTypes.find((t) => t.id === formData.websiteType);
    const pages = pageRanges.find((p) => p.id === formData.numPages);
    if (!type || !pages) return 0;
    let price = type.basePrice * pages.multiplier;
    formData.selectedFeatures.forEach((featureId) => {
      const feature = features.find((f) => f.id === featureId);
      if (feature) price += feature.price;
    });
    return Math.round(price);
  };

  const handleNext = () => {
    if (step === 3) setCalculatedPrice(calculatePrice());
    setStep(step + 1);
  };
  const handleBack = () => setStep(step - 1);

  const toggleFeature = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter((id) => id !== featureId)
        : [...prev.selectedFeatures, featureId],
    }));
  };

  const handleSubmit = async () => {
    setSubmitError('');
    if (!formData.name.trim()) return setSubmitError('נא למלא שם מלא');
    if (!formData.email.trim() || !isValidEmail(formData.email))
      return setSubmitError('כתובת אימייל לא תקינה');
    if (!formData.phone.trim()) return setSubmitError('נא למלא מספר טלפון');
    if (!isValidIsraeliPhone(formData.phone))
      return setSubmitError('מספר טלפון חייב להכיל 10 ספרות (לדוגמה: 054-6361555)');

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, calculated_price: calculatedPrice }),
      });
      if (response.ok) setIsComplete(true);
      else setSubmitError('שגיאה בשליחת הבקשה. נסו שוב');
    } catch {
      setSubmitError('שגיאה בחיבור לשרת');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <section className="relative min-h-[70vh] flex items-center">
        <Container>
          <GlassCard variant="deep" squircle="xl" glow="green" className="max-w-xl mx-auto p-10 text-center">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
              style={{ background: 'radial-gradient(circle at 30% 30%, #34d399, #16a34a)' }}
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mb-3 text-[var(--text-strong)]">תודה על הפנייה!</h1>
            <p className="text-base text-[var(--text-default)] mb-2">
              קיבלנו את הבקשה להערכה של{' '}
              <span className="font-bold lg-text-shimmer">₪{calculatedPrice.toLocaleString()}</span>
            </p>
            <p className="text-sm text-[var(--text-muted)] mb-7 leading-relaxed">
              זו הערכה ראשונית בלבד. נחזור אליכם בהקדם עם הצעת מחיר מפורטת.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                href={`https://wa.me/972546361555?text=${encodeURIComponent(`שלום, השארתי בקשת הצעת מחיר באתר (הערכה: ₪${calculatedPrice.toLocaleString()}). אשמח לזרז.`)}`}
                variant="primary"
                size="lg"
              >
                רוצים לזרז? שלחו לנו ב-WhatsApp
              </Button>
              <Button href="/" variant="glass" size="lg">
                חזרה לעמוד הבית
              </Button>
            </div>
          </GlassCard>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="relative">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-5">
              <GlassPill dot>הערכת מחיר ראשונית</GlassPill>
            </div>
            <h1 className="mb-4">
              מחשבון <span className="lg-text-shimmer">הצעת מחיר</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)]">
              ענו על מספר שאלות וקבלו הערכה ראשונית למחיר האתר. ההצעה הסופית תינתן לאחר שיחת תיאום.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all',
                      step >= s ? 'text-[var(--on-accent)] scale-110 lg-glow-primary' : 'lg-surface lg-shallow text-[var(--text-faint)]'
                    )}
                    style={
                      step >= s
                        ? { background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }
                        : undefined
                    }
                  >
                    <span className="relative z-10">{s}</span>
                  </div>
                ))}
              </div>
              <div className="h-1.5 lg-surface lg-shallow rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(step / 4) * 100}%`,
                    background: 'linear-gradient(90deg, var(--primary), var(--primary-bright))',
                  }}
                />
              </div>
            </div>

            <GlassCard variant="default" squircle="lg" className="p-8 md:p-10">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-3">מה אתם בונים?</h2>
                    <p className="text-[var(--text-muted)] mb-6">בחרו את האפשרות הקרובה ביותר — אפשר לעדכן בכל שלב</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {websiteTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFormData((p) => ({ ...p, websiteType: type.id }))}
                        className={cn(
                          'lg-surface squircle-md p-6 text-right transition-all',
                          formData.websiteType === type.id
                            ? 'lg-glow-primary scale-[1.02]'
                            : 'lg-shallow hover:scale-[1.01]'
                        )}
                      >
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold mb-2 text-[var(--text-strong)]">{type.label}</h3>
                          <p className="text-sm text-[var(--text-muted)] mb-3">{type.description}</p>
                          <p className="text-[var(--primary)] font-bold">החל מ-₪{type.basePrice.toLocaleString()}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button onClick={handleNext} variant="primary" size="lg" fullWidth disabled={!formData.websiteType}>
                    המשך
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-3">כמה עמודים יהיו באתר?</h2>
                    <p className="text-[var(--text-muted)] mb-6">לא בטוחים? אפשר תמיד לעדכן את ההיקף לפני סיום הפרויקט.</p>
                  </div>
                  <div className="space-y-3">
                    {pageRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setFormData((p) => ({ ...p, numPages: range.id }))}
                        className={cn(
                          'w-full lg-surface squircle-md p-5 text-right transition-all',
                          formData.numPages === range.id
                            ? 'lg-glow-primary'
                            : 'lg-shallow hover:scale-[1.01]'
                        )}
                      >
                        <h3 className="relative z-10 text-lg font-bold text-[var(--text-strong)]">{range.label}</h3>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleBack} variant="glass" size="lg" fullWidth>
                      חזור
                    </Button>
                    <Button onClick={handleNext} variant="primary" size="lg" fullWidth disabled={!formData.numPages}>
                      המשך
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-3">אילו פיצ&apos;רים תרצו להוסיף?</h2>
                    <p className="text-[var(--text-muted)] mb-6">בחרו את התכונות שחשובות לכם</p>
                  </div>
                  <div className="space-y-3">
                    {features.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={cn(
                          'w-full lg-surface squircle-md p-4 text-right transition-all flex items-center justify-between',
                          formData.selectedFeatures.includes(feature.id) ? 'lg-glow-primary' : 'lg-shallow'
                        )}
                      >
                        <div className="relative z-10 flex items-center gap-4">
                          <div
                            className={cn(
                              'w-6 h-6 border-2 rounded-md flex items-center justify-center',
                              formData.selectedFeatures.includes(feature.id)
                                ? 'bg-[var(--primary)] border-[var(--primary)]'
                                : 'border-[var(--glass-border-dim)]'
                            )}
                          >
                            {formData.selectedFeatures.includes(feature.id) && (
                              <svg className="w-4 h-4 text-[var(--on-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="font-bold text-[var(--text-strong)]">{feature.label}</span>
                        </div>
                        <span className="relative z-10 text-[var(--primary)] font-bold">
                          {feature.price === 0 ? 'כלול' : `+₪${feature.price}`}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleBack} variant="glass" size="lg" fullWidth>
                      חזור
                    </Button>
                    <Button onClick={handleNext} variant="primary" size="lg" fullWidth>
                      קבלו הצעת מחיר
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-7">
                  <GlassCard variant="deep" squircle="lg" glow="primary" className="p-8 text-center">
                    <h2 className="text-lg text-[var(--text-muted)] mb-3 font-normal">הערכת המחיר שלכם</h2>
                    <p className="text-5xl md:text-6xl font-black lg-text-shimmer mb-4 leading-none">
                      ₪{calculatedPrice.toLocaleString()}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">*זו הערכה אוטומטית. המחיר הסופי נקבע בשיחה קצרה, בלי הפתעות.</p>
                  </GlassCard>

                  <div>
                    <h3 className="text-2xl font-black mb-5 text-[var(--text-strong)]">השאירו פרטים ונחזור אליכם</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="שם מלא *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="lg-input"
                      />
                      <input
                        type="email"
                        placeholder="אימייל *"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="lg-input"
                      />
                      <input
                        type="tel"
                        placeholder="טלפון *"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="lg-input"
                        maxLength={11}
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="lg-surface lg-shallow squircle-sm p-3 text-red-400 text-sm">
                      <span className="relative z-10">{submitError}</span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button onClick={handleBack} variant="glass" size="lg" fullWidth>
                      חזור
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
                    >
                      {isSubmitting ? 'שולח...' : 'שלחו בקשה'}
                    </Button>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>
        </Container>
      </section>
    </>
  );
}
