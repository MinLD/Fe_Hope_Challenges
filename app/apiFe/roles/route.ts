import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/app/types/user";
export async function GET() {
  try {
    const token = (await cookies()).get("authToken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded: DecodedToken = await jwtDecode(token);
    console.log("Decoded token:", decoded);
    return NextResponse.json({ roles: decoded.roles }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
