"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizCardProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function QuizCard({ questions, onComplete }: QuizCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
      onComplete(score + (isCorrect ? 1 : 0));
    }
  };

  if (isComplete) {
    const finalScore = score + (isCorrect ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: 6,
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#fff" }}>
            クイズ完了！
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              background:
                percentage >= 80
                  ? "linear-gradient(135deg, #10b981, #34d399)"
                  : percentage >= 60
                  ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
                  : "linear-gradient(135deg, #ef4444, #f87171)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {finalScore} / {questions.length}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}>
            正解率: {percentage}%
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={() => {
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setShowResult(false);
                setScore(0);
                setIsComplete(false);
              }}
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#fff",
                "&:hover": { borderColor: "#fff" },
              }}
            >
              もう一度
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#6366f1",
                "&:hover": { bgcolor: "#5558e3" },
              }}
            >
              次のSTEPへ
            </Button>
          </Box>

          {/* XP獲得表示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 2,
                bgcolor: "rgba(99, 102, 241, 0.1)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
              }}
            >
              <Typography sx={{ color: "#6366f1", fontWeight: 700 }}>
                ✨ 獲得XP: +{finalScore * 10 + (finalScore === questions.length ? 50 : 0)} XP
              </Typography>
              {finalScore === questions.length && (
                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", mt: 1 }}>
                  🎯 全問正解ボーナス: +50 XP
                </Typography>
              )}
            </Box>
          </motion.div>
        </Paper>
      </motion.div>
    );
  }

  return (
    <Paper
      sx={{
        p: 4,
        bgcolor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 4,
      }}
    >
      {/* Progress */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Typography sx={{ color: "#6366f1", fontWeight: 700 }}>
          Q{currentIndex + 1}
        </Typography>
        <Box sx={{ flexGrow: 1, height: 4, bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
          <Box
            sx={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
              height: "100%",
              bgcolor: "#6366f1",
              borderRadius: 2,
              transition: "width 0.3s ease",
            }}
          />
        </Box>
        <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
          {currentIndex + 1} / {questions.length}
        </Typography>
      </Box>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#fff", fontWeight: 600, mb: 4, lineHeight: 1.6 }}
          >
            {currentQuestion.question}
          </Typography>

          {/* Options */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === currentQuestion.correctIndex;
              const showCorrect = showResult && isCorrectOption;
              const showWrong = showResult && isSelected && !isCorrectOption;

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: showResult ? 1 : 1.01 }}
                  whileTap={{ scale: showResult ? 1 : 0.99 }}
                >
                  <Button
                    fullWidth
                    onClick={() => handleSelect(index)}
                    sx={{
                      p: 2.5,
                      justifyContent: "flex-start",
                      bgcolor: showCorrect
                        ? "rgba(16, 185, 129, 0.15)"
                        : showWrong
                        ? "rgba(239, 68, 68, 0.15)"
                        : "rgba(255,255,255,0.05)",
                      border: "2px solid",
                      borderColor: showCorrect
                        ? "#10b981"
                        : showWrong
                        ? "#ef4444"
                        : isSelected
                        ? "#6366f1"
                        : "rgba(255,255,255,0.1)",
                      color: "#fff",
                      textTransform: "none",
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: showResult ? undefined : "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          bgcolor: showCorrect
                            ? "#10b981"
                            : showWrong
                            ? "#ef4444"
                            : "rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                        }}
                      >
                        {showCorrect ? (
                          <CheckCircleIcon />
                        ) : showWrong ? (
                          <CancelIcon />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </Box>
                      <Typography sx={{ textAlign: "left" }}>{option}</Typography>
                    </Box>
                  </Button>
                </motion.div>
              );
            })}
          </Box>

          {/* Explanation */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: 2,
                  bgcolor: isCorrect
                    ? "rgba(16, 185, 129, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
                  border: "1px solid",
                  borderColor: isCorrect
                    ? "rgba(16, 185, 129, 0.3)"
                    : "rgba(239, 68, 68, 0.3)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: isCorrect ? "#10b981" : "#ef4444",
                    mb: 1,
                  }}
                >
                  {isCorrect ? "🎉 正解！" : "❌ 不正解"}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                  {currentQuestion.explanation}
                </Typography>
              </Box>

              <Box sx={{ mt: 4, textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    bgcolor: "#6366f1",
                    px: 4,
                    "&:hover": { bgcolor: "#5558e3" },
                  }}
                >
                  {currentIndex < questions.length - 1 ? "次の問題" : "結果を見る"}
                </Button>
              </Box>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </Paper>
  );
}

