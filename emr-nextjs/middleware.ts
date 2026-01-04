import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get auth token from cookies or header (set by client via cookie)
  const token = request.cookies.get("authToken")?.value || request.headers.get("x-auth-token");

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard"];

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Auth guard: redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If already logged in and accessing login page, redirect to dashboard
  if (pathname === "/auth/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which routes use middleware
export const config = {
  matcher: [
    // Include dashboard and auth routes
    "/dashboard/:path*",
    "/auth/:path*",
    // Exclude static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
