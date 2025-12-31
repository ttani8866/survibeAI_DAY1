import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    // セッション取得
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    // 管理者チェック
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e);
    
    if (!adminEmails.includes(session.user.email.toLowerCase())) {
      return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 });
    }

    await connectDB();

    // お問合せ一覧を取得（新しい順）
    const contacts = await Contact.find()
      .select("_id name email subject message createdAt")
      .sort({ createdAt: -1 })
      .lean();

    // _idをidに変換
    const formattedContacts = contacts.map((contact) => ({
      id: contact._id.toString(),
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
      createdAt: contact.createdAt,
    }));

    return NextResponse.json({ contacts: formattedContacts });
  } catch (error: any) {
    console.error("Contacts API error:", error);
    return NextResponse.json(
      { 
        error: "お問合せ一覧の取得に失敗しました", 
        detail: error.message || String(error),
        code: error.code || "UNKNOWN_ERROR"
      },
      { status: 500 }
    );
  }
}

