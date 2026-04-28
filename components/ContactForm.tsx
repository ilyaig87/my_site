'use client'

import { useState } from 'react'

// Israeli phone validation - exactly 10 digits:
//   Mobile: 050/051/052/053/054/055/056/057/058/059 + 7 digits
//   VOIP/Business: 072-079 + 7 digits
const israeliPhoneRegex = /^0(5\d|7[2-9])\d{7}$/

function isValidIsraeliPhone(value: string) {
  const cleaned = value.replace(/[\s-]/g, '')
  return cleaned.length === 10 && israeliPhoneRegex.test(cleaned)
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'נא למלא שם מלא'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'נא למלא אימייל'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'נא למלא מספר טלפון'
    } else if (!isValidIsraeliPhone(formData.phone)) {
      newErrors.phone = 'מספר טלפון חייב להכיל 10 ספרות (לדוגמה: 054-6361555)'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'נא לכתוב הודעה'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'ההודעה קצרה מדי (לפחות 10 תווים)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source_page: window.location.pathname
        })
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        setErrors({})
      } else {
        let data: { error?: string } = {}
        try {
          data = await response.json()
        } catch {
          // ignore non-JSON
        }
        setErrorMessage(data.error || 'שגיאה בשליחת הטופס')
        setStatus('error')
      }
    } catch (error) {
      setErrorMessage('שגיאה בחיבור לשרת')
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">ההודעה נשלחה בהצלחה!</h3>
        <p className="text-sm text-gray-600 mb-3">
          תודה שפניתם אלינו. נחזור אליכם בהקדם האפשרי.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-bold hover:bg-green-700 transition-colors"
        >
          שלח הודעה נוספת
        </button>
      </div>
    )
  }

  const inputClass = (field: string) =>
    `w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-yellow-400/30 focus:outline-none transition-all ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:border-red-400'
        : 'border-gray-300 focus:border-yellow-400'
    }`

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-md">
      <h2 className="text-lg md:text-xl font-bold mb-1 text-center text-gray-900">
        השאירו פרטים ונחזור אליכם
      </h2>
      <p className="text-xs text-gray-500 text-center mb-4">
        מענה תוך 24 שעות
      </p>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div className="grid sm:grid-cols-2 gap-3">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-900 mb-1">
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
            {errors.name && <p className="text-red-600 text-[10px] mt-0.5">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-900 mb-1">
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
            {errors.email && <p className="text-red-600 text-[10px] mt-0.5">{errors.email}</p>}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-gray-900 mb-1">
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
          {errors.phone && <p className="text-red-600 text-[10px] mt-0.5">{errors.phone}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-gray-900 mb-1">
            הודעה *
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass('message')} resize-none`}
            placeholder="ספרו על הפרויקט שלכם..."
          />
          {errors.message && <p className="text-red-600 text-[10px] mt-0.5">{errors.message}</p>}
        </div>

        {/* Error Message */}
        {status === 'error' && errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 text-red-700 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-2.5 bg-yellow-400 text-gray-900 rounded-lg font-bold hover:bg-yellow-500 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              שולח...
            </span>
          ) : (
            'שלח הודעה'
          )}
        </button>
      </form>
    </div>
  )
}
