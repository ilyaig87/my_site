'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getNavItems } from '@/lib/data';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const navItems = getNavItems();

  useEffect(() => {
    // טעינת מצב dark mode מ-localStorage (ברירת מחדל: light mode)
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setIsLightMode(false);
      document.documentElement.classList.add('dark');
    } else {
      // ברירת מחדל - light mode
      setIsLightMode(true);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // בדיקה אם עברנו את ה-hero section (בדרך כלל בגובה של 400-600px)
      // אם כן, אנחנו כנראה על רקע בהיר
      const scrollPosition = window.scrollY;
      setIsLightBackground(scrollPosition > 400);
    };

    // הרצה ראשונית
    handleScroll();

    // הוספת event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ניקוי
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
    if (!isLightMode) {
      // עובר למצב יום
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    } else {
      // עובר למצב לילה
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
      <Container>
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group transition-all duration-300">
            <div className="relative w-10 h-10 md:w-12 md:h-12 transform group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo.svg"
                alt="SiteCraft Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl md:text-3xl font-bold text-gray-900 transition-all duration-300 group-hover:text-yellow-600">
              SiteCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg transition-all duration-300 font-medium relative group text-gray-700 hover:text-gray-900"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Light/Dark Mode Toggle & CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Light/Dark Mode Toggle - Enhanced Design */}
            <button
              onClick={toggleLightMode}
              className="relative w-14 h-7 bg-gray-200 rounded-full transition-all duration-300 group hover:shadow-lg"
              aria-label={isLightMode ? 'עבור למצב לילה' : 'עבור למצב יום'}
              title={isLightMode ? 'עבור למצב לילה' : 'עבור למצב יום'}
            >
              {/* Toggle Track */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isLightMode
                  ? 'bg-gradient-to-r from-blue-400 to-blue-500'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-700'
              }`}></div>

              {/* Toggle Circle */}
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
                isLightMode ? 'right-0.5' : 'right-7'
              }`}>
                {isLightMode ? (
                  // Sun Icon
                  <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  // Moon Icon
                  <svg className="w-3.5 h-3.5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </div>

              {/* Stars decoration (only in dark mode) */}
              {!isLightMode && (
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute top-3 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-4 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              )}
            </button>

            <Button href="/contact" size="sm">
              בואו נדבר
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 transition-colors text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-lg transition-colors font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {/* Light/Dark Mode Toggle - Mobile Enhanced */}
              <button
                onClick={toggleLightMode}
                className="w-full mb-3 flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-lg transition-all border-2 border-gray-200 group"
                aria-label={isLightMode ? 'מצב לילה' : 'מצב יום'}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isLightMode
                      ? 'bg-gradient-to-br from-blue-400 to-blue-500'
                      : 'bg-gradient-to-br from-indigo-600 to-purple-700'
                  }`}>
                    {isLightMode ? (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-900 font-bold text-lg">
                    {isLightMode ? 'עבור למצב לילה' : 'עבור למצב יום'}
                  </span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <Button href="/contact" className="w-full">
                בואו נדבר
              </Button>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
