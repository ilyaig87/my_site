'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';

const israeliPhoneRegex = /^0(5\d|7[2-9])\d{7}$/;

function isValidIsraeliPhone(value: string) {
  const cleaned = value.replace(/[\s-]/g, '');
  return cleaned.length === 10 && israeliPhoneRegex.test(cleaned);
}

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'נא למלא שם מלא';
    if (!formData.email.trim()) newErrors.email = 'נא למלא אימייל';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'כתובת אימייל לא תקינה';
    if (!formData.phone.trim()) newErrors.phone = 'נא למלא מספר טלפון';
    else if (!isValidIsraeliPhone(formData.phone))
      newErrors.phone = 'מספר טלפון חייב להכיל 10 ספרות (לדוגמה: 054-6361555)';
    if (!formData.message.trim()) newErrors.message = 'נא לכתוב הודעה';
    else if (formData.message.trim().length < 10) newErrors.message = 'ההודעה קצרה מדי';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source_page: window.location.pathname }),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        let data: { error?: string } = {};
        try {
          data = await response.json();
        } catch {}
        setErrorMessage(data.error || 'שגיאה בשליחת הטופס');
        setStatus('error');
      }
    } catch {
      setErrorMessage('שגיאה בחיבור לשרת');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  if (status === 'success') {
    return (
      <GlassCard variant="deep" glow="green" squircle="lg" className="p-8 text-center">
        <div className="relative z-10">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
            style={{ background: 'radial-gradient(circle at 30% 30%, #34d399, #16a34a)' }}
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[var(--text-strong)] mb-2">ההודעה נשלחה בהצלחה!</h3>
          <p className="text-sm text-[var(--text-muted)] mb-5">
            תודה שפניתם אלינו. נחזור אליכם בהקדם האפשרי.
          </p>
          <Button onClick={() => setStatus('idle')} variant="primary" size="sm">
            שלח הודעה נוספת
          </Button>
        </div>
      </GlassCard>
    );
  }

  const inputClass = (field: string) =>
    `lg-input text-sm ${errors[field] ? 'border-red-400 focus:border-red-400' : ''}`;

  return (
    <GlassCard variant="default" squircle="lg" className="p-6 sm:p-8">
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-center text-[var(--text-strong)] mb-1">
          השאירו פרטים ונחזור אליכם
        </h2>
        <p className="text-sm text-[var(--text-muted)] text-center mb-6">מענה תוך 24 שעות</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[var(--text-strong)] mb-1.5">
                שם מלא *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass('name')}
                placeholder="איך קוראים לך?"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[var(--text-strong)] mb-1.5">
                אימייל *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass('email')}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-[var(--text-strong)] mb-1.5">
              טלפון *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass('phone')}
              placeholder="054-6361555"
              inputMode="tel"
              autoComplete="tel"
              maxLength={11}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-[var(--text-strong)] mb-1.5">
              הודעה *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`${inputClass('message')} resize-none`}
              placeholder="ספרו על הפרויקט שלכם..."
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          {status === 'error' && errorMessage && (
            <div className="lg-surface lg-shallow squircle-sm p-3 text-red-400 text-sm">
              <span className="relative z-10">{errorMessage}</span>
            </div>
          )}

          <Button type="submit" variant="primary" size="md" fullWidth disabled={status === 'loading'}>
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                שולח...
              </span>
            ) : (
              'שלח הודעה'
            )}
          </Button>
        </form>
      </div>
    </GlassCard>
  );
}
