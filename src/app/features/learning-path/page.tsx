"use client";

import React from "react";
import { Box, Container, Typography, Stack, Paper } from "@mui/material";
import { motion } from "framer-motion";
import AuthHeader from "@/components/AuthHeader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  { step: "01", title: "環境構築・基礎の基礎", content: "AIの助けを借りて、まずは最初の1行を動かす環境を作ります。" },
  { step: "02", title: "構造の理解", content: "プログラムがどう動いているのか、大きな絵を掴みます。" },
  { step: "03", title: "実践的な構文", content: "よく使うパーツをAIと一緒に組み立てながら学びます。" },
  { step: "04", title: "Webの仕組み", content: "ブラウザとサーバーがどう会話しているのかを習得します。" },
  { step: "05", title: "データの扱い", content: "情報を保存し、呼び出す。アプリの核心に迫ります。" },
  { step: "06", title: "APIの活用", content: "外部のAIや便利なツールと連携する方法を学びます。" },
  { step: "07", title: "プロダクト完成", content: "自分だけのオリジナルアプリを世の中に公開します。" },
];

export default function LearningPathPage() {
  return (
    <Box sx={{ bgcolor: "#0a0a0a", minHeight: "100vh", color: "#fff", pt: 10 }}>
      <AuthHeader />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="overline" sx={{ color: "#a855f7", fontWeight: 700, letterSpacing: 2 }}>
            FEATURE 02
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 4, textAlign: "center" }}>
            7-Step Mastery
          </Typography>
          <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.7)", mb: 10, textAlign: "center" }}>
            未経験からプロレベルまで。無駄を省いた最短ルートのラーニングパスをご用意しました。
          </Typography>
        </motion.div>

        <Stack spacing={4}>
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Paper
                sx={{
                  p: 4,
                  bgcolor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  "&:hover": { borderColor: "#a855f7" },
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 900, color: "rgba(168, 85, 247, 0.3)" }}>
                  {item.step}
                </Typography>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleIcon sx={{ color: "#a855f7" }} /> {item.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                    {item.content}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

