import type { NextConfig } from "next";
const URL = "http://127.0.0.1:5000/api";
const nextConfig: NextConfig = {
  reactCompiler: false,
  cacheComponents: true,

  async rewrites() {
    return [
      {
        source: "/apiFe/:path*",
        destination: `${URL}/:path*`,
      },
    ];
  },

  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
