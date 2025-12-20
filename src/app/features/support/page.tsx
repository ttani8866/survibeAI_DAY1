"use client";

import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Button, Divider } from "@mui/material";
import { motion } from "framer-motion";
import AuthHeader from "@/components/AuthHeader";
import ForumIcon from "@mui/icons-material/Forum";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function SupportCommunityPage() {
  return (
    <Box sx={{ bgcolor: "#0a0a0a", minHeight: "100vh", color: "#fff", pt: 10 }}>
      <AuthHeader />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="overline" sx={{ color: "#fbbf24", fontWeight: 700, letterSpacing: 2 }}>
            FEATURE 03
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 4 }}>
            24/7 Support & Community
          </Typography>
          <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.7)", mb: 8, maxWidth: "800px" }}>
            プログラミングは孤独な戦いではありません。24時間体制のチャットサポートと、Discordでの活発なコミュニティがあなたの挑戦を支えます。
          </Typography>
        </motion.div>

        <Grid container spacing={4} sx={{ mb: 12 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", height: "100%" }}>
              <CardContent sx={{ p: 4 }}>
                <ForumIcon sx={{ fontSize: 40, color: "#fbbf24", mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>24H チャットサポート</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                  「ここで詰まった」「エラーが消えない」。そんな時はいつでもメッセージを投げてください。AIと専門スタッフがあなたの疑問を即座に解消します。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", height: "100%" }}>
              <CardContent sx={{ p: 4 }}>
                <GroupsIcon sx={{ fontSize: 40, color: "#5865F2", mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Discord コミュニティ</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                  全国から集まる同じ志を持つ仲間たち。日々の進捗共有や、LT会、共同開発など、モチベーションを維持するための最高の環境がここにはあります。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 10 }} />

        {/* AI Contest Section */}
        <Box sx={{ p: 6, bgcolor: "rgba(251, 191, 36, 0.05)", borderRadius: 8, border: "1px solid rgba(251, 191, 36, 0.2)" }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <EmojiEventsIcon sx={{ color: "#fbbf24", fontSize: 40 }} />
                <Typography variant="h4" sx={{ fontWeight: 800 }}>AI Contest 2025</Typography>
              </Box>
              <Typography variant="h6" sx={{ mb: 3, color: "#fff" }}>
                君のひらめきが、未来を変える。
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 4, lineHeight: 1.8 }}>
                日本の生成AI文化を形作る学生のためのリアル・フィールド。
                「愛知100選 AIコンテスト」から始まったこの熱狂は、来年夏、東京へと舞台を移します。
                <strong>2025年夏・東京</strong>にて、学生版だけでなく<strong>社会人版</strong>も併せて開催決定！
              </Typography>
              <Button
                component="a"
                href="https://aichi-select.net/ai_contest/"
                target="_blank"
                variant="outlined"
                sx={{
                  color: "#fbbf24",
                  borderColor: "#fbbf24",
                  "&:hover": { borderColor: "#fcd34d", bgcolor: "rgba(251, 191, 36, 0.1)" }
                }}
              >
                コンテスト詳細を見る
              </Button>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1591115765373-520b7a21769b?auto=format&fit=crop&q=80&w=800"
                alt="AI Contest"
                sx={{ width: "100%", borderRadius: 4, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

