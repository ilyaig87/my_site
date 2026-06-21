import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/effects/SiteBackdrop";
import DeferredWidgets from "@/components/DeferredWidgets";

// Rubik is the single brand font — it covers both Hebrew and Latin and is the
// primary face for every text style on the site. The previous build also loaded
// Heebo, Inter and Poppins, but those were only ever listed as fallbacks *after*
// Rubik and never actually rendered, so loading them was pure wasted bandwidth.
const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
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
        className={`${rubik.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <SiteBackdrop />
        <Header />
        <main className="site-main min-h-screen">{children}</main>
        <Footer />

        {/* Non-critical floating widgets + analytics, loaded after idle */}
        <DeferredWidgets />
      </body>
    </html>
  );
}
