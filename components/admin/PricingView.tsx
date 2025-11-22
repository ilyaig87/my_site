'use client'

import { useState, useEffect } from 'react'

interface PricingPackage {
  id: string
  name: string
  price: number
  currency: string
  description: string
  features: string[]
  popular: boolean
  displayOrder: number
}

export default function PricingView() {
  const [packages, setPackages] = useState<PricingPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPackage, setEditingPackage] = useState<PricingPackage | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/admin/packages')
      const data = await response.json()
      setPackages(data.packages || [])
    } catch (error) {
      console.error('Error fetching packages:', error)
      setErrorMessage('שגיאה בטעינת חבילות')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (pkg: PricingPackage) => {
    setEditingPackage({ ...pkg })
    setIsEditing(true)
    setSuccessMessage('')
    setErrorMessage('')
  }

  const handleSave = async () => {
    if (!editingPackage) return

    try {
      const response = await fetch('/api/admin/packages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPackage)
      })

      if (response.ok) {
        setSuccessMessage('החבילה עודכנה בהצלחה!')
        setIsEditing(false)
        setEditingPackage(null)
        fetchPackages()
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        setErrorMessage('שגיאה בעדכון החבילה')
      }
    } catch (error) {
      console.error('Error saving package:', error)
      setErrorMessage('שגיאה בעדכון החבילה')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingPackage(null)
    setSuccessMessage('')
    setErrorMessage('')
  }

  const handleFeatureChange = (index: number, value: string) => {
    if (!editingPackage) return
    const newFeatures = [...editingPackage.features]
    newFeatures[index] = value
    setEditingPackage({ ...editingPackage, features: newFeatures })
  }

  const handleAddFeature = () => {
    if (!editingPackage) return
    setEditingPackage({
      ...editingPackage,
      features: [...editingPackage.features, '']
    })
  }

  const handleRemoveFeature = (index: number) => {
    if (!editingPackage) return
    const newFeatures = editingPackage.features.filter((_, i) => i !== index)
    setEditingPackage({ ...editingPackage, features: newFeatures })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900">ניהול מחירים</h2>
          <p className="text-gray-600 mt-1">ערוך את חבילות המחירים שלך</p>
        </div>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Editing Modal */}
      {isEditing && editingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-6">
              <h3 className="text-2xl font-black text-gray-900">
                עריכת חבילה: {editingPackage.name}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  שם החבילה
                </label>
                <input
                  type="text"
                  value={editingPackage.name}
                  onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    מחיר
                  </label>
                  <input
                    type="number"
                    value={editingPackage.price}
                    onChange={(e) => setEditingPackage({ ...editingPackage, price: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    מטבע
                  </label>
                  <input
                    type="text"
                    value={editingPackage.currency}
                    onChange={(e) => setEditingPackage({ ...editingPackage, currency: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  תיאור
                </label>
                <textarea
                  value={editingPackage.description}
                  onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-gray-900">
                    תכונות
                  </label>
                  <button
                    onClick={handleAddFeature}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-bold"
                  >
                    + הוסף תכונה
                  </button>
                </div>
                <div className="space-y-2">
                  {editingPackage.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                        placeholder="תכונה..."
                      />
                      <button
                        onClick={() => handleRemoveFeature(index)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200"
                      >
                        מחק
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={editingPackage.popular}
                  onChange={(e) => setEditingPackage({ ...editingPackage, popular: e.target.checked })}
                  className="w-5 h-5 text-yellow-400 border-2 border-gray-300 rounded focus:ring-yellow-400"
                />
                <label htmlFor="popular" className="text-sm font-bold text-gray-900">
                  סמן כפופולרית
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 p-6 flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors"
              >
                שמור שינויים
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-300 transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-2xl border-2 ${
              pkg.popular ? 'border-yellow-400' : 'border-gray-200'
            } shadow-lg overflow-hidden`}
          >
            {pkg.popular && (
              <div className="bg-yellow-400 text-gray-900 text-center py-2 font-bold text-sm">
                הכי פופולרי
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                {pkg.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {pkg.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-black text-gray-900">
                  ₪{pkg.price.toLocaleString()}
                </span>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-yellow-400 mt-0.5">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleEdit(pkg)}
                className="w-full px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors"
              >
                ערוך חבילה
              </button>
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            אין חבילות מחירים. יש להעביר את הנתונים מ-JSON למסד הנתונים.
          </p>
        </div>
      )}
    </div>
  )
}
