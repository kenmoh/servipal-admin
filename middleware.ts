import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get("access_token")?.value;
  const t = request.cookies.get("access_token");
  const x = request.cookies.has("access_token");

  console.log("Middleware executing for path:", pathname);
  console.log("Token present:", !!cookie);
  console.log("Cookies:", request.cookies.getAll());

  console.log(`[Middleware] Path: ${pathname}`);
  console.log(`[Middleware] Has token: ${!!cookie}`);
  console.log(`[Middleware] Token: ${t} ============= ${x}`);
  console.log(`[Middleware] Has t ${t} ===============`);

  if (pathname.startsWith("/auth") && cookie) {
    console.log("Redirecting to dashboard - user is authenticated");
    console.log(`[Middleware] Redirecting authenticated user to dashboard`);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (pathname.startsWith("/dashboard")) {
    console.log("Redirecting to auth - user is not authenticated");
    console.log(`[Middleware] Redirecting unauthenticated user to auth`);
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Allow access if no conditions match
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Add routes that need protection
    "/dashboard/:path*",
  ],
};
