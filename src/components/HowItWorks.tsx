"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CodeIcon from "@mui/icons-material/Code";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const steps = [
  {
    number: "01",
    title: "アカウント作成",
    description:
      "メールアドレスまたはGoogleアカウントで簡単登録。30秒で完了します。",
    icon: PersonAddIcon,
  },
  {
    number: "02",
    title: "コードを書く",
    description:
      "エディタでコードを書くと、AIがリアルタイムで分析を開始します。",
    icon: CodeIcon,
  },
  {
    number: "03",
    title: "フィードバック確認",
    description:
      "AIからの具体的な改善提案を確認。なぜそうすべきかも丁寧に解説。",
    icon: LightbulbIcon,
  },
  {
    number: "04",
    title: "スキルアップ",
    description:
      "繰り返し学習することで、プロレベルのコーディングスキルを習得。",
    icon: TrendingUpIcon,
  },
];

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
  isLast: boolean;
}

const StepCard = ({
  number,
  title,
  description,
  icon: Icon,
  index,
  isLast,
}: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: 3, md: 4 },
          position: "relative",
          pb: isLast ? 0 : 6,
        }}
      >
        {/* タイムラインのドットと線 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {/* アイコン付きの円 */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Icon sx={{ fontSize: 28, color: "#fff" }} />
          </Box>
          {/* 接続線 */}
          {!isLast && (
            <Box
              sx={{
                width: 2,
                flexGrow: 1,
                background:
                  "linear-gradient(180deg, rgba(99, 102, 241, 0.6) 0%, rgba(99, 102, 241, 0.1) 100%)",
                minHeight: 60,
              }}
            />
          )}
        </Box>

        {/* コンテンツ */}
        <Box sx={{ pt: 1, pb: 2 }}>
          <Typography
            variant="overline"
            sx={{
              color: "#6366f1",
              letterSpacing: "0.2em",
              fontSize: "0.75rem",
              fontWeight: 700,
              mb: 1,
              display: "block",
            }}
          >
            STEP {number}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: "#fff",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.8,
              maxWidth: 400,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default function HowItWorks() {
  return (
    <Box
      sx={{
        py: 15,
        bgcolor: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 背景グラデーション */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.3em",
              fontSize: "0.75rem",
              mb: 2,
              display: "block",
            }}
          >
            HOW IT WORKS
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 8,
              color: "#fff",
              fontSize: { xs: "1.75rem", md: "2.5rem" },
            }}
          >
            簡単4ステップで始める
          </Typography>
        </motion.div>

        {/* ステップ一覧 */}
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

