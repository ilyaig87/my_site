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
            <div className="lg:col-span-1 space-y-3">
              <div>
                <h3 className="text-base font-bold mb-3 text-gray-900">
                  דרכי התקשרות
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-gray-900 mb-0.5">אימייל</p>
                      <a href="mailto:contact@pixelia.co.il" className="text-[10px] text-gray-600 hover:text-yellow-600 transition-colors">
                        contact@pixelia.co.il
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-gray-900 mb-0.5">טלפון</p>
                      <a href="tel:+972501234567" className="text-[10px] text-gray-600 hover:text-yellow-600 transition-colors">
                        050-123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-gray-900 mb-0.5">WhatsApp</p>
                      <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-600 hover:text-yellow-600 transition-colors">
                        שלחו הודעה
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-3 border-2 border-yellow-200">
                <h4 className="font-bold text-xs text-gray-900 mb-1.5">זמני מענה</h4>
                <div className="space-y-0.5 text-[10px] text-gray-600">
                  <p>ראשון - חמישי: 9:00 - 18:00</p>
                  <p>שישי: 9:00 - 14:00</p>
                  <p>שבת: סגור</p>
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
                      placeholder="050-123-4567"
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
