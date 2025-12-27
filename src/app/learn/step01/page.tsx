"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AuthHeader from "@/components/AuthHeader";
import DialogueBox from "@/components/learn/DialogueBox";
import ChoiceButtons from "@/components/learn/ChoiceButtons";
import ProgressBar from "@/components/learn/ProgressBar";
import QuizCard from "@/components/quiz/QuizCard";
import { step01Data } from "@/data/steps/step01";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";

type LearningPhase = "lesson" | "quiz" | "complete";

export default function Step01Page() {
  const [phase, setPhase] = useState<LearningPhase>("lesson");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [choiceIndex, setChoiceIndex] = useState(0);
  const [showChoice, setShowChoice] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const data = step01Data;

  // 対話の進行
  const handleNextDialogue = () => {
    // 特定のポイントで選択問題を表示
    if (dialogueIndex === 2 && choiceIndex === 0 && !showChoice) {
      setShowChoice(true);
      return;
    }
    if (dialogueIndex === 4 && choiceIndex === 1 && !showChoice) {
      setShowChoice(true);
      return;
    }

    if (dialogueIndex < data.dialogues.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    }
  };

  const handleChoiceCorrect = () => {
    setShowChoice(false);
    setChoiceIndex((prev) => prev + 1);
    if (dialogueIndex < data.dialogues.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    }
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setPhase("complete");
  };

  const isLastDialogue = dialogueIndex === data.dialogues.length - 1;

  return (
    <Box sx={{ bgcolor: "#0a0a0a", minHeight: "100vh", color: "#fff", pt: 10 }}>
      <AuthHeader />

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            component={Link}
            href="/features/learning-path"
            startIcon={<ArrowBackIcon />}
            sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}
          >
            学習パスに戻る
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Chip
              label={data.phase}
              size="small"
              sx={{
                bgcolor: `${data.phaseColor}20`,
                color: data.phaseColor,
                fontWeight: 600,
              }}
            />
            <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.5)" }}>
              STEP {data.step}
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {data.title}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
            {data.subtitle}
          </Typography>
        </Box>

        {/* Phase Stepper */}
        <Box sx={{ mb: 6 }}>
          <Stepper
            activeStep={phase === "lesson" ? 0 : phase === "quiz" ? 1 : 2}
            sx={{
              "& .MuiStepLabel-label": { color: "rgba(255,255,255,0.5)" },
              "& .MuiStepLabel-label.Mui-active": { color: "#fff" },
              "& .MuiStepLabel-label.Mui-completed": { color: "#10b981" },
              "& .MuiStepIcon-root": { color: "rgba(255,255,255,0.2)" },
              "& .MuiStepIcon-root.Mui-active": { color: "#6366f1" },
              "& .MuiStepIcon-root.Mui-completed": { color: "#10b981" },
            }}
          >
            <Step>
              <StepLabel icon={<MenuBookIcon />}>レッスン</StepLabel>
            </Step>
            <Step>
              <StepLabel icon={<QuizIcon />}>クイズ</StepLabel>
            </Step>
            <Step>
              <StepLabel icon={<CheckCircleIcon />}>完了</StepLabel>
            </Step>
          </Stepper>
        </Box>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {phase === "lesson" && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Progress */}
              <ProgressBar
                current={dialogueIndex + 1}
                total={data.dialogues.length}
                label="レッスン進捗"
              />

              {/* Dialogues */}
              <Box sx={{ mb: 4 }}>
                {data.dialogues.slice(0, dialogueIndex + 1).map((dialogue, idx) => (
                  <DialogueBox
                    key={idx}
                    speaker={dialogue.speaker}
                    message={dialogue.message}
                    delay={idx === dialogueIndex ? 0.2 : 0}
                  />
                ))}
              </Box>

              {/* Interactive Choice */}
              {showChoice && data.interactiveChoices[choiceIndex] && (
                <ChoiceButtons
                  choices={data.interactiveChoices[choiceIndex].choices}
                  correctIndex={data.interactiveChoices[choiceIndex].correctIndex}
                  explanation={data.interactiveChoices[choiceIndex].explanation}
                  onCorrect={handleChoiceCorrect}
                />
              )}

              {/* Navigation */}
              {!showChoice && (
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  {!isLastDialogue ? (
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      onClick={handleNextDialogue}
                      sx={{
                        bgcolor: "#6366f1",
                        "&:hover": { bgcolor: "#5558e3" },
                      }}
                    >
                      次へ
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      endIcon={<QuizIcon />}
                      onClick={() => setPhase("quiz")}
                      sx={{
                        bgcolor: "#10b981",
                        "&:hover": { bgcolor: "#0d9668" },
                      }}
                    >
                      クイズに挑戦
                    </Button>
                  )}
                </Box>
              )}
            </motion.div>
          )}

          {phase === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
                🎮 理解度クイズ
              </Typography>
              <QuizCard questions={data.quiz} onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {phase === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Paper
                sx={{
                  p: 6,
                  bgcolor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: 4,
                  textAlign: "center",
                }}
              >
                <Typography variant="h2" sx={{ mb: 2 }}>
                  🎉
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  STEP 01 完了！
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}>
                  「アイデア・要件定義」をマスターしました！
                </Typography>

                {/* Summary */}
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                    p: 4,
                    mb: 4,
                    textAlign: "left",
                  }}
                >
                  <Typography sx={{ fontWeight: 700, mb: 2, color: "#fff" }}>
                    📝 学んだこと
                  </Typography>
                  {data.summary.map((point, idx) => (
                    <Typography
                      key={idx}
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CheckCircleIcon sx={{ color: "#10b981", fontSize: 18 }} />
                      {point}
                    </Typography>
                  ))}
                </Box>

                {/* Rewards */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 4,
                    mb: 4,
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      +{data.xpReward + quizScore * 10}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
                      獲得XP
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      🎯
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
                      First Step バッジ
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                  <Button
                    component={Link}
                    href="/features/learning-path"
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "#fff",
                      "&:hover": { borderColor: "#fff" },
                    }}
                  >
                    学習パスに戻る
                  </Button>
                  <Button
                    component={Link}
                    href="/learn/step02"
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: "#6366f1",
                      "&:hover": { bgcolor: "#5558e3" },
                    }}
                  >
                    STEP 02へ進む
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}

