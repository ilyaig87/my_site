'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface GlassToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

/**
 * Single-icon theme switch. The icon shows the action you'll take:
 * - Light mode → moon (click to go dark)
 * - Dark mode  → sun  (click to go light)
 * Clicking swaps the mode and the icon.
 */
export default function GlassToggle({ isDark, onToggle }: GlassToggleProps) {
  const label = isDark ? 'עבור למצב בהיר' : 'עבור למצב כהה';
  return (
    <button
      onClick={onToggle}
      className="lg-surface lg-shallow w-9 h-9 rounded-full inline-flex items-center justify-center hover:scale-110 transition-transform"
      aria-label={label}
      title={label}
      suppressHydrationWarning
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 inline-flex"
        >
          {isDark ? (
            <SunIcon className="w-5 h-5 text-amber-500" />
          ) : (
            <MoonIcon className="w-5 h-5 text-[var(--primary)]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
