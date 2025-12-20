"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";

// 雪のパーティクルの型
interface SnowParticle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

// キラキラの型
interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

// 雪のパーティクルコンポーネント
const SnowParticles = () => {
  const [particles, setParticles] = useState<SnowParticle[]>([]);

  useEffect(() => {
    const newParticles: SnowParticle[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 3 + Math.random() * 8,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: "100vh", opacity: [0, 1, 1, 0] }}
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
            height: p.size,
            borderRadius: "50%",
            background: "white",
            boxShadow: "0 0 10px rgba(255,255,255,0.8)",
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
      const newSparkles: Sparkle[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 40 + Math.random() * 20, // 中央付近
        y: 40 + Math.random() * 20,
        size: 5 + Math.random() * 15,
        delay: Math.random() * 0.3,
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
          transition={{ duration: 0.6, delay: s.delay }}
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

export default function MerryChristmasOverlay() {
  const [isVisible, setIsVisible] = useState(true); // 最初から表示
  const [showSparkles, setShowSparkles] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<"enter" | "center" | "exit" | "done">("enter");

  useEffect(() => {
    // アニメーションシーケンス
    // 1秒後に中央到達
    const timer1 = setTimeout(() => {
      setAnimationPhase("center");
      setShowSparkles(true);
    }, 1000);

    // 2.5秒後に退出開始
    const timer2 = setTimeout(() => {
      setAnimationPhase("exit");
      setShowSparkles(false);
    }, 2500);

    // 4秒後に完全に非表示
    const timer3 = setTimeout(() => {
      setAnimationPhase("done");
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // アニメーション状態を計算
  const getAnimationState = () => {
    switch (animationPhase) {
      case "enter":
        return { x: "100vw", opacity: 0, scale: 0.8 };
      case "center":
        return { x: 0, opacity: 1, scale: 1 };
      case "exit":
        return { x: "-100vw", opacity: 0, scale: 0.8 };
      default:
        return { x: 0, opacity: 0, scale: 0.8 };
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
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 雪のパーティクル */}
          <SnowParticles />

          {/* キラキラエフェクト */}
          <Sparkles isActive={showSparkles} />

          {/* メインテキスト */}
          <motion.div
            initial={{ x: "100vw", opacity: 0, scale: 0.8 }}
            animate={getAnimationState()}
            transition={{
              duration: animationPhase === "exit" ? 1.5 : 1,
              ease: animationPhase === "exit" ? "easeIn" : "easeOut",
            }}
            style={{
              position: "relative",
              zIndex: 10,
            }}
          >
            <Box
              component="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "4rem", md: "6rem" },
                fontWeight: 900,
                fontFamily: "'Georgia', serif",
                textAlign: "center",
                // ゴージャスなグラデーション
                background: "linear-gradient(135deg, #fff 0%, #ffd700 30%, #ff6b6b 50%, #ffd700 70%, #fff 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                // 光る効果
                textShadow: `
                  0 0 10px rgba(255, 215, 0, 0.8),
                  0 0 20px rgba(255, 215, 0, 0.6),
                  0 0 30px rgba(255, 107, 107, 0.4),
                  0 0 40px rgba(255, 215, 0, 0.3)
                `,
                // グラデーションアニメーション
                animation: "shimmer 2s linear infinite",
                "@keyframes shimmer": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "100%": { backgroundPosition: "200% 50%" },
                },
                // 影で輪郭を強調
                filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))",
              }}
            >
              🎄 Merry Christmas!! 🎄
            </Box>

            {/* サブテキスト */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationPhase === "center" ? 1 : 0, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  mt: 2,
                  textShadow: "0 0 10px rgba(255,255,255,0.8)",
                }}
              >
                ✨ Welcome to SurviveAI ✨
              </Box>
            </motion.div>
          </motion.div>

          {/* 追加の装飾：左右のツリーとプレゼント */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhase === "center" ? 1 : 0 }}
            style={{
              position: "absolute",
              bottom: "10%",
              left: "10%",
              fontSize: "4rem",
            }}
          >
            🎁
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhase === "center" ? 1 : 0 }}
            style={{
              position: "absolute",
              bottom: "10%",
              right: "10%",
              fontSize: "4rem",
            }}
          >
            🎅
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

