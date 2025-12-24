"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Container } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a0a",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            p: 6,
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* アイコン */}
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              bgcolor: "rgba(239, 68, 68, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 4,
            }}
          >
            <BlockIcon sx={{ fontSize: 50, color: "#ef4444" }} />
          </Box>

          {/* エラーコード */}
          <Typography
            variant="h1"
            fontWeight={800}
            sx={{
              fontSize: { xs: "4rem", md: "6rem" },
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            403
          </Typography>

          {/* タイトル */}
          <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
            sx={{ color: "#fff" }}
          >
            アクセス権限がありません
          </Typography>

          {/* 説明 */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              mb: 4,
              lineHeight: 1.8,
            }}
          >
            このページは管理者専用です。
            <br />
            アクセス権限が必要な場合は、管理者にお問い合わせください。
          </Typography>

          {/* ボタン */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={() => router.back()}
              sx={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                px: 4,
                py: 1.5,
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.4)",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              戻る
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push("/dashboard")}
              sx={{
                bgcolor: "#f97316",
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "#ea580c" },
              }}
            >
              ダッシュボードへ
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

