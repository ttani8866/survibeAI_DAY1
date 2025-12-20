"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";

const features = [
  {
    number: "01",
    title: "AI Code Review",
    description:
      "AIが改善点を指摘し、より良い書き方を提案。プロのようなコードを書けるようになる。",
    link: "/features/code-review",
  },
  {
    number: "02",
    title: "Learning Path",
    description:
      "初心者にも分かりやすい解説で、ステップバイステップで学習できる。",
    link: "/features/learning-path",
  },
  {
    number: "03",
    title: "24/7 Support",
    description:
      "困った瞬間にすぐ質問して解決。24時間いつでもAIがサポート。",
    link: "/features/support",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  link: string;
  index: number;
}

const FeatureCard = ({ number, title, description, link, index }: FeatureCardProps) => {
  return (
    <Grid item xs={12} md={4}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        transition={{ delay: index * 0.2 }}
        whileHover={{
          boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
          borderColor: "#6366f1",
          backgroundColor: "rgba(255,255,255,0.02)",
        }}
        style={{
          borderLeft: "1px solid rgba(255,255,255,0.2)",
          paddingLeft: "2rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          transition: "all 0.3s ease",
          position: "relative", // リンクを全体に広げるために必要
        }}
      >
        {/* カード全体を覆う透明なリンク */}
        <Link 
          href={link} 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 10, // 最前面に配置
            cursor: "pointer" 
          }} 
        />

        <Typography
          variant="h2"
          sx={{
            fontSize: "3rem",
            fontWeight: 700,
            mb: 2,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {number}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#fff" }}>
          {title}
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          {description}
        </Typography>
        <Typography
          sx={{
            color: "#6366f1",
            fontSize: "0.875rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          詳細を見る →
        </Typography>
      </motion.div>
    </Grid>
  );
};

export default function FeatureCards() {
  return (
    <Box
      sx={{
        py: 15,
        bgcolor: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container maxWidth="lg">
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
              mb: 6,
              display: "block",
            }}
          >
            OUR FEATURES
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.number}
              number={feature.number}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              index={index}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
