"use client";

import { motion } from "framer-motion";
import { Search, Zap } from "lucide-react";

export default function QuickSearchCard() {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="w-full max-w-[600px] rounded-2xl bg-white p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        {/* --- Header --- */}
        <div
          className="mb-6 sm:flex sm:items-center sm:justify-between space-x-6
        "
        >
          <h2 className="text-xl font-bold text-gray-800">Tìm kiếm nhanh</h2>
          <div className="flex items-center gap-2">
            {/* Dấu chấm xanh online */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-500">
              1,247 mentor đang online
            </span>
          </div>
        </div>

        {/* --- Search Input --- */}
        <div className="relative mb-5">
          <input
            type="text"
            placeholder="Tìm kỹ năng bạn muốn học..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-4 pr-12 text-gray-600 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        {/* --- Categories Grid --- */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4">
          <CategoryButton
            label="Tiếng Anh"
            colorClass="text-blue-500 bg-blue-50 hover:bg-blue-100 border-blue-100"
          />
          <CategoryButton
            label="Lập trình"
            colorClass="text-green-500 bg-green-50 hover:bg-green-100 border-green-100"
          />
          <CategoryButton
            label="Guitar"
            colorClass="text-orange-500 bg-orange-50 hover:bg-orange-100 border-orange-100"
          />
          <CategoryButton
            label="Thiết kế"
            colorClass="text-purple-500 bg-purple-50 hover:bg-purple-100 border-purple-100"
          />
        </div>

        {/* --- CTA Button --- */}
        <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3.5 text-base font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]">
          <Zap className="fill-current" size={20} />
          <span>Tìm kiếm nhanh</span>
        </button>
      </div>
    </motion.div>
  );
}

// Component con để tái sử dụng cho các nút category
function CategoryButton({
  label,
  colorClass,
}: {
  label: string;
  colorClass: string;
}) {
  return (
    <button
      className={`rounded-xl py-3 text-sm font-medium transition-colors border ${colorClass}`}
    >
      {label}
    </button>
  );
}
