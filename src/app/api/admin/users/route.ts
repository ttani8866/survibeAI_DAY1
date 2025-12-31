import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    // セッション取得
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    // 管理者チェック（開発・デモ用：ログイン済みなら誰でも許可）
    if (!session?.user?.email) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    await connectDB();

    // ユーザー一覧を取得（新しい順）
    const users = await User.find()
      .select("_id name email image role createdAt")
      .sort({ createdAt: -1 })
      .lean();

    // _idをidに変換
    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
    }));

    return NextResponse.json({ users: formattedUsers });
  } catch (error: any) {
    console.error("Users API error:", error);
    return NextResponse.json(
      { 
        error: "ユーザー一覧の取得に失敗しました", 
        detail: error.message || String(error),
        code: error.code || "UNKNOWN_ERROR"
      },
      { status: 500 }
    );
  }
}

