"use client";

import { useState } from "react";
import {
  User,
  Zap,
  Crown,
  Shield,
  Facebook,
  Github,
  Linkedin,
  ExternalLink,
  Plus,
  Save,
  Lock,
  Smartphone,
} from "lucide-react";
import { Ty_User } from "@/app/types/users";
type ProfileTabsProps = {
  user: Ty_User;
};
export default function ProfileTabs({ user }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("general");

  // Danh sách Tabs
  const tabs = [
    { id: "general", label: "Thông tin chung", icon: User },
    { id: "skills", label: "Kỹ năng", icon: Zap },
    { id: "membership", label: "Gói hội viên", icon: Crown },
    { id: "security", label: "Bảo mật", icon: Shield },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
      {/* 1. Header Tabs Navigation */}
      <div className="border-b border-gray-100 overflow-x-auto scrollbar-hide">
        <div className="flex p-2 gap-2 min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon
                  size={18}
                  className={isActive ? "text-blue-600" : "text-gray-400"}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Tabs Content */}
      <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* --- TAB 1: GENERAL --- */}
        {activeTab === "general" && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-lg font-bold text-gray-900">
              Thông tin cơ bản
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Họ và tên
                </label>
                <input
                  type="text"
                  defaultValue={user.profile.fullname}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email (Chỉ đọc)
                </label>
                <input
                  type="text"
                  defaultValue={user.email}
                  disabled
                  className="input-field bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  defaultValue={user.profile.phone || ""}
                  className="input-field"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Liên kết mạng xã hội
              </h3>
              <div className="space-y-4">
                <SocialInput
                  icon={<Facebook size={18} />}
                  placeholder="Facebook URL"
                  defaultValue={user.profile.social_links || ""}
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="btn-primary">
                <Save size={18} /> Lưu thay đổi
              </button>
            </div>
          </div>
        )}

        {/* --- TAB 2: SKILLS --- */}
        {activeTab === "skills" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Kỹ năng chuyên môn
                </h3>
                <p className="text-sm text-gray-500">
                  Đây là nơi bạn "kiếm cơm". Hãy cập nhật chính xác.
                </p>
              </div>
              <button className="btn-primary">
                <Plus size={18} /> Thêm mới
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* {skills.map((skill: any) => (
                <div
                  key={skill.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all bg-white"
                >
                  <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <Zap size={24} className="text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{skill.name}</h4>
                      <Badge level={skill.level} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-14 sm:pl-0">
                    {skill.proof ? (
                      <a
                        href={skill.proof}
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink size={14} /> Minh chứng
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400 italic">
                        Chưa có minh chứng
                      </span>
                    )}
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        )}

        {/* --- TAB 3: MEMBERSHIP --- */}
        {activeTab === "membership" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">
              Gói thành viên hiện tại
            </h3>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Crown
                    size={24}
                    className="text-yellow-400 fill-yellow-400"
                  />
                  <span className="text-2xl font-bold tracking-tight">
                    Gói FREE
                  </span>
                </div>
                <p className="text-gray-300">
                  Bạn đang sử dụng gói miễn phí. Nâng cấp để nhận ưu đãi.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">✓ Phí giao dịch: 10%</li>
                  <li className="flex gap-2">
                    ✓ Giới hạn 3 lượt ghép nhanh/ngày
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm text-center min-w-[200px]">
                <p className="text-sm font-medium text-gray-300 mb-1">
                  Trạng thái
                </p>
                <p className="text-xl font-bold text-green-400 mb-4">
                  Đang hoạt động
                </p>
                <button className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors">
                  Nâng cấp VIP
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 4: SECURITY --- */}
        {activeTab === "security" && (
          <div className="space-y-8 max-w-2xl">
            {/* Đổi mật khẩu */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock size={20} className="text-gray-500" /> Đổi mật khẩu
              </h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Mật khẩu hiện tại"
                  className="input-field"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    className="input-field"
                  />
                  <input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    className="input-field"
                  />
                </div>
                <button className="btn-secondary">Cập nhật mật khẩu</button>
              </div>
            </div>

            {/* 2FA */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Smartphone size={20} className="text-gray-500" /> Xác thực 2
                lớp (2FA)
              </h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600">
                  Tăng cường bảo mật bằng mã OTP.
                </p>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  Kích hoạt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUB COMPONENTS (Helper) ---

function SocialInput({ icon, placeholder, defaultValue }: any) {
  return (
    <div className="flex rounded-xl shadow-sm">
      <div className="px-3 py-2.5 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl text-gray-500">
        {icon}
      </div>
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="flex-1 min-w-0 block w-full px-3 py-2.5 rounded-none rounded-r-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
}

function Badge({ level }: { level: string }) {
  const styles: any = {
    Expert: "bg-purple-100 text-purple-700 border-purple-200",
    Intermediate: "bg-blue-100 text-blue-700 border-blue-200",
    Beginner: "bg-green-100 text-green-700 border-green-200",
  };
  return (
    <span
      className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        styles[level] || styles.Beginner
      }`}
    >
      {level}
    </span>
  );
}

// Tailwind Custom Classes (giả lập component)
// Bạn có thể thêm vào file global.css hoặc dùng trực tiếp class dài
const btnPrimaryClass =
  "flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-all active:scale-95";
const btnSecondaryClass =
  "px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all active:scale-95";
const inputFieldClass =
  "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
