import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get auth token from cookies
  const token = request.cookies.get("authToken")?.value;

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard"];

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If accessing login while authenticated, redirect to dashboard
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which routes use middleware
export const config = {
  matcher: [
    // Include dashboard and login routes
    "/dashboard/:path*",
    "/login",
    // Exclude static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
