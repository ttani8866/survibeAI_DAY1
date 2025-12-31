"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AuthHeader from "@/components/AuthHeader";
import SendIcon from "@mui/icons-material/Send";
import CodeIcon from "@mui/icons-material/Code";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

interface ReviewResult {
  score: number;
  summary: string;
  goodPoints: string[];
  improvements: string[];
  suggestions: string[];
}

// コードレビューのシミュレーション（実際はAI APIを使用）
const simulateCodeReview = async (
  code: string,
  language: string
): Promise<ReviewResult> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 簡単なコード分析
  const lines = code.split("\n").length;
  const hasComments =
    code.includes("//") || code.includes("/*") || code.includes("#");
  const hasConsoleLog = code.includes("console.log");
  const hasTryCatch = code.includes("try") && code.includes("catch");
  const hasAsync = code.includes("async") || code.includes("await");
  const hasTypeAnnotation = code.includes(": ") && code.includes("string") || code.includes("number");

  let score = 70;
  const goodPoints: string[] = [];
  const improvements: string[] = [];
  const suggestions: string[] = [];

  // 良い点
  if (hasComments) {
    score += 10;
    goodPoints.push("コメントが書かれており、コードの意図が理解しやすいです");
  }
  if (hasTryCatch) {
    score += 10;
    goodPoints.push("エラーハンドリングが実装されています");
  }
  if (hasAsync) {
    score += 5;
    goodPoints.push("非同期処理を適切に使用しています");
  }
  if (hasTypeAnnotation) {
    score += 5;
    goodPoints.push("型注釈を使用しており、コードの安全性が高いです");
  }
  if (lines > 5 && lines < 50) {
    goodPoints.push("適切な長さの関数/コードブロックです");
  }

  // 改善点
  if (!hasComments) {
    improvements.push("コメントを追加すると、他の開発者がコードを理解しやすくなります");
  }
  if (hasConsoleLog) {
    score -= 5;
    improvements.push("本番環境では console.log を削除するか、適切なロガーを使用しましょう");
  }
  if (!hasTryCatch && hasAsync) {
    improvements.push("非同期処理にはエラーハンドリングを追加することをお勧めします");
  }
  if (lines > 50) {
    improvements.push("関数が長いので、小さな関数に分割することを検討してください");
  }

  // 提案
  suggestions.push("変数名は処理内容が分かる名前にしましょう");
  if (language === "javascript" || language === "typescript") {
    suggestions.push("ESLintやPrettierを使用してコードスタイルを統一することをお勧めします");
  }
  if (!hasTypeAnnotation && language === "typescript") {
    suggestions.push("TypeScriptの型注釈を活用すると、バグの早期発見につながります");
  }

  score = Math.min(Math.max(score, 0), 100);

  const summary =
    score >= 90
      ? "素晴らしいコードです！このまま続けてください。"
      : score >= 70
      ? "良いコードです。いくつかの改善点を参考にしてみてください。"
      : score >= 50
      ? "基本的な構造は良いですが、改善の余地があります。"
      : "いくつかの重要な改善点があります。一つずつ対応していきましょう。";

  return {
    score,
    summary,
    goodPoints: goodPoints.length > 0 ? goodPoints : ["コードが提出されました"],
    improvements,
    suggestions,
  };
};

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "other", label: "その他" },
];

export default function CodeReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai/code-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) throw new Error("コードレビューに失敗しました");
      
      const reviewResult = await res.json();
      setResult(reviewResult);
    } catch (error) {
      console.error("Review failed:", error);
      alert("レビュー中にエラーが発生しました。GEMINI_API_KEYの設定を確認してください。");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "#10b981";
    if (score >= 70) return "#6366f1";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <Box
      sx={{
        bgcolor: "#0a0a0a",
        minHeight: "100vh",
        color: "#fff",
        pt: 10,
      }}
    >
      <AuthHeader />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <CodeIcon sx={{ color: "#6366f1", fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              コードレビュー
            </Typography>
          </Box>
          <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
            コードを入力すると、AIがレビューしてフィードバックをお届けします
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 4,
          }}
        >
          {/* Code Input */}
          <Paper
            sx={{
              p: 4,
              bgcolor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              📝 コードを入力
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  "&.Mui-focused": { color: "#6366f1" },
                }}
              >
                言語
              </InputLabel>
              <Select
                value={language}
                label="言語"
                onChange={(e) => setLanguage(e.target.value)}
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.3)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6366f1",
                  },
                  "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.5)" },
                }}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={15}
              placeholder={`// ここにコードを入力してください
function example() {
  const message = "Hello, World!";
  console.log(message);
}`}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(0,0,0,0.3)",
                  color: "#fff",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6366f1",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.3)",
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={!code.trim() || isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} sx={{ color: "#fff" }} />
                ) : (
                  <AutoFixHighIcon />
                )
              }
              sx={{
                bgcolor: "#6366f1",
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": { bgcolor: "#5558e3" },
                "&:disabled": { bgcolor: "rgba(99, 102, 241, 0.3)" },
              }}
            >
              {isLoading ? "レビュー中..." : "レビューする"}
            </Button>
          </Paper>

          {/* Review Result */}
          <Paper
            sx={{
              p: 4,
              bgcolor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
              minHeight: 400,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              📊 レビュー結果
            </Typography>

            <AnimatePresence mode="wait">
              {!result && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <CodeIcon
                      sx={{ fontSize: 64, color: "rgba(255,255,255,0.1)" }}
                    />
                    <Typography sx={{ color: "rgba(255,255,255,0.4)" }}>
                      コードを入力して「レビューする」を押してください
                    </Typography>
                  </Box>
                </motion.div>
              )}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Box
                    sx={{
                      height: 300,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <CircularProgress sx={{ color: "#6366f1" }} />
                    <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                      AIがコードをレビュー中...
                    </Typography>
                  </Box>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Score */}
                  <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 800,
                        color: getScoreColor(result.score),
                      }}
                    >
                      {result.score}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                      スコア / 100
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.8)", mt: 2 }}
                    >
                      {result.summary}
                    </Typography>
                  </Box>

                  {/* Good Points */}
                  {result.goodPoints.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <CheckCircleIcon sx={{ color: "#10b981" }} />
                        <Typography sx={{ fontWeight: 600 }}>
                          良い点
                        </Typography>
                      </Box>
                      {result.goodPoints.map((point, idx) => (
                        <Typography
                          key={idx}
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.9rem",
                            mb: 1,
                            pl: 4,
                          }}
                        >
                          • {point}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  {/* Improvements */}
                  {result.improvements.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <WarningIcon sx={{ color: "#f59e0b" }} />
                        <Typography sx={{ fontWeight: 600 }}>
                          改善点
                        </Typography>
                      </Box>
                      {result.improvements.map((point, idx) => (
                        <Typography
                          key={idx}
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.9rem",
                            mb: 1,
                            pl: 4,
                          }}
                        >
                          • {point}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  {/* Suggestions */}
                  {result.suggestions.length > 0 && (
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <LightbulbIcon sx={{ color: "#6366f1" }} />
                        <Typography sx={{ fontWeight: 600 }}>
                          提案
                        </Typography>
                      </Box>
                      {result.suggestions.map((point, idx) => (
                        <Typography
                          key={idx}
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.9rem",
                            mb: 1,
                            pl: 4,
                          }}
                        >
                          • {point}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

