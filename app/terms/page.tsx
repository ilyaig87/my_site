import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'תנאי שימוש - WebSites',
  description: 'תנאי השימוש באתר WebSites - כללים והתחייבויות לשימוש באתר ובשירותים',
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('he-IL');

  return (
    <div className="min-h-screen py-16 md:py-24">
      <Container size="md">
        <div className="glass-card p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            תנאי שימוש
          </h1>
          <p className="text-white/70 mb-8">עודכן לאחרונה: {lastUpdated}</p>

          <div className="prose prose-invert max-w-none space-y-6 text-white/90">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. כללי</h2>
              <p>
                ברוכים הבאים ל-WebSites. תנאי שימוש אלה מסדירים את השימוש שלך באתר ובשירותים שלנו.
                על ידי גישה לאתר או שימוש בו, אתה מסכים לתנאים אלה במלואם.
              </p>
              <p className="mt-4">
                אם אינך מסכים לתנאים אלה, אנא הימנע משימוש באתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. הגדרות</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>"האתר"</strong> - אתר WebSites וכל תכניו</li>
                <li><strong>"אנו"/"החברה"</strong> - WebSites ומפעיליה</li>
                <li><strong>"משתמש"/"אתה"</strong> - כל מי שגולש או משתמש באתר</li>
                <li><strong>"שירותים"</strong> - כל השירותים הניתנים דרך האתר</li>
                <li><strong>"תוכן"</strong> - כל מידע, טקסט, תמונות, קוד או חומר אחר באתר</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. רישיון שימוש</h2>
              <p>
                אנו מעניקים לך רישיון מוגבל, בלתי בלעדי, בלתי ניתן להעברה לשימוש אישי ולא מסחרי באתר,
                בכפוף לתנאים אלה.
              </p>
              <h3 className="text-xl font-semibold text-white mb-3 mt-4">אסור לך:</h3>
              <ul className="list-disc pr-6 space-y-2">
                <li>להעתיק, לשנות או להפיץ תוכן מהאתר ללא אישור בכתב</li>
                <li>להשתמש באתר למטרות לא חוקיות או הונאה</li>
                <li>לפגוע בפעולת האתר או לשבש את שירותיו</li>
                <li>לאסוף מידע על משתמשים אחרים</li>
                <li>להעלות תוכן זדוני, וירוסים או קוד מזיק</li>
                <li>להתחזות לאדם או גוף אחר</li>
                <li>לעקוף אמצעי אבטחה או הגבלות טכניות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. זכויות קניין רוחני</h2>
              <p>
                כל התוכן באתר, כולל אך לא רק עיצוב, טקסט, גרפיקה, לוגו, אייקונים, תמונות, קוד וסימני מסחר,
                הוא בבעלות WebSites או בעלי הרישיונות שלה ומוגן על ידי חוקי זכויות יוצרים וקניין רוחני.
              </p>
              <p className="mt-4">
                אין להעתיק, לשכפל, להפיץ, למכור או לעשות שימוש מסחרי בתוכן ללא אישור מפורש בכתב.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. תוכן משתמשים</h2>
              <p>
                אם אתה שולח תוכן לאתר (טפסים, תגובות, הודעות), אתה מצהיר כי:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>התוכן שלך אינו מפר זכויות קניין רוחני או זכויות אחרות</li>
                <li>התוכן אינו פוגעני, מעליב או בלתי חוקי</li>
                <li>אתה אחראי באופן מלא לתוכן ששלחת</li>
              </ul>
              <p className="mt-4">
                אנו שומרים לעצמנו את הזכות להסיר כל תוכן משתמש שנראה לנו בלתי הולם.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. שירותים ומוצרים</h2>
              <p>
                השירותים המוצגים באתר מסופקים "כמות שהם". אנו שומרים לעצמנו את הזכות:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>לשנות או להפסיק שירותים בכל עת</li>
                <li>לעדכן מחירים ללא הודעה מוקדמת</li>
                <li>לשנות את תנאי האספקה או השירות</li>
                <li>להגביל כמויות או גישה לשירותים</li>
                <li>לדחות הזמנות או בקשות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. תשלום והחזרים</h2>
              <p>
                כל התשלומים מעובדים בצורה מאובטחת. אנו מקבלים את אמצעי התשלום המפורטים באתר.
              </p>
              <h3 className="text-xl font-semibold text-white mb-3 mt-4">מדיניות החזרים:</h3>
              <ul className="list-disc pr-6 space-y-2">
                <li>ניתן לבטל הזמנה תוך 14 יום ממועד הרכישה</li>
                <li>ביטול לאחר תחילת עבודה על הפרויקט - החזר יחושב לפי התקדמות</li>
                <li>עבודות שהושלמו - לא ניתן להחזר כספי</li>
                <li>ההחזר יבוצע לאמצעי התשלום המקורי תוך 14 ימי עסקים</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. הגבלת אחריות</h2>
              <p>
                באישית המירבית שמותרת על פי חוק:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>האתר והשירותים מסופקים "כמות שהם" ו"כזמינים"</li>
                <li>אין אנו מתחייבים שהאתר יהיה ללא שגיאות או הפרעות</li>
                <li>לא נהיה אחראים לנזקים ישירים, עקיפים או תוצאתיים</li>
                <li>לא נהיה אחראים לאובדן מידע או רווחים</li>
                <li>אחריותנו מוגבלת לסכום ששילמת עבור השירות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. שיפוי</h2>
              <p>
                אתה מסכים לשפות ולפצות אותנו, עובדינו, סוכנינו ונציגינו מפני כל תביעה, דרישה, אובדן או נזק
                הנובעים משימושך באתר, הפרת תנאים אלה, או הפרת זכויות של צד שלישי.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. קישורים לאתרים חיצוניים</h2>
              <p>
                האתר עשוי להכיל קישורים לאתרים חיצוניים. אנו לא אחראים לתוכן, מדיניות הפרטיות או נוהלי
                אתרים אלה. שימוש באתרים חיצוניים הוא על אחריותך בלבד.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. שינויים בתנאים</h2>
              <p>
                אנו שומרים לעצמנו את הזכות לשנות תנאי שימוש אלה בכל עת. שינויים יכנסו לתוקף מיד עם
                פרסומם באתר. המשך השימוש באתר לאחר שינויים מהווה הסכמה לתנאים המעודכנים.
              </p>
              <p className="mt-4">
                מומלץ לבדוק דף זה מעת לעת כדי להתעדכן בשינויים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. סיום</h2>
              <p>
                אנו רשאים להפסיק או להגביל את גישתך לאתר בכל עת, ללא הודעה מוקדמת, בשל:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>הפרת תנאי שימוש אלה</li>
                <li>פעילות בלתי חוקית או חשודה</li>
                <li>בקשתך להסיר את חשבונך</li>
                <li>דרישה על פי חוק או רשות שיפוטית</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. דין וסמכות שיפוט</h2>
              <p>
                תנאי שימוש אלה יפורשו ויסדרו בהתאם לחוקי מדינת ישראל.
                כל מחלוקת תתברר בבתי המשפט המוסמכים בתל אביב, ישראל.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. הוראות נוספות</h2>
              <h3 className="text-xl font-semibold text-white mb-3">פרטיות:</h3>
              <p>
                השימוש שלך באתר כפוף גם ל<a href="/privacy" className="text-primary-light hover:underline">מדיניות הפרטיות</a> שלנו.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-4">ניתוק:</h3>
              <p>
                אם יקבע שסעיף כלשהו בתנאים אלה אינו תקף או בלתי אכיף, הסעיפים האחרים יישארו בתוקף מלא.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-4">ויתור:</h3>
              <p>
                אי אכיפה של זכות או הוראה בתנאים אלה אינה מהווה ויתור על אותה זכות או הוראה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. יצירת קשר</h2>
              <p>
                לשאלות, הבהרות או תלונות בנוגע לתנאי שימוש אלה, אנא צור קשר:
              </p>
              <div className="mt-4 glass p-6 rounded-lg">
                <ul className="space-y-2">
                  <li>
                    <strong>אימייל:</strong>{' '}
                    <a href="mailto:legal@websites.co.il" className="text-primary-light hover:underline">
                      legal@websites.co.il
                    </a>
                  </li>
                  <li>
                    <strong>טלפון:</strong>{' '}
                    <a href="tel:+972-50-123-4567" className="text-primary-light hover:underline">
                      050-123-4567
                    </a>
                  </li>
                  <li><strong>כתובת:</strong> תל אביב, ישראל</li>
                </ul>
              </div>
            </section>

            <section className="mt-8 p-6 glass rounded-lg border-2 border-secondary/30">
              <p className="text-sm text-center">
                על ידי שימוש באתר זה, אתה מאשר שקראת, הבנת והסכמת לתנאי שימוש אלה במלואם.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
