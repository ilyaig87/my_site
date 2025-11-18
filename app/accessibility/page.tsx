import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הצהרת נגישות - WebSites',
  description: 'הצהרת נגישות לאתר WebSites - אנו מחויבים להנגשת האתר לכלל האוכלוסייה',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <Container size="md">
        <div className="glass-card p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            הצהרת נגישות
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-white/90">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">מחויבות לנגישות</h2>
              <p>
                WebSites מחויבת להנגשת האתר שלה לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות.
                אנו משקיעים משאבים רבים על מנת להבטיח שהאתר יהיה נגיש וידידותי לכל המשתמשים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">תקן הנגישות</h2>
              <p>
                האתר עומד בדרישות תקן ישראלי (ת"י 5568) ברמה AA, בהתאם לתקנות שוויון זכויות לאנשים
                עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.
              </p>
              <p>
                התקן הבינלאומי WCAG 2.1 ברמה AA משמש כבסיס להנגשת האתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">אמצעי הנגישות באתר</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>תפריט נגישות מתקדם המאפשר התאמה אישית של האתר</li>
                <li>שינוי גודל הטקסט (80% עד 150%)</li>
                <li>מצב ניגודיות גבוהה לקריאות מיטבית</li>
                <li>מצב גווני אפור למשתמשים עם עיוורון צבעים</li>
                <li>הדגשת קישורים לניווט נוח יותר</li>
                <li>מבנה סמנטי תקין עם כותרות היררכיות</li>
                <li>טקסטים חלופיים (Alt Text) לכל התמונות</li>
                <li>ניווט מלא באמצעות מקלדת</li>
                <li>תמיכה בקוראי מסך</li>
                <li>סימון ברור של שדות טפסים</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">דפדפנים נתמכים</h2>
              <p>האתר נבדק ונמצא תקין בדפדפנים הבאים:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>Google Chrome (גרסה אחרונה)</li>
                <li>Mozilla Firefox (גרסה אחרונה)</li>
                <li>Microsoft Edge (גרסה אחרונה)</li>
                <li>Safari (גרסה אחרונה)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">טכנולוגיות מסייעות</h2>
              <p>האתר תומך בטכנולוגיות מסייעות כגון:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>NVDA - קורא מסך חינמי</li>
                <li>JAWS - קורא מסך מתקדם</li>
                <li>VoiceOver - קורא המסך של Apple</li>
                <li>TalkBack - קורא המסך של Android</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">בעיות נגישות ופניות</h2>
              <p>
                אם נתקלתם בבעיית נגישות באתר, אנא פנו אלינו ואנו נעשה כמיטב יכולתנו לפתור את הבעיה בהקדם.
              </p>
              <div className="mt-4 glass p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-3">פרטי התקשרות:</h3>
                <ul className="space-y-2">
                  <li>
                    <strong>אימייל:</strong>{' '}
                    <a href="mailto:accessibility@websites.co.il" className="text-primary-light hover:underline">
                      accessibility@websites.co.il
                    </a>
                  </li>
                  <li>
                    <strong>טלפון:</strong>{' '}
                    <a href="tel:+972-50-123-4567" className="text-primary-light hover:underline">
                      050-123-4567
                    </a>
                  </li>
                  <li><strong>רכז נגישות:</strong> מנהל האתר</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">זמני תגובה</h2>
              <p>
                אנו מחויבים להגיב לפניות בנושא נגישות תוך 5 ימי עסקים ולפתור את הבעיה תוך 30 ימים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">הערכה ובדיקות</h2>
              <p>
                הצהרת נגישות זו נבדקה ועודכנה לאחרונה בתאריך: {new Date().toLocaleDateString('he-IL')}
              </p>
              <p>
                האתר נבדק באמצעות כלי בדיקה אוטומטיים ובדיקות ידניות על ידי מומחי נגישות.
              </p>
            </section>

            <section className="mt-8 p-6 glass rounded-lg">
              <p className="text-sm text-white/70">
                <strong>הערה:</strong> למרות המאמצים שלנו להנגיש את כל העמודים באתר, ייתכן ויימצאו עמודים או חלקים שטרם
                הונגשו במלואם, או שאין להם פתרון טכנולוגי נגיש מתאים. אנו ממשיכים במאמצים לשפר את נגישות האתר,
                ככל האפשר, מתוך אמונה ומחויבות מוסרית לאפשר שימוש באתר לכלל האוכלוסייה.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
