import type { NextConfig } from "next";
const URL = "http://127.0.0.1:5000/api";
const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Nguy hiểm: Lệnh này sẽ bỏ qua toàn bộ lỗi TypeScript trong quá trình build.
    ignoreBuildErrors: true,
  },
  output: "standalone",

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
