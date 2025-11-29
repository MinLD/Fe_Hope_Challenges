"use client";

import { axiosClient } from "@/app/services/api_client";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useEffect } from "react";

interface AuthState {
  token: string | null;
  userId: string | null;
  roles: string[] | null;
  profile_user?: I_profile_user;
}
interface I_profile_user {
  id: string;
  username: string;
  points: number;
  profile: {
    id: string;
    email: string;
    avatar: string;
    fullName: string;
    bio: string;
    date_of_birth: string;
  };
}
interface InitialLoginProps {
  roles: string[] | [];
  userId: string | "";
  token: string | "";
  profile_user?: I_profile_user;
}
export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({
  children,
  initialLogin,
}: {
  children: ReactNode;
  initialLogin: InitialLoginProps;
}) {
  const [token, setToken] = useState<string | null>(initialLogin.token);
  const [userId, setUserId] = useState<string | null>(initialLogin.userId);
  const [roles, setRoles] = useState<string[] | null>(initialLogin.roles);
  const [profile_user, setProfile_user] = useState<I_profile_user | undefined>(
    initialLogin.profile_user
  );
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!profile_user) {
        console.log(
          "⚠️ Client: Dữ liệu SSR trống. Thử gọi API để kích hoạt Interceptor Refresh..."
        );
        try {
          await axiosClient.get(`/auth/whoami`);
          console.log("✅ Client: Refresh thành công! Cập nhật lại User.");
          router.refresh();
        } catch (error) {
          console.log("❌ Client: Refresh thất bại hoặc user chưa đăng nhập.");
        }
      }
    };

    fetchData();
  }, []);
  console.log("roles in contexxt", roles);
  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        roles,
        profile_user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
