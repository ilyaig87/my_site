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

// Get navigation items
export function getNavItems() {
  return [
    { label: 'בית', href: '/' },
    { label: 'טמפלייטים', href: '/templates' },
    { label: 'תמחור', href: '/pricing' },
    { label: 'אודות', href: '/about' },
    {
      label: 'עוד',
      href: '#',
      submenu: [
        { label: 'ביקורות', href: '/reviews' },
        { label: 'שאלות נפוצות', href: '/faq' },
        { label: 'שירותים', href: '/services' },
      ]
    },
    { label: 'צור קשר', href: '/contact' },
  ];
}

// Generate template slugs for static paths
export function getAllTemplateSlugs() {
  const templates = getAllTemplates();
  return templates.map((template) => ({
    slug: template.slug,
  }));
}
