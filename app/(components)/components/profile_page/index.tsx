"use client";

import ProfileTabs from "@/app/(components)/components/profile_tabs";
import ProfileSidebar from "@/app/(components)/components/profile_sidebar";
import { Suspense, useEffect, useState } from "react";
import {
  SidebarSkeleton,
  TabsSkeleton,
} from "@/app/lib/skeletons/ProfileSkeleton";
import { useAuth } from "@/app/hooks/useAuth";

// --- MOCK DATA ---
const MOCK_DATA = {
  user: {
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0987 654 321",
    bio: "Fullstack Dev đam mê dạy học. Có 5 năm kinh nghiệm với React & Node.js.",
    avatar: "",
    reputation: 4.8, // Trên thang 5
    isOnline: true,
    credits: 1250,
    plan: "Free", // hoặc 'VIP'
    planExpiry: null,
    socials: {
      facebook: "https://fb.com/vana",
      github: "https://github.com/vana",
      linkedin: "https://linkedin.com/in/vana",
    },
  },
  skills: [
    {
      id: 1,
      name: "ReactJS",
      level: "Expert",
      proof: "https://github.com/...",
    },
    {
      id: 2,
      name: "Tiếng Anh (IELTS)",
      level: "Intermediate",
      proof: "https://drive...",
    },
    { id: 3, name: "Photoshop", level: "Beginner", proof: null },
  ],
};

export default function ProfilePage() {
  const [data, setData] = useState(MOCK_DATA);
  const { profile_user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:hidden mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CỘT TRÁI */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              {isLoading ? (
                <SidebarSkeleton />
              ) : profile_user ? (
                <ProfileSidebar user={profile_user} />
              ) : null}
            </div>
          </div>

          {/* CỘT PHẢI */}
          <div className="lg:col-span-8 xl:col-span-9">
            {isLoading ? (
              <TabsSkeleton />
            ) : profile_user ? (
              <ProfileTabs user={profile_user} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
