import { Geist, Pacifico } from "next/font/google";

import "./globals.css";
import type { Metadata } from "next";
import { NavProvider } from "@/app/lib/context/nav";
import HamburgerMenu from "@/app/components/hamsbuger_menu";
import { AuthProvider } from "@/app/lib/context/AuthContext";
import { Toaster } from "sonner";
import AuthSSRInit from "@/app/components/auth/AuthSSRInit";
import SmoothLoadingWrapper from "@/app/components/loading_screen/SmoothLoadingWrapper";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdProvider from "@/app/components/antd/AntdProvider";
import { Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Skill Time",
  description: "management platform - Skill Time",
  keywords: "challenges, hope, community",
};
// 1. Cấu hình Geist (Font chính)
const geistSans = Geist({
  variable: "--font-geist-sans", // Tên biến phải khớp với bên CSS
  subsets: ["latin"],
});

// 2. Cấu hình Pacifico (Font Logo)
const pacifico = Pacifico({
  variable: "--font-pacifico", // Tên biến phải khớp với bên CSS
  weight: "400",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="vi" suppressHydrationWarning={true}>
        <body
          className={`${geistSans.variable} ${pacifico.variable} antialiased bg-[#0f172a] text-white`}
        >
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
          >
            <SmoothLoadingWrapper />
            <AuthProvider>
              <NavProvider>
                <Suspense>
                  <AuthSSRInit />
                </Suspense>
                <AntdProvider>{children}</AntdProvider>
                <HamburgerMenu />
                <Toaster position="top-right" closeButton />
              </NavProvider>
            </AuthProvider>
          </GoogleOAuthProvider>
        </body>
      </html>
    </>
  );
}
