'use client'

import { useEffect, useState } from 'react'

interface AnalyticsData {
  visitors24h: number
  activeUsers: number
  pageviews24h: number
  popularTemplates: Array<{ slug: string; views: number }>
}

export default function AnalyticsView() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics/stats')
        if (response.ok) {
          const stats = await response.json()
          setData(stats)
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <div className="text-center py-12 text-gray-600">טוען נתונים...</div>
  }

  if (!data) {
    return <div className="text-center py-12 text-gray-600">אין נתונים זמינים</div>
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Visitors 24h */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">מבקרים ייחודיים</p>
              <p className="text-gray-500 text-xs">24 שעות אחרונות</p>
            </div>
          </div>
          <p className="text-4xl font-black text-gray-900">{data.visitors24h}</p>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <div className="relative">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">משתמשים פעילים</p>
              <p className="text-gray-500 text-xs">כרגע באתר</p>
            </div>
          </div>
          <p className="text-4xl font-black text-gray-900">{data.activeUsers}</p>
        </div>

        {/* Page Views */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">צפיות בעמודים</p>
              <p className="text-gray-500 text-xs">24 שעות אחרונות</p>
            </div>
          </div>
          <p className="text-4xl font-black text-gray-900">{data.pageviews24h}</p>
        </div>
      </div>

      {/* Popular Templates */}
      {data.popularTemplates.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
          <h3 className="text-2xl font-black text-gray-900 mb-6">תבניות פופולריות</h3>
          <div className="space-y-4">
            {data.popularTemplates.map((template, index) => (
              <div key={template.slug} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-gray-900">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{template.slug}</p>
                    <p className="text-sm text-gray-600">{template.views} צפיות</p>
                  </div>
                </div>
                <a
                  href={`/templates/${template.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-bold hover:bg-yellow-500 transition-colors text-sm"
                >
                  צפה
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
