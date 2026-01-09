import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Temporarily disabled for testing
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
