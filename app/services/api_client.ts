import axios from "axios";
export const BeUrl = "http://127.0.0.1:5000/api";
export const FeUrl = "http://localhost:3000";
const axiosClientConfig = {
  baseURL: BeUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosClient = axios.create(axiosClientConfig);

if (typeof window !== "undefined") {
  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log(
          "Token hết hạn hoặc không hợp lệ, đang tiến hành làm mới... (Client-side)"
        );
        try {
          const res = await axios.post(`${FeUrl}/apiFe/auth/refreshtoken`);
          console.log("Đã làm mới token thành công:", res.data);
          const newAccessToken = res.data.data.access_token;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        } catch (errorRefresh) {
          console.log("Refresh token error and unable to login:", errorRefresh);
          return Promise.reject(errorRefresh);
        }
      }
      return Promise.reject(error);
    }
  );
}
