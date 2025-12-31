import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    // セッション取得
    const session = await getServerSession(authOptions);
    console.log("Stats API - Session:", JSON.stringify(session));

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    // 管理者チェック（ADMIN_EMAILSから直接判定）
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e);
    
    const isAdmin = adminEmails.includes(session.user.email.toLowerCase());
    console.log("Stats API - Email:", session.user.email, "isAdmin:", isAdmin, "adminEmails:", adminEmails);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "管理者権限が必要です" },
        { status: 403 }
      );
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
      { error: "統計情報の取得に失敗しました", detail: String(error) },
      { status: 500 }
    );
  }
}

