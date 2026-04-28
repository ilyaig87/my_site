import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות - Pixelia',
  description: 'מדיניות הפרטיות של Pixelia - כיצד אנו אוספים, משתמשים ושומרים על המידע שלך',
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('he-IL');

  return (
    <div className="py-6 md:py-10 bg-gradient-to-b from-gray-50 to-white">
      <Container size="md">
        <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm p-5 md:p-8">
          <header className="mb-4 pb-3 border-b border-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              מדיניות פרטיות
            </h1>
            <p className="text-xs text-gray-500">עודכן לאחרונה: {lastUpdated}</p>
          </header>

          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">הקדמה</h2>
              <p>
                ב-Pixelia אנו מכבדים את פרטיותך ומחויבים להגן על המידע האישי שלך.
                מדיניות זו מסבירה כיצד אנו אוספים, משתמשים, משתפים ומגנים על המידע האישי שלך.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">איסוף מידע</h2>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">מידע שאתה מספק:</h3>
              <ul className="list-disc pr-5 space-y-0.5 mb-2">
                <li><strong>פרטים אישיים:</strong> שם, אימייל, טלפון מטפסי יצירת קשר</li>
                <li><strong>מידע עסקי:</strong> שם העסק, תחום, דרישות פרויקט</li>
                <li><strong>תקשורת:</strong> התכתבות איתנו באימייל או בטפסים</li>
              </ul>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">מידע שנאסף אוטומטית:</h3>
              <ul className="list-disc pr-5 space-y-0.5">
                <li><strong>נתוני שימוש:</strong> דפים שביקרת, זמן שהייה, מקור הפניה</li>
                <li><strong>מידע טכני:</strong> כתובת IP, דפדפן, מערכת הפעלה, סוג מכשיר</li>
                <li><strong>עוגיות:</strong> מזהים ייחודיים לשיפור החוויה</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">שימוש במידע</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li>מתן ושיפור השירותים</li>
                <li>תקשורת לגבי פרויקטים ושירותים</li>
                <li>עדכונים שיווקיים (בהסכמה)</li>
                <li>ניתוח וניהול האתר</li>
                <li>מניעת הונאות ועמידה בחוק</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">שיתוף מידע</h2>
              <p className="mb-1.5">אנו לא מוכרים או משכירים מידע אישי. שיתוף יכול להתקיים עם:</p>
              <ul className="list-disc pr-5 space-y-0.5">
                <li><strong>ספקי שירות:</strong> אחסון, ניתוח נתונים</li>
                <li><strong>דרישה חוקית:</strong> כשנדרש על פי חוק או הליך משפטי</li>
                <li><strong>הגנה על זכויות:</strong> להגנה על הזכויות, הרכוש או הבטיחות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">עוגיות (Cookies)</h2>
              <p className="mb-1.5">
                אנו משתמשים בעוגיות לשיפור חוויית המשתמש, ניתוח תנועה והצגת תוכן רלוונטי.
              </p>
              <ul className="list-disc pr-5 space-y-0.5">
                <li><strong>הכרחיות:</strong> נדרשות לתפעול בסיסי</li>
                <li><strong>ביצועים:</strong> מבינות איך משתמשים באתר</li>
                <li><strong>פונקציונליות:</strong> זוכרות העדפות</li>
                <li><strong>שיווקיות:</strong> תוכן ופרסומות רלוונטיות</li>
              </ul>
              <p className="mt-1.5">ניהול ההעדפות דרך הדפדפן או באנר העוגיות באתר.</p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">אבטחת מידע</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li>הצפנת SSL/TLS לכל התקשורת</li>
                <li>אחסון מאובטח בשרתים מוגנים</li>
                <li>גישה מוגבלת לעובדים מורשים בלבד</li>
                <li>בדיקות אבטחה שוטפות</li>
              </ul>
              <p className="mt-1.5 text-xs text-gray-600">
                שים לב: אין שיטת העברה או אחסון באינטרנט שהיא 100% מאובטחת.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">זכויותיך</h2>
              <ul className="list-disc pr-5 space-y-0.5">
                <li><strong>גישה</strong> - לבקש עותק של המידע ששמור עליך</li>
                <li><strong>תיקון</strong> - לתקן מידע שגוי</li>
                <li><strong>מחיקה</strong> - לבקש למחוק מידע אישי</li>
                <li><strong>הגבלה</strong> - להגביל את העיבוד</li>
                <li><strong>ניידות</strong> - לקבל את המידע בפורמט נייד</li>
                <li><strong>התנגדות</strong> - להתנגד לשימושים מסוימים</li>
                <li><strong>ביטול הסכמה</strong> - לבטל הסכמה שניתנה</li>
              </ul>
              <p className="mt-1.5">למימוש זכויות אלה - יצירת קשר בפרטים בסוף המסמך.</p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">שמירה ושינויים</h2>
              <p className="mb-1.5">
                המידע נשמר כל עוד נדרש למטרות המפורטות או על פי חוק. לאחר מכן יימחק או יאנונם.
              </p>
              <p>
                מדיניות זו עשויה להתעדכן. שינויים משמעותיים יפורסמו באתר עם תאריך עדכון חדש.
                המשך השימוש מהווה הסכמה לעדכונים.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">שימוש ע"י ילדים</h2>
              <p>
                האתר אינו מיועד לילדים מתחת לגיל 18. אם הנך הורה ואתה מאמין שילדך סיפק מידע - אנא צור קשר.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">יצירת קשר</h2>
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

            <section className="pt-2 text-xs text-gray-500 leading-relaxed">
              מדיניות זו מבוססת על חוק הגנת הפרטיות, התשמ"א-1981 ותקנות אבטחת מידע, התשע"ז-2017,
              ועומדת בדרישות GDPR למשתמשים מאירופה.
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
