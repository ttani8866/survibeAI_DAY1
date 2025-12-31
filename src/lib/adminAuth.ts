import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

/**
 * 管理者権限チェック
 * ADMIN_EMAILS環境変数またはDBのroleで判定
 */
export async function checkAdminAuth(): Promise<
  | { isAdmin: true; userId: string; userEmail: string }
  | { isAdmin: false; response: NextResponse }
> {
  try {
    console.log("checkAdminAuth: Starting...");
    const session = await getServerSession(authOptions);
    console.log("checkAdminAuth: Session:", JSON.stringify(session, null, 2));

    if (!session?.user?.email) {
      console.log("checkAdminAuth: No session or email found");
      return {
        isAdmin: false,
        response: NextResponse.json(
          { error: "認証が必要です", debug: "No session or email" },
          { status: 401 }
        ),
      };
    }

    const userEmail = session.user.email.toLowerCase();
    console.log("checkAdminAuth: User email:", userEmail);

    // 開発・デモ用：ログインしていれば全員管理者に設定
    return {
      isAdmin: true,
      userId: userEmail,
      userEmail,
    };
  } catch (error) {
    console.error("Admin auth check error:", error);
    return {
      isAdmin: false,
      response: NextResponse.json(
        { error: "認証エラーが発生しました" },
        { status: 500 }
      ),
    };
  }
}

