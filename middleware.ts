import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/app/types/users";

const authPaths = ["/login", "/register"];
const privatePathsAdmin = ["/admin"];
const privatePaths = ["/account"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("access_token")?.value;

  let roles: string[] | null = null;
  if (sessionToken) {
    try {
      const decoded: DecodedToken = jwtDecode(sessionToken);
      roles = decoded.roles;
    } catch (error) {
      console.error("Invalid token in middleware:", error);
    }
  }

  // if isn't admin then return to home
  if (privatePathsAdmin.some((path) => pathname.startsWith(path))) {
    if (!roles?.includes("admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // if was tokened then return to home
  if (authPaths.some((path) => pathname.startsWith(path))) {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // if wasn't tokened then return to login
  if (privatePaths.some((path) => pathname.startsWith(path))) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  //if admin has in roles then redirect from home to admin dashboard
  if (pathname === "/") {
    if (roles?.includes("admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|apiFe/|_next/static|_next/image|favicon.ico).*)"],
};
