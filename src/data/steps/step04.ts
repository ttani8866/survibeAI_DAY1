// STEP 04: 環境構築・はじめの一歩

export const step04Data = {
  step: "04",
  title: "環境構築・はじめの一歩",
  subtitle: "VS Code、Node.js、Git。開発環境を整えよう",
  phase: "準備",
  phaseColor: "#10b981",
  xpReward: 100,

  dialogues: [
    {
      speaker: "teacher" as const,
      message:
        "いよいよコードを書く準備をするよ！\nまずは『開発環境』を整えよう。\n3つのツールをインストールするね。",
    },
    {
      speaker: "student" as const,
      message: "開発環境って何ですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "料理に例えると『キッチン』かな。\n包丁や鍋がないと料理できないでしょ？\nプログラミングも同じで、道具が必要なんだ。\n\n1️⃣ VS Code - コードを書くエディタ\n2️⃣ Node.js - JavaScriptを動かすもの\n3️⃣ Git - コードの履歴管理",
    },
    {
      speaker: "student" as const,
      message: "VS Codeって何ですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "Microsoftが作った無料のエディタだよ。\nコードを書くための専用メモ帳みたいなもの。\n\n・シンタックスハイライト（色分け）\n・自動補完（入力サポート）\n・エラー検出\n\nプロも使う最強ツールだよ！",
    },
    {
      speaker: "student" as const,
      message: "Gitは何に使うんですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "Gitは『タイムマシン』みたいなもの。\n\nコードの変更履歴を保存できるから:\n・間違えても前の状態に戻せる\n・いつ何を変えたか記録が残る\n・チームで共同作業できる\n\nGitHubと組み合わせると最強だよ！",
    },
  ],

  interactiveChoices: [
    {
      question: "VS Codeとは？",
      choices: ["ゲームソフト", "コードを書くためのエディタ", "画像編集ソフト"],
      correctIndex: 1,
      explanation: "VS Codeはプログラミング用のエディタで、プロも使う無料ツールです。",
    },
    {
      question: "Gitの役割は？",
      choices: ["画像を加工する", "コードの変更履歴を管理する", "音楽を再生する"],
      correctIndex: 1,
      explanation: "Gitはコードのバージョン管理ツールで、変更履歴を保存できます。",
    },
  ],

  quiz: [
    {
      question: "開発環境とは？",
      options: [
        "プログラミングに必要なツールのセット",
        "オフィスの部屋",
        "インターネット回線",
        "パソコンのメモリ",
      ],
      correctIndex: 0,
      explanation: "開発環境はプログラミングに必要なエディタやツールのセットです。",
    },
    {
      question: "VS Codeを作った会社は？",
      options: ["Google", "Apple", "Microsoft", "Amazon"],
      correctIndex: 2,
      explanation: "VS CodeはMicrosoftが開発した無料のコードエディタです。",
    },
    {
      question: "Node.jsの役割は？",
      options: [
        "画像を編集する",
        "JavaScriptを動かす",
        "文書を作成する",
        "メールを送る",
      ],
      correctIndex: 1,
      explanation: "Node.jsはJavaScriptをブラウザ外で実行するための環境です。",
    },
    {
      question: "Gitで『コミット』とは？",
      options: [
        "コードを削除する",
        "変更を記録・保存する",
        "エラーを修正する",
        "ファイルをダウンロードする",
      ],
      correctIndex: 1,
      explanation: "コミットは変更内容を履歴として記録することです。",
    },
    {
      question: "GitHubとは？",
      options: [
        "ゲーム配信サイト",
        "Gitリポジトリをオンラインで管理するサービス",
        "動画配信サービス",
        "SNSアプリ",
      ],
      correctIndex: 1,
      explanation: "GitHubはコードをオンラインで保存・共有できるサービスです。",
    },
  ],

  summary: [
    "VS Codeはプロも使う無料エディタ",
    "Node.jsでJavaScriptを動かす",
    "Gitでコードの履歴管理",
    "GitHubでオンライン保存・共有",
  ],
};

