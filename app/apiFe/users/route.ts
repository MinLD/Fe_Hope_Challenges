import { Api_Users } from "@/app/services/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: Access token not found" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const per_page = parseInt(searchParams.get("per_page") || "5", 10);

  try {
    const response = await Api_Users(token, page, per_page);
    const { users, pagination } = response?.data?.result?.data;
    return NextResponse.json({ users, pagination });
  } catch (error: any) {
    console.error("Error fetching users in API route:", error);
    return NextResponse.json(
      { message: "Failed to fetch users", error: error.message },
      { status: error.response.status }
    );
  }
}
