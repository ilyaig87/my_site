'use client';

/**
 * Page-top decorative backdrop — a subtle blueprint grid ("we build things").
 * Light, neutral, and the same on every page (no colored beam).
 */
export default function SiteBackdrop() {
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
