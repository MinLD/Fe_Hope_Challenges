"use client";
import { Leaf } from "lucide-react";
import Image from "next/image";
import img from "../../../public/img/mtx.jpg";

type Props = {
  src?: string;
  icon?: string;
  title?: string;
  description?: string;
  className?: string;
};
function CardChallenge({ className }: Props) {
  return (
    <>
      <div
        className={`${className}   transform hover:scale-105 transition-all duration-300 cursor-pointer relative group rounded-2xl overflow-hidden `}
      >
        <div className=" absolute inset-0 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
        <div className="border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="aspect-video relative">
            <Image
              width={150}
              height={150}
              alt="image"
              src={img.src}
              className="w-full h-full object-cover   "
            />
          </div>

          <div className="p-4 ">
            <div className="flex items-center gap-2 text-sm text-green-300 mb-2">
              <Leaf className="w-4 h-4" />
              <span className="font-semibold">Environment</span>
            </div>
            <p className="text-white font-medium text-sm">
              Beach Cleanup Initiative
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardChallenge;
