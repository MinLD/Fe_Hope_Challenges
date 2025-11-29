import { axiosClient } from "@/app/services/api_client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  
  const response = await axiosClient.get(`/users/search?keyword=${keyword}`);
  const { users, pagination } = response?.data?.result?.data;
  return NextResponse.json({ users, pagination });
}
