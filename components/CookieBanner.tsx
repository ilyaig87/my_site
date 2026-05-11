'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const isTemplateDetailPage = pathname?.match(/^\/templates\/[^\/]+$/);
    const isTemplatePreviewPage = pathname?.includes('/templates/') && pathname?.includes('/preview');

    if (isTemplateDetailPage || isTemplatePreviewPage) {
      return;
    }

    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setTimeout(() => setShowBanner(true), 1200);
    }
  }, [pathname]);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-50"
        >
          <div className="max-w-5xl mx-auto lg-surface lg-deep squircle-xl p-5 sm:p-7">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, var(--primary-bright), var(--primary))',
                  }}
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-[var(--on-accent)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-[var(--text-strong)] mb-1">
                  אנחנו משתמשים בעוגיות
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  עוגיות עוזרות לשפר את החוויה ולנתח את התנועה.{' '}
                  <Link href="/privacy" className="underline hover:text-[var(--primary)] transition-colors">
                    מדיניות פרטיות
                  </Link>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
                <Button onClick={acceptCookies} variant="primary" size="sm">
                  אני מסכים
                </Button>
                <Button onClick={declineCookies} variant="glass" size="sm">
                  דחה
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
