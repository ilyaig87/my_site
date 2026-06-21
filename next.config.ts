import type { NextConfig } from "next";

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
};

export default nextConfig;
