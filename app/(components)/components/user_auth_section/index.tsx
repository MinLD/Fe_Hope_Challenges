// components/header/UserAuthSection.tsx
"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useNav } from "@/app/hooks/useNav";
import { Menu } from "lucide-react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function UserAuthSection() {
  const { openHamsburg } = useNav();

  const { profile_user, isLoading } = useAuth();

  const skeleton = <Skeleton width={100} height={30} />;

  return (
    <div className="flex items-center space-x-4">
      {/* 1️⃣ TRẠNG THÁI LOADING: Hiện Skeleton */}
      {isLoading ? (
        <div className="hidden sm:block">
          {/* Skeleton giả lập chiều rộng của 2 nút hoặc tên user */}
          <Skeleton width={140} height={36} borderRadius={4} />
        </div>
      ) : !profile_user ? (
        // 2️⃣ TRẠNG THÁI GUEST (Đã load xong + Không có user): Hiện nút Login
        <div className="hidden sm:flex items-center space-x-2">
          <Link href="/login">
            <button className="text-gray-600 hover:text-green-600 font-medium px-3 py-1">
              Đăng nhập
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="px-3 py-1 rounded-sm text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all">
              Đăng ký
            </button>
          </Link>
        </div>
      ) : (
        // 3️⃣ TRẠNG THÁI USER (Đã load xong + Có user): Hiện tên
        <div className="font-bold text-green-700">
          Hello, {profile_user?.username}
        </div>
      )}

      {/* Menu Mobile: Luôn hiển thị không quan tâm login hay chưa */}
      <div className="sm:hidden cursor-pointer" onClick={openHamsburg}>
        <Menu />
      </div>
    </div>
  );
}
