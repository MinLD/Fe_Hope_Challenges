"use server";

import { revalidatePath } from "next/cache";
import {
  Api_create_category,
  Api_update_category,
  Api_delete_category,
} from "@/app/services/categories";
import {
  Api_create_skill,
  Api_delete_skill,
  Api_update_skill,
} from "@/app/services/skills";

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
      data: result.data.data,
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

export async function createSkillAction(prevState: any, formData: FormData) {
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
    const result = await Api_create_skill(formData, token);
    // ✅ Revalidate cache after mutation
    revalidatePath("/admin");
    return {
      success: true,
      data: result.data,
      message: "Tạo kỹ năng thành công",
    };
  } catch (error: any) {
    console.error("[createSkillAction] Error:", error.message);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Tạo kỹ năng thất bại",
    };
  }
}
export async function updateSkillAction(prevState: any, formData: FormData) {
  try {
    const skillId = formData.get("skillId") as string;
    const token = formData.get("token") as string;
    if (!token || !skillId) {
      return {
        success: false,
        error: "Thiếu thông tin cần thiết",
      };
    }
    formData.delete("token");
    formData.delete("skillId");
    const result = await Api_update_skill(skillId, formData, token);
    // ✅ Revalidate affected paths
    revalidatePath("/admin");
    return {
      success: true,
      data: result.data,
      message: "Cập nhật kỹ năng thành công",
    };
  } catch (error: any) {
    console.error("[updateSkillAction] Error:", error.message);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Cập nhật kỹ năng thất bại",
    };
  }
}

export async function deleteSkillAction(skillId: string, token: string) {
  try {
    if (!token || !skillId) {
      return {
        success: false,
        error: "Thiếu thông tin cần thiết",
      };
    }
    await Api_delete_skill(skillId, token);
    // ✅ Revalidate affected paths
    revalidatePath("/admin");
    return {
      success: true,
      message: "Xóa kỹ năng thành công",
    };
  } catch (error: any) {
    console.error("[deleteSkillAction] Error:", error.message);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Xóa kỹ năng thất bại",
    };
  }
}
