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
  const [isLightMode, setIsLightMode] = useState(false);
  const navItems = getNavItems();

  useEffect(() => {
    // טעינת מצב light mode מ-localStorage
    const savedLightMode = localStorage.getItem('lightMode');
    if (savedLightMode === 'true') {
      setIsLightMode(true);
      document.documentElement.classList.add('light');
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
      document.documentElement.classList.add('light');
      localStorage.setItem('lightMode', 'true');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('lightMode', 'false');
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
      isLightBackground
        ? 'bg-white/95 border-gray-200'
        : 'glass border-white/10'
    }`}>
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
            <span className={`text-2xl md:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
              isLightBackground
                ? 'from-blue-600 via-cyan-600 to-sky-600 group-hover:from-blue-500 group-hover:via-cyan-500 group-hover:to-sky-500'
                : 'from-blue-400 via-cyan-400 to-sky-400 group-hover:from-blue-300 group-hover:via-cyan-300 group-hover:to-sky-300'
            }`}>
              SiteCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg transition-all duration-300 font-medium relative group ${
                  isLightBackground
                    ? 'text-gray-700 hover:text-gray-900'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Light/Dark Mode Toggle & CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Light/Dark Mode Toggle */}
            <button
              onClick={toggleLightMode}
              className="relative p-2 glass rounded-lg hover:bg-white/20 transition-all group border border-white/10"
              aria-label={isLightMode ? 'עבור למצב לילה' : 'עבור למצב יום'}
              title={isLightMode ? 'עבור למצב לילה' : 'עבור למצב יום'}
            >
              {isLightMode ? (
                // Moon Icon (Switch to Dark Mode)
                <svg className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                // Sun Icon (Switch to Light Mode)
                <svg className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0-10a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm10-10a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zm-16 0a1 1 0 0 1-1 1H4a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zm13.657-5.657a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM7.464 17.536a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm11.314 0a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM7.464 6.464a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414z"/>
                </svg>
              )}
            </button>

            <Button href="/contact" size="sm">
              בואו נדבר
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isLightBackground
                ? 'text-gray-600 hover:text-gray-900'
                : 'text-white/70 hover:text-white'
            }`}
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
          <nav className={`md:hidden py-4 border-t transition-colors ${
            isLightBackground
              ? 'border-gray-200'
              : 'border-white/10'
          }`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3 text-lg transition-colors font-medium ${
                  isLightBackground
                    ? 'text-gray-700 hover:text-gray-900'
                    : 'text-gray-200 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className={`mt-4 pt-4 border-t ${
              isLightBackground
                ? 'border-gray-200'
                : 'border-white/10'
            }`}>
              {/* Light/Dark Mode Toggle - Mobile */}
              <button
                onClick={toggleLightMode}
                className="w-full mb-3 flex items-center justify-between p-4 glass rounded-lg hover:bg-white/20 transition-all border border-white/10"
                aria-label={isLightMode ? 'מצב לילה' : 'מצב יום'}
              >
                <span className="text-white font-medium">
                  {isLightMode ? 'מצב לילה' : 'מצב יום'}
                </span>
                {isLightMode ? (
                  <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0-10a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm10-10a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zm-16 0a1 1 0 0 1-1 1H4a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zm13.657-5.657a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM7.464 17.536a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm11.314 0a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM7.464 6.464a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414z"/>
                  </svg>
                )}
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
