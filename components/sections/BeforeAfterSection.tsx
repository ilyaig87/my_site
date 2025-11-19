'use client'

import { useState } from 'react'

export default function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [activeCase, setActiveCase] = useState(0)

  const cases = [
    {
      title: 'חנות אופנה אונליין',
      before: 'אתר ישן ומיושן, ללא קטלוג מוצרים',
      after: 'חנות מודרנית עם סל קניות ותשלום מאובטח',
      results: [
        '+300% יותר הזמנות',
        '+150% זמן שהייה באתר',
        'דירוג 4.9/5 מלקוחות'
      ],
      beforeColor: 'from-gray-400 to-gray-600',
      afterColor: 'from-green-400 to-emerald-600'
    },
    {
      title: 'משרד עורכי דין',
      before: 'אתר חד עמוד פשוט מ-2015',
      after: 'אתר מקצועי עם בלוג ופורטפוליו',
      results: [
        '+200% לידים חדשים',
        'מיצוב כמשרד מוביל',
        '85% פניות דרך האתר'
      ],
      beforeColor: 'from-orange-400 to-red-600',
      afterColor: 'from-blue-400 to-indigo-600'
    },
    {
      title: 'מסעדה משפחתית',
      before: 'דף פייסבוק בלבד, ללא נוכחות דיגיטלית',
      after: 'אתר עם תפריט, הזמנות והזמנת שולחנות',
      results: [
        '+400% הזמנות דליברי',
        'חיסכון בעלויות פרסום',
        'כיסוי מדיה מקומי'
      ],
      beforeColor: 'from-red-400 to-pink-600',
      afterColor: 'from-yellow-400 to-orange-600'
    }
  ]

  const currentCase = cases[activeCase]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            לפני ואחרי
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ראה איך אנחנו הופכים אתרים רגילים לחוויות דיגיטליות מדהימות
          </p>
        </div>

        {/* Case selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {cases.map((caseItem, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveCase(index)
                setSliderPosition(50)
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCase === index
                  ? 'bg-yellow-400 text-gray-900 shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {caseItem.title}
            </button>
          ))}
        </div>

        {/* Before/After Slider */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
          <div
            className="relative h-96 cursor-col-resize select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* Before (Right side) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentCase.beforeColor} flex items-center justify-center`}>
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4">😞</div>
                <h3 className="text-3xl font-bold mb-4">לפני</h3>
                <p className="text-xl opacity-90 max-w-md">
                  {currentCase.before}
                </p>
              </div>
            </div>

            {/* After (Left side) */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${currentCase.afterColor} flex items-center justify-center`}
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-3xl font-bold mb-4">אחרי</h3>
                <p className="text-xl opacity-90 max-w-md">
                  {currentCase.after}
                </p>
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-yellow-400">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-4 py-2 rounded-lg font-bold text-gray-900 dark:text-white">
              לפני
            </div>
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 px-4 py-2 rounded-lg font-bold text-gray-900 dark:text-white">
              אחרי
            </div>
          </div>

          {/* Results */}
          <div className="p-8 bg-gray-50 dark:bg-gray-900">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              התוצאות:
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              {currentCase.results.map((result, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instruction */}
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
          💡 גרור את הסמן או החלק אצבע כדי להשוות
        </p>
      </div>
    </section>
  )
}
