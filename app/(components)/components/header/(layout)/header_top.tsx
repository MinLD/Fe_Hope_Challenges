import Logo from "@/app/(components)/components/logo";
import UserAuthSection from "@/app/(components)/components/user_auth_section";
import { mainNavLinks } from "@/app/constants/navigation";

import MyLayout from "@/app/layout/index";
import { Leaf, Timer } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function HeaderTop() {
  return (
    <MyLayout>
      <div className="flex h-14 items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center space-x-8">
          {mainNavLinks.map((link) => (
            <div className="relative group p-1" key={link.id}>
              <Link href={link.href} className="text-gray-600  font-medium ">
                {link.label}
              </Link>
              <div
                className="absolute bottom-0 left-0 w-full border-2 border-gray-600 rounded-2xl 
             scale-x-0 origin-left 
             transition-transform duration-500 ease-in-out 
             group-hover:scale-x-100"
              />
            </div>
          ))}
        </nav>

        <Suspense
          fallback={
            <div className="animate-pulse w-20 h-8 bg-gray-200 rounded"></div>
          }
        >
          <UserAuthSection />
        </Suspense>
      </div>
    </MyLayout>
  );
}

export default HeaderTop;
