"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";

// 金色の紙吹雪の型
interface Confetti {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

// キラキラの型
interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

// 金色の紙吹雪コンポーネント
const GoldConfetti = () => {
  const [particles, setParticles] = useState<Confetti[]>([]);

  useEffect(() => {
    const newParticles: Confetti[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 8 + Math.random() * 12,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: "100vh",
            opacity: [0, 1, 1, 0],
            rotate: p.rotation + 360,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 0.6,
            borderRadius: "2px",
            background: `linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #D4AF37 100%)`,
            boxShadow: "0 0 8px rgba(255, 215, 0, 0.6)",
          }}
        />
      ))}
    </>
  );
};

// キラキラエフェクトコンポーネント
const Sparkles = ({ isActive }: { isActive: boolean }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (isActive) {
      const newSparkles: Sparkle[] = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40,
        size: 10 + Math.random() * 20,
        delay: Math.random() * 0.4,
      }));
      setSparkles(newSparkles);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, delay: s.delay }}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: s.size,
            zIndex: 10,
          }}
        >
          ✨
        </motion.div>
      ))}
    </>
  );
};

export default function NewYearOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [showSparkles, setShowSparkles] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<
    "enter" | "center" | "exit" | "done"
  >("enter");

  useEffect(() => {
    // アニメーションシーケンス
    const timer1 = setTimeout(() => {
      setAnimationPhase("center");
      setShowSparkles(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setAnimationPhase("exit");
      setShowSparkles(false);
    }, 3500);

    const timer3 = setTimeout(() => {
      setAnimationPhase("done");
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const getAnimationState = () => {
    switch (animationPhase) {
      case "enter":
        return { y: -100, opacity: 0, scale: 0.8 };
      case "center":
        return { y: 0, opacity: 1, scale: 1 };
      case "exit":
        return { y: 100, opacity: 0, scale: 0.8 };
      default:
        return { y: 0, opacity: 0, scale: 0.8 };
    }
  };

  if (animationPhase === "done") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            pointerEvents: "none",
            overflow: "hidden",
            // 初日の出グラデーション
            background: `linear-gradient(
              180deg,
              #1a0a2e 0%,
              #4a1942 20%,
              #8B0000 40%,
              #C41E3A 55%,
              #FF6B35 70%,
              #FFB347 85%,
              #FFD700 100%
            )`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 金色の紙吹雪 */}
          <GoldConfetti />

          {/* キラキラエフェクト */}
          <Sparkles isActive={showSparkles} />

          {/* 左の門松 */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: animationPhase === "center" ? 0 : -100,
              opacity: animationPhase === "center" ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: "5%",
              left: "5%",
              fontSize: "clamp(3rem, 8vw, 6rem)",
            }}
          >
            🎍
          </motion.div>

          {/* 右の門松 */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{
              x: animationPhase === "center" ? 0 : 100,
              opacity: animationPhase === "center" ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: "5%",
              right: "5%",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              transform: "scaleX(-1)",
            }}
          >
            🎍
          </motion.div>

          {/* メインコンテンツ */}
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.8 }}
            animate={getAnimationState()}
            transition={{
              duration: animationPhase === "exit" ? 1.5 : 1,
              ease: animationPhase === "exit" ? "easeIn" : "easeOut",
            }}
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
            }}
          >
            {/* 謹賀新年 */}
            <Box
              component="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "4rem", md: "5rem" },
                fontWeight: 900,
                fontFamily: "'Noto Serif JP', serif",
                letterSpacing: "0.2em",
                background:
                  "linear-gradient(135deg, #FFD700 0%, #FFF8DC 30%, #FFD700 50%, #FFF8DC 70%, #FFD700 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `
                  0 0 20px rgba(255, 215, 0, 0.8),
                  0 0 40px rgba(255, 215, 0, 0.6),
                  0 0 60px rgba(255, 215, 0, 0.4)
                `,
                animation: "shimmer 2s linear infinite",
                "@keyframes shimmer": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "100%": { backgroundPosition: "200% 50%" },
                },
                filter: "drop-shadow(0 0 30px rgba(255, 215, 0, 0.5))",
                mb: 2,
              }}
            >
              謹賀新年
            </Box>

            {/* 2025 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: animationPhase === "center" ? 1 : 0,
                opacity: animationPhase === "center" ? 1 : 0,
              }}
              transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
            >
              <Box
                sx={{
                  fontSize: { xs: "3rem", sm: "5rem", md: "7rem" },
                  fontWeight: 900,
                  fontFamily: "'Georgia', serif",
                  color: "#FFD700",
                  textShadow: `
                    0 0 10px rgba(255, 215, 0, 0.9),
                    0 0 30px rgba(255, 215, 0, 0.7),
                    2px 2px 4px rgba(0, 0, 0, 0.5)
                  `,
                  mb: 2,
                }}
              >
                🐍 2025 🐍
              </Box>
            </motion.div>

            {/* サブテキスト */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: animationPhase === "center" ? 1 : 0,
                y: animationPhase === "center" ? 0 : 20,
              }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Box
                sx={{
                  color: "#FFF8DC",
                  fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                  fontFamily: "'Noto Sans JP', sans-serif",
                  textShadow: "0 0 10px rgba(255,255,255,0.5)",
                  letterSpacing: "0.1em",
                }}
              >
                今年もよろしくお願いします
              </Box>
            </motion.div>

            {/* Welcome to SurviveAI */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: animationPhase === "center" ? 1 : 0,
              }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <Box
                sx={{
                  color: "rgba(255, 248, 220, 0.8)",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  mt: 3,
                  textShadow: "0 0 8px rgba(255,255,255,0.3)",
                }}
              >
                ✨ Welcome to SurviveAI ✨
              </Box>
            </motion.div>
          </motion.div>

          {/* 鏡餅 */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: animationPhase === "center" ? 1 : 0,
              scale: animationPhase === "center" ? 1 : 0,
            }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              position: "absolute",
              bottom: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            🎌
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

