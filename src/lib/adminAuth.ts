import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

/**
 * 管理者権限チェック
 * @returns {Promise<{isAdmin: true, userId: string} | {isAdmin: false, response: NextResponse}>}
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

    await connectDB();

    // DBからユーザーを取得して権限確認
    const user = await User.findOne({ email: session.user.email });

    if (!user || user.role !== "admin") {
      return {
        isAdmin: false,
        response: NextResponse.json(
          { error: "管理者権限が必要です" },
          { status: 403 }
        ),
      };
    }

    return {
      isAdmin: true,
      userId: user._id.toString(),
      userEmail: session.user.email,
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

