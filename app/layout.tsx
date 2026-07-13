import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/effects/SiteBackdrop";
import DeferredWidgets from "@/components/DeferredWidgets";
import { getSiteContent } from "@/lib/data";

const SITE_URL = "https://www.pixelia.co.il";

// Google Analytics 4. The Measurement ID is public (it ships in the page HTML),
// so it lives here as the default; NEXT_PUBLIC_GA_ID can override it.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-NXQHQHCEVS";

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
  // Canonical host is the www subdomain. Setting metadataBase here makes every
  // canonical/OG/sitemap URL resolve to https://www.pixelia.co.il directly, so
  // crawlers and shared links skip the apex→www 301 redirect (the ~70ms
  // redirect overhead the audit flagged).
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  // Google Search Console domain verification.
  verification: {
    google: "Yt6gCzeUfM-XfZityDS8_hoW3jGp3oBDsvdNFxPN1WA",
  },
  title: {
    default: "Pixelia — בניית אתרים מקצועיים לעסקים",
    template: "%s | Pixelia",
  },
  description:
    "Pixelia — סטודיו לעיצוב ופיתוח אתרים מקצועיים לעסקים. בחרו תבנית מוכנה או עיצוב מותאם אישית.",
  keywords: [
    "Pixelia",
    "בניית אתרים",
    "עיצוב אתרים",
    "פיתוח אתרים",
    "תבניות אתרים",
    "אתרים לעסקים",
    "בניית אתרים תל אביב",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Pixelia — בניית אתרים מקצועיים לעסקים",
    description:
      "אתרי תדמית, דפי נחיתה, צ'אטבוטים ואוטומציית AI לעסקים. עיצוב מודרני, ליווי אישי ומחירים הוגנים — שירות בעברית וברוסית.",
    siteName: "Pixelia",
    locale: "he_IL",
    images: [
      {
        url: "/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pixelia — בונים לעסק שלכם אתר שמביא לקוחות",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixelia — בניית אתרים מקצועיים לעסקים",
    description:
      "אתרי תדמית, דפי נחיתה, צ'אטבוטים ואוטומציית AI לעסקים — שירות בעברית וברוסית.",
    images: ["/images/og/og-image.png"],
  },
};

const themeInitScript = `
(function(){
  try {
    // Default is LIGHT. Only go dark if the visitor explicitly chose it.
    var isDark = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark', isDark);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { contact } = getSiteContent();

  // Organization + WebSite structured data so Google can recognize the brand,
  // logo and contact details.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Pixelia",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo/pixelia_logo_color.png`,
        image: `${SITE_URL}/images/logo/pixelia_logo_color.png`,
        description: "סטודיו לעיצוב ופיתוח אתרים מקצועיים לעסקים.",
        email: contact.email,
        telephone: `+${contact.whatsapp}`,
        areaServed: "IL",
        address: {
          "@type": "PostalAddress",
          addressLocality: "תל אביב",
          addressCountry: "IL",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${contact.whatsapp}`,
          email: contact.email,
          contactType: "customer service",
          availableLanguage: ["he", "en"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Pixelia",
        inLanguage: "he-IL",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

        {/* Google Analytics 4 — only when NEXT_PUBLIC_GA_ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
