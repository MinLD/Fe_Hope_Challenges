import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import Api_Login from "@/app/services/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password, username } = await request.json();
    const res = await Api_Login(username, password);
    const { access_token, refresh_token } = res.data.result.data;
    (await cookies()).set("authToken", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600,
      path: "/",
    });
    if (refresh_token) {
      (await cookies()).set("refreshToken", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2592000,
        path: "/",
      });
    }

    return NextResponse.json(res.data.result.data, { status: res.data.code });
  } catch (error: any) {
    console.log("Error in login proxy: ", error.response.data.response.message);
    if (error instanceof AxiosError && error.response) {
      return NextResponse.json(error.response.data.response, {
        status: error.response.status,
      });
    }

    console.error("Lỗi API Route:", error);
    return NextResponse.json(
      { error: "Đã có lỗi phía máy chủ" },
      { status: 500 }
    );
  }
}
