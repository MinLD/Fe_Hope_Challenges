"use client";

import { Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { useNav } from "@/app/hooks/useNav";
import Link from "next/link";

function HamburgerMenu() {
  const router = useRouter();
  const { isOpenMenuHamsburg, closeHamsburg } = useNav();

  useEffect(() => {
    if (isOpenMenuHamsburg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenMenuHamsburg]);

  return (
    <>
      <>
        <div
          className={` ${
            isOpenMenuHamsburg ? "" : "hidden"
          } fixed top-0  z-99 w-full h-screen bg-[#000000] opacity-50 cursor-pointer `}
          onClick={closeHamsburg}
        />
        <div
          className={`${isOpenMenuHamsburg ? "left-0" : "-left-full"} 
              transition-all duration-600 fixed top-0 z-99`}
        >
          <div className="w-[80vw] left-0 h-screen bg-[#ffffff] ">
            <div>
              <div
                className=" px-2 pt-3 relative "
                onClick={() => {
                  router.push("/");
                  closeHamsburg();
                }}
              >
                <Link href="/" className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Hope Challenge
                  </span>
                </Link>
                {/* <Image
                  className="cursor-pointer w-[45px] h-[55px]"
                  width="59"
                  height="59"
                  src="/logo/logoanhiu1.png"
                  alt="Allbirds logo"
                /> */}
              </div>

              <div onClick={closeHamsburg}>
                {" "}
                <X
                  size={32}
                  className="absolute top-2 right-5 hover:cursor-pointer"
                  onClick={closeHamsburg}
                />
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#f1f1f1] mt-5" />

            <div className="px-3">
              <h2 className="text-lg font-bold mt-2 text-[#272727]">
                Danh mục
              </h2>

              <div className="hover:bg-[#f5f5f5] px-3 py-2 rounded-xl  hover:cursor-pointer">
                name
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default HamburgerMenu;
