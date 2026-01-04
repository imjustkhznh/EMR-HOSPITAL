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

  // In development, allow access without token (comment out for production)
  const isDevelopment = process.env.NODE_ENV === "development";

  // If accessing protected route without token, redirect to login (skip in dev)
  if (isProtectedRoute && !token && !isDevelopment) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If accessing login while authenticated, redirect to dashboard
  if (pathname === "/auth/login" && token) {
    return NextResponse.redirect(new URL("/dashboard/dashboard", request.url));
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
