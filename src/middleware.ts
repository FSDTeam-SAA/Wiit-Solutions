import { NextRequest, NextResponse } from "next/server";
// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("next-auth.session-token");
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
//   return NextResponse.next();
// }
export function middleware(req: NextRequest) {
  console.log("Middleware triggered:", req.nextUrl.pathname);

  const token =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
