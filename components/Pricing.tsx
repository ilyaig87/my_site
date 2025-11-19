'use client'

import { useState } from 'react'
import packagesData from '@/data/packages.json'
import TrustBadges from '@/components/TrustBadges'

interface Package {
  id: string
  name: string
  price: number
  currency: string
  description: string
  features: string[]
  popular: boolean
}

export default function Pricing() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const packages: Package[] = packagesData as Package[]

  const handleCheckout = async (pkg: Package) => {
    setSelectedPackage(pkg.id)

    // Simple validation
    if (!formData.name || !formData.email) {
      setMessage('נא למלא שם ואימייל')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          packageId: pkg.id,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone
        })
      })

      const data = await response.json()

      if (data.demo) {
        // Demo mode
        setMessage(`✅ ${data.message}`)
        setFormData({ name: '', email: '', phone: '' })
      } else if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        setMessage('שגיאה ביצירת תשלום')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setMessage('שגיאה ביצירת תשלום')
    } finally {
      setLoading(false)
      setSelectedPackage(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
    }).format(price)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            בחר את החבילה המתאימה לך
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            כל חבילה כולל אחסון, תמיכה טכנית ועדכונים שוטפים
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-yellow-200 dark:border-yellow-600">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            מלא פרטים לתחילת תהליך
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="שם מלא *"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="email"
              placeholder="אימייל *"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="tel"
              placeholder="טלפון"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          {message && (
            <p className={`mt-4 text-center font-medium ${
              message.includes('✅') ? 'text-green-600' : 'text-red-600'
            }`}>
              {message}
            </p>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-transform hover:scale-105 ${
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

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {pkg.description}
                </p>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(pkg.price)}
                  <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                    {' '}חד פעמי
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5"
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
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(pkg)}
                disabled={loading || !formData.name || !formData.email}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${
                  pkg.popular
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                    : 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading && selectedPackage === pkg.id ? 'טוען...' : 'בחר חבילה'}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="max-w-5xl mx-auto">
          <TrustBadges />
        </div>

        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            💳 כרטיסי אשראי | 📱 ביט | 💰 PayPal | 🍎 Apple Pay
          </p>
          <p className="text-xs mt-2">
            🔒 תשלום מאובטח ומוצפן | 🧾 חשבונית מס אוטומטית
          </p>
        </div>
      </div>
    </section>
  )
}
