// STEP 01: アイデア・要件定義

export const step01Data = {
  step: "01",
  title: "アイデア・要件定義",
  subtitle: "何を作る？誰のため？サービス設計の基本を学ぼう",
  phase: "企画",
  phaseColor: "#f59e0b",
  xpReward: 100,

  // 対話形式のレッスンコンテンツ
  dialogues: [
    {
      speaker: "teacher" as const,
      message:
        "こんにちは！今日から一緒に「生成AIラーニングアプリ」を作っていくよ。\nまずは『何を作るか』を決める大事なステップだね。",
    },
    {
      speaker: "student" as const,
      message: "何から始めればいいですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "まずは『誰のために作るか』を考えよう。\nこれをターゲットユーザーって言うんだ。\n\nこのアプリは誰に使ってもらいたいと思う？",
    },
    {
      speaker: "student" as const,
      message: "生成AIを使ってみたいけど、難しそうで躊躇している人...とか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "素晴らしい！🎉 それがまさにターゲットだね。\n\n次に、その人たちが抱えている『課題』は何だろう？\nこれがわかると、解決策＝アプリの機能が見えてくるんだ。",
    },
    {
      speaker: "student" as const,
      message: "使い方がわからない、独学だと続かない...かな",
    },
    {
      speaker: "teacher" as const,
      message:
        "完璧！👏 これが『要件定義』の第一歩だよ。\n\n📝 まとめると:\n・ターゲット: 生成AI初心者\n・課題: 使い方不明、独学で挫折\n・解決策: 楽しく学べるアプリ\n\nこれが企画の基本だね！",
    },
  ],

  // インタラクティブな選択問題（レッスン中）
  interactiveChoices: [
    {
      question: "サービス設計で最初に考えるべきことは？",
      choices: ["使う技術", "ターゲットユーザー", "デザインの色"],
      correctIndex: 1,
      explanation:
        "技術やデザインは後から決められますが、『誰のために作るか』が不明確だと、作るものがブレてしまいます。",
    },
    {
      question: "課題を明確にする理由は？",
      choices: [
        "報告書に書くため",
        "解決策（機能）が見えてくるから",
        "特に理由はない",
      ],
      correctIndex: 1,
      explanation:
        "ユーザーの課題がわかれば、それを解決する機能を考えられます。課題から逆算して機能を決めるのがコツです。",
    },
  ],

  // STEP完了後のクイズ
  quiz: [
    {
      question: "サービス開発で最初に決めるべきことは？",
      options: [
        "使用する技術",
        "デザインの色",
        "ターゲットユーザーと解決する課題",
        "アプリの名前",
      ],
      correctIndex: 2,
      explanation:
        "技術やデザインは後から決められますが、「誰の何を解決するか」が不明確だと、作るものがブレてしまいます。",
    },
    {
      question: "MVPとは何の略？",
      options: [
        "Most Valuable Player",
        "Minimum Viable Product",
        "Maximum Version Plan",
        "Main Visual Page",
      ],
      correctIndex: 1,
      explanation:
        "MVP（Minimum Viable Product）は「最小限の価値ある製品」。まずは核心機能だけ作って検証する考え方です。",
    },
    {
      question: "要件定義で重要なのは？",
      options: [
        "できるだけ多くの機能を入れる",
        "ユーザーの課題を明確にする",
        "競合と同じ機能を入れる",
        "最新技術を使う",
      ],
      correctIndex: 1,
      explanation:
        "機能をたくさん入れても、ユーザーの課題を解決しなければ意味がありません。",
    },
    {
      question: "ターゲットユーザーを決める理由は？",
      options: [
        "広告を出すため",
        "機能やデザインの判断基準になる",
        "法律で決まっているから",
        "特に理由はない",
      ],
      correctIndex: 1,
      explanation:
        "ターゲットが明確だと「この機能は必要か？」「このデザインは適切か？」の判断ができます。",
    },
    {
      question: "「生成AIラーニングアプリ」が解決する課題は？",
      options: [
        "AIの料金が高い",
        "スマホがない",
        "使い方がわからない、独学で挫折しやすい",
        "インターネットがない",
      ],
      correctIndex: 2,
      explanation:
        "このアプリは「生成AIの使い方を楽しく学べる」ことで、挫折しやすいという課題を解決します。",
    },
  ],

  // 学習のポイントまとめ
  summary: [
    "サービス設計は「誰のため？」から始める",
    "ターゲットユーザーの課題を明確にする",
    "課題から逆算して機能を決める",
    "MVPで最小限から始める",
  ],
};

