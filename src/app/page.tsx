"use client";

import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import AuthHeader from "@/components/AuthHeader";
import MerryChristmasOverlay from "@/components/christmas/MerryChristmasOverlay";

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "#0a0a0a", color: "#fff" }}>
      {/* クリスマスウェルカムアニメーション */}
      <MerryChristmasOverlay />

      {/* Header */}
      <AuthHeader />

      {/* Hero Section with Animations */}
      <HeroSection />

      {/* Feature Cards with Scroll Animations */}
      <FeatureCards />

      {/* How It Works - 使い方ステップ */}
      <HowItWorks />

      {/* CTA Section with Shimmer Effect */}
      <CTASection />

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 6,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          bgcolor: "#050505",
        }}
      >
        <Container maxWidth="lg">
          {/* フッターメイン */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 4,
              mb: 4,
            }}
          >
            {/* ロゴ・ブランド */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                SurviveAI
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.875rem",
                  maxWidth: 300,
                }}
              >
                AIの力でプログラミングスキルを加速させる、次世代の学習プラットフォーム。
              </Typography>
            </Box>

            {/* ナビゲーションリンク */}
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, md: 4 },
                flexWrap: "wrap",
              }}
            >
              <Button
                component={Link}
                href="/features/code-review"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "none",
                  fontSize: "0.875rem",
                  minWidth: "auto",
                  p: 0,
                  "&:hover": { color: "#fff", bgcolor: "transparent" },
                }}
              >
                機能紹介
              </Button>
              <Button
                component={Link}
                href="/contact"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "none",
                  fontSize: "0.875rem",
                  minWidth: "auto",
                  p: 0,
                  "&:hover": { color: "#fff", bgcolor: "transparent" },
                }}
              >
                お問い合わせ
              </Button>
              <Button
                component={Link}
                href="/auth/signin"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "none",
                  fontSize: "0.875rem",
                  minWidth: "auto",
                  p: 0,
                  "&:hover": { color: "#fff", bgcolor: "transparent" },
                }}
              >
                ログイン
              </Button>
            </Box>
          </Box>

          {/* 区切り線 */}
          <Box
            sx={{
              height: 1,
              bgcolor: "rgba(255,255,255,0.1)",
              mb: 4,
            }}
          />

          {/* コピーライト */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.75rem",
              }}
            >
              © 2025 SurviveAI. All Rights Reserved.
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.75rem",
              }}
            >
              Made with ❤️ for developers
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
