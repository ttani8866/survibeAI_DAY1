import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    // デバッグ: セッション情報を取得して返す
    const session = await getServerSession(authOptions);
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e);
    
    console.log("Stats API Debug:", {
      session: session,
      adminEmails: adminEmails,
      env_admin: process.env.ADMIN_EMAILS
    });

    // 一時的にセッションなしでもDB接続テスト
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

