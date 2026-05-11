import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות - Pixelia',
  description: 'מדיניות הפרטיות של Pixelia - כיצד אנו אוספים, משתמשים ושומרים על המידע שלך',
};

const TOC = [
  { id: 'intro', label: 'הקדמה' },
  { id: 'collection', label: 'איסוף מידע' },
  { id: 'usage', label: 'שימוש במידע' },
  { id: 'sharing', label: 'שיתוף וספקים' },
  { id: 'cookies', label: 'עוגיות' },
  { id: 'security', label: 'אבטחת מידע' },
  { id: 'rights', label: 'זכויותיכם' },
  { id: 'retention', label: 'תקופת שמירה' },
  { id: 'changes', label: 'שינויים' },
  { id: 'children', label: 'ילדים' },
  { id: 'contact', label: 'יצירת קשר' },
];

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('he-IL');

  return (
    <div className="py-10 md:py-14">
      <Container size="md">
        {/* Hero */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-bold mb-3">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            GDPR · חוק הגנת הפרטיות
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--text-strong)] mb-2 leading-tight">מדיניות פרטיות</h1>
          <p className="text-sm text-[var(--text-muted)]">
            אנו מכבדים את פרטיותכם ומחויבים להגן על המידע האישי שלכם · עודכן: {lastUpdated}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
          {/* Sticky TOC */}
          <nav aria-label="ניווט מהיר" className="lg:sticky lg:top-24 lg:self-start lg-surface lg-shallow squircle-md p-3">
            <div className="relative z-10">
              <p className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-wider mb-2 px-2">תוכן עניינים</p>
              <ul className="space-y-0.5">
                {TOC.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-center gap-2 px-2 py-1 rounded-lg text-xs text-[var(--text-default)] hover:bg-white/40 dark:hover:bg-white/[0.06] hover:text-[var(--text-strong)] transition-colors"
                    >
                      <span className="w-5 text-[var(--primary)] font-bold tabular-nums">{i + 1}.</span>
                      <span className="font-semibold">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Content */}
          <div className="space-y-3.5">
            <div id="intro" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">1</span>
                  הקדמה
                </h2>
                <p className="text-sm text-[var(--text-default)] leading-relaxed">
                  ב-Pixelia אנו מכבדים את פרטיותכם ומחויבים להגן על המידע האישי שלכם. מדיניות זו מסבירה כיצד
                  אנו אוספים, משתמשים, משתפים ומגנים על המידע האישי שלכם.
                </p>
              </div>
            </div>

            <div id="collection" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">2</span>
                  איסוף מידע
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3">
                    <h3 className="text-xs font-black text-[var(--primary)] uppercase tracking-wider mb-2">מידע שאתם מספקים</h3>
                    <ul className="space-y-1 text-xs text-[var(--text-default)]">
                      <li><strong>פרטים אישיים:</strong> שם, אימייל, טלפון</li>
                      <li><strong>מידע עסקי:</strong> שם עסק, תחום, דרישות</li>
                      <li><strong>תקשורת:</strong> התכתבות עם Pixelia</li>
                    </ul>
                  </div>
                  <div className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3">
                    <h3 className="text-xs font-black text-[var(--primary)] uppercase tracking-wider mb-2">נאסף אוטומטית</h3>
                    <ul className="space-y-1 text-xs text-[var(--text-default)]">
                      <li><strong>נתוני שימוש:</strong> דפים, זמן שהייה, הפניה</li>
                      <li><strong>מידע טכני:</strong> IP, דפדפן, מערכת הפעלה</li>
                      <li><strong>עוגיות:</strong> מזהים לשיפור החוויה</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div id="usage" className="lg-surface squircle-md p-5">
                <div className="relative z-10">
                  <h2 className="text-base font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">3</span>
                    שימוש במידע
                  </h2>
                  <ul className="space-y-1 text-xs text-[var(--text-default)]">
                    {[
                      'מתן ושיפור השירותים',
                      'תקשורת לגבי פרויקטים ושירותים',
                      'עדכונים שיווקיים (בהסכמה)',
                      'ניתוח וניהול האתר',
                      'מניעת הונאות ועמידה בחוק',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="text-[var(--primary)]/70 mt-0.5">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div id="cookies" className="lg-surface squircle-md p-5">
                <div className="relative z-10">
                  <h2 className="text-base font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">5</span>
                    עוגיות (Cookies)
                  </h2>
                  <ul className="space-y-1 text-xs text-[var(--text-default)]">
                    <li><strong>הכרחיות:</strong> נדרשות לתפעול בסיסי</li>
                    <li><strong>ביצועים:</strong> מבינות איך משתמשים</li>
                    <li><strong>פונקציונליות:</strong> זוכרות העדפות</li>
                    <li><strong>שיווקיות:</strong> תוכן ופרסומות רלוונטיות</li>
                  </ul>
                  <p className="text-[11px] text-[var(--text-muted)] mt-2">ניהול דרך הדפדפן או באנר העוגיות.</p>
                </div>
              </div>
            </div>

            <div id="sharing" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">4</span>
                  שיתוף מידע וספקי משנה
                </h2>
                <p className="text-sm text-[var(--text-default)] mb-3">
                  <strong>אנחנו לא מוכרים או משכירים מידע אישי.</strong> שיתוף ייתכן עם:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  {[
                    { name: 'Vercel', desc: 'אחסון האתר (ארה"ב, EU)' },
                    { name: 'Turso', desc: 'מסד נתונים (GDPR)' },
                    { name: 'Google Analytics', desc: 'נתונים אנונימיים' },
                    { name: 'WhatsApp', desc: 'תקשורת ישירה' },
                    { name: 'דרישה חוקית', desc: 'הליך משפטי' },
                  ].map((vendor) => (
                    <div
                      key={vendor.name}
                      className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-lg p-2"
                    >
                      <div className="font-black text-[var(--primary)]">{vendor.name}</div>
                      <div className="text-[var(--text-muted)] text-[11px] mt-0.5">{vendor.desc}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-3">
                  כל ספק נבחר על בסיס תקני אבטחה מחמירים ועומד בדרישות GDPR.
                </p>
              </div>
            </div>

            <div id="security" className="lg-surface squircle-md p-5 border-r-4 border-[var(--primary)]">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">6</span>
                  אבטחת מידע
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[var(--text-default)]">
                  {[
                    'הצפנת SSL/TLS לכל התקשורת',
                    'אחסון מאובטח (Vercel + Turso)',
                    'גישה מוגבלת לבעלי הרשאה',
                    'בדיקות אבטחה ועדכוני תלויות',
                    'הודעה תוך 72 שעות באירוע משמעותי',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="text-[var(--primary)]/70 mt-0.5">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-[var(--text-muted)] mt-2">
                  שימו לב: אין שיטה באינטרנט שהיא 100% מאובטחת.
                </p>
              </div>
            </div>

            <div id="rights" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">7</span>
                  זכויותיכם
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { label: 'גישה', desc: 'לבקש עותק' },
                    { label: 'תיקון', desc: 'לתקן מידע' },
                    { label: 'מחיקה', desc: 'למחוק מידע' },
                    { label: 'הגבלה', desc: 'להגביל עיבוד' },
                    { label: 'ניידות', desc: 'פורמט נייד' },
                    { label: 'התנגדות', desc: 'לשימושים' },
                    { label: 'ביטול הסכמה', desc: 'בכל עת' },
                    { label: 'הסרה משיווק', desc: 'Opt-Out' },
                  ].map((right) => (
                    <div
                      key={right.label}
                      className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-lg p-2 text-center"
                    >
                      <div className="font-black text-[var(--primary)] text-xs">{right.label}</div>
                      <div className="text-[var(--text-muted)] text-[10px] mt-0.5">{right.desc}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-3">
                  למימוש זכויות - יצירת קשר בפרטים בסוף המסמך. נענה תוך 14 ימי עסקים.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div id="retention" className="lg-surface squircle-md p-5">
                <div className="relative z-10">
                  <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">8</span>
                    תקופת שמירה
                  </h2>
                  <ul className="space-y-1.5 text-xs text-[var(--text-default)]">
                    <li className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/20 dark:border-white/5">
                      <span>לידים שלא הומרו</span>
                      <span className="font-bold text-[var(--primary)] whitespace-nowrap">12 חודשים</span>
                    </li>
                    <li className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/20 dark:border-white/5">
                      <span>לקוחות פעילים</span>
                      <span className="font-bold text-[var(--primary)] whitespace-nowrap">משך הקשר</span>
                    </li>
                    <li className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/20 dark:border-white/5">
                      <span>חשבוניות וחיובים</span>
                      <span className="font-bold text-[var(--primary)] whitespace-nowrap">7 שנים</span>
                    </li>
                    <li className="flex items-center justify-between gap-2">
                      <span>נתוני Analytics</span>
                      <span className="font-bold text-[var(--primary)] whitespace-nowrap">26 חודשים</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3.5">
                <div id="changes" className="lg-surface squircle-md p-4">
                  <div className="relative z-10">
                    <h2 className="text-sm font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">9</span>
                      שינויים במדיניות
                    </h2>
                    <p className="text-xs text-[var(--text-default)] leading-relaxed">
                      מדיניות זו עשויה להתעדכן. שינויים יפורסמו באתר עם תאריך עדכון חדש. המשך השימוש מהווה הסכמה.
                    </p>
                  </div>
                </div>

                <div id="children" className="lg-surface squircle-md p-4">
                  <div className="relative z-10">
                    <h2 className="text-sm font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">10</span>
                      שימוש ע"י ילדים
                    </h2>
                    <p className="text-xs text-[var(--text-default)] leading-relaxed">
                      האתר אינו מיועד לילדים מתחת לגיל 18. הורים שמאמינים שילדם סיפק מידע - יצרו קשר ונפעל למחיקתו.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="contact" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">11</span>
                  יצירת קשר
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <a
                    href="mailto:ilyaig8@gmail.com"
                    className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3 hover:bg-white/50 dark:hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-wider mb-0.5">אימייל</div>
                    <div className="font-bold text-[var(--primary)] text-xs truncate">ilyaig8@gmail.com</div>
                  </a>
                  <a
                    href="tel:+972546361555"
                    className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3 hover:bg-white/50 dark:hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-wider mb-0.5">טלפון</div>
                    <div className="font-bold text-[var(--primary)] text-xs" dir="ltr">054-636-1555</div>
                  </a>
                  <div className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3">
                    <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-wider mb-0.5">כתובת</div>
                    <div className="font-bold text-[var(--text-strong)] text-xs">תל אביב, ישראל</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg-surface lg-shallow squircle-md p-4 text-center">
              <div className="relative z-10">
                <p className="text-xs text-[var(--text-muted)]">
                  מדיניות זו מבוססת על חוק הגנת הפרטיות, התשמ"א-1981 ותקנות אבטחת מידע, התשע"ז-2017,
                  ועומדת בדרישות GDPR למשתמשים מאירופה.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
