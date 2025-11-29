import { axiosClient, BeUrl } from "@/app/services/api_client";
import { cookies } from "next/headers";

export async function SSR_Users(page = 1, per_page = 5) {
  const token = (await cookies()).get("access_token")?.value;
  try {
    const response = await fetch(
      `${BeUrl}/users?page=${page}&per_page=${per_page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    const data = await response.json();
    const { users, pagination } = data.result.data;
    return { users, pagination };
  } catch (error: any) {
    console.log(
      "SSR_Users: Failed to fetch users after interceptor.",
      error.message
    );
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
