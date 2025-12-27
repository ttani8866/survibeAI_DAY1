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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Link from "next/link";
import { useParams } from "next/navigation";

// データインポート
import { step01Data } from "@/data/steps/step01";
import { step02Data } from "@/data/steps/step02";
import { step03Data } from "@/data/steps/step03";
import { step04Data } from "@/data/steps/step04";
import { step05Data } from "@/data/steps/step05";
import { step06Data } from "@/data/steps/step06";
import { step07Data } from "@/data/steps/step07";
import { step08Data } from "@/data/steps/step08";
import { step09Data } from "@/data/steps/step09";
import { step10Data } from "@/data/steps/step10";

const stepsData: { [key: string]: typeof step01Data } = {
  step01: step01Data,
  step02: step02Data,
  step03: step03Data,
  step04: step04Data,
  step05: step05Data,
  step06: step06Data,
  step07: step07Data,
  step08: step08Data,
  step09: step09Data,
  step10: step10Data,
};

type LearningPhase = "lesson" | "quiz" | "complete";

export default function StepPage() {
  const params = useParams();
  const stepParam = params.step as string;
  const data = stepsData[stepParam];

  const [phase, setPhase] = useState<LearningPhase>("lesson");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [choiceIndex, setChoiceIndex] = useState(0);
  const [showChoice, setShowChoice] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // データが見つからない場合
  if (!data) {
    return (
      <Box sx={{ bgcolor: "#0a0a0a", minHeight: "100vh", color: "#fff", pt: 10 }}>
        <AuthHeader />
        <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            ページが見つかりません
          </Typography>
          <Button
            component={Link}
            href="/features/learning-path"
            variant="contained"
            sx={{ bgcolor: "#6366f1" }}
          >
            学習パスに戻る
          </Button>
        </Container>
      </Box>
    );
  }

  const stepNumber = parseInt(data.step);
  const nextStep = stepNumber < 10 ? `step${String(stepNumber + 1).padStart(2, "0")}` : null;

  // 対話の進行
  const handleNextDialogue = () => {
    // 特定のポイントで選択問題を表示
    if (
      data.interactiveChoices &&
      data.interactiveChoices[choiceIndex] &&
      dialogueIndex === Math.floor((data.dialogues.length / (data.interactiveChoices.length + 1)) * (choiceIndex + 1)) - 1 &&
      !showChoice
    ) {
      setShowChoice(true);
      return;
    }

    if (dialogueIndex < data.dialogues.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    }
  };

  const handleChoiceNext = () => {
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
  const isLastStep = stepNumber === 10;

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
              {showChoice && data.interactiveChoices && data.interactiveChoices[choiceIndex] && (
                <ChoiceButtons
                  choices={data.interactiveChoices[choiceIndex].choices}
                  correctIndex={data.interactiveChoices[choiceIndex].correctIndex}
                  explanation={data.interactiveChoices[choiceIndex].explanation}
                  onNext={handleChoiceNext}
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
                  border: isLastStep
                    ? "1px solid rgba(245, 158, 11, 0.5)"
                    : "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: 4,
                  textAlign: "center",
                }}
              >
                <Typography variant="h2" sx={{ mb: 2 }}>
                  {isLastStep ? "🏆" : "🎉"}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  {isLastStep ? "全STEP完了！" : `STEP ${data.step} 完了！`}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}>
                  「{data.title}」をマスターしました！
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
                      {isLastStep ? <EmojiEventsIcon sx={{ color: "#f59e0b", fontSize: 32 }} /> : "🎯"}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
                      {isLastStep ? "Master バッジ" : `Step ${data.step} バッジ`}
                    </Typography>
                  </Box>
                </Box>

                {isLastStep && (
                  <Box
                    sx={{
                      mb: 4,
                      p: 4,
                      borderRadius: 2,
                      background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#f59e0b" }}>
                      🎊 おめでとうございます！
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                      10STEPすべてを完了しました！
                      <br />
                      これであなたも立派なWeb開発者です。
                      <br />
                      学んだことを活かして、どんどん作っていきましょう！
                    </Typography>
                  </Box>
                )}

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
                  {nextStep && (
                    <Button
                      component={Link}
                      href={`/learn/${nextStep}`}
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        bgcolor: "#6366f1",
                        "&:hover": { bgcolor: "#5558e3" },
                      }}
                    >
                      STEP {String(stepNumber + 1).padStart(2, "0")}へ進む
                    </Button>
                  )}
                  {isLastStep && (
                    <Button
                      component={Link}
                      href="/ai-chat"
                      variant="contained"
                      sx={{
                        bgcolor: "#f59e0b",
                        "&:hover": { bgcolor: "#d97706" },
                      }}
                    >
                      AIに聞いてみる
                    </Button>
                  )}
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}

