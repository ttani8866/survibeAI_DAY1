"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import AuthHeader from "@/components/AuthHeader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "アイデア・要件定義",
    content: "何を作る？誰のため？サービス設計の基本を学ぼう。",
    phase: "企画",
    phaseColor: "#f59e0b",
    status: "available", // available, locked, completed
  },
  {
    step: "02",
    title: "ワイヤーフレーム設計",
    content: "画面構成とユーザーフローを設計。UXの基礎を学ぼう。",
    phase: "設計",
    phaseColor: "#8b5cf6",
    status: "locked",
  },
  {
    step: "03",
    title: "デザイン・テイスト決定",
    content: "色、フォント、雰囲気。UIデザインの基礎を学ぼう。",
    phase: "設計",
    phaseColor: "#8b5cf6",
    status: "locked",
  },
  {
    step: "04",
    title: "環境構築・はじめの一歩",
    content: "VS Code、Node.js、Git。開発環境を整えよう。",
    phase: "準備",
    phaseColor: "#10b981",
    status: "locked",
  },
  {
    step: "05",
    title: "HTML/CSSでUIを作る",
    content: "デザインをコードに。Webページの見た目を作ろう。",
    phase: "実装",
    phaseColor: "#6366f1",
    status: "locked",
  },
  {
    step: "06",
    title: "JavaScriptで動きをつける",
    content: "クリック、入力、表示切替。インタラクションを実装。",
    phase: "実装",
    phaseColor: "#6366f1",
    status: "locked",
  },
  {
    step: "07",
    title: "Webの仕組みを理解する",
    content: "HTTP、API、サーバーとクライアント。通信の基礎。",
    phase: "理解",
    phaseColor: "#ec4899",
    status: "locked",
  },
  {
    step: "08",
    title: "Reactでモダンに書き換え",
    content: "コンポーネント設計。モダンなフロントエンド開発。",
    phase: "実装",
    phaseColor: "#6366f1",
    status: "locked",
  },
  {
    step: "09",
    title: "生成AI APIを組み込む",
    content: "OpenAI API連携。AIをアプリに組み込もう。",
    phase: "実装",
    phaseColor: "#6366f1",
    status: "locked",
  },
  {
    step: "10",
    title: "世界に公開する",
    content: "Vercelでデプロイ。あなたのアプリを世界へ。",
    phase: "公開",
    phaseColor: "#ef4444",
    status: "locked",
  },
];

interface StepCardProps {
  step: string;
  title: string;
  content: string;
  phase: string;
  phaseColor: string;
  status: string;
  index: number;
}

const StepCard = ({
  step,
  title,
  content,
  phase,
  phaseColor,
  status,
  index,
}: StepCardProps) => {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Paper
        sx={{
          p: 4,
          bgcolor: isLocked
            ? "rgba(255,255,255,0.02)"
            : "rgba(255,255,255,0.03)",
          border: "1px solid",
          borderColor: isLocked
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.1)",
          color: "#fff",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          gap: 4,
          opacity: isLocked ? 0.6 : 1,
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: isLocked ? "rgba(255,255,255,0.05)" : phaseColor,
            transform: isLocked ? "none" : "translateY(-2px)",
            boxShadow: isLocked ? "none" : `0 10px 40px ${phaseColor}20`,
          },
        }}
      >
        {/* Step Number */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: isLocked ? "rgba(255,255,255,0.1)" : `${phaseColor}50`,
            minWidth: 80,
          }}
        >
          {step}
        </Typography>

        {/* Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 1,
              flexWrap: "wrap",
            }}
          >
            <Chip
              label={phase}
              size="small"
              sx={{
                bgcolor: `${phaseColor}20`,
                color: phaseColor,
                fontWeight: 600,
                fontSize: "0.7rem",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: isLocked ? "rgba(255,255,255,0.4)" : "#fff",
              }}
            >
              {isCompleted && <CheckCircleIcon sx={{ color: "#10b981" }} />}
              {isLocked && (
                <LockIcon sx={{ color: "rgba(255,255,255,0.3)", fontSize: 20 }} />
              )}
              {title}
            </Typography>
          </Box>
          <Typography
            sx={{
              color: isLocked
                ? "rgba(255,255,255,0.3)"
                : "rgba(255,255,255,0.6)",
            }}
          >
            {content}
          </Typography>
        </Box>

        {/* Action Button */}
        {!isLocked && (
          <Button
            component={Link}
            href={`/learn/step${step}`}
            variant="contained"
            endIcon={<PlayArrowIcon />}
            sx={{
              bgcolor: phaseColor,
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              "&:hover": {
                bgcolor: phaseColor,
                filter: "brightness(1.1)",
              },
            }}
          >
            {isCompleted ? "復習する" : "学習する"}
          </Button>
        )}
      </Paper>
    </motion.div>
  );
};

export default function LearningPathPage() {
  return (
    <Box
      sx={{ bgcolor: "#0a0a0a", minHeight: "100vh", color: "#fff", pt: 10 }}
    >
      <AuthHeader />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#a855f7",
              fontWeight: 700,
              letterSpacing: 2,
              display: "block",
              textAlign: "center",
            }}
          >
            LEARNING PATH
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mb: 2, textAlign: "center" }}
          >
            10-STEP Mastery
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.6)",
              mb: 2,
              textAlign: "center",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            「生成AIラーニングアプリ」を作りながら
            <br />
            プログラミングと生成AIを楽しく学ぼう
          </Typography>

          {/* Progress Overview */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mb: 8,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                0/10
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
                完了STEP
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #10b981, #34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Lv.1
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
                現在レベル
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                0
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
                獲得XP
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Steps */}
        <Stack spacing={3}>
          {steps.map((item, index) => (
            <StepCard
              key={item.step}
              step={item.step}
              title={item.title}
              content={item.content}
              phase={item.phase}
              phaseColor={item.phaseColor}
              status={item.status}
              index={index}
            />
          ))}
        </Stack>

        {/* Goal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              mt: 8,
              p: 6,
              borderRadius: 4,
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              🎯 ゴール
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.7)", fontSize: "1.125rem" }}
            >
              10STEPを完了すると、あなただけの
              <br />
              <strong style={{ color: "#fff" }}>
                「生成AIラーニングアプリ」
              </strong>
              が完成し、世界に公開できます！
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
