import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "SurviveAI",
  description: "AI Programming Learning Service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
