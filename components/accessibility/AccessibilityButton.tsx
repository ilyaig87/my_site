'use client';

import { useState } from 'react';
import AccessibilityMenu from './AccessibilityMenu';

export default function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 glass rounded-lg hover:bg-white/20 transition-all group border border-white/10"
        aria-label="תפריט נגישות"
        title="נגישות"
      >
        {/* Universal Accessibility Icon */}
        <svg
          className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM21 9h-6V7h-2v2H7V7H5v2H3v2h2v4H3v2h2v2h2v-2h6v2h2v-2h6v-2h-2v-4h2V9zM7 15v-4h10v4H7z"/>
        </svg>
      </button>

      <AccessibilityMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
