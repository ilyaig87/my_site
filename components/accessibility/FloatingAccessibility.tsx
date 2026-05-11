'use client';

import { useState, useEffect } from 'react';
import AccessibilityMenu from './AccessibilityMenu';

const STORAGE_KEY = 'a11y-settings-v2';

/** Apply saved accessibility settings to <html> as soon as the page loads,
 *  even before the user opens the menu — so choices persist across reloads. */
function applySavedA11ySettings() {
  if (typeof window === 'undefined') return;
  let s: Record<string, unknown> | null = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) s = JSON.parse(raw);
  } catch {
    return;
  }
  if (!s) return;

  const root = document.documentElement;
  const num = (k: string, fallback = 0) =>
    typeof s![k] === 'number' ? (s![k] as number) : fallback;
  const bool = (k: string) => s![k] === true;

  const fontSize = num('fontSize', 100);
  if (fontSize !== 100) root.style.fontSize = `${fontSize}%`;

  const letterSpacing = num('letterSpacing', 0);
  root.style.setProperty('--a11y-letter-spacing', `${letterSpacing}px`);
  root.classList.toggle('a11y-letter-spacing', letterSpacing > 0);

  const lineHeight = num('lineHeight', 0);
  root.style.setProperty('--a11y-line-height-add', `${lineHeight}`);
  root.classList.toggle('a11y-line-height', lineHeight > 0);

  root.classList.remove('a11y-contrast-high', 'a11y-contrast-negative', 'a11y-contrast-dark');
  const contrast = typeof s.contrast === 'string' ? s.contrast : 'none';
  if (contrast !== 'none') root.classList.add(`a11y-contrast-${contrast}`);

  root.classList.toggle('a11y-grayscale', bool('grayscale'));
  root.classList.toggle('a11y-highlight-links', bool('highlightLinks'));
  root.classList.toggle('a11y-highlight-headings', bool('highlightHeadings'));
  root.classList.toggle('a11y-readable-font', bool('readableFont'));
  root.classList.toggle('a11y-big-cursor', bool('bigCursor'));
  root.classList.toggle('a11y-pause-animations', bool('pauseAnimations'));
}

export default function FloatingAccessibility() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    applySavedA11ySettings();
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[90]"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}

      <div className="fixed left-6 top-28 sm:top-32 z-[100]">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group lg-surface lg-glow-primary w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
            aria-label="תפריט נגישות"
            title="נגישות"
            suppressHydrationWarning
            style={{
              background: 'radial-gradient(circle at 30% 30%, var(--primary-bright), var(--primary))',
            }}
          >
            <svg
              className="relative z-10 w-3.5 h-3.5 sm:w-5 sm:h-5 text-[var(--on-accent)] drop-shadow"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
            </svg>

            <div className="hidden md:flex absolute left-full ml-3 top-1/2 -translate-y-1/2 lg-surface lg-shallow squircle-sm px-3 py-1.5 text-xs font-bold text-[var(--text-strong)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="relative z-10">נגישות</span>
            </div>
          </button>

          {isOpen && (
            <div
              role="dialog"
              aria-label="תפריט נגישות"
              className="absolute left-[40px] sm:left-[52px] top-0 w-[360px] max-w-[calc(100vw-32px)] lg-surface lg-deep squircle-lg p-4"
            >
              <div className="relative z-10">
                <AccessibilityMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
