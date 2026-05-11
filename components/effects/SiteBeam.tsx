'use client';

/**
 * Page-top diagonal beam — anchored to the top of each page (NOT fixed).
 * Renders only over the first ~100vh, then scrolls away with content,
 * matching the homepage hero's beam behavior on every page.
 */
export default function SiteBeam() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-screen -z-10 pointer-events-none overflow-hidden site-beam-stage"
    >
      <div className="beam site-beam-primary" />
      <div className="beam site-beam-echo" />
    </div>
  );
}
