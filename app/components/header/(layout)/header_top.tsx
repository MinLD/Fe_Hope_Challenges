"use client";
import { mainNavLinks } from "@/app/constants/navigation";
import { useNav } from "@/app/hooks/useNav";
import MyLayout from "@/app/layout/index";
import { Coins, Heart, Menu } from "lucide-react";
import Link from "next/link";

function HeaderTop() {
  const { openHamsburg } = useNav();

  return (
    <MyLayout>
      <div className="flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Hope Challenge
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {mainNavLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-yellow-50 rounded-full">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">850</span>
              </div> */}

          <div className="sm:flex items-center space-x-2 hidden">
            <Link href="/auth/login">
              <button className="text-gray-600 hover:text-green-600 transition-colors font-medium ">
                Sign In
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="px-3 py-1 rounded-sm text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Sign Up
              </button>
            </Link>
          </div>

          <div className="sm:hidden cursor-pointer" onClick={openHamsburg}>
            <Menu />
          </div>
        </div>
      </div>
    </MyLayout>
  );
}

export default HeaderTop;
