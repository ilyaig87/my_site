'use client'

import { useState } from 'react'

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal' | 'footer'
}

export default function NewsletterSignup({ variant = 'inline' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        setName('')
      } else {
        const data = await response.json()
        setErrorMessage(data.error || 'שגיאה בהרשמה')
        setStatus('error')
      }
    } catch (error) {
      setErrorMessage('שגיאה בחיבור לשרת')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-bold text-gray-900 mb-1">תודה שנרשמת!</p>
        <p className="text-sm text-gray-600">נשלח לך עדכונים וטיפים מועילים</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="email"
          placeholder="האימייל שלך"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-gray-900 placeholder-gray-400"
        />
      </div>

      {variant !== 'footer' && (
        <div>
          <input
            type="text"
            placeholder="שם (אופציונלי)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none text-gray-900 placeholder-gray-400"
          />
        </div>
      )}

      {status === 'error' && errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !email}
        className="w-full px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'מירשם...' : 'הירשם לניוזלטר'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        נשלח טיפים, עדכונים והצעות מיוחדות. ניתן לבטל בכל עת.
      </p>
    </form>
  )
}
