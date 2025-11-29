import { axiosClient } from "@/app/services/api_client";

const get_all_categories = async (page: number, per_page: number) => {
  return axiosClient.get(`/categories?page=${page}&per_page=${per_page}`);
};
const Api_create_category = async (formData: FormData, token: string) => {
  return axiosClient.post(`/categories`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
const Api_update_category = async (
  categoryId: string,
  formData: FormData,
  token: string
) => {
  return axiosClient.patch(`/categories/${categoryId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export { get_all_categories, Api_create_category, Api_update_category };
