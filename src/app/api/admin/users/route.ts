import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    // 管理者権限チェック
    const authResult = await checkAdminAuth();
    if (!authResult.isAdmin) {
      return authResult.response;
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
  } catch (error) {
    console.error("Users API error:", error);
    return NextResponse.json(
      { error: "ユーザー一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}

