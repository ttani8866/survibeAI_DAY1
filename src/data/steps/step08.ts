// STEP 08: Reactでモダンに書き換え

export const step08Data = {
  step: "08",
  title: "Reactでモダンに書き換え",
  subtitle: "コンポーネント設計。モダンなフロントエンド開発",
  phase: "実装",
  phaseColor: "#6366f1",
  xpReward: 100,

  dialogues: [
    {
      speaker: "teacher" as const,
      message:
        "HTML/CSS/JavaScriptでアプリが作れるようになったね。\n次はReactでもっと効率的に作ろう！",
    },
    {
      speaker: "student" as const,
      message: "Reactって何ですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "Meta（旧Facebook）が作ったライブラリだよ。\n\n特徴は『コンポーネント』という考え方。\n\nUIを小さな部品に分けて、\n組み合わせてページを作るんだ。\nレゴブロックみたいなイメージ！",
    },
    {
      speaker: "student" as const,
      message: "コンポーネントって何ですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "再利用できるUI部品のことだよ。\n\n例えば:\n・ボタンコンポーネント\n・カードコンポーネント\n・ヘッダーコンポーネント\n\n一度作れば何度でも使える！\n修正も1箇所でOK。",
    },
    {
      speaker: "student" as const,
      message: "useStateって聞いたことあります",
    },
    {
      speaker: "teacher" as const,
      message:
        "useStateは『状態管理』のための機能だよ。\n\n```javascript\nconst [count, setCount] = useState(0);\n```\n\ncountが現在の値、\nsetCountで値を更新する。\n\n値が変わると画面が自動で更新される。\nこれがReactの魔法！",
    },
  ],

  interactiveChoices: [
    {
      question: "Reactの特徴は？",
      choices: ["データベース管理", "コンポーネントベースのUI構築", "サーバー構築"],
      correctIndex: 1,
      explanation: "ReactはUIを再利用可能なコンポーネントで構築するライブラリです。",
    },
    {
      question: "useStateの役割は？",
      choices: ["画像を表示する", "状態（データ）を管理する", "APIを呼び出す"],
      correctIndex: 1,
      explanation: "useStateはコンポーネントの状態を管理し、変更時に再描画します。",
    },
  ],

  quiz: [
    {
      question: "Reactを作った会社は？",
      options: ["Google", "Microsoft", "Meta（旧Facebook）", "Apple"],
      correctIndex: 2,
      explanation: "ReactはMeta（旧Facebook）が開発したJavaScriptライブラリです。",
    },
    {
      question: "コンポーネントとは？",
      options: [
        "データベース",
        "再利用可能なUI部品",
        "サーバーの種類",
        "CSSフレームワーク",
      ],
      correctIndex: 1,
      explanation: "コンポーネントは再利用できるUI部品で、組み合わせてページを作ります。",
    },
    {
      question: "JSXとは？",
      options: [
        "新しいプログラミング言語",
        "JavaScriptの中にHTMLを書ける記法",
        "CSSの拡張",
        "データベース言語",
      ],
      correctIndex: 1,
      explanation: "JSXはJavaScriptの中にHTMLのような記法を書ける拡張構文です。",
    },
    {
      question: "propsの役割は？",
      options: [
        "スタイルを定義する",
        "親から子コンポーネントにデータを渡す",
        "APIを呼び出す",
        "ページを移動する",
      ],
      correctIndex: 1,
      explanation: "propsは親コンポーネントから子コンポーネントにデータを渡す仕組みです。",
    },
    {
      question: "useEffectの用途は？",
      options: [
        "スタイルを適用する",
        "副作用（API呼び出しなど）を実行する",
        "ルーティングする",
        "フォームを送信する",
      ],
      correctIndex: 1,
      explanation: "useEffectはAPI呼び出しなどの副作用を実行するためのHookです。",
    },
  ],

  summary: [
    "Reactはコンポーネントベース",
    "JSXでHTMLライクに書ける",
    "useStateで状態管理",
    "propsでデータを渡す",
  ],
};

