'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container'

export default function AdminRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [canRegister, setCanRegister] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if registration is available
    const checkRegistrationStatus = async () => {
      try {
        const response = await fetch('/api/admin/register')
        const data = await response.json()
        setCanRegister(data.canRegister)

        if (!data.canRegister) {
          // Redirect to login if admin already exists
          setTimeout(() => router.push('/admin/login'), 2000)
        }
      } catch (error) {
        console.error('Error checking registration status:', error)
        setCanRegister(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkRegistrationStatus()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.email || !formData.password || !formData.name) {
      setError('כל השדות נדרשים')
      return
    }

    if (formData.password.length < 8) {
      setError('הסיסמה חייבת להכיל לפחות 8 תווים')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('הסיסמאות לא תואמות')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Success - redirect to login
        router.push('/admin/login?registered=true')
      } else {
        setError(data.error || 'שגיאה בהרשמה')
      }
    } catch (error) {
      setError('שגיאה בהרשמה')
    } finally {
      setIsLoading(false)
    }
  }

  if (isChecking) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">בודק סטטוס הרשמה...</p>
        </div>
      </section>
    )
  }

  if (canRegister === false) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-8">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                ההרשמה לא זמינה
              </h2>
              <p className="text-gray-700 mb-4">
                משתמש אדמין כבר קיים במערכת. מועבר לדף התחברות...
              </p>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
            {/* Logo/Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">
                הרשמת אדמין ראשונית
              </h1>
              <p className="text-gray-600">
                צור את חשבון האדמין הראשון שלך
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                  שם מלא
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-gray-900"
                  placeholder="שם מלא"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  אימייל
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-gray-900"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                  סיסמה
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-gray-900"
                  placeholder="לפחות 8 תווים"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-900 mb-2">
                  אימות סיסמה
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-gray-900"
                  placeholder="הזן את הסיסמה שוב"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'יוצר חשבון...' : 'צור חשבון אדמין'}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-900">
                <strong>שים לב:</strong> זהו חשבון האדמין הראשון והיחיד שניתן ליצור באופן ישיר. לאחר יצירתו, ההרשמה תיחסם.
              </p>
            </div>

            {/* Back Link */}
            <div className="mt-6 text-center">
              <a href="/" className="text-sm text-gray-600 hover:text-yellow-600 transition-colors">
                חזרה לעמוד הבית
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
