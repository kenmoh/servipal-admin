import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  // Redirect authenticated users away from the auth pages
  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Allow access if no conditions match
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Add routes that need protection
    "/dashboard/:path*",
    "/auth/:path*",
  ],
};
