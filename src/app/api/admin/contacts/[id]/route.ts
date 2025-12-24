import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

// お問合せ削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 管理者権限チェック
    const authResult = await checkAdminAuth();
    if (!authResult.isAdmin) {
      return authResult.response;
    }

    const { id } = await params;

    await connectDB();

    // 対象のお問合せを確認
    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { error: "お問合せが見つかりません" },
        { status: 404 }
      );
    }

    await Contact.findByIdAndDelete(id);

    return NextResponse.json({ message: "お問合せを削除しました" });
  } catch (error) {
    console.error("Contact delete error:", error);
    return NextResponse.json(
      { error: "お問合せの削除に失敗しました" },
      { status: 500 }
    );
  }
}

