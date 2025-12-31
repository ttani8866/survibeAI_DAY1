import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    // デバッグ: セッション情報を取得
    const session = await getServerSession(authOptions);
    
    // 管理者チェック（開発・デモ用：ログイン済みなら誰でも許可）
    if (!session?.user?.email) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }
    
    console.log("Stats API Access by:", session.user.email);

    await connectDB();

    // 統計情報を取得
    const [totalUsers, totalContacts] = await Promise.all([
      User.countDocuments(),
      Contact.countDocuments(),
    ]);

    return NextResponse.json({
      totalUsers,
      totalContacts,
    });
  } catch (error: any) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { 
        error: "統計情報の取得に失敗しました", 
        detail: error.message || String(error),
        code: error.code || "UNKNOWN_ERROR"
      },
      { status: 500 }
    );
  }
}

