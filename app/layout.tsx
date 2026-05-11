import type { Metadata } from "next";
import { Heebo, Inter, Poppins, Rubik } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/effects/SiteBackdrop";
import FloatingAccessibility from "@/components/accessibility/FloatingAccessibility";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CookieBanner from "@/components/CookieBanner";
import Chatbot from "@/components/chatbot/Chatbot";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import VisitorCounter from "@/components/VisitorCounter";

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heebo",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixelia - יוצרים אתרים מקצועיים",
  description:
    "סטודיו לעיצוב ופיתוח אתרים מקצועיים לעסקים. בחרו תבנית מוכנה או עיצוב מותאם אישית — Pixelia.",
  keywords:
    "Pixelia, פיתוח אתרים, בניית אתרים, עיצוב אתרים, תבניות אתרים, אתרים לעסקים",
};

const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('darkMode');
    var isDark = stored === null ? true : stored === 'true';
    if (isDark) document.documentElement.classList.add('dark');
    if (stored === null) localStorage.setItem('darkMode', 'true');
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${rubik.variable} ${heebo.variable} ${inter.variable} ${poppins.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <SiteBackdrop />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />

        {/* Floating Components */}
        <FloatingAccessibility />
        <CookieBanner />
        <Chatbot />
        <FloatingWhatsApp />
        <VisitorCounter />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
      </body>
    </html>
  );
}
