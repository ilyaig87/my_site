import Container from '@/components/ui/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'תנאי שימוש - Pixelia',
  description: 'תנאי השימוש באתר Pixelia - כללים והתחייבויות לשימוש באתר ובשירותים',
};

const TOC = [
  { id: 'general', label: 'כללי' },
  { id: 'definitions', label: 'הגדרות' },
  { id: 'license', label: 'רישיון שימוש' },
  { id: 'ip', label: 'קניין רוחני' },
  { id: 'user-content', label: 'תוכן משתמשים' },
  { id: 'pricing', label: 'מחירים' },
  { id: 'refunds', label: 'תשלום והחזרים' },
  { id: 'warranty', label: 'אחריות לעבודה' },
  { id: 'liability', label: 'הגבלת אחריות' },
  { id: 'indemnity', label: 'שיפוי' },
  { id: 'external', label: 'קישורים חיצוניים' },
  { id: 'changes', label: 'שינויים' },
  { id: 'law', label: 'דין וסמכות' },
  { id: 'contact', label: 'יצירת קשר' },
];

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('he-IL');

  return (
    <div className="py-10 md:py-14">
      <Container size="md">
        {/* Hero */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-bold mb-3">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            תנאים והגבלות
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--text-strong)] mb-2 leading-tight">תנאי שימוש</h1>
          <p className="text-sm text-[var(--text-muted)]">שימוש באתר מהווה הסכמה לתנאים אלה · עודכן: {lastUpdated}</p>
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
            <div id="general" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">1</span>
                  כללי
                </h2>
                <p className="text-sm text-[var(--text-default)] leading-relaxed">
                  ברוכים הבאים ל-Pixelia. תנאים אלה מסדירים את השימוש באתר ובשירותים שלנו. שימוש באתר מהווה
                  הסכמה לתנאים אלה במלואם. אם אינכם מסכימים - אנא הימנעו משימוש באתר.
                </p>
              </div>
            </div>

            <div id="definitions" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">2</span>
                  הגדרות
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {[
                    ['"האתר"', 'אתר Pixelia וכל תכניו'],
                    ['"אנו"/"החברה"', 'Pixelia ומפעיליה'],
                    ['"משתמש"/"אתם"', 'כל מי שגולש או משתמש באתר'],
                    ['"שירותים"', 'השירותים הניתנים דרך האתר'],
                    ['"תוכן"', 'מידע, טקסט, תמונות, קוד באתר'],
                  ].map(([term, def]) => (
                    <div
                      key={term}
                      className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-lg p-2.5"
                    >
                      <dt className="font-black text-[var(--primary)] text-xs">{term}</dt>
                      <dd className="text-[var(--text-default)] text-xs mt-0.5">{def}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div id="license" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">3</span>
                  רישיון שימוש
                </h2>
                <p className="text-sm text-[var(--text-default)] mb-3">
                  ניתן רישיון מוגבל, בלתי בלעדי ולא ניתן להעברה לשימוש אישי ולא מסחרי באתר.
                </p>
                <p className="text-xs font-black text-red-600 dark:text-red-400 mb-2">⛔ אסור:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm text-[var(--text-default)]">
                  {[
                    'להעתיק, לשנות או להפיץ תוכן ללא אישור בכתב',
                    'לעשות שימוש לא חוקי או הונאה',
                    'לפגוע בפעולת האתר או לשבש שירותים',
                    'לאסוף מידע על משתמשים אחרים',
                    'להעלות תוכן זדוני, וירוסים או קוד מזיק',
                    'להתחזות לאדם או גוף אחר',
                    'לעקוף אמצעי אבטחה',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs">
                      <span className="text-red-500/70 mt-0.5">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div id="ip" className="lg-surface squircle-md p-5">
                <div className="relative z-10">
                  <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">4</span>
                    קניין רוחני
                  </h2>
                  <p className="text-sm text-[var(--text-default)] leading-relaxed">
                    כל התוכן באתר (עיצוב, טקסט, גרפיקה, לוגו, אייקונים, תמונות, קוד וסימני מסחר) הוא בבעלות Pixelia
                    או בעלי רישיון מטעמה ומוגן בחוקי זכויות יוצרים. אין שימוש מסחרי ללא אישור בכתב.
                  </p>
                </div>
              </div>

              <div id="user-content" className="lg-surface squircle-md p-5">
                <div className="relative z-10">
                  <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">5</span>
                    תוכן משתמשים
                  </h2>
                  <p className="text-sm text-[var(--text-default)] mb-2">בשליחת תוכן אתם מצהירים כי:</p>
                  <ul className="space-y-1 text-xs text-[var(--text-default)]">
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> התוכן אינו מפר זכויות קניין רוחני</li>
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> התוכן אינו פוגעני או בלתי חוקי</li>
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> אתם אחראים באופן מלא לתוכן ששלחתם</li>
                  </ul>
                  <p className="text-xs text-[var(--text-muted)] mt-2">אנו רשאים להסיר תוכן בלתי הולם.</p>
                </div>
              </div>
            </div>

            <div id="pricing" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">6</span>
                  שירותים ומחירים
                </h2>
                <p className="text-sm text-[var(--text-default)] mb-3">
                  המחירים המוצגים הם מחירי <strong>בסיס</strong> ומסומנים בפורמט "החל מ-X ₪". המחיר הסופי נקבע לאחר שיחת
                  תיאום. כל המחירים אינם כוללים מע"מ.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[var(--text-default)]">
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> לשנות או להפסיק שירותים בכל עת</li>
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> לעדכן מחירים (מחיר שסוכם אינו משתנה)</li>
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> לשנות תנאים לעסקאות עתידיות</li>
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> לדחות הזמנות שלא בהתמחותנו</li>
                </ul>
              </div>
            </div>

            <div id="refunds" className="lg-surface squircle-md p-5 border-r-4 border-[var(--primary)]">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">7</span>
                  תשלום והחזרים
                </h2>
                <p className="text-sm text-[var(--text-default)] mb-3">
                  <strong>זכות ביטול עסקה (חוק הגנת הצרכן):</strong> ניתן לבטל תוך 14 ימים מיום ביצוע העסקה, לפני
                  תחילת מתן השירות. דמי ביטול: עד 5% מהעסקה או 100 ₪ - הנמוך מבניהם.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[var(--text-default)]">
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> ביטול לפני עבודה - החזר מלא בניכוי דמי ביטול</li>
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> ביטול אחרי עבודה - החזר חלקי לפי התקדמות</li>
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> עבודות שנמסרו - אינן ניתנות להחזר</li>
                  <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> החזר תוך 14 ימי עסקים לאמצעי המקורי</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div id="warranty" className="lg-surface squircle-md p-5">
                <div className="relative z-10">
                  <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">8</span>
                    אחריות לעבודה
                  </h2>
                  <ul className="space-y-1 text-xs text-[var(--text-default)]">
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> חודש תיקוני באגים חינם (חודשיים בחבילה מורחבת)</li>
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> תיקון באג = משהו לא פועל כפי שסוכם</li>
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> הוספה/שינוי = שירות נפרד בתשלום</li>
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> נזקים מפעולות הלקוח אינם באחריות</li>
                  </ul>
                </div>
              </div>

              <div id="liability" className="lg-surface squircle-md p-5">
                <div className="relative z-10">
                  <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">9</span>
                    הגבלת אחריות
                  </h2>
                  <ul className="space-y-1 text-xs text-[var(--text-default)]">
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> &quot;כמות שהוא&quot; ו&quot;כזמין&quot;</li>
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> אין התחייבות שאין שגיאות</li>
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> אין אחריות לנזקים עקיפים</li>
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> מוגבל לסכום ששולם בפועל</li>
                    <li className="flex items-start gap-1.5"><span className="text-[var(--primary)]/70 mt-0.5">●</span> תקלות בספקי צד שלישי - לא באחריותנו</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div id="indemnity" className="lg-surface squircle-md p-4">
                <div className="relative z-10">
                  <h2 className="text-sm font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">10</span>
                    שיפוי
                  </h2>
                  <p className="text-xs text-[var(--text-default)] leading-relaxed">
                    אתם מסכימים לשפות אותנו מפני כל תביעה, אובדן או נזק הנובעים משימוש באתר או הפרת תנאים.
                  </p>
                </div>
              </div>

              <div id="external" className="lg-surface squircle-md p-4">
                <div className="relative z-10">
                  <h2 className="text-sm font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">11</span>
                    קישורים חיצוניים
                  </h2>
                  <p className="text-xs text-[var(--text-default)] leading-relaxed">
                    האתר עשוי להכיל קישורים לאתרים חיצוניים. אין אחריות לתוכן או למדיניותם. שימוש על אחריות המשתמש.
                  </p>
                </div>
              </div>

              <div id="changes" className="lg-surface squircle-md p-4">
                <div className="relative z-10">
                  <h2 className="text-sm font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">12</span>
                    שינויים וסיום
                  </h2>
                  <p className="text-xs text-[var(--text-default)] leading-relaxed">
                    אנו רשאים לשנות תנאים אלה בכל עת. גישתכם עשויה להיפסק בשל הפרה או דרישת חוק.
                  </p>
                </div>
              </div>
            </div>

            <div id="law" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">13</span>
                  דין וסמכות שיפוט
                </h2>
                <p className="text-sm text-[var(--text-default)]">
                  התנאים יפורשו לפי חוקי מדינת ישראל. כל מחלוקת תתברר בבתי המשפט בתל אביב.
                  השימוש כפוף ל
                  <a href="/privacy" className="text-[var(--primary)] hover:underline font-bold mx-1">מדיניות הפרטיות</a>
                  ול
                  <a href="/accessibility" className="text-[var(--primary)] hover:underline font-bold mx-1">הצהרת הנגישות</a>.
                </p>
              </div>
            </div>

            <div id="contact" className="lg-surface squircle-md p-5">
              <div className="relative z-10">
                <h2 className="text-base font-black text-[var(--text-strong)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-[11px] font-black">14</span>
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
                  שימוש באתר מהווה אישור שקראת, הבנת והסכמת לתנאים אלה במלואם.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
