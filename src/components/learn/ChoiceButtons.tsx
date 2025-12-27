"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReplayIcon from "@mui/icons-material/Replay";

interface ChoiceButtonsProps {
  choices: string[];
  correctIndex: number;
  onNext: () => void;
  explanation?: string;
}

export default function ChoiceButtons({
  choices,
  correctIndex,
  onNext,
  explanation,
}: ChoiceButtonsProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleChoice = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
  };

  const handleRetry = () => {
    setSelected(null);
    setShowResult(false);
  };

  const isCorrect = selected === correctIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            mb: 2,
            fontSize: "0.875rem",
          }}
        >
          選択してください 👇
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {choices.map((choice, index) => {
            const isSelected = selected === index;
            const isCorrectOption = index === correctIndex;
            const showCorrect = showResult && isCorrectOption;
            const showWrong = showResult && isSelected && !isCorrectOption;

            return (
              <motion.div
                key={index}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
              >
                <Button
                  fullWidth
                  onClick={() => handleChoice(index)}
                  disabled={showResult && !isSelected && !isCorrectOption}
                  sx={{
                    p: 2,
                    justifyContent: "flex-start",
                    textAlign: "left",
                    bgcolor: showCorrect
                      ? "rgba(16, 185, 129, 0.2)"
                      : showWrong
                      ? "rgba(239, 68, 68, 0.2)"
                      : "rgba(255,255,255,0.05)",
                    border: "1px solid",
                    borderColor: showCorrect
                      ? "#10b981"
                      : showWrong
                      ? "#ef4444"
                      : "rgba(255,255,255,0.1)",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: showResult
                        ? undefined
                        : "rgba(255,255,255,0.1)",
                      borderColor: showResult ? undefined : "#6366f1",
                    },
                    "&:disabled": {
                      color: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
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
                        fontSize: "0.875rem",
                      }}
                    >
                      {showCorrect ? (
                        <CheckCircleIcon sx={{ fontSize: 20 }} />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </Box>
                    <Typography sx={{ flexGrow: 1 }}>{choice}</Typography>
                  </Box>
                </Button>
              </motion.div>
            );
          })}
        </Box>

        {/* Result Feedback */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                mt: 3,
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
                {isCorrect ? "🎉 正解！" : "❌ 不正解..."}
              </Typography>
              {explanation && (
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                  {explanation}
                </Typography>
              )}
              {!isCorrect && (
                <Typography
                  sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", mt: 1 }}
                >
                  正解は「{choices[correctIndex]}」でした。
                </Typography>
              )}
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "flex-end" }}>
              {!isCorrect && (
                <Button
                  variant="outlined"
                  startIcon={<ReplayIcon />}
                  onClick={handleRetry}
                  sx={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#fff",
                    "&:hover": {
                      borderColor: "#fff",
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  もう一度
                </Button>
              )}
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={onNext}
                sx={{
                  bgcolor: isCorrect ? "#10b981" : "#6366f1",
                  "&:hover": {
                    bgcolor: isCorrect ? "#0d9668" : "#5558e3",
                  },
                }}
              >
                次へ進む
              </Button>
            </Box>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
}
