'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">מאמת תשלום...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 border-4 border-yellow-400">
          <div className="mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              התשלום בוצע בהצלחה! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              תודה רבה על הרכישה. קיבלת אימייל עם פרטי ההזמנה וחשבונית מס.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mb-8 border-2 border-yellow-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">מה הלאה?</h2>
            <ul className="text-right space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">✓</span>
                <span>נציג יצור איתך קשר תוך 24 שעות</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">✓</span>
                <span>נתחיל בתהליך עיצוב האתר שלך</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">✓</span>
                <span>תקבל עדכונים שוטפים על ההתקדמות</span>
              </li>
            </ul>
          </div>

          {sessionId && (
            <p className="text-sm text-gray-500 mb-6">
              מספר הזמנה: {sessionId.slice(0, 20)}...
            </p>
          )}

          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg transition"
            >
              חזרה לדף הבית
            </Link>
            <Link
              href="/contact"
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              צור קשר
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
