"use client";

import Image from "next/image";
import { Camera, Star } from "lucide-react";
import { useRef, useState } from "react";
import { Ty_User } from "@/app/lib/types/users";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { updateUserProfileAction } from "@/app/lib/actions/users";
import { toast } from "sonner";

export default function ProfileSidebar() {
  const { updateAuth, token, profile_user } = useAuth();

  const displayUser: Ty_User | null = profile_user || null;

  const [isOnline, setIsOnline] = useState(displayUser?.profile.is_online);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Optional: Validate file type/size
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);

    setIsUploading(true);
    try {
      const formData = new FormData();
      if (token) formData.append("token", token);
      formData.append("avatar", file);

      const res = await updateUserProfileAction(formData);

      if (res.success) {
        toast.success("Cập nhật ảnh đại diện thành công!");
        if (updateAuth && res.data) {
          console.log(res.data);
          const updatedProfile = { ...displayUser, ...res.data };
          // @ts-ignore
          updateAuth({
            profile_user: updatedProfile,
          });
        }
      } else {
        toast.error(res.error || "Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Upload error", error);
      toast.error("Có lỗi xảy ra khi tải ảnh lên");
    } finally {
      setIsUploading(false);
    }
  };

  // Tính % thanh tiến trình uy tín (VD: 4.8/5 * 100 = 96%)
  const reputationPercent =
    (displayUser?.profile?.reputation_score! / 100) * 100;

  return (
    <div className="space-y-6">
      {/* 1. Card Danh Thiếp Chính */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
        {/* Avatar */}
        <div className="relative inline-block mb-4">
          <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden mx-auto group">
            {displayUser?.profile.avatar?.secure_url ? (
              <Image
                src={
                  previewUrl
                    ? previewUrl
                    : displayUser?.profile.avatar.secure_url
                }
                alt={displayUser?.profile.fullname || "User Avatar"}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  isUploading ? "opacity-50" : ""
                }`}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-lg font-bold">
                  {displayUser?.profile.fullname?.charAt(0) || "U"}
                </span>
              </div>
            )}

            {/* Loading Overlay */}
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <button
            onClick={handleAvatarClick}
            disabled={isUploading}
            className="absolute bottom-1 right-1 bg-gray-900 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-sm z-20 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <Camera size={14} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Tên & Bio */}
        <h2 className="text-2xl font-bold text-gray-900">
          {displayUser?.profile.fullname}
        </h2>
        <p className="overflow-hidden text-gray-500 text-sm mt-2 leading-relaxed px-2 whitespace-pre-line">
          {displayUser?.profile.bio}
        </p>

        {/* Điểm Uy Tín (Progress Bar) */}
        <div className="mt-6 text-left">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" /> Uy
              tín
            </span>
            <span className="text-sm font-bold text-green-600">
              {displayUser?.profile.reputation_score}/100
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
    </div>
  );
}
