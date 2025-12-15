import UserAuthSection from "@/app/(components)/components/user_auth_section";
import { mainNavLinks } from "@/app/constants/navigation";

import MyLayout from "@/app/layout/index";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function HeaderTop() {
  return (
    <MyLayout>
      <div className="flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Green Challenge
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {mainNavLinks.map((link) => (
            <div className="relative group" key={link.id}>
              <Link href={link.href} className="text-gray-600  font-medium ">
                {link.label}
              </Link>
              <div
                className="absolute bottom-0 left-0 w-full border-2 border-green-600 rounded-2xl 
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
