import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    // 管理者権限チェック
    const authResult = await checkAdminAuth();
    if (!authResult.isAdmin) {
      return authResult.response;
    }

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
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "統計情報の取得に失敗しました" },
      { status: 500 }
    );
  }
}

