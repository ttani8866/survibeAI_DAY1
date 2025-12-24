import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 保護するパス（認証必須）
  const protectedPaths = ["/dashboard"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // 管理者専用パス
  const adminPaths = ["/admin"];
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));

  // 認証ページ
  const authPaths = ["/auth/signin"];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // 未認証ユーザーが保護ページにアクセス → ログインページへ
  if ((isProtectedPath || isAdminPath) && !token) {
    const signInUrl = new URL("/auth/signin", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 認証済みだが管理者以外が管理画面にアクセス → 403ページへ
  if (isAdminPath && token && token.role !== "admin") {
    return NextResponse.redirect(new URL("/admin/forbidden", req.nextUrl.origin));
  }

  // 認証済みユーザーが認証ページにアクセス → ダッシュボードへ
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/admin/:path*"],
};
