import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];
const productEditRegex = /^\/products\/\d+\/edit$/;
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const sessionToken = request.cookies.get("sessionToken")?.value;

  // Nếu chưa đăng nhập, chặn vào private paths
  if (
    privatePaths.some((path) => pathName.startsWith(path) && !sessionToken) ||
    (pathName.match(productEditRegex) && !sessionToken)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Nếu đã đăng nhập, chặn vào các trang login, register
  if (authPaths.some((path) => pathName.startsWith(path) && sessionToken)) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/me", "/login", "/register", "/products/:path*"],
};
