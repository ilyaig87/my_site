import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הצהרת נגישות - Pixelia',
  description: 'הצהרת נגישות לאתר Pixelia בהתאם לתקן הישראלי ת"י 5568 ברמה AA',
};

const TOC = [
  { id: 'commitment', label: 'מחויבות' },
  { id: 'standards', label: 'תקנים' },
  { id: 'features', label: 'אמצעי נגישות' },
  { id: 'browsers', label: 'תאימות' },
  { id: 'tech', label: 'טכנולוגיות' },
  { id: 'limits', label: 'מגבלות' },
  { id: 'contact', label: 'רכז נגישות' },
  { id: 'response', label: 'זמני תגובה' },
];

export default function AccessibilityPage() {
  const lastUpdated = '28 באפריל 2026';

  return (
    <div className="py-10 md:py-14">
      <Container size="md">
        {/* Hero */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-bold mb-3">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
            </svg>
            ת"י 5568 · WCAG 2.1 · AA
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--text-strong)] mb-2 leading-tight">
            הצהרת נגישות
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Pixelia מחויבת להפיכת המרחב הדיגיטלי לנגיש לכלל האוכלוסייה · עודכן: {lastUpdated}
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
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-[var(--text-default)] hover:bg-white/40 dark:hover:bg-white/[0.06] hover:text-[var(--text-strong)] transition-colors"
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
          <div className="space-y-4">
            <div id="commitment" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-lg font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-xs font-black">1</span>
                  מחויבות לנגישות
                </h2>
                <p className="text-sm text-[var(--text-default)] leading-relaxed">
                  ב-Pixelia אינטרנט נגיש הוא זכות בסיסית. אנו פועלים להפיכת האתר ושירותינו לנגישים לכלל הציבור,
                  לרבות אנשים עם מוגבלויות מוטוריות, חזותיות, שמיעתיות, קוגניטיביות ולמידה. נגישות היא חלק
                  בלתי נפרד מהפיתוח, לא תוספת מאוחרת.
                </p>
              </div>
            </div>

            <div id="standards" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-lg font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-xs font-black">2</span>
                  תקנים ורגולציה
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {[
                    'תקנות שוויון זכויות לאנשים עם מוגבלות (התשע"ג–2013)',
                    'תקן ישראלי ת"י 5568 ברמה AA',
                    'WCAG 2.1 ברמה AA - תקן בינלאומי',
                    'עיקרי POUR: נתפס, שמיש, מובן, עמיד',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[var(--text-default)]">
                      <span className="text-[var(--primary)] mt-1 flex-shrink-0">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div id="features" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-lg font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-xs font-black">3</span>
                  אמצעי נגישות באתר
                </h2>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  האתר כולל תפריט נגישות מתקדם בכל עמוד (אייקון בצד שמאל). המאפיינים:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      title: 'תצוגה',
                      items: ['גודל טקסט 80%–200%', 'מרווח שורות ואותיות', 'פונט קריא לדיסלקטים', 'הדגשת כותרות'],
                    },
                    {
                      title: 'צבע וניגודיות',
                      items: ['ניגודיות גבוהה / הפוכה', 'גווני אפור (עיוורון צבעים)', 'מצב בהיר / כהה'],
                    },
                    {
                      title: 'ניווט ואינטראקציה',
                      items: ['הדגשת קישורים', 'סמן עכבר מוגדל', 'קו מנחה לקריאה', 'השהיית אנימציות', 'ניווט במקלדת (Tab/Enter)', 'קישור "דלג לתוכן"'],
                    },
                    {
                      title: 'קוראי מסך',
                      items: ['HTML5 סמנטי + ARIA', 'טקסט חלופי לתמונות', 'סימון שדות טופס', 'lang="he", dir="rtl"'],
                    },
                  ].map((group) => (
                    <div
                      key={group.title}
                      className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3"
                    >
                      <h3 className="text-xs font-black text-[var(--primary)] uppercase tracking-wider mb-1.5">{group.title}</h3>
                      <ul className="space-y-0.5 text-xs text-[var(--text-default)]">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-1.5">
                            <span className="text-[var(--primary)]/70 mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-3">
                  ההתאמות נשמרות בדפדפן (localStorage) ומיושמות אוטומטית בביקור הבא.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div id="browsers" className="lg-surface squircle-md p-5">
                <div className="relative z-10">
                  <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-xs font-black">4</span>
                    תאימות דפדפנים
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mb-2">נבדק בשתי גרסאות אחרונות:</p>
                  <ul className="text-sm space-y-1 text-[var(--text-default)]">
                    <li>● Chrome, Firefox, Edge</li>
                    <li>● Safari, Samsung Internet</li>
                    <li>● מחשב, טאבלט וסלולר</li>
                  </ul>
                </div>
              </div>

              <div id="tech" className="lg-surface squircle-md p-5">
                <div className="relative z-10">
                  <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-xs font-black">5</span>
                    טכנולוגיות מסייעות
                  </h2>
                  <ul className="text-sm space-y-1 text-[var(--text-default)]">
                    <li>● <strong>NVDA, JAWS, Narrator</strong> (Windows)</li>
                    <li>● <strong>VoiceOver</strong> (macOS / iOS)</li>
                    <li>● <strong>TalkBack</strong> (Android)</li>
                    <li>● Dragon, ZoomText</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="limits" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-lg font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-xs font-black">6</span>
                  חלקים שאינם נגישים במלואם
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-[var(--text-default)] mb-2">
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-1">●</span> תוכן משובץ מצדדים שלישיים (מפות, וידאו)</li>
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-1">●</span> קבצי PDF שהועלו ע"י לקוחות</li>
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-1">●</span> אזורים בתבניות הדגמה</li>
                </ul>
                <p className="text-xs text-[var(--text-muted)]">נתקלתם באזור לא נגיש? פנו אלינו ונטפל מיד.</p>
              </div>
            </div>

            <div id="contact" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-lg font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-xs font-black">7</span>
                  רכז הנגישות ופניות
                </h2>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  לבעיית נגישות, הצעה לשיפור או סיוע בגישה לתוכן - נשמח לשמוע.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3">
                    <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-wider mb-0.5">רכז</div>
                    <div className="font-bold text-[var(--text-strong)]">איליה, מנהל Pixelia</div>
                  </div>
                  <a
                    href="mailto:ilyaig8@gmail.com"
                    className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3 hover:bg-white/50 dark:hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-wider mb-0.5">אימייל</div>
                    <div className="font-bold text-[var(--primary)] truncate">ilyaig8@gmail.com</div>
                  </a>
                  <a
                    href="tel:+972546361555"
                    className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3 hover:bg-white/50 dark:hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-wider mb-0.5">טלפון</div>
                    <div className="font-bold text-[var(--primary)]" dir="ltr">054-636-1555</div>
                  </a>
                  <a
                    href="https://wa.me/972546361555"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3 hover:bg-white/50 dark:hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-wider mb-0.5">WhatsApp</div>
                    <div className="font-bold text-[var(--primary)]">לחצו לפתיחת שיחה</div>
                  </a>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-3">
                  בפנייתכם פרטו: כתובת הדף (URL), תיאור הבעיה, דפדפן/מערכת הפעלה/טכנולוגיה מסייעת, וצילום מסך אם רלוונטי.
                </p>
              </div>
            </div>

            <div id="response" className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { label: 'אישור פנייה', value: '2 ימי עסקים' },
                { label: 'מענה ראשוני', value: '5 ימי עסקים' },
                { label: 'פתרון או חלופה', value: '30 ימי עסקים' },
              ].map((item) => (
                <div key={item.label} className="lg-surface squircle-md p-4 text-center">
                  <div className="relative z-10">
                    <div className="text-2xl font-black text-[var(--primary)] mb-0.5">{item.value.split(' ')[0]}</div>
                    <div className="text-xs text-[var(--text-muted)] font-semibold">{item.value.split(' ').slice(1).join(' ')} · {item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg-surface lg-shallow squircle-md p-4 text-center">
              <div className="relative z-10">
                <p className="text-xs text-[var(--text-muted)]">
                  למרות מאמצינו, ייתכן שעדיין קיימים חלקים שאינם מונגשים במלואם. אנו ממשיכים לשפר באופן שוטף ומזמינים פניות ובקשות.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
