import { axiosClient } from "@/app/services/api_client";

const Api_create_skill = async (formData: FormData, token: string) => {
  return axiosClient.post(`/skills`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
const Api_update_skill = async (
  skillId: string,
  formData: FormData,
  token: string
) => {
  return axiosClient.patch(`/skills/${skillId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
const Api_delete_skill = async (skillId: string, token: string) => {
  console.log("Deleting skill with ID:", skillId);
  return axiosClient.delete(`/skills/${skillId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export { Api_create_skill, Api_update_skill, Api_delete_skill };
