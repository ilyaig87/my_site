'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Container from '@/components/ui/Container'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [canRegister, setCanRegister] = useState(false)

  useEffect(() => {
    // Check if just registered
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('ההרשמה בוצעה בהצלחה! כעת אתה יכול להתחבר.')
    }

    // Check if registration is available
    const checkRegistrationStatus = async () => {
      try {
        const response = await fetch('/api/admin/register')
        const data = await response.json()
        setCanRegister(data.canRegister)
      } catch (error) {
        console.error('Error checking registration status:', error)
      }
    }

    checkRegistrationStatus()
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin')
      } else {
        setError(data.error || 'פרטי התחברות שגויים')
      }
    } catch (error) {
      setError('שגיאה בהתחברות')
    } finally {
      setIsLoading(false)
    }
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">
                כניסה למערכת ניהול
              </h1>
              <p className="text-gray-600">
                הזן סיסמת Admin
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  אימייל
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-gray-900"
                  placeholder="admin@example.com"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                  סיסמה
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-gray-900"
                  placeholder="••••••••"
                />
              </div>

              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-700 text-sm">
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'מתחבר...' : 'התחבר'}
              </button>
            </form>

            {/* Registration Link */}
            {canRegister && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <p className="text-sm text-blue-900 mb-2">
                  אין לך חשבון אדמין?
                </p>
                <a
                  href="/admin/register"
                  className="text-sm font-bold text-blue-700 hover:text-blue-900 underline"
                >
                  צור חשבון אדמין ראשון
                </a>
              </div>
            )}

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

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">טוען...</p>
        </div>
      </section>
    }>
      <LoginForm />
    </Suspense>
  )
}
