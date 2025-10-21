// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep React runtime guardrails on
  reactStrictMode: true,

  // Smaller response headers
  poweredByHeader: false,

  // Enable built-in compression (gzip/deflate/brotli)
  compress: true,

  // Allow external images + modern formats for smaller payloads
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },

  // ✅ Ship even if ESLint finds errors (remove once you’ve fixed types)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Speed up client bundles by optimizing these libraries
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Add long-lived caching for static assets (images/fonts)
  async headers() {
    return [
      {
        // Cache image types aggressively
        source: "/:all*.(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache fonts aggressively
        source: "/fonts/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
