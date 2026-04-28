'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const faqs: FAQItem[] = [
    {
      category: 'general',
      question: 'כמה זמן לוקח לבנות אתר?',
      answer: 'תלוי בחבילה: דף בודד (1,500 ₪) - 5-7 ימי עבודה, אתר קטן (3,000 ₪) - 7-14 ימי עבודה, אתר מורחב (5,000 ₪) - 2-3 שבועות. הזמנים תלויים בזמינות התכנים מצדכם.'
    },
    {
      category: 'general',
      question: 'האם אני יכול לערוך את האתר בעצמי אחרי שהוא מוכן?',
      answer: 'באתר המורחב כלול פאנל ניהול תוכן בסיסי שמאפשר לערוך טקסטים ותמונות. בחבילות הקטנות יותר אפשר להוסיף פאנל ניהול בתוספת תשלום, או שאעדכן עבורכם בקלות.'
    },
    {
      category: 'pricing',
      question: 'כמה עולה אתר?',
      answer: 'יש 3 חבילות עיקריות: דף בודד / דף נחיתה - 1,500 ₪, אתר קטן עד 4 דפים (הכי פופולרי) - 3,000 ₪, אתר מורחב 5+ דפים עם DB ופאנל ניהול - 5,000 ₪. כל המחירים חד-פעמיים.'
    },
    {
      category: 'pricing',
      question: 'מה כולל המחיר?',
      answer: 'המחיר כולל: עיצוב מלא, פיתוח ב-Next.js / React, התאמה רספונסיבית מלאה, אופטימיזציה ל-SEO, העלאה לדומיין שלכם, אבטחת SSL וחודש (או חודשיים בחבילה המורחבת) של תיקוני באגים. דומיין ואחסון: 300 ₪/שנה כתוספת.'
    },
    {
      category: 'pricing',
      question: 'האם יש תשלומים חודשיים?',
      answer: 'לא! המחיר חד פעמי. דומיין ואחסון בתוספת של 300 ₪/שנה (אם אתם רוצים שאני אטפל). אין עלויות נסתרות או התחייבות חודשית. תחזוקה חודשית היא אופציה נפרדת (200 ₪/חודש) לאתר מורחב.'
    },
    {
      category: 'pricing',
      question: 'מה התוספות האופציונליות?',
      answer: 'דומיין ואחסון: 300 ₪/שנה. דף נוסף: 250-300 ₪. מסד נתונים (DB) לטפסים והרשמות: 800 ₪ (כלול בחבילה המורחבת). עיצוב מותאם אישית לדף בודד: +500 ₪. תחזוקה חודשית באתר מורחב: 200 ₪/חודש.'
    },
    {
      category: 'pricing',
      question: 'יש הנחה לעמותות / עסקים קטנים?',
      answer: 'כן! יש הנחות מיוחדות לעמותות, סטארטאפים בתחילת דרכם, ועסקים זעירים. צרו קשר ב-WhatsApp או במייל ונסכם.'
    },
    {
      category: 'technical',
      question: 'האם האתר יהיה מותאם למובייל?',
      answer: 'בהחלט! כל אתר שאני בונה הוא רספונסיבי לחלוטין - נראה מושלם במחשב, טאבלט וסלולר. רוב הגולשים היום נכנסים מסלולר, אז זה הבסיס של כל אתר.'
    },
    {
      category: 'technical',
      question: 'באיזה טכנולוגיות בונים את האתר?',
      answer: 'Next.js / React + TypeScript + Tailwind CSS. אלו הטכנולוגיות המודרניות ביותר - אתרים מהירים במיוחד, ידידותיים ל-SEO ב-Google, מאובטחים, ומתארחים בענן מקצועי ליציבות גבוהה.'
    },
    {
      category: 'technical',
      question: 'מה עם SEO וקידום באתר?',
      answer: 'בחבילת דף בודד יש SEO בסיסי. באתר קטן SEO מלא + Google Analytics. באתר מורחב יש SEO מתקדם + Google Analytics + Pixel + אינטגרציה עם CRM ומיילים. קידום ממומן הוא שירות נפרד.'
    },
    {
      category: 'technical',
      question: 'איך מטפלים בדומיין ואחסון?',
      answer: 'אפשר להעלות לדומיין שלכם הקיים ללא תוספת. אם אין לכם, אני יכול לטפל ברכישה והקמה ב-300 ₪/שנה (כולל אחסון + SSL). תקבלו גישה מלאה - הדומיין שלכם, לא שלי.'
    },
    {
      category: 'support',
      question: 'מה קורה אם משהו נשבר באתר?',
      answer: 'בכל החבילות כלול חודש של תיקוני באגים (חודשיים בחבילה המורחבת). אחרי זה אפשר תחזוקה חודשית (200 ₪/חודש לאתר מורחב) או לקרוא לי בתשלום לפי שעה. אני זמין ב-WhatsApp.'
    },
    {
      category: 'support',
      question: 'מה ההבדל בין תיקוני באגים לשינויים?',
      answer: 'תיקוני באגים = משהו לא עובד כפי שסוכם (טופס לא שולח, קישור שבור). שינויים = הוספת תוכן/דפים/פיצ\'רים חדשים. תיקוני באגים כלולים, שינויים הם בתשלום נפרד לפי גודל המשימה.'
    },
    {
      category: 'support',
      question: 'איך אני מעדכן תוכן באתר?',
      answer: 'באתר המורחב יש פאנל ניהול תוכן בסיסי שמאפשר עדכון טקסטים ותמונות. בחבילות הקטנות אפשר לפנות אליי לעדכון, או להוסיף פאנל ניהול בתוספת. אעביר הדרכה אישית בכל מקרה.'
    },
    {
      category: 'general',
      question: 'האם אתם מספקים תוכן לאתר?',
      answer: 'אני עוזר בעריכה ושיפור של תוכן קיים בחינם. כתיבת תוכן שיווקי מלא (copywriting) היא שירות נפרד בתוספת תשלום. תמונות מבנקי תמונות חינמיים אני יכול לדאוג, צילום מקצועי על חשבונכם.'
    },
    {
      category: 'general',
      question: 'איך משלמים? יש פריסה?',
      answer: 'תשלום מלא מראש בהעברה בנקאית, אשראי או ביט. ניתן לפרוס לתשלומים בכרטיס אשראי דרך סליקה מאובטחת. כמובן עם חשבונית מס.'
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
                  openIndex === index ? 'max-h-[500px]' : 'max-h-0'
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
            href="https://wa.me/972546361555"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            שאלו אותי ב-WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
