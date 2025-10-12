"use client";
import { ArrowRight } from "lucide-react";
import banner from "../../../public/img/banner6.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import CardChallenge from "@/app/components/card_challenge";
function Banner() {
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
    <section className="relative h-auto bg-gradient-to-br from-slate-900 via-blue-900 to-green-900 text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${banner.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ">
          <div className="text-center lg:text-left">
            <motion.h1
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight"
            >
              Biến đổi cuộc sống thông qua
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent block mt-2">
                Hành động có ý nghĩa
              </span>
            </motion.h1>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <TypeAnimation
                sequence={[
                  "Tham gia cùng hàng ngàn người tiên phong trong các thử thách trách nhiệm xã hội của doanh nghiệp. Tạo ra tác động thực sự, nhận phần thưởng và xây dựng một tương lai tốt đẹp hơn cho cộng đồng của bạn.",
                  1000, // Chờ 1 giây sau khi gõ xong
                ]}
                wrapper="p" // Bọc trong thẻ <p>
                speed={40} // Tốc độ gõ (số càng nhỏ càng nhanh)
                // 3. Sao chép toàn bộ className từ thẻ <p> cũ vào đây
                className=" min-h-[156px] sm:min-h-[128px] text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
                repeat={0} // Chỉ chạy 1 lần
                cursor={true} // Hiển thị con trỏ gõ chữ
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12"
            >
              <Link href="/challenges">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer rounded-sm flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl shadow-green-500/30 px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-semibold"
                >
                  Khám phá những thách thức
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>

              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer rounded-sm flex items-center justify-center w-full sm:w-auto bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-semibold"
                >
                  Đăng ký miễn phí
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start text-sm sm:text-base"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300">
                  10K+ Người dùng đang hoạt động
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-gray-300">500+ Thử thách</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-gray-300">250+ Doanh nghiệp</span>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4 ">
                <div className="space-y-4">
                  <CardChallenge />
                  <CardChallenge />
                </div>
                <div className="space-y-4 mt-8">
                  <CardChallenge />
                  <CardChallenge />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
