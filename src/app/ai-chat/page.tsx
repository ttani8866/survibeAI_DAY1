"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  CircularProgress,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AuthHeader from "@/components/AuthHeader";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CodeIcon from "@mui/icons-material/Code";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SchoolIcon from "@mui/icons-material/School";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// サンプルの質問候補
const suggestedQuestions = [
  {
    icon: <CodeIcon sx={{ fontSize: 18 }} />,
    text: "プロンプトを上手に書くコツを教えて",
  },
  {
    icon: <LightbulbIcon sx={{ fontSize: 18 }} />,
    text: "生成AIでできることを教えて",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 18 }} />,
    text: "プログラミング初心者は何から始めるべき？",
  },
];

// シンプルなAI応答シミュレーション（実際はAPIを使用）
const getAIResponse = async (message: string): Promise<string> => {
  // 簡単なルールベース応答（デモ用）
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (message.includes("プロンプト") && message.includes("コツ")) {
    return `プロンプトを上手に書くコツは3つあります！

**1. 具体的に書く**
❌「文章を書いて」
✅「新商品の紹介文を100文字で書いて。ターゲットは20代女性」

**2. 役割を与える**
「あなたはプロのコピーライターです」のように役割を設定すると、より専門的な回答が得られます。

**3. 出力形式を指定する**
「箇条書きで5つ」「表形式で」など、欲しい形式を伝えましょう。

実際に試してみましょう！何か作りたいものはありますか？`;
  }

  if (message.includes("生成AI") && message.includes("できること")) {
    return `生成AIでできることは本当にたくさんあります！🚀

**文章系**
• ブログ記事の作成
• メールの下書き
• 要約・翻訳

**プログラミング系**
• コードの生成・説明
• バグの発見と修正
• コードレビュー

**クリエイティブ系**
• アイデア出し
• ストーリー作成
• キャッチコピー

**分析系**
• データの分析
• 情報の整理
• 比較検討

最初は「文章の作成」や「質問への回答」から始めるのがおすすめです！`;
  }

  if (message.includes("初心者") && message.includes("プログラミング")) {
    return `プログラミング初心者におすすめの始め方を紹介します！

**STEP 1: 目標を決める**
「Webサイトを作りたい」「アプリを作りたい」など、作りたいものを決めましょう。

**STEP 2: 言語を選ぶ**
• Webサイト → HTML/CSS/JavaScript
• Webアプリ → JavaScript (React)
• データ分析 → Python

**STEP 3: 環境を整える**
VS Codeという無料のエディタをインストールしましょう。

**STEP 4: 小さく始める**
最初は「Hello World」を表示するところから。小さな成功体験を積み重ねることが大切です！

この「生成AIラーニング」では、10STEPで実際にアプリを作りながら学べますよ 📚`;
  }

  // デフォルト応答
  return `ご質問ありがとうございます！

「${message.slice(0, 30)}${message.length > 30 ? "..." : ""}」についてですね。

生成AIやプログラミングについて、詳しくお答えします。
もう少し具体的に教えていただけると、より的確なアドバイスができます！

例えば：
• 何を作りたいですか？
• どんなことで困っていますか？
• 今どのくらいのレベルですか？

気軽に聞いてくださいね 😊`;
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `こんにちは！👋 私はAIアシスタントです。

プログラミングや生成AIについて、何でも聞いてください！

• プロンプトの書き方
• コードの質問
• 学習の相談

どんな質問でも丁寧にお答えします。気軽にどうぞ！`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("AIチャットに失敗しました");
      
      const data = await res.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      // エラー時のメッセージ
      setMessages((prev) => [...prev, {
        id: "error-" + Date.now(),
        role: "assistant",
        content: "申し訳ありません。AIとの通信中にエラーが発生しました。GEMINI_API_KEYが正しく設定されているか確認してください。",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#0a0a0a",
        minHeight: "100vh",
        color: "#fff",
        pt: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AuthHeader />

      <Container
        maxWidth="md"
        sx={{
          py: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <AutoAwesomeIcon sx={{ color: "#6366f1" }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              AIに聞いてみよう
            </Typography>
          </Box>
          <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
            プログラミングや生成AIについて、何でも質問できます
          </Typography>
        </Box>

        {/* Chat Area */}
        <Paper
          sx={{
            flexGrow: 1,
            bgcolor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minHeight: 500,
          }}
        >
          {/* Messages */}
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              p: 3,
            }}
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection:
                        message.role === "user" ? "row-reverse" : "row",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor:
                          message.role === "assistant" ? "#6366f1" : "#10b981",
                        width: 40,
                        height: 40,
                      }}
                    >
                      {message.role === "assistant" ? (
                        <SmartToyIcon sx={{ fontSize: 24 }} />
                      ) : (
                        <PersonIcon sx={{ fontSize: 24 }} />
                      )}
                    </Avatar>
                    <Box
                      sx={{
                        maxWidth: "75%",
                        p: 2.5,
                        borderRadius: 2,
                        bgcolor:
                          message.role === "assistant"
                            ? "rgba(99, 102, 241, 0.1)"
                            : "rgba(16, 185, 129, 0.1)",
                        border: "1px solid",
                        borderColor:
                          message.role === "assistant"
                            ? "rgba(99, 102, 241, 0.2)"
                            : "rgba(16, 185, 129, 0.2)",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.9)",
                          whiteSpace: "pre-line",
                          lineHeight: 1.7,
                          "& strong": {
                            color: "#fff",
                            fontWeight: 600,
                          },
                        }}
                      >
                        {message.content}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <Avatar sx={{ bgcolor: "#6366f1", width: 40, height: 40 }}>
                    <SmartToyIcon sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      bgcolor: "rgba(99, 102, 241, 0.1)",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <CircularProgress size={16} sx={{ color: "#6366f1" }} />
                    <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                      考え中...
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <Box sx={{ px: 3, pb: 2 }}>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.75rem",
                  mb: 1.5,
                }}
              >
                よくある質問
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {suggestedQuestions.map((q, idx) => (
                  <Chip
                    key={idx}
                    icon={q.icon}
                    label={q.text}
                    onClick={() => handleSend(q.text)}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderColor: "#6366f1",
                      },
                      "& .MuiChip-icon": {
                        color: "#6366f1",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              bgcolor: "rgba(255,255,255,0.02)",
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="メッセージを入力..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: "#fff",
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
                    color: "rgba(255,255,255,0.4)",
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                sx={{
                  bgcolor: "#6366f1",
                  minWidth: 56,
                  "&:hover": { bgcolor: "#5558e3" },
                  "&:disabled": {
                    bgcolor: "rgba(99, 102, 241, 0.3)",
                  },
                }}
              >
                <SendIcon />
              </Button>
            </Box>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.7rem",
                mt: 1,
                textAlign: "center",
              }}
            >
              Enterで送信 • Shift+Enterで改行
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

