"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, Container, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

// コードパーティクルの型定義
interface Particle {
  id: number;
  x: number;
  char: string;
  duration: number;
  delay: number;
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

// コードパーティクルコンポーネント
const CodeParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const codeChars = ["<", ">", "/", "{", "}", "(", ")", ";", "=", "0", "1"];

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      char: codeChars[Math.floor(Math.random() * codeChars.length)],
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 15,
    }));
    setParticles(newParticles);
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
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-100vh", opacity: [0, 0.1, 0.1, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            color: "rgba(255,255,255,0.1)",
            fontSize: "1.5rem",
            fontFamily: "monospace",
          }}
        >
          {particle.char}
        </motion.div>
      ))}
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
      {/* 背景グラデーション */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* コードパーティクル */}
      <CodeParticles />

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

          {/* CODE - 1文字ずつアニメーション */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ display: "flex", overflow: "hidden" }}
          >
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
              無料で始める
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

