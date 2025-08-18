import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  typescript: {
    // Temporarily ignore build errors to allow deployment
    ignoreBuildErrors: false,
  },
  eslint: {
    // Disable ESLint during builds if it causes issues
    ignoreDuringBuilds: false,
  },
  // Ensure proper static generation
  trailingSlash: false,
  generateEtags: false,
};

export default nextConfig;
