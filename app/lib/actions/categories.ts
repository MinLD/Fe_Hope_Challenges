"use server";

import { revalidatePath } from "next/cache";
import {
  Api_create_category,
  Api_update_category,
  Api_delete_category,
} from "@/app/services/categories";

/**
 * ✅ Next 16 Server Action: Create Category
 *
 * Benefits:
 * - Credentials (token) handled server-side (secure)
 * - Auto cache invalidation with revalidatePath
 * - Type-safe form submission
 * - Reduces boilerplate code
 * - Better error handling
 */
export async function createCategoryAction(prevState: any, formData: FormData) {
  try {
    const token = formData.get("token") as string;

    if (!token) {
      return {
        success: false,
        error: "Không tìm thấy token xác thực",
      };
    }
    formData.delete("token");

    // ✅ API call on server side (credentials safe)
    const result = await Api_create_category(formData, token);

    // ✅ Revalidate cache after mutation
    revalidatePath("/admin");

    return {
      success: true,
      data: result.data,
      message: "Tạo danh mục thành công",
    };
  } catch (error: any) {
    console.error("[createCategoryAction] Error:", error.message);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Tạo danh mục thất bại",
    };
  }
}

/**
 * ✅ Next 16 Server Action: Update Category
 */
export async function updateCategoryAction(prevState: any, formData: FormData) {
  try {
    const categoryId = formData.get("categoryId") as string;
    const token = formData.get("token") as string;

    if (!token || !categoryId) {
      return {
        success: false,
        error: "Thiếu thông tin cần thiết",
      };
    }

    const result = await Api_update_category(categoryId, formData, token);

    // ✅ Revalidate affected paths
    revalidatePath("/admin");

    return {
      success: true,
      data: result.data,
      message: "Cập nhật danh mục thành công",
    };
  } catch (error: any) {
    console.error("[updateCategoryAction] Error:", error.message);
    return {
      success: false,
      error:
        error.response?.data?.message || error.message || "Cập nhật thất bại",
    };
  }
}

/**
 * ✅ Next 16 Server Action: Delete Category
 */
export async function deleteCategoryAction(categoryId: string, token: string) {
  try {
    if (!token || !categoryId) {
      return {
        success: false,
        error: "Thiếu thông tin cần thiết",
      };
    }

    await Api_delete_category(categoryId, token);

    // ✅ Revalidate affected paths
    revalidatePath("/admin");

    return {
      success: true,
      message: "Xóa danh mục thành công",
    };
  } catch (error: any) {
    console.error("[deleteCategoryAction] Error:", error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Xóa thất bại",
    };
  }
}
