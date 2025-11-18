import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "../globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "תצוגה מקדימה - SiteCraft",
  description: "תצוגה מקדימה של טמפלייט",
};

export default function PreviewRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
