'use client';

import { usePathname } from 'next/navigation';
import SiteBeam from './SiteBeam';

/**
 * Renders the page-top decorative backdrop based on the current route.
 * - Home (/)          → diagonal beam (Tesla-style signature)
 * - Everywhere else   → blueprint grid (squares — "we build things")
 */
export default function SiteBackdrop() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    return <SiteBeam />;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-screen -z-10 pointer-events-none overflow-hidden site-grid-stage"
    >
      <div className="site-grid" />
      <div className="site-grid-vignette" />
    </div>
  );
}
