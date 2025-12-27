// STEP 05: HTML/CSSでUIを作る

export const step05Data = {
  step: "05",
  title: "HTML/CSSでUIを作る",
  subtitle: "デザインをコードに。Webページの見た目を作ろう",
  phase: "実装",
  phaseColor: "#6366f1",
  xpReward: 100,

  dialogues: [
    {
      speaker: "teacher" as const,
      message:
        "環境が整ったね！\nいよいよコードを書いていくよ。\nまずはHTML/CSSでUIを作ろう！",
    },
    {
      speaker: "student" as const,
      message: "HTMLとCSSって何ですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "HTMLは『骨格』、CSSは『見た目』だよ。\n\nHTML: 文字やボタンを配置する\nCSS: 色や大きさ、位置を決める\n\n人間で言うと:\nHTML = 骨や筋肉\nCSS = 服や髪型",
    },
    {
      speaker: "student" as const,
      message: "なるほど！HTMLで作ってCSSで飾るんですね",
    },
    {
      speaker: "teacher" as const,
      message:
        "その通り！簡単な例を見てみよう:\n\n```html\n<button>クリック</button>\n```\n\nこれだけで普通のボタンができる。\nCSSを追加すると...\n\n```css\nbutton {\n  background: blue;\n  color: white;\n}\n```\n\n青いボタンになる！",
    },
    {
      speaker: "student" as const,
      message: "思ったより簡単そう！",
    },
    {
      speaker: "teacher" as const,
      message:
        "そう！最初は簡単なものから始めよう。\n\n大事なのは:\n・タグ（<div>など）で囲む\n・クラスで名前をつける\n・CSSでスタイルを指定\n\nこれを繰り返すだけでUIが作れるよ！",
    },
  ],

  interactiveChoices: [
    {
      question: "HTMLの役割は？",
      choices: ["見た目を決める", "構造・骨格を作る", "動きをつける"],
      correctIndex: 1,
      explanation: "HTMLはWebページの構造（骨格）を定義します。見た目はCSSで決めます。",
    },
    {
      question: "CSSの役割は？",
      choices: ["構造を作る", "色や大きさなど見た目を決める", "データを保存する"],
      correctIndex: 1,
      explanation: "CSSは色、サイズ、配置などの見た目（スタイル）を定義します。",
    },
  ],

  quiz: [
    {
      question: "HTMLとは何の略？",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Making Language",
        "Hyper Transfer Mail Language",
      ],
      correctIndex: 0,
      explanation: "HTMLはHyper Text Markup Languageの略です。",
    },
    {
      question: "CSSとは何の略？",
      options: [
        "Computer Style System",
        "Cascading Style Sheets",
        "Creative Style Software",
        "Code Style Standard",
      ],
      correctIndex: 1,
      explanation: "CSSはCascading Style Sheetsの略です。",
    },
    {
      question: "<div>タグの役割は？",
      options: [
        "画像を表示する",
        "要素をグループ化する箱",
        "リンクを作る",
        "音声を再生する",
      ],
      correctIndex: 1,
      explanation: "divタグは要素をグループ化するための汎用的なコンテナです。",
    },
    {
      question: "クラス（class）の役割は？",
      options: [
        "要素に名前をつけてCSSで指定できるようにする",
        "画像を表示する",
        "ページを移動する",
        "計算をする",
      ],
      correctIndex: 0,
      explanation: "classを使うと、同じスタイルを複数の要素に適用できます。",
    },
    {
      question: "レスポンシブデザインとは？",
      options: [
        "高速に動くデザイン",
        "画面サイズに応じてレイアウトが変わる",
        "アニメーション付きデザイン",
        "3Dデザイン",
      ],
      correctIndex: 1,
      explanation: "レスポンシブデザインはPC・スマホなど画面サイズに対応する設計です。",
    },
  ],

  summary: [
    "HTMLは構造（骨格）を作る",
    "CSSは見た目（スタイル）を決める",
    "クラスで名前をつけてスタイルを適用",
    "レスポンシブで様々な画面に対応",
  ],
};

