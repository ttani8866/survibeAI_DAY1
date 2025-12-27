// STEP 09: 生成AI APIを組み込む

export const step09Data = {
  step: "09",
  title: "生成AI APIを組み込む",
  subtitle: "OpenAI API連携。AIをアプリに組み込もう",
  phase: "実装",
  phaseColor: "#6366f1",
  xpReward: 100,

  dialogues: [
    {
      speaker: "teacher" as const,
      message:
        "いよいよ本題！\n生成AIをアプリに組み込むよ。\nOpenAI APIを使ってみよう！",
    },
    {
      speaker: "student" as const,
      message: "OpenAI APIって何ですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "ChatGPTの頭脳を借りられるサービスだよ。\n\nAPIにテキストを送ると、\nAIが考えて返事をくれる。\n\nチャットボット、文章生成、翻訳...\n何でもできる！",
    },
    {
      speaker: "student" as const,
      message: "どうやって使うんですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "APIキーを取得して、リクエストを送るだけ。\n\n```javascript\nconst response = await openai.chat.completions.create({\n  model: 'gpt-4',\n  messages: [{ role: 'user', content: '質問' }]\n});\n```\n\nこれでAIの返答がもらえる！",
    },
    {
      speaker: "student" as const,
      message: "プロンプトエンジニアリングって何ですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "AIへの指示を上手に書く技術だよ。\n\nコツは:\n・具体的に書く\n・役割を与える（あなたは〇〇です）\n・出力形式を指定する\n・例を示す\n\nこれでAIの回答品質がグンと上がる！",
    },
  ],

  interactiveChoices: [
    {
      question: "OpenAI APIでできることは？",
      choices: ["画像編集のみ", "テキスト生成、翻訳、チャットなど多様", "音楽再生のみ"],
      correctIndex: 1,
      explanation: "OpenAI APIは文章生成、翻訳、要約、チャットなど多様なタスクに対応します。",
    },
    {
      question: "プロンプトエンジニアリングとは？",
      choices: ["AIを作る技術", "AIへの指示を上手に書く技術", "ハードウェア設計"],
      correctIndex: 1,
      explanation: "プロンプトエンジニアリングはAIから良い回答を得るための指示の書き方です。",
    },
  ],

  quiz: [
    {
      question: "OpenAIが開発したAIは？",
      options: ["Gemini", "Claude", "ChatGPT", "Copilot"],
      correctIndex: 2,
      explanation: "ChatGPTはOpenAIが開発した対話型AIです。",
    },
    {
      question: "APIキーの役割は？",
      options: [
        "画面のデザインを変える",
        "サービスを利用するための認証情報",
        "データベースを作成する",
        "画像を圧縮する",
      ],
      correctIndex: 1,
      explanation: "APIキーはサービスを利用する際の身分証明書のようなものです。",
    },
    {
      question: "プロンプトとは？",
      options: [
        "プログラムのエラー",
        "AIへの指示・質問文",
        "画像ファイル",
        "データベース",
      ],
      correctIndex: 1,
      explanation: "プロンプトはAIに送る指示や質問のテキストです。",
    },
    {
      question: "トークンとは？",
      options: [
        "お金の単位",
        "AIが処理するテキストの単位",
        "画像の解像度",
        "通信速度",
      ],
      correctIndex: 1,
      explanation: "トークンはAIがテキストを処理する際の単位で、料金計算にも使われます。",
    },
    {
      question: "良いプロンプトのコツは？",
      options: [
        "できるだけ短く書く",
        "具体的に、役割を与えて、出力形式を指定",
        "英語だけで書く",
        "絵文字をたくさん使う",
      ],
      correctIndex: 1,
      explanation: "具体的な指示、役割設定、出力形式の指定が良いプロンプトのコツです。",
    },
  ],

  summary: [
    "OpenAI APIでAIの力を借りられる",
    "APIキーで認証して利用",
    "プロンプトエンジニアリングで回答品質向上",
    "トークン数で料金が決まる",
  ],
};

