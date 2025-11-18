import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות - WebSites',
  description: 'מדיניות הפרטיות של WebSites - כיצד אנו אוספים, משתמשים ושומרים על המידע שלך',
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('he-IL');

  return (
    <div className="min-h-screen py-16 md:py-24">
      <Container size="md">
        <div className="glass-card p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            מדיניות פרטיות
          </h1>
          <p className="text-white/70 mb-8">עודכן לאחרונה: {lastUpdated}</p>

          <div className="prose prose-invert max-w-none space-y-6 text-white/90">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">הקדמה</h2>
              <p>
                ב-WebSites אנו מכבדים את פרטיותך ומחויבים להגן על המידע האישי שלך.
                מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, משתפים ומגנים על המידע האישי שלך.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">איסוף מידע</h2>
              <h3 className="text-xl font-semibold text-white mb-3">מידע שאתה מספק לנו:</h3>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>פרטים אישיים:</strong> שם, כתובת אימייל, מספר טלפון שאתה מספק בטפסי יצירת קשר</li>
                <li><strong>מידע עסקי:</strong> שם העסק, תחום עיסוק, דרישות פרויקט</li>
                <li><strong>תקשורת:</strong> התכתבות שלך איתנו באימייל או בטפסים</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">מידע שנאסף אוטומטית:</h3>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>נתוני שימוש:</strong> דפים שביקרת, זמן השהייה, מקור ההפניה</li>
                <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה, סוג מכשיר</li>
                <li><strong>עוגיות:</strong> מזהים ייחודיים לשיפור חוויית המשתמש</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">שימוש במידע</h2>
              <p>אנו משתמשים במידע שלך למטרות הבאות:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>מתן ושיפור השירותים שלנו</li>
                <li>תקשורת איתך בנוגע לפרויקטים ושירותים</li>
                <li>שליחת עדכונים שיווקיים (אם נתת את הסכמתך)</li>
                <li>ניתוח וניהול האתר שלנו</li>
                <li>זיהוי ומניעת הונאות או פעילות לא חוקית</li>
                <li>עמידה בדרישות חוקיות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">שיתוף מידע</h2>
              <p>אנו לא מוכרים או משכירים את המידע האישי שלך לצדדים שלישיים. אנו עשויים לשתף מידע:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>ספקי שירות:</strong> חברות המספקות שירותים טכניים (אחסון, ניתוח נתונים)</li>
                <li><strong>דרישות חוקיות:</strong> כאשר נדרש על פי חוק או לצורך הליכים משפטיים</li>
                <li><strong>הגנה על זכויות:</strong> כדי להגן על הזכויות, הרכוש או הבטיחות שלנו או של אחרים</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">עוגיות (Cookies)</h2>
              <p>
                אנו משתמשים בעוגיות לשיפור חוויית המשתמש, ניתוח תנועה באתר והצגת תוכן רלוונטי.
              </p>
              <h3 className="text-xl font-semibold text-white mb-3 mt-4">סוגי עוגיות:</h3>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>עוגיות הכרחיות:</strong> נדרשות לתפעול בסיסי של האתר</li>
                <li><strong>עוגיות ביצועים:</strong> עוזרות לנו להבין כיצד המשתמשים משתמשים באתר</li>
                <li><strong>עוגיות פונקציונליות:</strong> זוכרות העדפות והגדרות שלך</li>
                <li><strong>עוגיות שיווקיות:</strong> מציגות תוכן ופרסומות רלוונטיות</li>
              </ul>
              <p className="mt-4">
                אתה יכול לנהל את העדפות העוגיות שלך דרך הגדרות הדפדפן או באמצעות באנר העוגיות באתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">אבטחת מידע</h2>
              <p>
                אנו נוקטים אמצעי אבטחה סבירים להגנה על המידע שלך, כולל:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>הצפנת SSL/TLS לכל התקשורת</li>
                <li>אחסון מאובטח בשרתים מוגנים</li>
                <li>הגבלת גישה למידע רק לעובדים מורשים</li>
                <li>מעקב ובדיקות אבטחה שוטפות</li>
              </ul>
              <p className="mt-4">
                <strong>שים לב:</strong> למרות המאמצים שלנו, אין שיטת העברה או אחסון באינטרנט שהיא 100% מאובטחת.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">זכויותיך</h2>
              <p>בהתאם לחוקי הגנת הפרטיות, יש לך את הזכויות הבאות:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>גישה:</strong> לבקש עותק של המידע האישי שאנו שומרים עליך</li>
                <li><strong>תיקון:</strong> לבקש לתקן מידע שגוי או לא מדויק</li>
                <li><strong>מחיקה:</strong> לבקש למחוק את המידע האישי שלך</li>
                <li><strong>הגבלה:</strong> לבקש להגביל את העיבוד של המידע שלך</li>
                <li><strong>נייד תות:</strong> לקבל את המידע שלך בפורמט נייד</li>
                <li><strong>התנגדות:</strong> להתנגד לשימוש מסוים במידע שלך</li>
                <li><strong>ביטול הסכמה:</strong> לבטל הסכמה שנתת בעבר</li>
              </ul>
              <p className="mt-4">
                לממש זכויות אלה, אנא צור קשר איתנו בפרטים המפורטים בסוף מדיניות זו.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">שימוש על ידי ילדים</h2>
              <p>
                האתר שלנו אינו מיועד לילדים מתחת לגיל 18. אנו לא אוספים ביודעין מידע אישי מילדים.
                אם הנך הורה או אפוטרופוס ואתה מאמין שילדך סיפק לנו מידע אישי, אנא צור איתנו קשר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">שמירת מידע</h2>
              <p>
                אנו שומרים את המידע האישי שלך כל עוד הוא נדרש למטרות המפורטות במדיניות זו,
                או כפי שנדרש על פי חוק. לאחר מכן, המידע יימחק או יאנונם באופן מאובטח.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">שינויים במדיניות</h2>
              <p>
                אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. שינויים משמעותיים יפורסמו באתר
                עם תאריך עדכון חדש. המשך השימוש באתר לאחר שינויים מהווה הסכמה למדיניות המעודכנת.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">יצירת קשר</h2>
              <p>
                אם יש לך שאלות או דאגות לגבי מדיניות הפרטיות שלנו או הטיפול במידע שלך, אנא צור קשר:
              </p>
              <div className="mt-4 glass p-6 rounded-lg">
                <ul className="space-y-2">
                  <li>
                    <strong>אימייל:</strong>{' '}
                    <a href="mailto:privacy@websites.co.il" className="text-primary-light hover:underline">
                      privacy@websites.co.il
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

            <section className="mt-8 p-6 glass rounded-lg border-2 border-primary/30">
              <h3 className="text-xl font-bold text-white mb-3">חוק הגנת הפרטיות</h3>
              <p className="text-sm">
                מדיניות זו מבוססת על חוק הגנת הפרטיות, התשמ"א-1981 ותקנות הגנת הפרטיות (אבטחת מידע), התשע"ז-2017.
                כמו כן, אנו עומדים בדרישות תקנת הגנת המידע הכללית (GDPR) של האיחוד האירופי למשתמשים מאירופה.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
