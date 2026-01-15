"use client";
import {
  ArrowRight,
  Award,
  GraduationCap,
  HandHeart,
  MonitorPlay,
  SquarePlay,
  UserPlus,
  Users,
} from "lucide-react";
import banner from "@/public/img/banner8.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { SwiperSlide } from "swiper/react";
import bn1 from "@/public/slide/mtx1.jpg";
import bn2 from "@/public/slide/mtx2.jpg";
import bn3 from "@/public/slide/mtx3.jpg";
import bn4 from "@/public/slide/mtx4.jpg";
import MyLayout from "@/app/layout/index";
import { introduction_banner } from "@/app/lib/constants/site";
import CardChallenge from "@/app/components/card_challenge";
import MySlider from "@/app/components/my_slide";
import QuickSearchCard from "@/app/components/quick_search_card";
import WhyChooseSection from "@/app/components/why_choose_section";
import { fadeInUp, staggerContainer } from "@/app/lib/Animation";
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
      <section className="relative h-auto bg-black  text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
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
                Chia sẻ kỹ năng
                <span className="bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text text-transparent block mt-2">
                  kiếm Credit
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
                    "Nền tảng P2P đầu tiên tại Việt Nam sử dụng Time-Credit thay vì tiền mặt. Dạy những gì bạn giỏi, học những gì bạn cần - hoàn toàn trực tuyến và an toàn.",
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
                    className="cursor-pointer rounded-sm flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:from-gray-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/30 px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-semibold"
                  >
                    <span className="mr-2">Bắt đầu học ngay</span>{" "}
                    <SquarePlay />
                  </motion.button>
                </Link>

                <Link href="/auth/register">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-sm flex items-center justify-center w-full sm:w-auto bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-semibold"
                  >
                    <span className="mr-2">Trở thành Mentor</span>{" "}
                    <GraduationCap />
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
              <div className="hidden md:flex items-center justify-center">
                <QuickSearchCard />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ---------------------- */}
      <MyLayout>
        <div>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="md:hidden mt-5">
              <QuickSearchCard />
            </div>
          </motion.div>

          <div className="text-center mb-16 mt-15 sm:px-25">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-gray-600 text-lg"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cách thức hoạt động
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-gray-600 text-lg"
            >
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
                Hệ thống Time-Credit độc đáo giúp bạn trao đổi kỹ năng một cách
                công bằng và minh bạch
              </p>
            </motion.div>
          </div>

          <MySlider
            swiperOptions={{ slidesPerView: 1, navigation: false }}
            className="md:hidden cursor-pointer"
          >
            <SwiperSlide>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  1. Đăng ký & Nhận Credit
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4 sm:px-0">
                  Tạo tài khoản và nhận 3 Credit miễn phí để bắt đầu hành trình
                  học tập
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MonitorPlay className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  2. Học hoặc Dạy
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4 sm:px-0">
                  Sử dụng Credit để học từ mentor hoặc chia sẻ kỹ năng để kiếm
                  thêm Credit
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  3. Học trực tuyến
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4 sm:px-0">
                  Tham gia phòng học ảo với video call, whiteboard và chia sẻ
                  màn hình
                </p>
              </div>
            </SwiperSlide>
          </MySlider>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="md:grid grid-cols-3 hidden gap-8" // Thêm gap-8 cho thoáng
          >
            {introduction_banner &&
              introduction_banner.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    variants={fadeInUp} // Kế thừa hiệu ứng trồi lên
                    className="text-center group" // Thêm class group để hover
                  >
                    {/* Icon Container: Thêm hiệu ứng Scale khi hover */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }} // Phóng to và xoay nhẹ
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20"
                    >
                      <Icon className="w-9 h-9 text-white" />
                    </motion.div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {item.id}. {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4 sm:px-0">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <WhyChooseSection />
        </motion.div>
        <div className="mt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl"
            >
              Kỹ năng phổ biến
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-2 text-sm text-gray-500 md:text-base mb-8"
            >
              Khám phá các kỹ năng được nhiều người dùng quan tâm và trao đổi
            </motion.p>
          </motion.div>
          <MySlider
            swiperOptions={{ autoplay: { delay: 30000 }, navigation: false }}
            className="cursor-pointer "
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
