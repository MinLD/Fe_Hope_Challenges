"use client";

import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import MyLayout from "@/app/layout/index";
import { IoSearchSharp } from "react-icons/io5";
function HeaderBottom() {
  return (
    <MyLayout>
      <div className="flex justify-between items-center h-[58px]">
        {/* thanh search */}
        <div className="mr-3 w-full flex-1 max-w-[500px] transition-all ease-in-out duration-300">
          {/* <SearchInput onSearch={console.log} show="" /> */}
          <form
            className={`  relative  w-full flex-1 max-w-[300px] md:max-w-[500px]   transition-all ease-in-out duration-300`}
          >
            <input
              placeholder="Tìm kiếm việc làm, hoàn cảnh cần giúp đỡ..."
              type="text"
              className={`pl-3 p-1 pr-8  w-full flex-1 border rounded-[10px] border-[#fff] placeholder:text-[14px] text-[#fff] outline-none`}
            />
            <span className="absolute top-2 right-2">
              <IoSearchSharp size={20} color="#fff" />
            </span>
          </form>
        </div>

        <div className="flex items-center gap-4 justify-center ">
          <div className="flex flex-col gap-[1px] ">
            <p className="text-[11px] text-[#c5c5c5]">Bạn là Đối Tác?</p>
            <Link href="/register/partner">
              <div className="flex cursor-pointer items-center gap-1 text-[14px] hover:text-[#00ff73] text-[#4ae08da4] transition-all ease-in-out duration-300">
                <p className="text-[14px] font-medium">Đăng ký ngay</p>
                <IoIosArrowForward />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MyLayout>
  );
}

export default HeaderBottom;
