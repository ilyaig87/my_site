'use client';

import { useState, FormEvent } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ContactInfo } from '@/types';

interface ContactSectionProps {
  contact?: ContactInfo;
}

function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const phone = contact?.phone ?? '';
  const phoneDigits = phone.replace(/\D/g, '');
  const phoneDisplay = formatPhoneDisplay(phone);
  const email = contact?.email ?? '';
  const whatsapp = contact?.whatsapp ?? '';
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'נא למלא שם מלא';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'נא למלא כתובת אימייל';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'נא למלא מספר טלפון';
    } else if (!/^0\d{1,2}-?\d{7}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = 'נא לבחור סוג עסק';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'נא למלא הודעה';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'ההודעה קצרה מדי (לפחות 10 תווים)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // TODO: Replace with actual API call
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        businessType: '',
        message: '',
      });
      setErrors({});
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section id="contact" className="py-6 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-2 rounded-full bg-yellow-100 border border-yellow-300 text-gray-900 text-[10px] font-medium">
              <span>✉️</span>
              <span>נשמח לשמוע מכם</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black mb-2 text-gray-900">
              בואו נדבר על האתר שלכם
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              השאירו פרטים ונחזור אליכם תוך 24 שעות
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="relative h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-5 shadow-xl overflow-hidden">
                {/* Decorative gradient blobs */}
                <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"></div>
                <div className="pointer-events-none absolute -bottom-16 -left-12 w-44 h-44 bg-yellow-500/10 rounded-full blur-3xl"></div>

                <div className="relative">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mb-2 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 text-[9px] font-semibold uppercase tracking-wide">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400"></span>
                      </span>
                      <span>זמינים עכשיו</span>
                    </div>
                    <h3 className="text-lg font-black text-white mb-1">
                      דרכי התקשרות
                    </h3>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      בחרו את הדרך הנוחה לכם — מענה תוך 24 שעות
                    </p>
                  </div>

                  {/* Contact methods */}
                  <div className="space-y-2 mb-4">
                    {/* Email */}
                    <a
                      href={`mailto:${email}`}
                      className="group flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-400/40 transition-all"
                    >
                      <div className="w-9 h-9 rounded-lg bg-yellow-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                        <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold text-yellow-300 uppercase tracking-wide mb-0.5">אימייל</p>
                        <p className="text-xs text-white truncate" dir="ltr">{email}</p>
                      </div>
                      <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-yellow-300 transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </a>

                    {/* Phone */}
                    <a
                      href={`tel:+972${phoneDigits.replace(/^0/, '')}`}
                      className="group flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-400/40 transition-all"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold text-blue-300 uppercase tracking-wide mb-0.5">טלפון</p>
                        <p className="text-xs text-white" dir="ltr">{phoneDisplay}</p>
                      </div>
                      <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-300 transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </a>
                  </div>

                  {/* WhatsApp CTA - emphasized */}
                  <a
                    href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('היי, אני מעוניין לבנות אתר')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-green-500 hover:bg-green-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] mb-3 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <svg className="relative w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="relative">שלחו הודעה ב-WhatsApp</span>
                  </a>

                  {/* Trust signals */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[10px] text-gray-300">ייעוץ ראשוני חינם</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[10px] text-gray-300">ללא התחייבות</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[10px] text-gray-300">מחירים שקופים</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[10px] text-gray-300">מענה תוך 24ש'</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 border-2 border-gray-200 shadow-lg">
                {submitStatus === 'success' && (
                  <div className="mb-3 p-2 bg-green-50 border-2 border-green-200 rounded-lg text-green-800">
                    <p className="font-semibold text-xs">ההודעה נשלחה בהצלחה!</p>
                    <p className="text-[10px] mt-0.5">נחזור אליכם בהקדם האפשרי.</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] font-semibold text-gray-900 mb-1">
                      שם מלא *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className={`w-full px-2.5 py-1.5 text-xs border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${
                        errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="איך קוראים לך?"
                      suppressHydrationWarning
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-[10px] mt-0.5">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[10px] font-semibold text-gray-900 mb-1">
                      אימייל *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-2.5 py-1.5 text-xs border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="your@email.com"
                      suppressHydrationWarning
                    />
                    {errors.email && (
                      <p className="text-red-600 text-[10px] mt-0.5">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-semibold text-gray-900 mb-1">
                      טלפון *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full px-2.5 py-1.5 text-xs border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${
                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="054-6361555"
                      suppressHydrationWarning
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-[10px] mt-0.5">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="businessType" className="block text-[10px] font-semibold text-gray-900 mb-1">
                      סוג העסק *
                    </label>
                    <select
                      id="businessType"
                      value={formData.businessType}
                      onChange={(e) => handleChange('businessType', e.target.value)}
                      className={`w-full px-2.5 py-1.5 text-xs border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${
                        errors.businessType ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      suppressHydrationWarning
                    >
                      <option value="">בחר סוג עסק</option>
                      <option value="restaurant">מסעדה / בית קפה</option>
                      <option value="retail">חנות / קמעונאות</option>
                      <option value="services">שירותים מקצועיים</option>
                      <option value="clinic">מרפאה / בריאות</option>
                      <option value="legal">עורך דין / משרד עורכי דין</option>
                      <option value="coach">מאמן / יועץ</option>
                      <option value="beauty">יופי וטיפוח</option>
                      <option value="tech">טכנולוגיה / הייטק</option>
                      <option value="other">אחר</option>
                    </select>
                    {errors.businessType && (
                      <p className="text-red-600 text-[10px] mt-0.5">{errors.businessType}</p>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="block text-[10px] font-semibold text-gray-900 mb-1">
                    ספרו לנו על הפרויקט *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className={`w-full px-2.5 py-1.5 text-xs border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all resize-none ${
                      errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="מה אתם מחפשים? ספרו לנו קצת על העסק..."
                  />
                  {errors.message && (
                    <p className="text-red-600 text-[10px] mt-0.5">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-1.5 text-xs">
                      <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      שולח...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5 text-xs">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      שלח הודעה
                    </span>
                  )}
                </Button>

                <p className="text-[8px] text-gray-500 text-center mt-2">
                  בשליחת הטופס אתם מסכימים לתנאי השימוש ומדיניות הפרטיות שלנו
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
