'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // אל תציג את הבאנר בדפי טמפלייטים בודדים (תצוגה מפורטת ותצוגה מקדימה)
    // רק בדף הטמפלייטים הכללי (/templates) כן להציג
    const isTemplateDetailPage = pathname?.match(/^\/templates\/[^\/]+$/);
    const isTemplatePreviewPage = pathname?.includes('/templates/') && pathname?.includes('/preview');

    if (isTemplateDetailPage || isTemplatePreviewPage) {
      return;
    }

    // בדיקה אם המשתמש כבר אישר
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // המתנה של שנייה לפני הצגת הבאנר
      setTimeout(() => setShowBanner(true), 1000);
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

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slideUp">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            {/* אייקון עוגיה */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>

            {/* תוכן */}
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                אנחנו משתמשים בעוגיות 🍪
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                אנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלך, לנתח את התנועה באתר ולהציג תוכן מותאם אישית.
                על ידי לחיצה על "אני מסכים", אתה מאשר את השימוש בעוגיות.{' '}
                <Link href="/privacy" className="underline hover:text-gray-900 transition-colors">
                  מדיניות פרטיות
                </Link>
              </p>
            </div>

            {/* כפתורים */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={acceptCookies}
                className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 hover:shadow-lg transition-all whitespace-nowrap"
              >
                אני מסכים
              </button>
              <button
                onClick={declineCookies}
                className="px-6 py-3 bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-all whitespace-nowrap"
              >
                דחה
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
