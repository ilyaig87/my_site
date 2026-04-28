'use client'

import { useRef, useState } from 'react'
import packagesData from '@/data/packages.json'
import TrustBadges from '@/components/TrustBadges'

const WHATSAPP_NUMBER = '972546361555'

// Israeli phone validation - exactly 10 digits (mobile or VOIP/business)
function isValidIsraeliPhone(value: string) {
  const cleaned = value.replace(/[\s-]/g, '')
  return cleaned.length === 10 && /^0(5\d|7[2-9])\d{7}$/.test(cleaned)
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

interface Package {
  id: string
  name: string
  price: number
  currency: string
  description: string
  features: string[]
  popular: boolean
}

const optionalAddons = [
  { label: 'מסד נתונים (DB) - שמירת לידים, הרשמות', price: 'מ-800 ₪' },
  { label: 'פאנל ניהול תוכן פשוט', price: 'מ-1,200 ₪' },
  { label: 'דומיין + אחסון שנתי', price: '300 ₪/שנה' },
  { label: 'דף נוסף לאתר', price: '250-300 ₪' },
  { label: 'תחזוקה חודשית', price: 'מ-150 ₪/חודש' },
]

export default function Pricing() {
  const [pendingPackageId, setPendingPackageId] = useState<string | null>(null)
  const [packageStatus, setPackageStatus] = useState<Record<string, 'success' | 'error'>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [formError, setFormError] = useState('')
  const formRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  const packages: Package[] = packagesData as Package[]

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      maximumFractionDigits: 0,
    }).format(price)

  const buildWhatsAppLink = (pkg: Package) => {
    const lines = [
      `שלום, אני מעוניין/ת בחבילה: *${pkg.name}* (${formatPrice(pkg.price)})`,
      '',
      `שם: ${formData.name}`,
      `מייל: ${formData.email}`,
      `טלפון: ${formData.phone}`,
    ]
    if (formData.notes.trim()) {
      lines.push('', `פרטים: ${formData.notes.trim()}`)
    }
    const text = encodeURIComponent(lines.join('\n'))
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  }

  const focusFirstInvalid = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => {
      if (!formData.name) nameRef.current?.focus()
      else if (!formData.email) emailRef.current?.focus()
      else if (!formData.phone) phoneRef.current?.focus()
    }, 300)
  }

  const handleSelectPackage = async (pkg: Package) => {
    if (!formData.name || !formData.email || !formData.phone) {
      setFormError('נא למלא שם, אימייל וטלפון לפני בחירת החבילה')
      focusFirstInvalid()
      return
    }
    if (!isValidEmail(formData.email)) {
      setFormError('כתובת אימייל לא תקינה')
      emailRef.current?.focus()
      return
    }
    if (!isValidIsraeliPhone(formData.phone)) {
      setFormError('מספר טלפון חייב להכיל 10 ספרות (לדוגמה: 054-6361555)')
      phoneRef.current?.focus()
      return
    }

    setFormError('')
    setPendingPackageId(pkg.id)

    // Open WhatsApp immediately so we never lose the lead even if the API
    // is down. Save to DB in the background.
    const whatsappUrl = buildWhatsAppLink(pkg)
    const whatsappWindow = window.open(whatsappUrl, '_blank')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `התעניינות בחבילה: ${pkg.name} (${formatPrice(pkg.price)}).\n${
            formData.notes || ''
          }`,
          source_page: '/pricing',
        }),
      })

      let data: { success?: boolean; error?: string } = {}
      try {
        data = await response.json()
      } catch {
        // non-JSON response – ignore
      }

      const ok = response.ok && data.success !== false
      setPackageStatus((prev) => ({ ...prev, [pkg.id]: ok ? 'success' : 'error' }))
    } catch (error) {
      console.error('Submit error:', error)
      setPackageStatus((prev) => ({ ...prev, [pkg.id]: 'error' }))
    } finally {
      setPendingPackageId(null)
      // If popup blocker prevented the WhatsApp tab, force-redirect current tab
      if (!whatsappWindow || whatsappWindow.closed) {
        window.location.href = whatsappUrl
      }
    }
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            בחר את החבילה המתאימה לך
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            המחיר שתראה הוא המחיר הסופי. נבנה ב-Next.js / React לאתר מהיר ומאובטח
          </p>
        </div>

        {/* How it works - 3 steps */}
        <div className="max-w-4xl mx-auto mb-8 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-2xl p-5">
          <h3 className="text-center text-base font-bold mb-4 text-gray-900 dark:text-white">
            איך זה עובד?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 text-gray-900 font-bold flex items-center justify-center text-xs">
                1
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">משאירים פרטים</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  בוחרים חבילה ומשאירים שם, מייל וטלפון
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 text-gray-900 font-bold flex items-center justify-center text-xs">
                2
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">שיחה לסיכום</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  נחזור אליכם תוך 24 שעות, נסכם פרטים מדויקים
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 text-gray-900 font-bold flex items-center justify-center text-xs">
                3
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">חשבונית ותשלום</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  שולח קישור לחשבונית עם תשלום מאובטח (אשראי / ביט / העברה)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Form */}
        <div
          ref={formRef}
          className="max-w-3xl mx-auto mb-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white text-center">
            מלאו פרטים, ובחרו חבילה למטה
          </h3>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-4">
            לאחר הלחיצה על &quot;בחר חבילה&quot; - תיפתח שיחת WhatsApp מוכנה לשליחה
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <input
              ref={nameRef}
              type="text"
              placeholder="שם מלא *"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              ref={emailRef}
              type="email"
              placeholder="אימייל *"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              ref={phoneRef}
              type="tel"
              placeholder="טלפון *"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              maxLength={11}
              inputMode="tel"
              autoComplete="tel"
            />
          </div>
          <textarea
            placeholder="ספרו קצת על העסק (אופציונלי) - איזה אתר אתם צריכים, מה הציפיות..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full mt-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          />
          {formError && (
            <p className="mt-3 text-center font-medium text-red-600">
              {formError}
            </p>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-transform hover:scale-105 ${
                pkg.popular
                  ? 'border-4 border-yellow-400 dark:border-yellow-500'
                  : 'border-2 border-gray-200 dark:border-gray-700'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    פופולרי ביותר
                  </span>
                </div>
              )}

              <div className="text-center mb-5">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {pkg.description}
                </p>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(pkg.price)}
                  <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {' '}חד פעמי
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPackage(pkg)}
                disabled={pendingPackageId === pkg.id}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                    : 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {pendingPackageId === pkg.id ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    שולח...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </svg>
                    בחר חבילה ושלח פרטים
                  </>
                )}
              </button>

              {packageStatus[pkg.id] === 'success' && (
                <p className="mt-2 text-center text-xs text-green-600 dark:text-green-400 font-medium">
                  ✓ הפרטים נשמרו. נפתחה שיחת WhatsApp - שלחו את ההודעה
                </p>
              )}
              {packageStatus[pkg.id] === 'error' && (
                <p className="mt-2 text-center text-xs text-yellow-700 dark:text-yellow-400 font-medium">
                  נפתחה שיחת WhatsApp - שלחו את ההודעה ונחזור אליכם
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Optional Add-ons */}
        <div className="max-w-5xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-2xl border-2 border-yellow-200 dark:border-yellow-700 p-6 shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🧩</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
              תוספות אופציונליות
            </h3>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-5">
            ניתן להוסיף לכל חבילה. <b>תוספות מתקדמות מתואמות בשיחה</b> לפי המורכבות והצורך
          </p>

          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {optionalAddons.map((addon) => (
              <div
                key={addon.label}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  {addon.label}
                </span>
                <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400 whitespace-nowrap">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <b>💡 חשוב לדעת:</b> צריכים מערכת מורכבת? (חנות מקוונת, הזמנת תורים עם תשלום,
              אזור משתמשים מלא, אינטגרציה עם מערכות חיצוניות) — נשמח לקבוע שיחת תיאום
              להבין את הצורך המדויק ולתת הצעת מחיר מותאמת. <b>לא כל פרויקט מתאים לחבילה
              סטנדרטית</b>, ובחלק מהמקרים נוכל להמליץ על פתרונות חיצוניים מתאימים יותר.
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="max-w-5xl mx-auto mt-10">
          <TrustBadges />
        </div>

        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            💳 אשראי | 📱 ביט | 🏦 העברה בנקאית | 🧾 חשבונית מס מסודרת
          </p>
          <p className="text-xs mt-1">
            🔒 התשלום מתבצע דרך מערכת חיצונית מאובטחת לאחר סיכום פרטים
          </p>
        </div>
      </div>
    </section>
  )
}
