"use client";
import { ArrowRight, Award, HandHeart, Users } from "lucide-react";
import banner from "../../../../public/img/banner6.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { SwiperSlide } from "swiper/react";
import bn1 from "../../../../public/slide/mtx1.jpg";
import bn2 from "../../../../public/slide/mtx2.jpg";
import bn3 from "../../../../public/slide/mtx3.jpg";
import bn4 from "../../../../public/slide/mtx4.jpg";
import MyLayout from "@/app/layout/index";
import { introduction_banner } from "@/app/constants/site";
import CardChallenge from "@/app/(components)/components/card_challenge";
import MySlider from "@/app/(components)/components/my_slide";
function Banner() {
  const images = [bn1, bn2, bn3, bn4, bn1, bn2, bn3, bn4];
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
    <>
      {" "}
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
      {/* ---------------------- */}
      <MyLayout>
        <div>
          <div className="text-center mb-16 mt-15 sm:px-25">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hope Challenges hoạt động như thế nào
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Các bước đơn giản để bắt đầu tạo nên sự khác biệt trong cộng đồng
              của bạn
            </p>
          </div>
          <MySlider
            swiperOptions={{ slidesPerView: 1, navigation: false }}
            className="md:hidden cursor-pointer"
          >
            <SwiperSlide>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  1. Join Challenges
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4 sm:px-0">
                  Browse and sign up for CSR challenges created by businesses in
                  your area. Choose causes you care about.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HandHeart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  2. Make Impact
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4 sm:px-0">
                  Participate in meaningful activities like beach cleanups, tree
                  planting, or community education programs.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  3. Earn Rewards
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4 sm:px-0">
                  Complete challenges to earn Hope Coins and badges. Redeem
                  rewards or donate to causes you support.
                </p>
              </div>
            </SwiperSlide>
          </MySlider>
          <div className="md:grid grid-cols-3 hidden ">
            {introduction_banner &&
              introduction_banner.map((item) => {
                const Icon = item.icon;
                return (
                  <div className={`text-center  `} key={item.id}>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className={`w-8 h-8 text-white  `} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                      {item.id}. {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4 sm:px-0">
                      {item.description}
                    </p>
                  </div>
                );
              })}
          </div>
          <MySlider
            swiperOptions={{ autoplay: { delay: 30000 }, navigation: false }}
            className="cursor-pointer lg:hidden"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <CardChallenge />
              </SwiperSlide>
            ))}
          </MySlider>
        </div>
      </MyLayout>
    </>
  );
}

export default Banner;
