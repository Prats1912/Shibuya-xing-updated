import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    // Enable static imports and optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Enable compression and optimization
  compress: true,
  // Optimize bundle
  productionBrowserSourceMaps: false,
};

export default nextConfig;
