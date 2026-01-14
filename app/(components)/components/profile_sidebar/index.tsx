"use client";

import Image from "next/image";
import { Camera, Star, Wallet, CreditCard, History, Plus } from "lucide-react";
import { useState } from "react";
import { Ty_User } from "@/app/types/users";

type ProfileSidebarProps = {
  user: Ty_User;
};
export default function ProfileSidebar({ user }: ProfileSidebarProps) {
  const [isOnline, setIsOnline] = useState(user.profile.is_online);

  // Tính % thanh tiến trình uy tín (VD: 4.8/5 * 100 = 96%)
  const reputationPercent = (user.profile.reputation_score / 100) * 100;

  return (
    <div className="space-y-6">
      {/* 1. Card Danh Thiếp Chính */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
        {/* Avatar */}
        <div className="relative inline-block mb-4">
          <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden mx-auto">
            {user.profile.avatar?.secure_url ? (
              <Image
                src={user.profile.avatar.secure_url}
                alt={user.profile.fullname || "User Avatar"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-lg font-bold">
                  {user.profile.fullname?.charAt(0) || "U"}
                </span>
              </div>
            )}
          </div>
          <button className="absolute bottom-1 right-1 bg-gray-900 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-sm">
            <Camera size={14} />
          </button>
        </div>

        {/* Tên & Bio */}
        <h2 className="text-2xl font-bold text-gray-900">
          {user.profile.fullname}
        </h2>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed px-2">
          {user.profile.bio}
        </p>

        {/* Điểm Uy Tín (Progress Bar) */}
        <div className="mt-6 text-left">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" /> Uy
              tín
            </span>
            <span className="text-sm font-bold text-green-600">
              {user.profile.reputation_score}/100
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${reputationPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Dựa trên đánh giá từ học viên
          </p>
        </div>

        <div className="border-t border-gray-100 my-6"></div>

        {/* Trạng thái Online (Toggle Switch) */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
          <div className="text-left">
            <p className="text-sm font-bold text-gray-800">Ghép nhanh (SOS)</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              ></span>
              <span className="text-xs text-gray-500">
                {isOnline ? "Đang Online" : "Đang Bận"}
              </span>
            </div>
          </div>

          {/* Custom Toggle Switch */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
              isOnline ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                isOnline ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 2. Card Ví Tiền (ATM Style) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-black text-white p-6 shadow-xl">
        {/* Họa tiết trang trí */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-blue-500/20 blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6 opacity-80">
            <Wallet size={18} />
            <span className="text-sm font-medium tracking-wider uppercase">
              Time-Credits
            </span>
          </div>

          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold tracking-tight">
              {user.wallet_balance.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-yellow-400">CR</span>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg text-sm font-medium transition-colors">
              <Plus size={16} /> Nạp/Rút
            </button>
            <button className="flex items-center justify-center w-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors">
              <History size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
