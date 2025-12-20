"use client";

import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import AuthHeader from "@/components/AuthHeader";
import CodeIcon from "@mui/icons-material/Code";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import SpeedIcon from "@mui/icons-material/Speed";

const features = [
  {
    icon: <CodeIcon sx={{ fontSize: 40, color: "#818cf8" }} />,
    title: "最小限のインプット",
    description: "プログラミングの基礎知識がなくても、AIが書くべきコードの構造をガイドします。",
  },
  {
    icon: <AutoFixHighIcon sx={{ fontSize: 40, color: "#818cf8" }} />,
    title: "リアルタイム修正",
    description: "書きながらリアルタイムで「より良い書き方」を提案。エラーが出る前に修正できます。",
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40, color: "#818cf8" }} />,
    title: "爆速での習得",
    description: "教科書を何時間も読むより、1行のコードをAIと直すほうが圧倒的に早く身につきます。",
  },
];

export default function CodeReviewPage() {
  return (
    <Box sx={{ bgcolor: "#0a0a0a", minHeight: "100vh", color: "#fff", pt: 10 }}>
      <AuthHeader />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="overline" sx={{ color: "#818cf8", fontWeight: 700, letterSpacing: 2 }}>
            FEATURE 01
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 4, background: "linear-gradient(to right, #fff, #a5f3fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AI Code Review
          </Typography>
          <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.7)", mb: 8, maxWidth: "800px" }}>
            初心者が直面する「何から書けばいいかわからない」という壁。AIがあなたの横で、まるでプロのメンターのようにコードを添削し、最小限の学習で最高品質のコードを完成させます。
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Paper
                  sx={{
                    p: 4,
                    bgcolor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    height: "100%",
                    borderRadius: 4,
                    transition: "0.3s",
                    "&:hover": {
                      borderColor: "#818cf8",
                      transform: "translateY(-5px)",
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{item.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                    {item.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Button
            href="/onboarding/signup"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#fff",
              color: "#000",
              px: 6,
              py: 2,
              borderRadius: "50px",
              fontWeight: 700,
              fontSize: "1.1rem",
              "&:hover": { bgcolor: "#e2e8f0" },
            }}
          >
            無料で体験を始める
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

