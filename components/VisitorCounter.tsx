'use client'

import { useEffect, useState } from 'react'

interface AnalyticsStats {
  visitors24h: number
  activeUsers: number
  pageviews24h: number
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user is admin
  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/admin/auth')
      setIsAdmin(response.ok)
    } catch (error) {
      setIsAdmin(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/analytics/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching visitor stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAdminStatus()
    fetchStats()

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)

    return () => clearInterval(interval)
  }, [])

  // Only show to admin users
  if (!isAdmin) {
    return null
  }

  if (isLoading) {
    return null // Don't show anything while loading
  }

  if (!stats || stats.visitors24h === 0) {
    return null // Don't show if no data
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-white/95 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 border border-gray-200 flex items-center gap-3 animate-fade-in">
      {/* 24 Hour Visitors */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div className="text-sm">
          <span className="font-bold text-gray-900">{stats.visitors24h}</span>
          <span className="text-gray-600 mr-2"> צפו ב-24 שעות</span>
        </div>
      </div>

      {/* Active Users (if any) */}
      {stats.activeUsers > 0 && (
        <>
          <div className="w-px h-6 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-900">{stats.activeUsers}</span>
              <span className="text-gray-600"> פעילים כעת</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
