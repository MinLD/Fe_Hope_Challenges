import { BeUrl } from "@/app/services/api_client";
import { cookies } from "next/headers";

export const SSR_Challenges_pending = async (page = 1, per_page = 5) => {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) {
    return { challenges: null, pagination: null };
  }
  try {
    const response = await fetch(
      `${BeUrl}/challenges/pending?page=${page}&per_page=${per_page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    const data = await response.json();
    console.log("challe in ssr", data);
    const { challenges, pagination } = data.result.data;
    return { challenges, pagination };
  } catch (error: any) {
    console.log("SSR_Challenges_pending: Failed to fetch challenges", error);
    return { challenges: null, pagination: null };
  }
};
