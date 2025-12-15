import { BeUrl } from "@/app/services/api_client";

// ✅ Next 16 Fix: Add return type for better type safety
export async function SSR_Categories(page = 1, per_page = 5) {
  try {
    const res = await fetch(
      `${BeUrl}/categories?page=${page}&per_page=${per_page}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    const { data: categories, pagination } = data.result.data;
    return { categories, pagination };
  } catch (error: any) {
    console.error("[SSR_Categories] Error:", error.message);
    return {
      categories: null,
      pagination: {
        current_page: 1,
        per_page: per_page,
        total_items: 0,
        total_pages: 0,
      },
    };
  }
}
