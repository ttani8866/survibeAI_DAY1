import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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
    const session = await getServerSession();

    if (!session?.user?.email) {
      return {
        isAdmin: false,
        response: NextResponse.json(
          { error: "認証が必要です" },
          { status: 401 }
        ),
      };
    }

    const userEmail = session.user.email.toLowerCase();

    // ADMIN_EMAILS環境変数から管理者判定（優先）
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email);
    
    const isAdminByEnv = adminEmails.includes(userEmail);

    // DBからユーザー情報を取得（userId取得のため）
    let userId = "";
    try {
      await connectDB();
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        userId = user._id.toString();
        // DBのroleでも管理者判定
        if (user.role === "admin") {
          return {
            isAdmin: true,
            userId,
            userEmail,
          };
        }
      }
    } catch (dbError) {
      console.error("DB connection error in adminAuth:", dbError);
      // DB接続失敗でもADMIN_EMAILSで判定を続行
    }

    // ADMIN_EMAILSで管理者と判定された場合
    if (isAdminByEnv) {
      return {
        isAdmin: true,
        userId: userId || userEmail, // DBにユーザーがなければemailをIDとして使用
        userEmail,
      };
    }

    return {
      isAdmin: false,
      response: NextResponse.json(
        { error: "管理者権限が必要です" },
        { status: 403 }
      ),
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

