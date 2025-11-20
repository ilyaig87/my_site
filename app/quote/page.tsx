'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'

const websiteTypes = [
  { id: 'landing', label: 'דף נחיתה', description: 'דף יחיד להמרות', basePrice: 2000 },
  { id: 'business', label: 'אתר עסקי', description: '3-7 עמודים', basePrice: 4000 },
  { id: 'portfolio', label: 'פורטפוליו', description: 'הצגת עבודות', basePrice: 3500 },
  { id: 'shop', label: 'חנות אונליין', description: 'מכירה באינטרנט', basePrice: 6000 },
]

const pageRanges = [
  { id: '1', label: 'עמוד אחד', multiplier: 1 },
  { id: '2-5', label: '2-5 עמודים', multiplier: 1.2 },
  { id: '6-10', label: '6-10 עמודים', multiplier: 1.5 },
  { id: '10+', label: '10+ עמודים', multiplier: 2 },
]

const features = [
  { id: 'contact_form', label: 'טופס יצירת קשר', price: 0 },
  { id: 'blog', label: 'בלוג', price: 1500 },
  { id: 'booking', label: 'מערכת הזמנות', price: 2000 },
  { id: 'multilingual', label: 'רב-לשוני', price: 1000 },
  { id: 'animations', label: 'אנימציות מתקדמות', price: 800 },
  { id: 'seo', label: 'אופטימיזציה ל-SEO', price: 1200 },
]

export default function QuotePage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    websiteType: '',
    numPages: '',
    selectedFeatures: [] as string[],
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: ''
  })
  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const calculatePrice = () => {
    const type = websiteTypes.find(t => t.id === formData.websiteType)
    const pages = pageRanges.find(p => p.id === formData.numPages)

    if (!type || !pages) return 0

    let price = type.basePrice * pages.multiplier

    // Add feature prices
    formData.selectedFeatures.forEach(featureId => {
      const feature = features.find(f => f.id === featureId)
      if (feature) {
        price += feature.price
      }
    })

    return Math.round(price)
  }

  const handleNext = () => {
    if (step === 3) {
      const price = calculatePrice()
      setCalculatedPrice(price)
    }
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const toggleFeature = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter(id => id !== featureId)
        : [...prev.selectedFeatures, featureId]
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          calculated_price: calculatedPrice
        })
      })

      if (response.ok) {
        setIsComplete(true)
      }
    } catch (error) {
      console.error('Error submitting quote:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isComplete) {
    return (
      <section className="py-24 md:py-32 bg-gradient-to-b from-green-50 to-white min-h-screen flex items-center">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              תודה על הפנייה!
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              קיבלנו את הבקשה שלך למחיר של <span className="font-bold text-green-600">₪{calculatedPrice.toLocaleString()}</span>
            </p>
            <p className="text-lg text-gray-600 mb-8">
              נחזור אליך בהקדם עם הצעת מחיר מפורטת והמלצות מותאמות אישית.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-lg"
            >
              חזרה לעמוד הבית
            </a>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-yellow-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-yellow-400 text-gray-900 text-sm font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>קבלו הצעת מחיר מיידית</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              מחשבון הצעת מחיר
            </h1>
            <p className="text-xl text-gray-600">
              ענו על מספר שאלות וקבלו הערכת מחיר מיידית לאתר שלכם
            </p>
          </div>
        </Container>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-3">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all ${
                      step >= s
                        ? 'bg-yellow-400 text-gray-900 shadow-lg scale-110'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg">
              {/* Step 1: Website Type */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black mb-3 text-gray-900">איזה סוג אתר אתם צריכים?</h2>
                    <p className="text-gray-600 mb-6">בחרו את האפשרות המתאימה ביותר לצרכים שלכם</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {websiteTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFormData(prev => ({ ...prev, websiteType: type.id }))}
                        className={`p-6 border-2 rounded-xl text-right transition-all ${
                          formData.websiteType === type.id
                            ? 'border-yellow-400 bg-yellow-50 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-yellow-200'
                        }`}
                      >
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{type.label}</h3>
                        <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                        <p className="text-yellow-600 font-bold">החל מ-₪{type.basePrice.toLocaleString()}</p>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!formData.websiteType}
                    className="w-full px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg"
                  >
                    המשך
                  </button>
                </div>
              )}

              {/* Step 2: Number of Pages */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black mb-3 text-gray-900">כמה עמודים יהיו באתר?</h2>
                    <p className="text-gray-600 mb-6">יותר עמודים = תוכן עשיר יותר</p>
                  </div>

                  <div className="space-y-4">
                    {pageRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setFormData(prev => ({ ...prev, numPages: range.id }))}
                        className={`w-full p-6 border-2 rounded-xl text-right transition-all ${
                          formData.numPages === range.id
                            ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                            : 'border-gray-200 hover:border-yellow-200'
                        }`}
                      >
                        <h3 className="text-xl font-bold text-gray-900">{range.label}</h3>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleBack}
                      className="flex-1 px-8 py-4 bg-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-300 transition-all"
                    >
                      חזור
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!formData.numPages}
                      className="flex-1 px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      המשך
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Features */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-black mb-3 text-gray-900">אילו פיצ'רים תרצו להוסיף?</h2>
                    <p className="text-gray-600 mb-6">בחרו את התכונות שחשובות לכם (אופציונלי)</p>
                  </div>

                  <div className="space-y-3">
                    {features.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`w-full p-4 border-2 rounded-xl text-right transition-all flex items-center justify-between ${
                          formData.selectedFeatures.includes(feature.id)
                            ? 'border-yellow-400 bg-yellow-50'
                            : 'border-gray-200 hover:border-yellow-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center ${
                            formData.selectedFeatures.includes(feature.id)
                              ? 'border-yellow-400 bg-yellow-400'
                              : 'border-gray-300'
                          }`}>
                            {formData.selectedFeatures.includes(feature.id) && (
                              <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="font-bold text-gray-900">{feature.label}</span>
                        </div>
                        <span className="text-yellow-600 font-bold">
                          {feature.price === 0 ? 'כלול' : `+₪${feature.price}`}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleBack}
                      className="flex-1 px-8 py-4 bg-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-300 transition-all"
                    >
                      חזור
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-lg"
                    >
                      קבלו הצעת מחיר
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Price & Contact */}
              {step === 4 && (
                <div className="space-y-8">
                  <div className="text-center bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl border-2 border-yellow-200">
                    <h2 className="text-2xl font-bold mb-3 text-gray-600">הערכת המחיר שלכם</h2>
                    <p className="text-6xl font-black text-gray-900 mb-4">
                      ₪{calculatedPrice.toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                      *המחיר הסופי עשוי להשתנות בהתאם לדרישות נוספות
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black mb-6 text-gray-900">השאירו פרטים ונחזור אליכם</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="שם מלא *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      />
                      <input
                        type="email"
                        placeholder="אימייל *"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="טלפון (אופציונלי)"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleBack}
                      className="flex-1 px-8 py-4 bg-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-300 transition-all"
                    >
                      חזור
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.name || !formData.email || isSubmitting}
                      className="flex-1 px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isSubmitting ? 'שולח...' : 'שלח בקשה'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
