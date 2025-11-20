'use client'

import { useState } from 'react'
import AdminAuthCheck from '@/components/admin/AdminAuthCheck'
import Container from '@/components/ui/Container'
import OrdersView from '@/components/admin/OrdersView'
import LeadsView from '@/components/admin/LeadsView'
import AnalyticsView from '@/components/admin/AnalyticsView'
import ReviewsView from '@/components/admin/ReviewsView'
import { useRouter } from 'next/navigation'

type TabType = 'analytics' | 'orders' | 'leads' | 'reviews'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('analytics')

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-30">
          <Container>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600">ניהול האתר</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors"
                >
                  צפה באתר
                </a>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                >
                  יציאה
                </button>
              </div>
            </div>
          </Container>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <Container>
            <div className="flex gap-2 overflow-x-auto py-4">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                📊 אנליטיקס
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'orders'
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                💰 הזמנות
              </button>
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'leads'
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                👥 לידים
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeTab === 'reviews'
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ⭐ ביקורות
              </button>
            </div>
          </Container>
        </div>

        {/* Main Content */}
        <div className="py-8">
          <Container>
            {activeTab === 'analytics' && <AnalyticsView />}
            {activeTab === 'orders' && <OrdersView />}
            {activeTab === 'leads' && <LeadsView />}
            {activeTab === 'reviews' && <ReviewsView />}
          </Container>
        </div>
      </div>
    </AdminAuthCheck>
  )
}
