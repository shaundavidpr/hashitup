import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
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
  
  // Docker optimization
  poweredByHeader: false,
  
  // Image optimization for Docker
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
