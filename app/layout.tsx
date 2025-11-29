import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import { NavProvider } from "@/app/lib/states/context/nav";
import HamburgerMenu from "@/app/(components)/components/hamsbuger_menu";
import { AuthProvider } from "@/app/lib/states/context/AuthContext";
import { Toaster } from "sonner";
import { SSR_Auth } from "@/app/lib/ssrs/auth";
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
  const { roles, userId, token, profile_user } = await SSR_Auth();
  const initialLoginData = {
    roles: roles || [],
    userId: userId || "",
    token: token || "",
    profile_user: profile_user || undefined,
  };

  console.dir(initialLoginData, { depth: null });

  return (
    <>
      <html
        lang="vi"
        className={`${inter.variable} ${poppins.variable}`}
        suppressHydrationWarning={true}
      >
        <AuthProvider initialLogin={initialLoginData}>
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
