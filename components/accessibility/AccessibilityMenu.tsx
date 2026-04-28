'use client';

import { useState, useEffect, useCallback } from 'react';

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

export default function AccessibilityMenu({ onClose }: AccessibilityMenuProps) {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const [mouseY, setMouseY] = useState(0);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<A11ySettings>;
        setSettings({ ...DEFAULTS, ...parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  // Apply settings to document and persist
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
      // ignore
    }
  }, [settings]);

  // Reading guide - track mouse Y position
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
      // ignore
    }
  };

  const toggleClass = (cls: string, on: boolean) =>
    `w-full flex items-center justify-between gap-2 p-2.5 rounded-lg text-sm transition-all border ${
      on
        ? 'bg-yellow-50 border-yellow-400 shadow-sm'
        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    } ${cls}`;

  const Toggle = ({ on }: { on: boolean }) => (
    <span
      className={`relative inline-block w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
        on ? 'bg-yellow-500' : 'bg-gray-300'
      }`}
      aria-hidden
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          on ? 'translate-x-[22px]' : 'translate-x-0.5'
        }`}
      />
    </span>
  );

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-black text-gray-900">תפריט נגישות</h2>
          <p className="text-xs text-gray-500 mt-0.5">התאמות אישיות לחווית גלישה נוחה</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
          aria-label="סגור תפריט נגישות"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-5">
        {/* גודל טקסט */}
        <section>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">תצוגה</h3>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-2">
            <label className="flex items-center justify-between text-sm font-semibold text-gray-900 mb-2">
              <span>גודל טקסט</span>
              <span className="text-yellow-700 font-bold">{settings.fontSize}%</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => update('fontSize', Math.max(80, settings.fontSize - 10))}
                className="bg-white border border-gray-300 px-3 py-1.5 rounded-md text-gray-900 hover:bg-gray-50 font-bold text-sm"
                aria-label="הקטן טקסט"
              >
                A-
              </button>
              <input
                type="range"
                min="80"
                max="200"
                step="10"
                value={settings.fontSize}
                onChange={(e) => update('fontSize', parseInt(e.target.value))}
                className="flex-1 accent-yellow-500"
                aria-label="גודל טקסט"
              />
              <button
                onClick={() => update('fontSize', Math.min(200, settings.fontSize + 10))}
                className="bg-white border border-gray-300 px-3 py-1.5 rounded-md text-gray-900 hover:bg-gray-50 font-bold text-sm"
                aria-label="הגדל טקסט"
              >
                A+
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-2">
            <label className="flex items-center justify-between text-sm font-semibold text-gray-900 mb-2">
              <span>מרווח בין אותיות</span>
              <span className="text-yellow-700 font-bold">+{settings.letterSpacing}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={settings.letterSpacing}
              onChange={(e) => update('letterSpacing', parseInt(e.target.value))}
              className="w-full accent-yellow-500"
              aria-label="מרווח בין אותיות"
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <label className="flex items-center justify-between text-sm font-semibold text-gray-900 mb-2">
              <span>מרווח בין שורות</span>
              <span className="text-yellow-700 font-bold">+{settings.lineHeight}</span>
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="1"
              value={settings.lineHeight}
              onChange={(e) => update('lineHeight', parseInt(e.target.value))}
              className="w-full accent-yellow-500"
              aria-label="מרווח בין שורות"
            />
          </div>
        </section>

        {/* ניגודיות */}
        <section>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">ניגודיות וצבע</h3>
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
                className={`text-sm py-2 px-2 rounded-lg border transition-all ${
                  settings.contrast === opt.id
                    ? 'bg-yellow-50 border-yellow-400 font-bold text-gray-900 shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
                aria-pressed={settings.contrast === opt.id}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => update('grayscale', !settings.grayscale)}
            className={toggleClass('mt-2', settings.grayscale)}
            aria-pressed={settings.grayscale}
          >
            <span className="font-medium text-gray-900">גווני אפור</span>
            <Toggle on={settings.grayscale} />
          </button>
        </section>

        {/* קריאה */}
        <section>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">קריאה</h3>
          <div className="space-y-2">
            <button
              onClick={() => update('readableFont', !settings.readableFont)}
              className={toggleClass('', settings.readableFont)}
              aria-pressed={settings.readableFont}
            >
              <span className="font-medium text-gray-900">פונט קריא (לדיסלקטים)</span>
              <Toggle on={settings.readableFont} />
            </button>

            <button
              onClick={() => update('highlightLinks', !settings.highlightLinks)}
              className={toggleClass('', settings.highlightLinks)}
              aria-pressed={settings.highlightLinks}
            >
              <span className="font-medium text-gray-900">הדגשת קישורים</span>
              <Toggle on={settings.highlightLinks} />
            </button>

            <button
              onClick={() => update('highlightHeadings', !settings.highlightHeadings)}
              className={toggleClass('', settings.highlightHeadings)}
              aria-pressed={settings.highlightHeadings}
            >
              <span className="font-medium text-gray-900">הדגשת כותרות</span>
              <Toggle on={settings.highlightHeadings} />
            </button>

            <button
              onClick={() => update('readingGuide', !settings.readingGuide)}
              className={toggleClass('', settings.readingGuide)}
              aria-pressed={settings.readingGuide}
            >
              <span className="font-medium text-gray-900">קו מנחה לקריאה</span>
              <Toggle on={settings.readingGuide} />
            </button>
          </div>
        </section>

        {/* ניווט */}
        <section>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">ניווט ואינטראקציה</h3>
          <div className="space-y-2">
            <button
              onClick={() => update('bigCursor', !settings.bigCursor)}
              className={toggleClass('', settings.bigCursor)}
              aria-pressed={settings.bigCursor}
            >
              <span className="font-medium text-gray-900">סמן עכבר מוגדל</span>
              <Toggle on={settings.bigCursor} />
            </button>

            <button
              onClick={() => update('pauseAnimations', !settings.pauseAnimations)}
              className={toggleClass('', settings.pauseAnimations)}
              aria-pressed={settings.pauseAnimations}
            >
              <span className="font-medium text-gray-900">השהיית אנימציות</span>
              <Toggle on={settings.pauseAnimations} />
            </button>
          </div>
        </section>

        {/* כפתורים */}
        <div className="pt-3 border-t border-gray-200 space-y-2">
          <button
            onClick={reset}
            className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-900 font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
          >
            איפוס הגדרות
          </button>

          <a
            href="/accessibility"
            className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 px-4 rounded-lg transition-colors text-sm"
          >
            הצהרת נגישות מלאה
          </a>

          <a
            href="mailto:ilyaig8@gmail.com?subject=פנייה%20בנושא%20נגישות"
            className="block w-full text-center bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-xs"
          >
            דיווח על בעיית נגישות ←
          </a>
        </div>
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

      {/* Global accessibility styles */}
      <style jsx global>{`
        .a11y-contrast-high {
          filter: contrast(1.4) saturate(1.2);
        }
        .a11y-contrast-negative {
          filter: invert(1) hue-rotate(180deg);
        }
        .a11y-contrast-negative img,
        .a11y-contrast-negative video,
        .a11y-contrast-negative svg {
          filter: invert(1) hue-rotate(180deg);
        }
        .a11y-contrast-dark {
          filter: invert(0.92) hue-rotate(180deg);
          background: #111;
        }
        .a11y-contrast-dark img,
        .a11y-contrast-dark video,
        .a11y-contrast-dark svg {
          filter: invert(1) hue-rotate(180deg);
        }
        .a11y-grayscale {
          filter: grayscale(100%);
        }
        .a11y-grayscale.a11y-contrast-high {
          filter: grayscale(100%) contrast(1.4);
        }

        .a11y-highlight-links a {
          text-decoration: underline !important;
          text-decoration-thickness: 2px !important;
          text-underline-offset: 4px !important;
          outline: 1px dashed currentColor;
          outline-offset: 2px;
        }

        .a11y-highlight-headings h1,
        .a11y-highlight-headings h2,
        .a11y-highlight-headings h3,
        .a11y-highlight-headings h4,
        .a11y-highlight-headings h5,
        .a11y-highlight-headings h6 {
          outline: 2px dashed #eab308;
          outline-offset: 4px;
          background: rgba(254, 240, 138, 0.25);
        }

        .a11y-readable-font,
        .a11y-readable-font * {
          font-family: 'Arial', 'Tahoma', 'Verdana', sans-serif !important;
          font-weight: 500 !important;
        }

        .a11y-letter-spacing,
        .a11y-letter-spacing * {
          letter-spacing: var(--a11y-letter-spacing, 0) !important;
        }

        .a11y-line-height p,
        .a11y-line-height li,
        .a11y-line-height span,
        .a11y-line-height div {
          line-height: calc(1.5 + var(--a11y-line-height-add, 0) * 0.25) !important;
        }

        .a11y-big-cursor,
        .a11y-big-cursor * {
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><path d='M4 4 L4 32 L12 24 L18 36 L24 33 L18 21 L30 21 Z' fill='black' stroke='white' stroke-width='2'/></svg>") 4 4, auto !important;
        }
        .a11y-big-cursor a,
        .a11y-big-cursor button,
        .a11y-big-cursor [role="button"] {
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><path d='M14 4 C14 4 14 22 14 22 L8 22 L20 36 L32 22 L26 22 C26 22 26 4 26 4 Z' fill='black' stroke='white' stroke-width='2'/></svg>") 20 20, pointer !important;
        }

        .a11y-pause-animations *,
        .a11y-pause-animations *::before,
        .a11y-pause-animations *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
          scroll-behavior: auto !important;
        }
      `}</style>
    </>
  );
}
