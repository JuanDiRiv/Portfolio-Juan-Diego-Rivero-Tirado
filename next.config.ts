import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.dummyjson.com", "cdn.dummyjson.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
        pathname: "/data/products/**",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
