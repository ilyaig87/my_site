import { Template, SiteContent } from '@/types';
import templatesData from '@/data/templates/templates.json';
import siteContentData from '@/data/site-content.json';

// Get all templates
export function getAllTemplates(): Template[] {
  return templatesData as Template[];
}

// Get a single template by slug
export function getTemplateBySlug(slug: string): Template | undefined {
  const templates = getAllTemplates();
  return templates.find((template) => template.slug === slug);
}

// Get templates by category
export function getTemplatesByCategory(category: string): Template[] {
  const templates = getAllTemplates();
  return templates.filter((template) => template.category === category);
}

// Get featured templates (first 3 or 4 for homepage)
export function getFeaturedTemplates(count: number = 3): Template[] {
  const templates = getAllTemplates();
  return templates.slice(0, count);
}

// Get site content
export function getSiteContent(): SiteContent {
  return siteContentData as SiteContent;
}

// Get navigation items — ordered to match the homepage narrative funnel:
// hook → what we do → examples → price → who we are → answers → CTA.
export function getNavItems() {
  return [
    { label: 'בית', href: '/' },
    { label: 'שירותים', href: '/services' },
    { label: 'AI ואוטומציה', href: '/ai' },
    { label: 'טמפלייטים', href: '/templates' },
    { label: 'תמחור', href: '/pricing' },
    { label: 'בלוג', href: '/blog' },
    { label: 'אודות', href: '/about' },
    { label: 'צרו קשר', href: '/contact' },
  ];
}

// The "שירותים" dropdown in the header — niche & area landing pages.
// Kept as a light label/href list (in sync with lib/seoPages.ts slugs) so the
// client-side header doesn't pull the full landing-page content into its bundle.
export function getServicesMenu() {
  return {
    overview: { label: 'כל השירותים ←', href: '/services' },
    groups: [
      {
        title: 'לפי תחום',
        links: [
          { label: 'אתרים לקבלני שיפוצים', href: '/services/renovation-contractors' },
          { label: 'אתרים לרו"ח ויועצים פיננסיים', href: '/services/accountants-financial-advisors' },
          { label: 'אתרים לחברות הנדסה', href: '/services/engineering-firms' },
          { label: 'אתרים למותגי רהיטים ועיצוב', href: '/services/furniture-design-brands' },
        ],
      },
    ],
  };
}

// Generate template slugs for static paths
export function getAllTemplateSlugs() {
  const templates = getAllTemplates();
  return templates.map((template) => ({
    slug: template.slug,
  }));
}
