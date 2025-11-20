'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Generate or get session ID from localStorage
function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = localStorage.getItem('analytics_session_id')

  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('analytics_session_id', sessionId)
  }

  return sessionId
}

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sessionIdRef = useRef<string>('')

  useEffect(() => {
    // Initialize session ID
    sessionIdRef.current = getSessionId()
  }, [])

  useEffect(() => {
    if (!pathname) return

    const trackPageview = async () => {
      try {
        const referrer = document.referrer || ''
        const sessionId = sessionIdRef.current

        const response = await fetch('/api/analytics/pageview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page_path: pathname,
            referrer,
            session_id: sessionId
          })
        })

        // Silently fail if analytics isn't working
        if (!response.ok) {
          console.warn('Analytics tracking failed (this is normal on first run)')
        }
      } catch (error) {
        // Silently fail - analytics is not critical
        console.warn('Analytics not available yet')
      }
    }

    trackPageview()
  }, [pathname, searchParams])

  return null // This component doesn't render anything
}
