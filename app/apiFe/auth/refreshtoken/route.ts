import { Api_Refresh_Token } from "@/app/services/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = cookies();
    const refresh_token = (await cookieStore).get("refresh_token")?.value;

    if (!refresh_token) {
      return NextResponse.json(
        { message: "No refresh token provided" },
        { status: 401 }
      );
    }

    // 1. Gọi Backend Python để lấy token mới
    const res = await Api_Refresh_Token(refresh_token);

    // Giả sử cấu trúc trả về từ Python là res.data.result.data.access_token
    const newAccessToken = res.data?.result?.data?.access_token;

    if (!newAccessToken) {
      return NextResponse.json(
        { message: "Refresh failed at Backend" },
        { status: 401 }
      );
    }

    // 2. Tạo Response trả về cho Client
    const response = NextResponse.json(
      { message: "Refresh success", access_token: newAccessToken },
      { status: 200 }
    );

    // 3. QUAN TRỌNG: Set Cookie đè lên cookie cũ
    // Client (Trình duyệt) sẽ tự động cập nhật khi nhận response này
    response.cookies.set("access_token", newAccessToken, {
      httpOnly: true, // Bắt buộc để bảo mật
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // Quan trọng: để cookie có hiệu lực toàn trang
      maxAge: 60 * 60, // Thời gian sống (ví dụ 1 tiếng)
    });

    // Nếu có refresh token mới thì set luôn
    // response.cookies.set("refresh_token", ...);

    console.log("✅ Đã Refresh Token và Set Cookie mới cho Client");

    return response;
  } catch (error: any) {
    console.error("❌ Lỗi Proxy Refresh Token:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
