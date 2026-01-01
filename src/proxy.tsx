import { NextResponse } from "next/server";

export function proxy(req: any) {
  const token = req.cookies.get("accessToken");

  console.log(token)

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*","/board/:path*",'/'],
};
