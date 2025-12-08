import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

// メールアドレス形式チェック
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // バリデーション
    const errors: string[] = [];

    if (!name || name.trim() === "") {
      errors.push("名前は必須です");
    }
    if (!email || email.trim() === "") {
      errors.push("メールアドレスは必須です");
    } else if (!isValidEmail(email)) {
      errors.push("有効なメールアドレスを入力してください");
    }
    if (!subject || subject.trim() === "") {
      errors.push("件名は必須です");
    }
    if (!message || message.trim() === "") {
      errors.push("本文は必須です");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // MongoDBに保存
    await connectDB();
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // メール送信（環境変数が設定されている場合のみ）
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.ADMIN_EMAIL
    ) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.ADMIN_EMAIL,
          subject: `【お問合せ】${subject}`,
          text: `
お問合せがありました。

【名前】
${name}

【メールアドレス】
${email}

【件名】
${subject}

【本文】
${message}

【送信日時】
${new Date().toLocaleString("ja-JP")}
          `.trim(),
          html: `
<h2>お問合せがありました</h2>
<table border="1" cellpadding="10" style="border-collapse: collapse;">
  <tr>
    <th style="background-color: #f5f5f5;">名前</th>
    <td>${name}</td>
  </tr>
  <tr>
    <th style="background-color: #f5f5f5;">メールアドレス</th>
    <td><a href="mailto:${email}">${email}</a></td>
  </tr>
  <tr>
    <th style="background-color: #f5f5f5;">件名</th>
    <td>${subject}</td>
  </tr>
  <tr>
    <th style="background-color: #f5f5f5;">本文</th>
    <td>${message.replace(/\n/g, "<br>")}</td>
  </tr>
  <tr>
    <th style="background-color: #f5f5f5;">送信日時</th>
    <td>${new Date().toLocaleString("ja-JP")}</td>
  </tr>
</table>
          `.trim(),
        });
      } catch (mailError) {
        console.error("メール送信エラー:", mailError);
        // メール送信失敗してもDB保存は成功しているので続行
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "お問合せを受け付けました",
        id: contact._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("お問合せ処理エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

