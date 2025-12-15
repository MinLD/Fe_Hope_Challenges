// ssrs/auth.ts
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BeUrl } from "@/app/services/api_client";

export async function SSR_Auth() {
  try {
    // ✅ Next 16 Fix: Explicit await + better error handling
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return { roles: null, userId: null, token: null, profile_user: null };
    }

    // ✅ Next 16 Fix: Proper error handling for token decode
    let decoded: any;
    try {
      decoded = jwtDecode(token);
    } catch (decodeError) {
      console.error("[SSR_Auth] Token decode error:", decodeError);
      return { roles: null, userId: null, token: null, profile_user: null };
    }

    // ✅ Next 16 Fix: Validate token structure
    if (!decoded?.sub) {
      console.warn("[SSR_Auth] Invalid token structure: missing 'sub'");
      return { roles: null, userId: null, token: null, profile_user: null };
    }

    const response = await axios.get(`${BeUrl}/users/${decoded.sub}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      roles: decoded.roles || [],
      userId: decoded.sub,
      token: token,
      profile_user: response.data.result.data,
    };
  } catch (error: any) {
    console.warn("[SSR_Auth] Authentication error - Client will handle:", error.message);
    return { roles: null, userId: null, token: null, profile_user: null };
  }
}
