import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Only active when ANALYZE=true (e.g. `ANALYZE=true npm run build`), so normal
// dev/prod builds are completely unaffected.
const bundleAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

// Intentionally permissive Content-Security-Policy to start (per the audit:
// "start permissive and tighten"). It already locks down the dangerous bits
// (object-src none, frame-ancestors self, base-uri self) while keeping the
// site working:
//   - 'unsafe-inline' script/style: Next injects inline bootstrap scripts and
//     the theme-init script, and we inline critical CSS + a few inline styles.
//   - 'unsafe-eval': left in for now to avoid breaking any third-party lib;
//     remove once verified and move to a nonce-based policy to tighten.
//   - js.stripe.com / api.stripe.com: Stripe checkout.
//   - googletagmanager.com / google-analytics.com: Google Analytics 4 (gtag).
//     The gtag.js script loads from googletagmanager.com and beacons hits to
//     *.google-analytics.com — both must be allowed or the browser blocks GA
//     and no data ever reaches the property.
//   - img-src https:: remote template imagery (e.g. images.unsplash.com).
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.stripe.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Sensible companions that cost nothing and round out the baseline.
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    // Inline the page's CSS into a <style> tag in the document head instead of
    // shipping render-blocking <link rel="stylesheet"> requests. Removes the
    // two blocking CSS chunks from the critical path.
    inlineCss: true,
    // Tree-shake framer-motion so only the used modules land in the bundle,
    // trimming unused JavaScript.
    optimizePackageImports: ["framer-motion"],
  },
  async headers() {
    return [
      {
        // Apply the security baseline to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // The short-lived Tel Aviv / Gush Dan area pages were replaced by one
      // honest nationwide page (the studio works remotely, Israel-wide).
      {
        source: "/services/website-development-tel-aviv",
        destination: "/services/website-development-israel",
        permanent: true,
      },
      {
        source: "/services/website-development-center",
        destination: "/services/website-development-israel",
        permanent: true,
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
