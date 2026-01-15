"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import bn from "@/public/img/banner8.png";
import { motion } from "framer-motion"; // 1. Import thư viện animation

export default function WhyChooseSection() {
  const features = [
    {
      title: "Công bằng tuyệt đối",
      desc: "1 giờ dạy = 1 Credit, không phân biệt kỹ năng",
    },
    {
      title: "Không cần tiền mặt",
      desc: "Trao đổi kỹ năng trực tiếp, loại bỏ rào cản tài chính",
    },
    {
      title: "Tự động thanh toán",
      desc: "Hệ thống tự động xử lý dựa trên thời gian thực tế",
    },
  ];

  return (
    <section className="w-full">
      {/* 2. Biến thẻ div bao ngoài thành motion.div */}
      <motion.div
        // Trạng thái ban đầu: Hơi nhỏ (scale 0.9), mờ và nằm thấp xuống 50px
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        // Khi lướt tới: Phóng to về chuẩn (scale 1), rõ nét và về vị trí gốc
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        // Chỉ chạy 1 lần, lướt qua cách đáy 100px thì bắt đầu chạy
        viewport={{ once: true, margin: "-100px" }}
        // Hiệu ứng nảy nhẹ (spring) tạo cảm giác 3D chân thực
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="mx-auto rounded-[2rem] bg-slate-50 p-6 md:p-12 lg:p-16"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
              Tại sao chọn Time-Credit?
            </h2>

            <div className="space-y-6">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 shadow-sm mt-1">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 md:text-base">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Image
              src={bn}
              alt="Time Credit Illustration"
              width={400}
              height={300}
              className="object-contain drop-shadow-2xl rounded-xl w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
