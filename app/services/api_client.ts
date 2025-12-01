import axios from "axios";
export const BeUrl = "http://127.0.0.1:5000/api";
export const FeUrl = "http://localhost:3000";
export const WEBSOCKET_URL = "http://localhost:8080/ws";
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
          // Ask Next.js proxy to refresh tokens and make sure browser cookies are included
          const refreshResponse = await axios.post(`/apiFe/auth/refreshtoken`, {}, { withCredentials: true });

          // If proxy returned a usable access_token in the response body, apply it to the original request
          const newAccessToken = refreshResponse?.data?.access_token;
          if (newAccessToken) {
            // set header for this retry only
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            // also set default header so subsequent requests from this page use it until next refresh
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          }

          // retry original request (with Authorization header if available)
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
