"use client";

import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

interface DialogueBoxProps {
  speaker: "teacher" | "student";
  message: string;
  delay?: number;
}

export default function DialogueBox({
  speaker,
  message,
  delay = 0,
}: DialogueBoxProps) {
  const isTeacher = speaker === "teacher";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: isTeacher ? -20 : 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isTeacher ? "row" : "row-reverse",
          gap: 2,
          mb: 3,
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            bgcolor: isTeacher ? "#6366f1" : "#10b981",
            width: 48,
            height: 48,
            boxShadow: isTeacher
              ? "0 0 20px rgba(99, 102, 241, 0.4)"
              : "0 0 20px rgba(16, 185, 129, 0.4)",
          }}
        >
          {isTeacher ? (
            <SmartToyIcon sx={{ fontSize: 28 }} />
          ) : (
            <PersonIcon sx={{ fontSize: 28 }} />
          )}
        </Avatar>

        {/* Message Bubble */}
        <Box
          sx={{
            maxWidth: "75%",
            p: 3,
            borderRadius: 3,
            bgcolor: isTeacher
              ? "rgba(99, 102, 241, 0.1)"
              : "rgba(16, 185, 129, 0.1)",
            border: "1px solid",
            borderColor: isTeacher
              ? "rgba(99, 102, 241, 0.3)"
              : "rgba(16, 185, 129, 0.3)",
            position: "relative",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: isTeacher ? "#6366f1" : "#10b981",
              fontWeight: 700,
              display: "block",
              mb: 1,
            }}
          >
            {isTeacher ? "👨‍🏫 AI先生" : "👤 あなた"}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.8,
              whiteSpace: "pre-line",
            }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

