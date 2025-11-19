'use client'

import { useState, useEffect } from 'react'

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  })
  const [message, setMessage] = useState('')

  // Load reviews
  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Error loading reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const newReview = await response.json()
        setReviews([newReview, ...reviews])
        setFormData({ name: '', rating: 5, comment: '' })
        setMessage('הביקורת נשמרה בהצלחה!')
      } else {
        setMessage('שגיאה בשמירת הביקורת')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      setMessage('שגיאה בשמירת הביקורת')
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            ביקורות לקוחות
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            מה הלקוחות שלנו אומרים על השירות
          </p>
        </div>

        {/* Add Review Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-2 border-yellow-200">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">הוסף ביקורת</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">שם</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-white"
              placeholder="השם שלך"
              suppressHydrationWarning
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">דירוג</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="text-4xl focus:outline-none hover:scale-110 transition-transform"
                  suppressHydrationWarning
                >
                  <span className={star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">ביקורת</label>
            <textarea
              required
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-white"
              placeholder="שתף את החוויה שלך..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            suppressHydrationWarning
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'שולח...' : 'שלח ביקורת'}
          </button>

          {message && (
            <p className={`text-center ${message.includes('בהצלחה') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">
          כל הביקורות ({reviews.length})
        </h3>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">טוען ביקורות...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-12 text-center">
            <p className="text-lg text-gray-600">אין ביקורות עדיין. היה הראשון!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-yellow-100 hover:border-yellow-300 transition-all hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-xl text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{formatDate(review.date)}</p>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{review.comment}</p>
            </div>
          ))
        )}
      </div>
      </div>
    </section>
  )
}
