'use client';

import { useState, useEffect } from 'react';

interface AccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityMenu({ isOpen, onClose }: AccessibilityMenuProps) {
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  useEffect(() => {
    // טעינת הגדרות מ-localStorage
    const savedFontSize = localStorage.getItem('a11y-fontSize');
    const savedContrast = localStorage.getItem('a11y-contrast');
    const savedGrayscale = localStorage.getItem('a11y-grayscale');
    const savedHighlightLinks = localStorage.getItem('a11y-highlightLinks');

    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedContrast) setContrast(savedContrast === 'true');
    if (savedGrayscale) setGrayscale(savedGrayscale === 'true');
    if (savedHighlightLinks) setHighlightLinks(savedHighlightLinks === 'true');
  }, []);

  useEffect(() => {
    // החלת שינויים
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('a11y-fontSize', fontSize.toString());

    if (contrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('a11y-contrast', contrast.toString());

    if (grayscale) {
      document.documentElement.classList.add('grayscale');
    } else {
      document.documentElement.classList.remove('grayscale');
    }
    localStorage.setItem('a11y-grayscale', grayscale.toString());

    if (highlightLinks) {
      document.documentElement.classList.add('highlight-links');
    } else {
      document.documentElement.classList.remove('highlight-links');
    }
    localStorage.setItem('a11y-highlightLinks', highlightLinks.toString());
  }, [fontSize, contrast, grayscale, highlightLinks]);

  const resetSettings = () => {
    setFontSize(100);
    setContrast(false);
    setGrayscale(false);
    setHighlightLinks(false);
    localStorage.removeItem('a11y-fontSize');
    localStorage.removeItem('a11y-contrast');
    localStorage.removeItem('a11y-grayscale');
    localStorage.removeItem('a11y-highlightLinks');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">הנגשה</h2>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="סגור"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        {/* גודל טקסט */}
        <div>
          <label className="block text-white font-medium mb-3">
            גודל טקסט: {fontSize}%
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(Math.max(80, fontSize - 10))}
              className="glass px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="הקטן טקסט"
            >
              A-
            </button>
            <input
              type="range"
              min="80"
              max="150"
              step="10"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="flex-1"
              aria-label="גודל טקסט"
            />
            <button
              onClick={() => setFontSize(Math.min(150, fontSize + 10))}
              className="glass px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="הגדל טקסט"
            >
              A+
            </button>
          </div>
        </div>

        {/* ניגודיות גבוהה */}
        <button
          onClick={() => setContrast(!contrast)}
          className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
            contrast ? 'bg-white/20 border-2 border-white' : 'glass hover:bg-white/10'
          }`}
        >
          <span className="text-white font-medium">ניגודיות גבוהה</span>
          <div className={`w-12 h-6 rounded-full transition-colors ${contrast ? 'bg-green-500' : 'bg-gray-600'}`}>
            <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${contrast ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </div>
        </button>

        {/* גווני אפור */}
        <button
          onClick={() => setGrayscale(!grayscale)}
          className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
            grayscale ? 'bg-white/20 border-2 border-white' : 'glass hover:bg-white/10'
          }`}
        >
          <span className="text-white font-medium">גווני אפור</span>
          <div className={`w-12 h-6 rounded-full transition-colors ${grayscale ? 'bg-green-500' : 'bg-gray-600'}`}>
            <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${grayscale ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </div>
        </button>

        {/* הדגשת קישורים */}
        <button
          onClick={() => setHighlightLinks(!highlightLinks)}
          className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
            highlightLinks ? 'bg-white/20 border-2 border-white' : 'glass hover:bg-white/10'
          }`}
        >
          <span className="text-white font-medium">הדגשת קישורים</span>
          <div className={`w-12 h-6 rounded-full transition-colors ${highlightLinks ? 'bg-green-500' : 'bg-gray-600'}`}>
            <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${highlightLinks ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </div>
        </button>

        {/* איפוס */}
        <button
          onClick={resetSettings}
          className="w-full glass hover:bg-white/10 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          איפוס הגדרות
        </button>

        {/* הצהרת נגישות */}
        <a
          href="/accessibility"
          className="block w-full text-center glass hover:bg-white/10 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          הצהרת נגישות
        </a>
      </div>

      {/* CSS עבור מצבי נגישות */}
      <style jsx global>{`
        .high-contrast {
          filter: contrast(1.5);
        }

        .grayscale {
          filter: grayscale(100%);
        }

        .highlight-links a {
          text-decoration: underline !important;
          text-decoration-thickness: 2px !important;
          text-underline-offset: 4px !important;
        }
      `}</style>
    </>
  );
}
