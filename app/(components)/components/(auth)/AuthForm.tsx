"use client";
import React, { ComponentType, SVGProps, useState } from "react";
import { Mail, Lock, User, Leaf } from "lucide-react";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/app/hooks/useAuth";
import { Api_Register } from "@/app/services/user";
import InputBox from "@/app/(components)/components/input_box";
import ForgotPasswordForm from "@/app/(components)/components/forgot_password_form";
import Logo from "@/app/(components)/components/logo";

type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
};

type Form = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function Login() {
  const [isLogin, setIsLogin] = useState<
    "login" | "register" | "forgotPassword" | "resetPassword"
  >("login");
  const [isLoading, setIsLoading] = useState(false);
  const { roles } = useAuth();
  console.log(roles);
  const data: Form[] = [
    {
      label: "Họ và tên đầy đủ",
      type: "text",
      name: "fullName",
      placeholder: "Nhập tên đầy đủ của bạn",
      icon: User,
    },
    {
      label: "Email: ",
      type: "text",
      name: "email",
      placeholder: "Email",
      icon: Mail,
    },
    {
      label: "Mật khẩu: ",
      type: "password",
      name: "password",
      placeholder: "Nhập mật khẩu của bạn",
      icon: Lock,
    },
    {
      label: "Xác nhận mật khẩu: ",
      type: "password",
      name: "confirmPassword",
      placeholder: "Nhập lại mật khẩu của bạn",
      icon: Lock,
    },
  ];

  const filteredData =
    isLogin === "login"
      ? data.filter((item) => item.name === "email" || item.name === "password")
      : data;

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(3, "Mật khẩu phải có ít nhất 3 ký tự")
      .required("Bắt buộc"),
    ...(isLogin === "login"
      ? {}
      : {
          email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
          fullName: Yup.string()
            .min(5, "Họ và tên đầy đủ phải có ít nhất 5 ký tự")
            .required("Bắt buộc"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
            .required("Bắt buộc"),
        }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values: FormData) => {
      setIsLoading(true);

      if (isLogin === "login") {
        console.log(values);
        try {
          const res = await axios.post(
            "/apiFe/auth/login",
            {
              email: values.email,
              password: values.password,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          toast.success(res.data.message || "Đăng nhập thành công");
          window.location.href = "/";
        } catch (err: any) {
          console.error("Lỗi khi đăng nhập:", err);

          if (err instanceof AxiosError && err.response) {
            const errorData = err.response.data;
            let errorMessage = "Đăng nhập thất bại";

            if (typeof errorData === "object" && errorData !== null) {
              errorMessage =
                errorData.message || errorData.error || errorMessage;
            } else if (err.response.status === 405) {
              errorMessage = "Lỗi 405: Phương thức không được phép.";
            }

            toast.error(errorMessage);
          } else {
            toast.error("Lỗi không xác định, vui lòng thử lại.");
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          setIsLoading(true);

          const fullName = values.fullName?.trim().replace(/\s+/g, " ");
          const res = await Api_Register(
            fullName || "",
            values.email,
            values.password
          );
          console.log(res);
          toast.success(res.data.message || "Đăng ký thành công");
          setIsLogin("login");
        } catch (err: any) {
          console.log(err.response.data.response.message);
          if (err instanceof AxiosError && err.response) {
            toast.error(
              err.response.data.response.message || "Đăng ký thất bại"
            );
          } else {
            toast.error("Lỗi không xác định, vui lòng thử lại.");
          }
        } finally {
          setIsLoading(false);
        }
      }
    },
  });

  return (
    <div className="h-auto bg-[#e7fdee] flex justify-center py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-2">
        <div className="bg-white rounded-2xl shadow-xl py-4 px-6">
          {/* Logo */}
          <div className="text-center mb-4 flex justify-center mt-5">
            <Logo />
          </div>

          {isLogin === "forgotPassword" ? (
            <>
              <ForgotPasswordForm setIsLogin={() => setIsLogin("login")} />
            </>
          ) : (
            <>
              {/* Form */}
              <form onSubmit={formik.handleSubmit} className="space-y-3">
                {filteredData.map((item) => (
                  <InputBox
                    key={item.name}
                    label={item.label}
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    icon={item.icon}
                    Formik={formik}
                    id={item.name}
                  />
                ))}

                {/* Remember me */}
                {isLogin === "login" && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded outline-none"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Ghi nhớ mật khẩu
                      </span>
                    </label>
                    <div
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      onClick={() => setIsLogin("forgotPassword")}
                    >
                      Quên mật khẩu?
                    </div>
                  </div>
                )}

                {/* Nút */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="hover:cursor-pointer scale-100 hover:scale-101 w-full bg-[#16a34a] text-white py-3 rounded-lg hover:from-[#16a34a] hover:to-[#16a34a] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {isLogin ? "Đang đăng nhập" : "Đang đăng ký"}
                    </div>
                  ) : isLogin === "login" ? (
                    "Đăng nhập"
                  ) : (
                    "Đăng ký"
                  )}
                </button>
              </form>

              {/* Toggle Form */}
              <div className="mt-6 text-center ">
                <p className="text-sm text-gray-600">
                  {isLogin === "login"
                    ? "Bạn chưa có tài khoản?"
                    : "Bạn đã có tài khoản?"}
                  <button
                    type="button"
                    onClick={() =>
                      setIsLogin(isLogin === "login" ? "register" : "login")
                    }
                    className="ml-1 text-[#16a34a] hover:text-[#16a34a] font-medium hover:cursor-pointer"
                  >
                    {isLogin === "login" ? "Đăng ký" : "Đăng nhập"}
                  </button>
                </p>
              </div>

              {/* Social Login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Hoặc tiếp tục với
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>

                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="ml-2">Facebook</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
