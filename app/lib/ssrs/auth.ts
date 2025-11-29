// ssrs/auth.ts
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BeUrl } from "@/app/services/api_client";

export async function SSR_Auth() {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    return { roles: null, userId: null, token: null, profile_user: null };
  }

  try {
    const decoded: any = jwtDecode(token);

    const response = await axios.get(`${BeUrl}/users/${decoded.sub}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      roles: decoded.roles,
      userId: decoded.sub,
      token: token,
      profile_user: response.data.result.data,
    };
  } catch (error: any) {
    console.log("SSR: Token lỗi hoặc hết hạn. Để Client tự xử lý.");
    return { roles: null, userId: null, token: null, profile_user: null };
  }
}
