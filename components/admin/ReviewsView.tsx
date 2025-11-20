'use client'

import { useEffect, useState } from 'react'

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  approved: number
  created_at: number
}

export default function ReviewsView() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews?admin=true')
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews || [])
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (reviewId: string, approved: boolean) => {
    try {
      const response = await fetch('/api/reviews/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, approved })
      })

      if (response.ok) {
        // Refresh reviews
        fetchReviews()
      }
    } catch (error) {
      console.error('Error moderating review:', error)
    }
  }

  const handleDelete = async (reviewId: string) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק ביקורת זו?')) return

    try {
      const response = await fetch(`/api/reviews?id=${reviewId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchReviews()
      }
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  const pendingReviews = reviews.filter(r => r.approved === 0)
  const approvedReviews = reviews.filter(r => r.approved === 1)

  if (isLoading) {
    return <div className="text-center py-12 text-gray-600">טוען ביקורות...</div>
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
          <p className="text-sm text-gray-600 font-medium mb-2">סה"כ ביקורות</p>
          <p className="text-4xl font-black text-gray-900">{reviews.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg bg-green-50">
          <p className="text-sm text-gray-600 font-medium mb-2">מאושרות</p>
          <p className="text-4xl font-black text-green-700">{approvedReviews.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-lg bg-yellow-50">
          <p className="text-sm text-gray-600 font-medium mb-2">ממתינות לאישור</p>
          <p className="text-4xl font-black text-yellow-700">{pendingReviews.length}</p>
        </div>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div>
          <h3 className="text-2xl font-black text-gray-900 mb-4">ממתינות לאישור</h3>
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <div key={review.id} className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{review.name}</h4>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.created_at * 1000).toLocaleDateString('he-IL')}
                  </p>
                </div>
                <p className="text-gray-900 mb-4 whitespace-pre-wrap">{review.comment}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(review.id, true)}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
                  >
                    ✓ אשר
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
                  >
                    ✕ מחק
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Reviews */}
      {approvedReviews.length > 0 && (
        <div>
          <h3 className="text-2xl font-black text-gray-900 mb-4">ביקורות מאושרות</h3>
          <div className="space-y-4">
            {approvedReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{review.name}</h4>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      מאושר
                    </span>
                    <button
                      onClick={() => handleApprove(review.id, false)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors text-sm"
                    >
                      הסר אישור
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors text-sm"
                    >
                      מחק
                    </button>
                  </div>
                </div>
                <p className="text-gray-900 whitespace-pre-wrap">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="bg-white rounded-2xl p-12 border-2 border-gray-200 text-center text-gray-600">
          אין ביקורות
        </div>
      )}
    </div>
  )
}
