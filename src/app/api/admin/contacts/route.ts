import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    // 管理者権限チェック
    const authResult = await checkAdminAuth();
    if (!authResult.isAdmin) {
      return authResult.response;
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
  } catch (error) {
    console.error("Contacts API error:", error);
    return NextResponse.json(
      { error: "お問合せ一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}

