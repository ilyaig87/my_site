'use client';

import { useState } from 'react';
import AccessibilityMenu from './AccessibilityMenu';

export default function FloatingAccessibility() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Background overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/5 z-[90]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Accessibility Container */}
      <div className="fixed left-6 top-24 z-[100]">
        <div className="relative">
          {/* Accessibility Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group"
            aria-label="תפריט נגישות"
            title="נגישות"
          >
            <div className="w-16 h-16 rounded-full shadow-xl ring-4 ring-yellow-200 group-hover:ring-yellow-300 transition-all duration-300 group-hover:scale-110 bg-yellow-400 flex items-center justify-center">
              {/* Icon */}
              <svg
                className="w-8 h-8 text-gray-900 drop-shadow-sm"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
              </svg>
            </div>

            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              נגישות
              <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-1">
                <div className="border-8 border-transparent border-l-gray-900"></div>
              </div>
            </div>
          </button>

          {/* Accessibility Menu - positioned relative to button */}
          {isOpen && (
            <div className="absolute left-[72px] top-0 w-80 max-h-[70vh] overflow-y-auto bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-2xl">
              <AccessibilityMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
