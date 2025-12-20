"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

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
  visible: { opacity: 1, y: 0 },
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
    <Grid size={{ xs: 12, md: 4 }}>
      <Box
        component="a"
        href={link}
        sx={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          height: "100%",
          borderLeft: "1px solid rgba(255,255,255,0.2)",
          pl: 4,
          py: 4,
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
            borderColor: "#6366f1",
            bgcolor: "rgba(255,255,255,0.05)",
          },
        }}
      >
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
            mb: 3,
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
      </Box>
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
