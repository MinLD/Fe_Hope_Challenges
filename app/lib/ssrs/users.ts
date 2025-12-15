import { BeUrl } from "@/app/services/api_client";
import { cookies } from "next/headers";

export async function SSR_Users(page = 1, per_page = 5) {
  try {
    // ✅ Next 16 Fix: Explicit await on cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const response = await fetch(
      `${BeUrl}/users?page=${page}&per_page=${per_page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 },
      }
    );
    const data = await response.json();
    const { users, pagination } = data.result.data;
    return { users, pagination };
  } catch (error: any) {
    console.error("[SSR_Users] Failed to fetch users:", error.message);
    return {
      users: null,
      pagination: {
        current_page: 1,
        per_page: per_page,
        total_items: 0,
        total_pages: 0,
      },
    };
  }
}
