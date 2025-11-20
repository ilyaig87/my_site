'use client'

import { useEffect, useState } from 'react'

interface Order {
  id: string
  package_name: string
  amount: number
  currency: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  status: string
  paid_at: string | null
  created_at: string
}

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const data = await response.json()
          setOrders(data.orders || [])
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  const totalRevenue = orders
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + o.amount, 0)

  if (isLoading) {
    return <div className="text-center py-12 text-gray-600">טוען הזמנות...</div>
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
          <p className="text-sm text-gray-600 font-medium mb-2">סה"כ הזמנות</p>
          <p className="text-4xl font-black text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg bg-green-50">
          <p className="text-sm text-gray-600 font-medium mb-2">הזמנות ששולמו</p>
          <p className="text-4xl font-black text-green-700">
            {orders.filter(o => o.status === 'paid').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-lg bg-yellow-50">
          <p className="text-sm text-gray-600 font-medium mb-2">סה"כ הכנסות</p>
          <p className="text-4xl font-black text-yellow-700">₪{totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors ${
              filter === 'all'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            הכל ({orders.length})
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors ${
              filter === 'paid'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            שולם ({orders.filter(o => o.status === 'paid').length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ממתין ({orders.filter(o => o.status === 'pending').length})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-600">אין הזמנות</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-black text-gray-900">חבילה</th>
                  <th className="px-6 py-4 text-right text-sm font-black text-gray-900">לקוח</th>
                  <th className="px-6 py-4 text-right text-sm font-black text-gray-900">סכום</th>
                  <th className="px-6 py-4 text-right text-sm font-black text-gray-900">סטטוס</th>
                  <th className="px-6 py-4 text-right text-sm font-black text-gray-900">תאריך</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{order.package_name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{order.customer_name}</p>
                      <p className="text-sm text-gray-600">{order.customer_email}</p>
                      {order.customer_phone && (
                        <p className="text-sm text-gray-600">{order.customer_phone}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">
                        ₪{order.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {order.status === 'paid' ? 'שולם' : order.status === 'pending' ? 'ממתין' : order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('he-IL')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
