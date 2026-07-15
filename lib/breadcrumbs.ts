// BreadcrumbList structured-data helper. Emits schema only — the visual
// navigation is unchanged; Google uses this to show the page's place in the
// site hierarchy in search results.

const SITE_URL = 'https://www.pixelia.co.il';

export interface Crumb {
  name: string;
  path: string; // site-relative, e.g. '/services'
}

export function breadcrumbList(items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
