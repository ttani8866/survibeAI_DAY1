// STEP 03: デザイン・テイスト決定

export const step03Data = {
  step: "03",
  title: "デザイン・テイスト決定",
  subtitle: "色、フォント、雰囲気。UIデザインの基礎を学ぼう",
  phase: "設計",
  phaseColor: "#8b5cf6",
  xpReward: 100,

  dialogues: [
    {
      speaker: "teacher" as const,
      message:
        "ワイヤーフレームができたね！\n次はいよいよ『見た目』を決めるよ。\nデザインテイストって聞いたことある？",
    },
    {
      speaker: "student" as const,
      message: "なんとなく...雰囲気のことですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "その通り！🎨\n同じ配置でも、色やフォントで印象が全然変わるんだ。\n\n例えば:\n・ポップで明るい → 子供向け\n・シックで落ち着いた → ビジネス向け\n・ダーク×ネオン → ゲーミング、テック系",
    },
    {
      speaker: "student" as const,
      message: "生成AIラーニングアプリはどんな雰囲気がいいですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "楽しそうで、でも学習だから信頼感もほしいよね。\n\nじゃあ『ダークモード×アクセントカラー』はどう？\n\n・ベース: ダーク（#0a0a0a）→ 目に優しい、集中しやすい\n・メイン: インディゴ（#6366f1）→ 知的、テック感\n・アクセント: エメラルド（#10b981）→ 成功、ポジティブ",
    },
    {
      speaker: "student" as const,
      message: "色にも意味があるんですね！",
    },
    {
      speaker: "teacher" as const,
      message:
        "そう！これを『カラーパレット』って言うよ。\n\n他にも大事なのは:\n・フォント選び（読みやすさ重視）\n・余白（詰め込みすぎない）\n・一貫性（同じスタイルを使い続ける）\n\nこれがデザインの基本だよ！",
    },
  ],

  interactiveChoices: [
    {
      question: "カラーパレットとは？",
      choices: ["絵を描く道具", "アプリで使う色のセット", "プログラミング言語"],
      correctIndex: 1,
      explanation: "カラーパレットはアプリ全体で使用する色の組み合わせです。",
    },
    {
      question: "ダークモードのメリットは？",
      choices: ["開発が簡単", "目に優しく集中しやすい", "容量が小さい"],
      correctIndex: 1,
      explanation: "ダークモードは目の疲れを軽減し、集中しやすい環境を作ります。",
    },
  ],

  quiz: [
    {
      question: "デザインテイストとは？",
      options: ["コードの書き方", "アプリ全体の雰囲気・印象", "サーバーの設定", "データの形式"],
      correctIndex: 1,
      explanation: "デザインテイストは色、フォント、余白などで決まるアプリの雰囲気です。",
    },
    {
      question: "カラーパレットで決めることは？",
      options: ["プログラミング言語", "アプリで使う色のセット", "画面の枚数", "ボタンの数"],
      correctIndex: 1,
      explanation: "カラーパレットはアプリ全体で使用する色の組み合わせです。",
    },
    {
      question: "インディゴ（青紫）が与える印象は？",
      options: ["危険、注意", "知的、テック感", "自然、エコ", "高級、ゴールド"],
      correctIndex: 1,
      explanation: "インディゴは知的でテック感のある印象を与えます。",
    },
    {
      question: "UIデザインで大事なことは？",
      options: [
        "できるだけ多くの色を使う",
        "一貫性を保つ",
        "毎回違うデザインにする",
        "文字を小さくする",
      ],
      correctIndex: 1,
      explanation: "一貫性があると、ユーザーが迷わず操作できます。",
    },
    {
      question: "余白（ホワイトスペース）の役割は？",
      options: [
        "容量を減らす",
        "コンテンツを見やすくする",
        "開発を早くする",
        "特に意味はない",
      ],
      correctIndex: 1,
      explanation: "余白があることで、情報が整理されて見やすくなります。",
    },
  ],

  summary: [
    "デザインテイストで印象が決まる",
    "カラーパレットで色のルールを決める",
    "色には心理的な意味がある",
    "一貫性と余白が大切",
  ],
};

