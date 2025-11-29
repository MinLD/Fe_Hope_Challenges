"use client";
import { mainNavLinks } from "@/app/constants/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useNav } from "@/app/hooks/useNav";
import MyLayout from "@/app/layout/index";
import { Leaf, Menu } from "lucide-react";
import Link from "next/link";

function HeaderTop() {
  const { openHamsburg } = useNav();
  const { roles } = useAuth();

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

        <div className="flex items-center space-x-4">
          {/* <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-yellow-50 rounded-full">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">850</span>
              </div> */}

          {roles && (
            <div className="sm:flex items-center space-x-2 hidden">
              <Link href="/login">
                <button className="text-gray-600 hover:text-green-600 transition-colors font-medium hover:bg-gray-100 px-3 py-1 rounded-sm ">
                  Đăng nhập
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="px-3 py-1 rounded-sm text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Đăng ký
                </button>
              </Link>
            </div>
          )}

          <div className="sm:hidden cursor-pointer" onClick={openHamsburg}>
            <Menu />
          </div>
        </div>
      </div>
    </MyLayout>
  );
}

export default HeaderTop;
