"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, Container, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

// 雪の結晶の型定義
interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  sway: number;
}

// 文字アニメーション用Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// 雪のアニメーションコンポーネント
const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const newSnowflakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 4 + Math.random() * 12, // 4px〜16pxのバリエーション
      duration: 8 + Math.random() * 12, // 8〜20秒で落下
      delay: Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.5, // 0.3〜0.8の透明度
      sway: 20 + Math.random() * 40, // 左右の揺れ幅
    }));
    setSnowflakes(newSnowflakes);
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          initial={{ y: -20, x: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, flake.sway, -flake.sway, 0],
            opacity: [0, flake.opacity, flake.opacity, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: flake.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            position: "absolute",
            left: `${flake.x}%`,
            width: flake.size,
            height: flake.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, #fff 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
            boxShadow: `0 0 ${flake.size}px rgba(255,255,255,0.3)`,
          }}
        />
      ))}
    </Box>
  );
};

// 小さなクリスマスツリー（CODE INNOVATORの左上用）
const MiniChristmasTree = () => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: 0.6,
        mr: 2,
        transform: "translateY(-10px)",
      }}
    >
      {/* 星 */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          fontSize: "16px",
          marginBottom: "-2px",
        }}
      >
        ⭐
      </motion.div>
      {/* ツリー本体（絵文字） */}
      <Box sx={{ fontSize: "40px", lineHeight: 1 }}>🎄</Box>
    </Box>
  );
};

export default function HeroSection() {
  const titleLine1 = "CODE";
  const titleLine2 = "INNOVATOR";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a0a",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 背景グラデーション - クリスマスカラー */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 40%), radial-gradient(ellipse at 20% 80%, rgba(34, 139, 34, 0.1) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* 雪のアニメーション */}
      <Snowfall />


      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: 800 }}>
          {/* WE ARE A */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
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
              WE ARE A
            </Typography>
          </motion.div>

          {/* CODE - 1文字ずつアニメーション + ツリー */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ display: "flex", alignItems: "flex-end", overflow: "hidden" }}
          >
            {/* 左上のクリスマスツリー */}
            <MiniChristmasTree />
            {titleLine1.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(3rem, 10vw, 5.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  display: "inline-block",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* INNOVATOR - 1文字ずつアニメーション */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ display: "flex", overflow: "hidden", marginBottom: "2rem" }}
          >
            {titleLine2.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(3rem, 10vw, 5.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* サブテキスト */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ delay: 0.8 }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "1.125rem",
                lineHeight: 1.8,
                maxWidth: 500,
                mb: 5,
              }}
            >
              AIがあなたのコードを24時間レビュー。
              <br />
              プロフェッショナルなコードを書くための、
              <br />
              新しいスタンダードを創造する。
            </Typography>
          </motion.div>

          {/* ボタン */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ delay: 1 }}
            style={{ display: "flex", gap: "1rem" }}
          >
            <Button
              component={Link}
              href="/onboarding/signup"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#fff",
                color: "#0a0a0a",
                textTransform: "none",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 0,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              はじめる
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              size="large"
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.3)",
                textTransform: "none",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 0,
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "transparent",
                },
              }}
            >
              お問い合わせ
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

