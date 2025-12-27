"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Container, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

export default function CTASection() {
  return (
    <Box
      sx={{
        py: 15,
        bgcolor: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 背景グロー効果 */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* シマーエフェクト付きテキスト */}
          <Box
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 3,
              color: "#fff",
              position: "relative",
              display: "inline-block",
              background:
                "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.5) 50%, #fff 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "100% 0" },
                "100%": { backgroundPosition: "-100% 0" },
              },
            }}
          >
            Ready to innovate?
          </Box>

          <Box
            component="p"
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "1.125rem",
              mb: 5,
            }}
          >
            今すぐ始めて、コーディングスキルを次のレベルへ。
          </Box>

          {/* パルスアニメーション付きボタン */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            style={{ display: "inline-block" }}
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
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 0,
                boxShadow: "0 0 30px rgba(255,255,255,0.2)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                  boxShadow: "0 0 40px rgba(255,255,255,0.3)",
                },
              }}
            >
              はじめる
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}

