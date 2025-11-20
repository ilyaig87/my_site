import type { Metadata } from "next";
import { Heebo, Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAccessibility from "@/components/accessibility/FloatingAccessibility";
import CookieBanner from "@/components/CookieBanner";
import Chatbot from "@/components/chatbot/Chatbot";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heebo",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixelia - צור את האתר המושלם לעסק שלך",
  description: "בחר מתוך תבניות עיצוב מוכנות או צור עיצוב מותאם אישית לעסק שלך. Pixelia - יוצרים אתרים מקצועיים לעסקים קטנים ובינוניים תוך ימים ספורים.",
  keywords: "Pixelia, פיתוח אתרים, בניית אתרים, עיצוב אתרים, תבניות אתרים, אתרים לעסקים, דף נחיתה, עיצוב מותאם אישית",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={`${heebo.variable} ${inter.variable} ${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
        <div className="relative z-10">
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </div>

        {/* Floating Components */}
        <FloatingAccessibility />
        <CookieBanner />
        <Chatbot />
      </body>
    </html>
  );
}
