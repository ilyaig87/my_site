'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

interface AccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface A11ySettings {
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  contrast: 'none' | 'high' | 'negative' | 'dark';
  grayscale: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  readableFont: boolean;
  bigCursor: boolean;
  readingGuide: boolean;
  pauseAnimations: boolean;
}

const DEFAULTS: A11ySettings = {
  fontSize: 100,
  letterSpacing: 0,
  lineHeight: 0,
  contrast: 'none',
  grayscale: false,
  highlightLinks: false,
  highlightHeadings: false,
  readableFont: false,
  bigCursor: false,
  readingGuide: false,
  pauseAnimations: false,
};

const STORAGE_KEY = 'a11y-settings-v2';

type TabId = 'display' | 'color' | 'reading' | 'nav';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'display', label: 'תצוגה', icon: 'M4 6h16M4 12h10M4 18h16' },
  { id: 'color', label: 'צבעים', icon: 'M7 21a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a4 4 0 0 1-4 4Zm0 0h12a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 0 1 2.828 0l2.829 2.829a2 2 0 0 1 0 2.828l-8.486 8.485M7 17h.01' },
  { id: 'reading', label: 'קריאה', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id: 'nav', label: 'ניווט', icon: 'M14.828 14.828a4 4 0 0 1-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
];

export default function AccessibilityMenu({ onClose }: AccessibilityMenuProps) {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const [mouseY, setMouseY] = useState(0);
  const [tab, setTab] = useState<TabId>('display');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<A11ySettings>;
        setSettings({ ...DEFAULTS, ...parsed });
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.style.fontSize = `${settings.fontSize}%`;
    root.style.setProperty('--a11y-letter-spacing', `${settings.letterSpacing}px`);
    root.style.setProperty('--a11y-line-height-add', `${settings.lineHeight}`);

    root.classList.toggle('a11y-letter-spacing', settings.letterSpacing > 0);
    root.classList.toggle('a11y-line-height', settings.lineHeight > 0);

    root.classList.remove('a11y-contrast-high', 'a11y-contrast-negative', 'a11y-contrast-dark');
    if (settings.contrast !== 'none') {
      root.classList.add(`a11y-contrast-${settings.contrast}`);
    }

    root.classList.toggle('a11y-grayscale', settings.grayscale);
    root.classList.toggle('a11y-highlight-links', settings.highlightLinks);
    root.classList.toggle('a11y-highlight-headings', settings.highlightHeadings);
    root.classList.toggle('a11y-readable-font', settings.readableFont);
    root.classList.toggle('a11y-big-cursor', settings.bigCursor);
    root.classList.toggle('a11y-pause-animations', settings.pauseAnimations);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  useEffect(() => {
    if (!settings.readingGuide) return;
    const handleMouseMove = (e: MouseEvent) => setMouseY(e.clientY);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingGuide]);

  const update = useCallback(<K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = () => {
    setSettings(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const activeCount = useMemo(() => {
    let count = 0;
    if (settings.fontSize !== 100) count++;
    if (settings.letterSpacing !== 0) count++;
    if (settings.lineHeight !== 0) count++;
    if (settings.contrast !== 'none') count++;
    if (settings.grayscale) count++;
    if (settings.highlightLinks) count++;
    if (settings.highlightHeadings) count++;
    if (settings.readableFont) count++;
    if (settings.bigCursor) count++;
    if (settings.readingGuide) count++;
    if (settings.pauseAnimations) count++;
    return count;
  }, [settings]);

  const ToggleRow = ({
    label,
    on,
    onClick,
  }: {
    label: string;
    on: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-all border ${
        on
          ? 'bg-[var(--primary)]/15 border-[var(--primary)]/50 text-[var(--text-strong)] shadow-sm'
          : 'bg-white/30 dark:bg-white/[0.03] border-white/30 dark:border-white/10 text-[var(--text-default)] hover:bg-white/50 dark:hover:bg-white/[0.06]'
      }`}
      aria-pressed={on}
    >
      <span className="font-medium">{label}</span>
      <span
        className={`relative inline-block w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
          on ? 'bg-[var(--primary)]' : 'bg-gray-300 dark:bg-white/15'
        }`}
        aria-hidden
      >
        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            on ? 'translate-x-[18px]' : 'translate-x-0.5'
          }`}
        />
      </span>
    </button>
  );

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/20 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-black text-[var(--text-strong)] leading-tight">תפריט נגישות</h2>
            <p className="text-[11px] text-[var(--text-muted)] leading-tight mt-0.5">
              {activeCount > 0 ? `${activeCount} התאמות פעילות` : 'התאמות אישיות'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-white/30 dark:hover:bg-white/10 p-1.5 rounded-lg transition-colors"
          aria-label="סגור תפריט נגישות"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="קטגוריות נגישות"
        className="grid grid-cols-4 gap-1 p-1 mb-3 bg-white/30 dark:bg-white/[0.04] border border-white/30 dark:border-white/10 rounded-xl"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg text-[11px] font-bold transition-all ${
              tab === t.id
                ? 'bg-[var(--primary)] text-[var(--on-accent)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-white/40 dark:hover:bg-white/[0.06]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
            </svg>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content - fixed height so no jumping */}
      <div className="min-h-[256px]">
        {tab === 'display' && (
          <div className="space-y-2.5">
            <div className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[var(--text-strong)]">גודל טקסט</span>
                <span className="text-xs font-bold text-[var(--primary)] tabular-nums">{settings.fontSize}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => update('fontSize', Math.max(80, settings.fontSize - 10))}
                  className="w-8 h-8 rounded-lg bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/15 text-[var(--text-strong)] hover:bg-white/80 dark:hover:bg-white/15 font-bold text-sm flex-shrink-0"
                  aria-label="הקטן טקסט"
                >
                  A−
                </button>
                <input
                  type="range"
                  min="80"
                  max="200"
                  step="10"
                  value={settings.fontSize}
                  onChange={(e) => update('fontSize', parseInt(e.target.value))}
                  className="flex-1 accent-[var(--primary)]"
                  aria-label="גודל טקסט"
                />
                <button
                  onClick={() => update('fontSize', Math.min(200, settings.fontSize + 10))}
                  className="w-8 h-8 rounded-lg bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/15 text-[var(--text-strong)] hover:bg-white/80 dark:hover:bg-white/15 font-bold text-sm flex-shrink-0"
                  aria-label="הגדל טקסט"
                >
                  A+
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[var(--text-strong)]">מרווח אותיות</span>
                  <span className="text-[11px] font-bold text-[var(--primary)] tabular-nums">+{settings.letterSpacing}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={settings.letterSpacing}
                  onChange={(e) => update('letterSpacing', parseInt(e.target.value))}
                  className="w-full accent-[var(--primary)]"
                  aria-label="מרווח בין אותיות"
                />
              </div>

              <div className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[var(--text-strong)]">מרווח שורות</span>
                  <span className="text-[11px] font-bold text-[var(--primary)] tabular-nums">+{settings.lineHeight}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={settings.lineHeight}
                  onChange={(e) => update('lineHeight', parseInt(e.target.value))}
                  className="w-full accent-[var(--primary)]"
                  aria-label="מרווח בין שורות"
                />
              </div>
            </div>
          </div>
        )}

        {tab === 'color' && (
          <div className="space-y-2.5">
            <div>
              <p className="text-[11px] font-bold text-[var(--text-muted)] mb-2 px-1">ניגודיות</p>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: 'none', label: 'רגיל' },
                    { id: 'high', label: 'גבוהה' },
                    { id: 'negative', label: 'הפוכה' },
                    { id: 'dark', label: 'כהה' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => update('contrast', opt.id)}
                    className={`text-sm py-2.5 px-2 rounded-xl border transition-all font-bold ${
                      settings.contrast === opt.id
                        ? 'bg-[var(--primary)]/15 border-[var(--primary)]/50 text-[var(--text-strong)] shadow-sm'
                        : 'bg-white/30 dark:bg-white/[0.03] border-white/30 dark:border-white/10 text-[var(--text-default)] hover:bg-white/50 dark:hover:bg-white/[0.06]'
                    }`}
                    aria-pressed={settings.contrast === opt.id}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <ToggleRow
              label="גווני אפור (עיוורון צבעים)"
              on={settings.grayscale}
              onClick={() => update('grayscale', !settings.grayscale)}
            />
          </div>
        )}

        {tab === 'reading' && (
          <div className="space-y-2">
            <ToggleRow
              label="פונט קריא (לדיסלקטים)"
              on={settings.readableFont}
              onClick={() => update('readableFont', !settings.readableFont)}
            />
            <ToggleRow
              label="הדגשת קישורים"
              on={settings.highlightLinks}
              onClick={() => update('highlightLinks', !settings.highlightLinks)}
            />
            <ToggleRow
              label="הדגשת כותרות"
              on={settings.highlightHeadings}
              onClick={() => update('highlightHeadings', !settings.highlightHeadings)}
            />
            <ToggleRow
              label="קו מנחה לקריאה"
              on={settings.readingGuide}
              onClick={() => update('readingGuide', !settings.readingGuide)}
            />
          </div>
        )}

        {tab === 'nav' && (
          <div className="space-y-2">
            <ToggleRow
              label="סמן עכבר מוגדל"
              on={settings.bigCursor}
              onClick={() => update('bigCursor', !settings.bigCursor)}
            />
            <ToggleRow
              label="השהיית אנימציות"
              on={settings.pauseAnimations}
              onClick={() => update('pauseAnimations', !settings.pauseAnimations)}
            />
            <div className="bg-white/30 dark:bg-white/[0.03] border border-white/30 dark:border-white/10 rounded-xl p-3 text-[11px] text-[var(--text-muted)] leading-relaxed">
              <strong className="text-[var(--text-strong)]">טיפ:</strong> ניווט מלא במקלדת זמין תמיד — Tab למעבר, Enter להפעלה, חצים לבחירה.
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="mt-3 pt-3 border-t border-white/20 dark:border-white/10 grid grid-cols-2 gap-2">
        <button
          onClick={reset}
          disabled={activeCount === 0}
          className="col-span-2 flex items-center justify-center gap-1.5 bg-white/30 dark:bg-white/[0.04] hover:bg-white/50 dark:hover:bg-white/[0.08] disabled:opacity-50 disabled:cursor-not-allowed border border-white/30 dark:border-white/10 text-[var(--text-strong)] font-bold py-2 px-3 rounded-xl transition-colors text-xs"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" />
          </svg>
          איפוס הגדרות
        </button>

        <a
          href="/accessibility"
          className="flex items-center justify-center gap-1 bg-[var(--primary)] hover:bg-[var(--primary-bright)] text-[var(--on-accent)] font-black py-2 px-2 rounded-xl transition-colors text-[11px] text-center"
        >
          הצהרה מלאה
        </a>

        <a
          href="mailto:ilyaig8@gmail.com?subject=פנייה%20בנושא%20נגישות"
          className="flex items-center justify-center gap-1 bg-white/30 dark:bg-white/[0.04] hover:bg-white/50 dark:hover:bg-white/[0.08] border border-white/30 dark:border-white/10 text-[var(--text-default)] font-bold py-2 px-2 rounded-xl transition-colors text-[11px] text-center"
        >
          דיווח על בעיה
        </a>
      </div>

      {/* Reading guide overlay */}
      {settings.readingGuide && (
        <div
          className="fixed left-0 right-0 pointer-events-none z-[200]"
          style={{
            top: `${mouseY - 18}px`,
            height: '36px',
            background: 'rgba(250, 204, 21, 0.18)',
            borderTop: '2px solid rgba(250, 204, 21, 0.7)',
            borderBottom: '2px solid rgba(250, 204, 21, 0.7)',
          }}
          aria-hidden
        />
      )}

    </>
  );
}
