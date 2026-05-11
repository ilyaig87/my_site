'use client';

import { motion } from 'framer-motion';

interface GlassToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function GlassToggle({ isDark, onToggle }: GlassToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="lg-surface lg-shallow relative w-14 h-8 rounded-full overflow-hidden transition-all hover:scale-105"
      aria-label={isDark ? 'עבור למצב יום' : 'עבור למצב לילה'}
      title={isDark ? 'עבור למצב יום' : 'עבור למצב לילה'}
      suppressHydrationWarning
    >
      <span
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)'
            : 'linear-gradient(135deg, #fde047 0%, #fb923c 100%)',
          opacity: 0.6,
        }}
      />

      <motion.span
        className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
        animate={{ x: isDark ? 4 : 28 }}
        transition={{ type: 'spring', damping: 18, stiffness: 280 }}
      >
        {isDark ? (
          <svg className="w-3.5 h-3.5 text-indigo-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </motion.span>
    </button>
  );
}
