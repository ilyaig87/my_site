import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/effects/SiteBackdrop";
import DeferredWidgets from "@/components/DeferredWidgets";
import { getSiteContent } from "@/lib/data";

const SITE_URL = "https://www.pixelia.co.il";

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
    description: "Pixelia — סטודיו לעיצוב ופיתוח אתרים מקצועיים לעסקים.",
    siteName: "Pixelia",
    locale: "he_IL",
  },
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
      </body>
    </html>
  );
}
