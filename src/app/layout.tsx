import * as React from "react";
import { Providers } from "./providers";

export const metadata = {
  title: "SurviveAI - AIコードレビュー学習サービス",
  description: "AIがあなたのコードを24時間レビュー。プロのようなコードを書けるようになる。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
