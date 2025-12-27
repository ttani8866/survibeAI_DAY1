"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  Chip,
  Button,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import AuthHeader from "@/components/AuthHeader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import Link from "next/link";
import {
  getProgress,
  UserProgress,
  getXpForNextLevel,
  isStepCompleted,
} from "@/lib/progress";

const stepsConfig = [
  {
    step: "01",
    title: "アイデア・要件定義",
    content: "何を作る？誰のため？サービス設計の基本を学ぼう。",
    phase: "企画",
    phaseColor: "#f59e0b",
  },
  {
    step: "02",
    title: "ワイヤーフレーム設計",
    content: "画面構成とユーザーフローを設計。UXの基礎を学ぼう。",
    phase: "設計",
    phaseColor: "#8b5cf6",
  },
  {
    step: "03",
    title: "デザイン・テイスト決定",
    content: "色、フォント、雰囲気。UIデザインの基礎を学ぼう。",
    phase: "設計",
    phaseColor: "#8b5cf6",
  },
  {
    step: "04",
    title: "環境構築・はじめの一歩",
    content: "VS Code、Node.js、Git。開発環境を整えよう。",
    phase: "準備",
    phaseColor: "#10b981",
  },
  {
    step: "05",
    title: "HTML/CSSでUIを作る",
    content: "デザインをコードに。Webページの見た目を作ろう。",
    phase: "実装",
    phaseColor: "#6366f1",
  },
  {
    step: "06",
    title: "JavaScriptで動きをつける",
    content: "クリック、入力、表示切替。インタラクションを実装。",
    phase: "実装",
    phaseColor: "#6366f1",
  },
  {
    step: "07",
    title: "Webの仕組みを理解する",
    content: "HTTP、API、サーバーとクライアント。通信の基礎。",
    phase: "理解",
    phaseColor: "#ec4899",
  },
  {
    step: "08",
    title: "Reactでモダンに書き換え",
    content: "コンポーネント設計。モダンなフロントエンド開発。",
    phase: "実装",
    phaseColor: "#6366f1",
  },
  {
    step: "09",
    title: "生成AI APIを組み込む",
    content: "OpenAI API連携。AIをアプリに組み込もう。",
    phase: "実装",
    phaseColor: "#6366f1",
  },
  {
    step: "10",
    title: "世界に公開する",
    content: "Vercelでデプロイ。あなたのアプリを世界へ。",
    phase: "公開",
    phaseColor: "#ef4444",
  },
];

interface StepCardProps {
  step: string;
  title: string;
  content: string;
  phase: string;
  phaseColor: string;
  isCompleted: boolean;
  index: number;
}

const StepCard = ({
  step,
  title,
  content,
  phase,
  phaseColor,
  isCompleted,
  index,
}: StepCardProps) => {
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
          bgcolor: isCompleted
            ? "rgba(16, 185, 129, 0.05)"
            : "rgba(255,255,255,0.03)",
          border: "1px solid",
          borderColor: isCompleted
            ? "rgba(16, 185, 129, 0.3)"
            : "rgba(255,255,255,0.1)",
          color: "#fff",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          gap: 4,
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: isCompleted ? "rgba(16, 185, 129, 0.5)" : phaseColor,
            transform: "translateY(-2px)",
            boxShadow: isCompleted
              ? "0 10px 40px rgba(16, 185, 129, 0.1)"
              : `0 10px 40px ${phaseColor}20`,
          },
        }}
      >
        {/* Step Number */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: isCompleted ? "rgba(16, 185, 129, 0.5)" : `${phaseColor}50`,
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
            {isCompleted && (
              <Chip
                icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                label="完了"
                size="small"
                sx={{
                  bgcolor: "rgba(16, 185, 129, 0.2)",
                  color: "#10b981",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  "& .MuiChip-icon": { color: "#10b981" },
                }}
              />
            )}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#fff",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {content}
          </Typography>
        </Box>

        {/* Action Button */}
        <Button
          component={Link}
          href={`/learn/step${step}`}
          variant="contained"
          startIcon={isCompleted ? <ReplayIcon /> : <PlayArrowIcon />}
          sx={{
            bgcolor: isCompleted ? "rgba(255,255,255,0.1)" : phaseColor,
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            "&:hover": {
              bgcolor: isCompleted ? "rgba(255,255,255,0.2)" : phaseColor,
              filter: isCompleted ? "none" : "brightness(1.1)",
            },
          }}
        >
          {isCompleted ? "復習する" : "学習する"}
        </Button>
      </Paper>
    </motion.div>
  );
};

export default function LearningPathPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const completedCount = progress?.completedSteps.length || 0;
  const currentXP = progress?.xp || 0;
  const currentLevel = progress?.level || 1;
  const nextLevelXP = getXpForNextLevel(currentLevel);
  const prevLevelXP = currentLevel > 1 ? getXpForNextLevel(currentLevel - 1) : 0;
  const levelProgress =
    nextLevelXP > prevLevelXP
      ? ((currentXP - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100
      : 0;

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
              mb: 4,
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
                {completedCount}/10
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}
              >
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
                Lv.{currentLevel}
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}
              >
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
                {currentXP}
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}
              >
                獲得XP
              </Typography>
            </Box>
          </Box>

          {/* Level Progress Bar */}
          {progress && (
            <Box sx={{ maxWidth: 400, mx: "auto", mb: 8 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}
                >
                  Lv.{currentLevel}
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}
                >
                  {currentXP} / {nextLevelXP} XP
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(levelProgress, 100)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.1)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  },
                }}
              />
            </Box>
          )}

          {/* Badges */}
          {progress && progress.badges.length > 0 && (
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.875rem",
                  mb: 2,
                }}
              >
                獲得バッジ
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {progress.badges.map((badge, idx) => (
                  <Chip
                    key={idx}
                    label={badge}
                    sx={{
                      bgcolor: "rgba(245, 158, 11, 0.1)",
                      color: "#f59e0b",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </motion.div>

        {/* Steps */}
        <Stack spacing={3}>
          {stepsConfig.map((item, index) => (
            <StepCard
              key={item.step}
              step={item.step}
              title={item.title}
              content={item.content}
              phase={item.phase}
              phaseColor={item.phaseColor}
              isCompleted={
                progress
                  ? isStepCompleted(`step${item.step}`)
                  : false
              }
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
                completedCount === 10
                  ? "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
              border:
                completedCount === 10
                  ? "1px solid rgba(245, 158, 11, 0.3)"
                  : "1px solid rgba(99, 102, 241, 0.3)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              {completedCount === 10 ? "🏆 全STEP完了！" : "🎯 ゴール"}
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.7)", fontSize: "1.125rem" }}
            >
              {completedCount === 10 ? (
                <>
                  おめでとうございます！あなたは
                  <strong style={{ color: "#f59e0b" }}>マスター</strong>
                  になりました！
                </>
              ) : (
                <>
                  10STEPを完了すると、あなただけの
                  <br />
                  <strong style={{ color: "#fff" }}>
                    「生成AIラーニングアプリ」
                  </strong>
                  が完成し、世界に公開できます！
                </>
              )}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
