import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'תנאי שימוש - Pixelia',
  description: 'תנאי השימוש באתר Pixelia - כללים והתחייבויות לשימוש באתר ובשירותים',
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('he-IL');

  return (
    <div className="py-6 md:py-10 bg-gradient-to-b from-gray-50 to-white">
      <Container size="md">
        <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm p-5 md:p-8">
          <header className="mb-4 pb-3 border-b border-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              תנאי שימוש
            </h1>
            <p className="text-xs text-gray-500">עודכן לאחרונה: {lastUpdated}</p>
          </header>

          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">1. כללי</h2>
              <p>
                ברוכים הבאים ל-Pixelia. תנאים אלה מסדירים את השימוש באתר ובשירותים שלנו.
                שימוש באתר מהווה הסכמה לתנאים אלה במלואם. אם אינך מסכים - אנא הימנע משימוש.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">2. הגדרות</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li><strong>"האתר"</strong> - אתר Pixelia וכל תכניו</li>
                <li><strong>"אנו"/"החברה"</strong> - Pixelia ומפעיליה</li>
                <li><strong>"משתמש"/"אתה"</strong> - כל מי שגולש או משתמש באתר</li>
                <li><strong>"שירותים"</strong> - השירותים הניתנים דרך האתר</li>
                <li><strong>"תוכן"</strong> - מידע, טקסט, תמונות, קוד באתר</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">3. רישיון שימוש</h2>
              <p className="mb-1.5">
                ניתן רישיון מוגבל, בלתי בלעדי ולא ניתן להעברה לשימוש אישי ולא מסחרי באתר.
              </p>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">אסור:</h3>
              <ul className="list-disc pr-5 space-y-0.5">
                <li>להעתיק, לשנות או להפיץ תוכן ללא אישור בכתב</li>
                <li>לעשות שימוש לא חוקי או הונאה</li>
                <li>לפגוע בפעולת האתר או לשבש שירותים</li>
                <li>לאסוף מידע על משתמשים אחרים</li>
                <li>להעלות תוכן זדוני, וירוסים או קוד מזיק</li>
                <li>להתחזות לאדם או גוף אחר</li>
                <li>לעקוף אמצעי אבטחה</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">4. קניין רוחני</h2>
              <p>
                כל התוכן באתר (עיצוב, טקסט, גרפיקה, לוגו, אייקונים, תמונות, קוד וסימני מסחר) הוא בבעלות
                Pixelia או בעלי רישיון מטעמה ומוגן בחוקי זכויות יוצרים. אין שימוש מסחרי ללא אישור בכתב.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">5. תוכן משתמשים</h2>
              <p className="mb-1.5">בשליחת תוכן (טפסים, הודעות) אתה מצהיר כי:</p>
              <ul className="list-disc pr-5 space-y-0.5">
                <li>התוכן אינו מפר זכויות קניין רוחני</li>
                <li>התוכן אינו פוגעני, מעליב או בלתי חוקי</li>
                <li>אתה אחראי באופן מלא לתוכן ששלחת</li>
              </ul>
              <p className="mt-1.5">אנו רשאים להסיר תוכן בלתי הולם.</p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">6. שירותים ומחירים</h2>
              <p className="mb-1.5">השירותים מסופקים "כמות שהם". אנו רשאים:</p>
              <ul className="list-disc pr-5 space-y-0.5">
                <li>לשנות או להפסיק שירותים בכל עת</li>
                <li>לעדכן מחירים</li>
                <li>לשנות תנאי אספקה ושירות</li>
                <li>לדחות הזמנות או בקשות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">7. תשלום והחזרים</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li>ניתן לבטל הזמנה תוך 14 יום ממועד הרכישה</li>
                <li>ביטול לאחר תחילת עבודה - החזר לפי התקדמות</li>
                <li>עבודות שהושלמו - אינן ניתנות להחזר</li>
                <li>החזר לאמצעי התשלום המקורי תוך 14 ימי עסקים</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">8. הגבלת אחריות</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li>האתר והשירותים מסופקים "כמות שהם" ו"כזמינים"</li>
                <li>אין התחייבות שהאתר יהיה ללא שגיאות או הפרעות</li>
                <li>לא תהיה אחריות לנזקים ישירים, עקיפים או תוצאתיים</li>
                <li>לא תהיה אחריות לאובדן מידע או רווחים</li>
                <li>אחריותנו מוגבלת לסכום ששולם עבור השירות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">9. שיפוי</h2>
              <p>
                אתה מסכים לשפות אותנו מפני כל תביעה, אובדן או נזק הנובעים משימושך באתר,
                הפרת תנאים או הפרת זכויות צד שלישי.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">10. קישורים חיצוניים</h2>
              <p>
                האתר עשוי להכיל קישורים לאתרים חיצוניים. אין אחריות לתוכן או למדיניות שלהם.
                שימוש על אחריות המשתמש בלבד.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">11. שינויים וסיום</h2>
              <p className="mb-1.5">
                אנו רשאים לשנות תנאים אלה בכל עת. שינויים יכנסו לתוקף עם פרסומם.
              </p>
              <p>גישתך לאתר עשויה להיפסק בשל הפרת תנאים, פעילות חשודה או דרישת חוק.</p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">12. דין וסמכות שיפוט</h2>
              <p>
                התנאים יפורשו לפי חוקי מדינת ישראל. כל מחלוקת תתברר בבתי המשפט בתל אביב, ישראל.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">13. הוראות נוספות</h2>
              <p>
                השימוש כפוף ל<a href="/privacy" className="text-yellow-700 hover:underline font-semibold">מדיניות הפרטיות</a>.
                אם סעיף יקבע כבלתי תקף - שאר הסעיפים יישארו בתוקף. אי אכיפת זכות אינה מהווה ויתור עליה.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">14. יצירת קשר</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs space-y-1">
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
                <div><strong>כתובת:</strong> תל אביב, ישראל</div>
              </div>
            </section>

            <section className="pt-2 text-xs text-gray-500 text-center">
              שימוש באתר מהווה אישור שקראת, הבנת והסכמת לתנאים אלה במלואם.
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
