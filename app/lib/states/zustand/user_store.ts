"use client";
import { create } from "zustand";
import axios from "axios";
import { Ty_User } from "@/app/types/users";

interface ProfileState {
  isLoading: boolean;
  error: string | null;
  profileUser: Ty_User | null;
  fetchProfile: () => Promise<void>;
  initialize: (initialData: Ty_User | null) => void;
  refreshToken: () => Promise<void>;
}
let store: any;
console.log("store", store);

export const useProfileStore = create<ProfileState | any>((set) => {
  const state = {
    profileUser: null,
    isLoading: false,
    error: null,
    initialize: (initialData: Ty_User) => {
      if (initialData) {
        set({ profileUser: initialData, isLoading: false, error: null });
      }
    },
    fetchProfile: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.get("/apiFe/user/profile", {
          // API tự lấy token từ cookie
        });
        if (response.status !== 200) {
          if (response.status === 401) {
            // Tự động refresh nếu 401
            await state.refreshToken();
            // Fetch lại sau refresh
            const retryResponse = await axios.get("/apiFe/user/profile");
            if (retryResponse.status !== 200) {
              throw new Error("Failed to fetch profile after refresh");
            }
            set({ profileUser: retryResponse.data, isLoading: false });
          } else {
            throw new Error("Failed to fetch profile");
          }
        }
        set({ profileUser: response.data, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
    refreshToken: async () => {
      try {
        const response = await axios.post("/apiFe/auth/refreshtoken", {}, { withCredentials: true });
        if (response.status !== 200) {
          throw new Error("Refresh token failed");
        }

        const newAccessToken = response?.data?.access_token;
        if (newAccessToken) {
          // Keep the access token in axios defaults so direct API calls include it
          axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        }

        console.log("Token refreshed");
      } catch (error: any) {
        console.error("Refresh token error:", error.message);
      }
    },
  };
  store = state;
  return state;
});
