// STEP 10: 世界に公開する

export const step10Data = {
  step: "10",
  title: "世界に公開する",
  subtitle: "Vercelでデプロイ。あなたのアプリを世界へ",
  phase: "公開",
  phaseColor: "#ef4444",
  xpReward: 200,

  dialogues: [
    {
      speaker: "teacher" as const,
      message:
        "ついに最終ステップ！🎉\nアプリを世界に公開しよう！\nVercelというサービスを使うよ。",
    },
    {
      speaker: "student" as const,
      message: "Vercelって何ですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "Webアプリを簡単に公開できるサービスだよ。\n\nNext.jsを作った会社で、\nReactアプリとの相性抜群！\n\nしかも無料で使える。\nGitHubと連携するだけで自動デプロイ！",
    },
    {
      speaker: "student" as const,
      message: "デプロイって何ですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "アプリをインターネット上に公開することだよ。\n\n今まではローカル（自分のPC）だけで動いてた。\nデプロイすると、URLを持った本物のWebサイトになる！\n\n誰でもアクセスできるようになるんだ。",
    },
    {
      speaker: "student" as const,
      message: "どうやってデプロイするんですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "超簡単！3ステップだけ。\n\n1️⃣ GitHubにコードをプッシュ\n2️⃣ Vercelにログイン\n3️⃣ GitHubリポジトリを選択\n\nあとは自動でビルド＆デプロイ！\nURLが発行されて公開完了！",
    },
    {
      speaker: "teacher" as const,
      message:
        "🎊 おめでとう！\n\n10STEPをすべて完了したね。\nこれであなたも立派なWeb開発者！\n\n企画→設計→実装→公開\nこの流れを体験できたね。\n\nこれからも作り続けよう！🚀",
    },
  ],

  interactiveChoices: [
    {
      question: "デプロイとは？",
      choices: ["コードを削除すること", "アプリをインターネットに公開すること", "バグを修正すること"],
      correctIndex: 1,
      explanation: "デプロイはアプリをインターネット上に公開し、誰でもアクセスできるようにすることです。",
    },
    {
      question: "Vercelの特徴は？",
      choices: ["有料のみ", "GitHubと連携して自動デプロイ", "画像編集ができる"],
      correctIndex: 1,
      explanation: "VercelはGitHubと連携し、プッシュするだけで自動的にデプロイできます。",
    },
  ],

  quiz: [
    {
      question: "デプロイとは？",
      options: [
        "コードを削除すること",
        "アプリをインターネットに公開すること",
        "バグを見つけること",
        "デザインを変更すること",
      ],
      correctIndex: 1,
      explanation: "デプロイはアプリを本番環境に公開することです。",
    },
    {
      question: "Vercelを作った会社は？",
      options: ["Google", "Next.jsの開発元", "Amazon", "Microsoft"],
      correctIndex: 1,
      explanation: "VercelはNext.jsを開発している会社で、React系の相性が良いです。",
    },
    {
      question: "環境変数の役割は？",
      options: [
        "画面の色を変える",
        "APIキーなど秘密情報を安全に管理する",
        "ファイルを圧縮する",
        "画像を表示する",
      ],
      correctIndex: 1,
      explanation: "環境変数はAPIキーなどの秘密情報をコードに書かずに管理する仕組みです。",
    },
    {
      question: "本番環境とは？",
      options: [
        "開発中の環境",
        "実際にユーザーが使う公開された環境",
        "テスト用の環境",
        "バックアップ環境",
      ],
      correctIndex: 1,
      explanation: "本番環境は実際のユーザーがアクセスする公開環境です。",
    },
    {
      question: "CI/CDとは？",
      options: [
        "プログラミング言語",
        "継続的インテグレーション/デプロイの自動化",
        "データベースの種類",
        "デザインツール",
      ],
      correctIndex: 1,
      explanation: "CI/CDはコードの変更を自動でテスト・デプロイする仕組みです。",
    },
  ],

  summary: [
    "Vercelで簡単にデプロイ",
    "GitHubと連携で自動デプロイ",
    "環境変数で秘密情報を管理",
    "本番環境で世界に公開",
  ],
};

