import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

import { NavProvider } from "@/app/lib/states/context/nav";
import HamburgerMenu from "@/app/(components)/components/hamsbuger_menu";
import { AuthProvider } from "@/app/lib/states/context/AuthContext";
import { Toaster } from "sonner";
import AuthSSRInit from "@/app/(components)/auth/AuthSSRInit";
import { Suspense } from "react";

// ✅ Next 16 Fix: Add metadata for better SEO
export const metadata: Metadata = {
  title: "Fe_Hope_Challenges",
  description: "Challenge management platform - Hope challenges",
  keywords: "challenges, hope, community",
};

// 2. Cấu hình font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Tạo biến CSS cho font Inter
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-poppins", // Tạo biến CSS cho font Poppins
});

// ✅ Next 16 Fix: Better loading skeleton
function AuthInitSkeleton() {
  return (
    <div className="w-full h-1 bg-gradient-to-r from-blue-200 via-blue-100 to-transparent animate-pulse" />
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        lang="vi"
        className={`${inter.variable} ${poppins.variable}`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <NavProvider>
            <body>
              {/* ✅ Next 16 Fix: Better Suspense with fallback */}
              <Suspense fallback={<AuthInitSkeleton />}>
                <AuthSSRInit />
              </Suspense>

              {/* ✅ Page content renders immediately, not blocked by auth */}
              {children}
              
              {/* ✅ Always render, independent of auth state */}
              <HamburgerMenu />
              <Toaster position="top-right" closeButton />
            </body>
          </NavProvider>
        </AuthProvider>
      </html>
    </>
  );
}
