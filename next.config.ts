import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Forces Next.js to generate static files only
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
