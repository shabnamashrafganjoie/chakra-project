import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (isAdminRoute && token.role === "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};