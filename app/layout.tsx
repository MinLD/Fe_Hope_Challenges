import { Geist, Pacifico } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { NavProvider } from "@/app/lib/states/context/nav";
import HamburgerMenu from "@/app/(components)/components/hamsbuger_menu";
import { AuthProvider } from "@/app/lib/states/context/AuthContext";
import { Toaster } from "sonner";
import AuthSSRInit from "@/app/(components)/auth/AuthSSRInit";
import { Suspense } from "react";

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
      <html lang="vi" suppressHydrationWarning={true}>
        <body
          className={`${geistSans.variable} ${pacifico.variable} antialiased bg-[#0f172a] text-white`}
        >
          <AuthProvider>
            <NavProvider>
              <Suspense fallback={<AuthInitSkeleton />}>
                <AuthSSRInit />
              </Suspense>

              {children}

              <HamburgerMenu />
              <Toaster position="top-right" closeButton />
            </NavProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
