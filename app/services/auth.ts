import axiosClient from "@/app/services/api_client";

const Api_Login = (username: string, password: string) => {
  return axiosClient.post("/login", {
    username: username,
    password: password,
  });
};

export default Api_Login;
