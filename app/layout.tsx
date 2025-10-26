import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import { NavProvider } from "@/app/lib/context/nav";
import HamburgerMenu from "@/app/components/hamsbuger_menu";
import { AuthProvider } from "@/app/lib/context/AuthContext";
import { Toaster } from "sonner";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="vi" className={`${inter.variable} ${poppins.variable}`}>
        <AuthProvider>
          <NavProvider>
            <body>
              {children}
              <HamburgerMenu />
              <Toaster position="top-right" closeButton />
            </body>
          </NavProvider>
        </AuthProvider>
      </html>
    </>
  );
}
