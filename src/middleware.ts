import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // 保護するパス
  const protectedPaths = ["/dashboard"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // 認証ページ
  const authPaths = ["/auth/signin"];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // 未認証ユーザーが保護ページにアクセス → ログインページへ
  if (isProtectedPath && !isLoggedIn) {
    const signInUrl = new URL("/auth/signin", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 認証済みユーザーが認証ページにアクセス → ダッシュボードへ
  if (isAuthPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};

