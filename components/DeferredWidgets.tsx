'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// None of these widgets are needed for the initial paint — they're floating
// buttons, banners and trackers. Loading them with ssr:false + after the
// browser goes idle keeps their JavaScript off the critical path, which is
// what the "reduce unused JavaScript" audit was flagging.
const FloatingAccessibility = dynamic(
  () => import('@/components/accessibility/FloatingAccessibility'),
  { ssr: false }
);
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/chatbot/Chatbot'), { ssr: false });
const FloatingWhatsApp = dynamic(() => import('@/components/FloatingWhatsApp'), { ssr: false });
const VisitorCounter = dynamic(() => import('@/components/VisitorCounter'), { ssr: false });
const AnalyticsTracker = dynamic(() => import('@/components/AnalyticsTracker'), { ssr: false });

export default function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reveal = () => setReady(true);
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(reveal, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(reveal, 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;

  return (
    <>
      <FloatingAccessibility />
      <CookieBanner />
      <Chatbot />
      <FloatingWhatsApp />
      <VisitorCounter />
      <AnalyticsTracker />
    </>
  );
}
