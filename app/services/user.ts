import axiosClient from "@/app/services/api_client";

const Api_Register = (username: string, email: string, password: string) => {
  return axiosClient.post("/register", {
    username: username,
    email: email,
    password: password,
  });
};

export { Api_Register };
