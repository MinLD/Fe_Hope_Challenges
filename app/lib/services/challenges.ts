import { axiosClient } from "@/app/lib/services/api_client";

const Api_Challenges_pending = async (
  page: number,
  per_page: number,
  token: string
) => {
  return axiosClient.get(
    `/challenges/pending?page=${page}&per_page=${per_page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { Api_Challenges_pending };
