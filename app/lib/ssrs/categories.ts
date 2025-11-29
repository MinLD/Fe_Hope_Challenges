import { BeUrl } from "@/app/services/api_client";

export async function SSR_Categories(page = 1, per_page = 5) {
  try {
    const res = await fetch(
      `${BeUrl}/categories?page=${page}&per_page=${per_page}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    const { data: categories, pagination } = data.result.data;
    return { categories, pagination };
  } catch (error: any) {
    console.log("SSR_Categories: Failed to fetch categories", error);
    return { categories: null };
  }
}
