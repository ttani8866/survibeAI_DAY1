import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `あなたは熟練のエンジニアです。以下の${language}のコードをレビューし、JSON形式で結果を返してください。

レビュー対象のコード:
\`\`\`${language}
${code}
\`\`\`

出力形式（JSONのみ、他の説明は不要）:
{
  "score": 0から100の数値,
  "summary": "全体の要約（100文字程度）",
  "goodPoints": ["良い点のリスト"],
  "improvements": ["改善点のリスト"],
  "suggestions": ["具体的な提案のリスト"]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonResponse = JSON.parse(text);
      return NextResponse.json(jsonResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", text);
      return NextResponse.json(
        { error: "AIの応答を解析できませんでした" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Gemini Code Review Error:", error);
    return NextResponse.json(
      { error: "コードレビューでエラーが発生しました", detail: error.message },
      { status: 500 }
    );
  }
}

