import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// ユーザー権限変更
export async function PUT(
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
    const body = await request.json();
    const { role } = body;

    if (!role || !["user", "admin"].includes(role)) {
      return NextResponse.json(
        { error: "無効な権限です" },
        { status: 400 }
      );
    }

    await connectDB();

    // 自分自身の権限変更を防止
    const targetUser = await User.findById(id);
    if (!targetUser) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    if (targetUser.email === authResult.userEmail) {
      return NextResponse.json(
        { error: "自分自身の権限は変更できません" },
        { status: 400 }
      );
    }

    // 権限を更新
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("_id name email image role createdAt");

    if (!updatedUser) {
      return NextResponse.json(
        { error: "ユーザーの更新に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json(
      { error: "ユーザーの更新に失敗しました" },
      { status: 500 }
    );
  }
}

// ユーザー削除
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

    // 対象ユーザーを確認
    const targetUser = await User.findById(id);
    if (!targetUser) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // 自分自身の削除を防止
    if (targetUser.email === authResult.userEmail) {
      return NextResponse.json(
        { error: "自分自身は削除できません" },
        { status: 400 }
      );
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "ユーザーを削除しました" });
  } catch (error) {
    console.error("User delete error:", error);
    return NextResponse.json(
      { error: "ユーザーの削除に失敗しました" },
      { status: 500 }
    );
  }
}

