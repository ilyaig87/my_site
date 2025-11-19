'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const faqs: FAQItem[] = [
    {
      category: 'general',
      question: 'כמה זמן לוקח לבנות אתר?',
      answer: 'תלוי בחבילה שבחרת. חבילה בסיסית - 5-7 ימים, חבילה מקצועית - 10-14 ימים, חבילה עסקית - 3-4 שבועות. אנחנו עובדים מהר ויעיל!'
    },
    {
      category: 'general',
      question: 'האם אני יכול לערוך את האתר בעצמי אחרי שהוא מוכן?',
      answer: 'כן! כל אתר מגיע עם פאנל ניהול פשוט ואינטואיטיבי. נעביר אותך הדרכה מלאה בוידאו ונהיה זמינים לתמיכה.'
    },
    {
      category: 'pricing',
      question: 'מה כולל המחיר?',
      answer: 'המחיר כולל: עיצוב מלא, פיתוח, אחסון שנה ראשונה, דומיין שנה ראשונה, תמיכה טכנית, אבטחת SSL, גיבויים אוטומטיים, ועדכוני תוכן ראשוניים.'
    },
    {
      category: 'pricing',
      question: 'האם יש תשלומים חודשיים?',
      answer: 'לא! זה תשלום חד פעמי. רק אחרי שנה תצטרך לחדש אחסון ודומיין (כ-₪200-300 לשנה). אין עלויות נסתרות או התחייבות חודשית.'
    },
    {
      category: 'technical',
      question: 'האם האתר יהיה מותאם למובייל?',
      answer: 'בהחלט! כל אתר שאנחנו בונים הוא רספונסיבי לחלוטין - נראה מושלם על כל המכשירים: מחשב, טאבלט וסמארטפון.'
    },
    {
      category: 'technical',
      question: 'מה עם SEO וקידום באתר?',
      answer: 'כל אתר מגיע עם SEO בסיסי מובנה (meta tags, sitemap, מהירות טעינה). בחבילה עסקית יש SEO מתקדם. אנחנו גם יכולים לסייע בקידום ממומן נפרד.'
    },
    {
      category: 'support',
      question: 'מה קורה אם משהו נשבר באתר?',
      answer: 'אנחנו כאן בשבילך! יש תמיכה טכנית מלאה לפי החבילה (3-12 חודשים). אחרי זה אפשר להאריך או לפנות לתמיכה בתשלום לפי שעה.'
    },
    {
      category: 'support',
      question: 'איך אני מעדכן תוכן באתר?',
      answer: 'דרך פאנל ניהול פשוט וידידותי. תוכל לערוך טקסטים, להוסיף תמונות, לעדכן מחירים ועוד - ללא צורך בידע טכני. נעביר הדרכה מלאה.'
    },
    {
      category: 'general',
      question: 'האם אתם מספקים תוכן לאתר?',
      answer: 'אנחנו עוזרים בעריכה ושיפור תוכן קיים. אם צריך כתיבת תוכן מלאה (copywriting), זה שירות נפרד בתוספת תשלום.'
    },
    {
      category: 'pricing',
      question: 'יש הנחה לעמותות / עסקים קטנים?',
      answer: 'כן! יש לנו הנחות מיוחדות לעמותות (20%), סטארטאפים ועסקים ממשלתיים. צור קשר לפרטים.'
    }
  ]

  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'general', label: 'כללי' },
    { id: 'pricing', label: 'תמחור' },
    { id: 'technical', label: 'טכני' },
    { id: 'support', label: 'תמיכה' }
  ]

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            שאלות נפוצות
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            כל מה שרצית לדעת על בניית אתר
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id)
                setOpenIndex(null)
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-yellow-400 text-gray-900 shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center text-right hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white text-lg pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-yellow-500 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            לא מצאת את מה שחיפשת?
          </p>
          <a
            href="/contact"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            שאל אותנו בווטסאפ
          </a>
        </div>
      </div>
    </section>
  )
}
