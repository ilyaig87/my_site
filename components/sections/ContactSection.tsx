'use client';

import { useState, FormEvent } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function ContactSection() {
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
    } else {
      const cleanedPhone = formData.phone.replace(/[\s-]/g, '');
      if (cleanedPhone.length !== 10 || !/^0(5\d|7[2-9])\d{7}$/.test(cleanedPhone)) {
        newErrors.phone = 'מספר טלפון חייב להכיל 10 ספרות (לדוגמה: 054-6361555)';
      }
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

          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-md">
              {submitStatus === 'success' && (
                <div className="mb-3 p-2.5 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  <p className="font-semibold text-sm">ההודעה נשלחה בהצלחה!</p>
                  <p className="text-xs mt-0.5">נחזור אליכם בהקדם האפשרי.</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-gray-900 mb-1">
                    שם מלא *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all ${
                      errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="איך קוראים לכם?"
                    suppressHydrationWarning
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-[10px] mt-0.5">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-900 mb-1">
                    אימייל *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                    suppressHydrationWarning
                  />
                  {errors.email && (
                    <p className="text-red-600 text-[10px] mt-0.5">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-900 mb-1">
                    טלפון *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="054-6361555"
                    suppressHydrationWarning
                    maxLength={11}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-[10px] mt-0.5">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="businessType" className="block text-xs font-semibold text-gray-900 mb-1">
                    סוג העסק *
                  </label>
                  <select
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => handleChange('businessType', e.target.value)}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all bg-white ${
                      errors.businessType ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    suppressHydrationWarning
                  >
                    <option value="">בחרו סוג עסק</option>
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
                <label htmlFor="message" className="block text-xs font-semibold text-gray-900 mb-1">
                  ספרו לנו על הפרויקט *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={3}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all resize-none ${
                    errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="מה אתם מחפשים? ספרו לנו קצת על העסק..."
                />
                {errors.message && (
                  <p className="text-red-600 text-[10px] mt-0.5">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="md"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2 text-sm">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    שולח...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    שלחו הודעה
                  </span>
                )}
              </Button>

              <p className="text-[10px] text-gray-500 text-center mt-2">
                בשליחת הטופס אתם מסכימים לתנאי השימוש ומדיניות הפרטיות שלנו
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
