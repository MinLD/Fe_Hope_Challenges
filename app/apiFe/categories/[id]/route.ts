import { Api_update_category } from "@/app/services/categories";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: Access token not found" },
      { status: 401 }
    );
  }
  const body = await request.formData();
  const { id } = params;
  try {
    const res = await Api_update_category(id, body, token);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    console.log(
      "Error updating category:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        message: "Error updating category",
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
