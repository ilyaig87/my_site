import { useState, useEffect } from 'react'

interface TemplateStats {
  template_slug: string
  totalViews: number
  views30d: number
  views7d: number
  rank: number
  isPopular: boolean
}

export function useTemplateStats(templateSlug: string) {
  const [stats, setStats] = useState<TemplateStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/analytics/template-stats?slug=${templateSlug}`)
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching template stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (templateSlug) {
      fetchStats()
    }
  }, [templateSlug])

  return { stats, isLoading }
}

// Hook to track a template view
export function useTrackTemplateView(templateSlug: string, viewType: string = 'view') {
  useEffect(() => {
    const trackView = async () => {
      try {
        const sessionId = localStorage.getItem('analytics_session_id') || ''
        await fetch('/api/analytics/template-view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            template_slug: templateSlug,
            view_type: viewType,
            session_id: sessionId
          })
        })
      } catch (error) {
        console.error('Error tracking template view:', error)
      }
    }

    if (templateSlug) {
      trackView()
    }
  }, [templateSlug, viewType])
}
