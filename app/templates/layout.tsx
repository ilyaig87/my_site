import type { Metadata } from "next";

// The templates listing page is a client component, so its SEO metadata lives
// here in a server layout. Targets the commercial "עיצוב/בניית אתרים" queries.
export const metadata: Metadata = {
  title: "תבניות אתרים מוכנות — עיצוב ובניית אתרים | Pixelia",
  description:
    "גלריית תבניות אתרים מוכנות לעיצוב ובניית אתרים מקצועיים לעסקים. בחרו תבנית והתאימו אותה למותג שלכם.",
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
