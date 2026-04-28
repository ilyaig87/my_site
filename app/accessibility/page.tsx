import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הצהרת נגישות - Pixelia',
  description: 'הצהרת נגישות לאתר Pixelia בהתאם לתקן הישראלי ת"י 5568 ברמה AA',
};

export default function AccessibilityPage() {
  const lastUpdated = '28 באפריל 2026';

  return (
    <div className="py-6 md:py-10 bg-gradient-to-b from-gray-50 to-white">
      <Container size="md">
        <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm p-5 md:p-8">
          <header className="mb-4 pb-3 border-b border-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              הצהרת נגישות
            </h1>
            <p className="text-sm text-gray-600">
              Pixelia מחויבת להפיכת המרחב הדיגיטלי לנגיש לכלל האוכלוסייה
            </p>
            <p className="text-xs text-gray-500 mt-1">עודכן לאחרונה: {lastUpdated}</p>
          </header>

          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">1. מחויבות לנגישות</h2>
              <p>
                ב-Pixelia אינטרנט נגיש הוא זכות בסיסית. אנו פועלים להפיכת האתר ושירותינו
                לנגישים לכלל הציבור, לרבות אנשים עם מוגבלויות מוטוריות, חזותיות, שמיעתיות,
                קוגניטיביות ולמידה. נגישות היא חלק בלתי נפרד מהפיתוח, לא תוספת מאוחרת.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">2. תקנים ורגולציה</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li><strong>תקנות שוויון זכויות לאנשים עם מוגבלות</strong> (התאמות נגישות לשירות), התשע"ג–2013</li>
                <li><strong>תקן ישראלי ת"י 5568</strong> ברמה AA - נגישות תכנים באינטרנט</li>
                <li><strong>WCAG 2.1</strong> ברמה AA - התקן הבינלאומי</li>
                <li>עיקרי <strong>POUR</strong>: נתפס, שמיש, מובן, עמיד</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">3. אמצעי נגישות באתר</h2>
              <p className="mb-2">
                האתר כולל תפריט נגישות מתקדם הפועל בכל עמוד (אייקון בצד שמאל). המאפיינים:
              </p>

              <h3 className="text-sm font-semibold text-gray-900 mb-1">3.1 התאמות תצוגה</h3>
              <ul className="list-disc pr-5 space-y-0.5 mb-2">
                <li>הגדלה והקטנה של גודל הטקסט (80%-200%)</li>
                <li>מרווח בין שורות וטקסטים</li>
                <li>מרווח בין אותיות</li>
                <li>פונט קריא לדיסלקטים</li>
                <li>הדגשת כותרות לזיהוי מבנה</li>
              </ul>

              <h3 className="text-sm font-semibold text-gray-900 mb-1">3.2 צבע וניגודיות</h3>
              <ul className="list-disc pr-5 space-y-0.5 mb-2">
                <li>מצב ניגודיות גבוהה / הפוכה</li>
                <li>גווני אפור (לעיוורון צבעים)</li>
                <li>מצב בהיר / כהה</li>
              </ul>

              <h3 className="text-sm font-semibold text-gray-900 mb-1">3.3 ניווט ואינטראקציה</h3>
              <ul className="list-disc pr-5 space-y-0.5 mb-2">
                <li>הדגשת קישורים וסמן עכבר מוגדל</li>
                <li>קו מנחה לקריאה</li>
                <li>השהיית אנימציות וסרטונים אוטומטיים</li>
                <li>ניווט מלא במקלדת (Tab/Enter/חצים)</li>
                <li>מיקוד (focus) ברור על אלמנטים פעילים</li>
                <li>קישור "דלג לתוכן"</li>
              </ul>

              <h3 className="text-sm font-semibold text-gray-900 mb-1">3.4 קוראי מסך</h3>
              <ul className="list-disc pr-5 space-y-0.5 mb-2">
                <li>HTML5 סמנטי + היררכיית כותרות תקינה</li>
                <li>תוויות ARIA על אלמנטים אינטראקטיביים</li>
                <li>טקסט חלופי (alt) לתמונות</li>
                <li>סימון שדות טופס ושגיאות (aria-invalid, aria-required)</li>
                <li>זיהוי שפה (lang="he", dir="rtl")</li>
              </ul>

              <h3 className="text-sm font-semibold text-gray-900 mb-1">3.5 שמירת העדפות</h3>
              <p>ההתאמות נשמרות בדפדפן (localStorage) ומיושמות אוטומטית בביקור הבא.</p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">4. תאימות דפדפנים</h2>
              <p className="mb-1">נבדק בדפדפנים (שתי גרסאות אחרונות):</p>
              <ul className="list-disc pr-5 space-y-0.5">
                <li>Chrome, Firefox, Edge, Safari, Samsung Internet</li>
                <li>תאימות מלאה למחשב, טאבלט וסלולר</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">5. טכנולוגיות מסייעות</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li><strong>NVDA, JAWS, Narrator</strong> - קוראי מסך ל-Windows</li>
                <li><strong>VoiceOver</strong> - macOS / iOS</li>
                <li><strong>TalkBack</strong> - Android</li>
                <li>תוכנות הקלדה קולית והגדלה (Dragon, ZoomText)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">6. חלקים שאינם נגישים במלואם</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li>תוכן משובץ מצדדים שלישיים (מפות, וידאו, רשתות חברתיות) - תלוי בספק</li>
                <li>קבצי PDF מסוימים שהועלו ע"י לקוחות</li>
                <li>אזורים בתבניות הדגמה</li>
              </ul>
              <p className="mt-1.5 text-xs">נתקלתם באזור לא נגיש? פנו אלינו ונטפל מיד.</p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">7. רכז הנגישות ופניות</h2>
              <p className="mb-2">
                לבעיית נגישות, הצעה לשיפור או סיוע בגישה לתוכן - נשמח לשמוע.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs space-y-1">
                <div><strong>שם:</strong> איליה, מנהל Pixelia</div>
                <div>
                  <strong>אימייל:</strong>{' '}
                  <a href="mailto:ilyaig8@gmail.com" className="text-yellow-700 hover:underline font-semibold">
                    ilyaig8@gmail.com
                  </a>
                </div>
                <div>
                  <strong>טלפון:</strong>{' '}
                  <a href="tel:+972546361555" className="text-yellow-700 hover:underline font-semibold" dir="ltr">
                    054-6361555
                  </a>
                </div>
                <div>
                  <strong>WhatsApp:</strong>{' '}
                  <a
                    href="https://wa.me/972546361555"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-700 hover:underline font-semibold"
                  >
                    לחצו לפתיחת שיחה
                  </a>
                </div>
                <div><strong>כתובת:</strong> תל אביב, ישראל</div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                בפנייתכם פרטו: כתובת הדף (URL), תיאור הבעיה, דפדפן/מערכת הפעלה/טכנולוגיה מסייעת, וצילום מסך אם רלוונטי.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">8. זמני תגובה</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li><strong>אישור פנייה:</strong> תוך 2 ימי עסקים</li>
                <li><strong>מענה ראשוני:</strong> תוך 5 ימי עסקים</li>
                <li><strong>פתרון או חלופה:</strong> תוך 30 ימי עסקים</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">9. בדיקות ושיפור מתמיד</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li>בדיקות אוטומטיות (Lighthouse, axe DevTools, WAVE)</li>
                <li>בדיקות ידניות מול קוראי מסך</li>
                <li>בדיקות ניווט במקלדת בלבד</li>
                <li>בדיקות בדפדפנים ומכשירים שונים</li>
                <li>ניגודיות מינימלית (4.5:1 רגיל / 3:1 גדול)</li>
              </ul>
            </section>

            <section className="bg-gray-50 border-r-4 border-yellow-400 rounded-lg p-3 text-xs text-gray-600">
              למרות מאמצינו, ייתכן שעדיין קיימים חלקים שאינם מונגשים במלואם. אנו ממשיכים
              לשפר באופן שוטף ומזמינים פניות ובקשות.
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
