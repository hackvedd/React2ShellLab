import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // If accessing /admin (but not /admin/login), check for auth cookie

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    const authCookie = request.cookies.get("auth");

    if (!authCookie || authCookie.value !== "true") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
