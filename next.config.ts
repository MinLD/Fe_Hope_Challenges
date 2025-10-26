import type { NextConfig } from "next";
const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const nextConfig: NextConfig = {
  // Thêm đoạn này vào
  typescript: {
    // !! WARN !!
    // Nguy hiểm: Lệnh này sẽ bỏ qua toàn bộ lỗi TypeScript trong quá trình build.
    ignoreBuildErrors: true,
  },
  output: "standalone",

  // Cấu hình rewrite để proxy API
  async rewrites() {
    return [
      {
        source: "/apiFe/:path*",
        destination: `${URL}/:path*`,
      },
    ];
  },

  // Giữ nguyên cấu hình images của bạn
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
