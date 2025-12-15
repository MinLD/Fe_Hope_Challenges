import { BeUrl } from "@/app/services/api_client";
import { cookies } from "next/headers";

export const SSR_Challenges_pending = async (page = 1, per_page = 5) => {
  try {
    // ✅ Next 16 Fix: Explicit await on cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    
    if (!token) {
      console.warn("[SSR_Challenges_pending] No auth token found");
      return { challenges: null, pagination: null };
    }
    
    const response = await fetch(
      `${BeUrl}/challenges/pending?page=${page}&per_page=${per_page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    const data = await response.json();
    const { challenges, pagination } = data.result.data;
    return { challenges, pagination };
  } catch (error: any) {
    console.error("[SSR_Challenges_pending] Error:", error.message);
    return { challenges: null, pagination: null };
  }
};
