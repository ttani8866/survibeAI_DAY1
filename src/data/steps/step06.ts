// STEP 06: JavaScriptで動きをつける

export const step06Data = {
  step: "06",
  title: "JavaScriptで動きをつける",
  subtitle: "クリック、入力、表示切替。インタラクションを実装",
  phase: "実装",
  phaseColor: "#6366f1",
  xpReward: 100,

  dialogues: [
    {
      speaker: "teacher" as const,
      message:
        "HTMLとCSSで見た目ができたね！\nでもまだ動かないよね。\nJavaScriptで『動き』をつけよう！",
    },
    {
      speaker: "student" as const,
      message: "JavaScriptって何ですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "Webページに動きをつけるプログラミング言語だよ。\n\n例えば:\n・ボタンをクリックしたら何かする\n・入力内容をチェックする\n・表示を切り替える\n\nユーザーの操作に反応できるようになる！",
    },
    {
      speaker: "student" as const,
      message: "どうやって動きをつけるんですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "基本は『イベント』と『関数』だよ。\n\n```javascript\nボタン.addEventListener('click', () => {\n  alert('クリックされた！');\n});\n```\n\n『クリックされたら』→『アラートを出す』\nという流れを書くんだ。",
    },
    {
      speaker: "student" as const,
      message: "イベントって他にどんなものがありますか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "たくさんあるよ！\n\n・click: クリック\n・input: 入力\n・submit: 送信\n・mouseover: マウスを乗せる\n・scroll: スクロール\n\nこれらを組み合わせてインタラクティブなアプリを作るんだ！",
    },
  ],

  interactiveChoices: [
    {
      question: "JavaScriptの役割は？",
      choices: ["見た目を決める", "Webページに動きをつける", "構造を作る"],
      correctIndex: 1,
      explanation: "JavaScriptはユーザーの操作に反応して動きをつけるプログラミング言語です。",
    },
    {
      question: "イベントとは？",
      choices: ["お祭り", "ユーザーの操作（クリックなど）", "エラーメッセージ"],
      correctIndex: 1,
      explanation: "イベントはクリック、入力などユーザーの操作を指します。",
    },
  ],

  quiz: [
    {
      question: "JavaScriptの主な役割は？",
      options: [
        "データベースを管理する",
        "Webページに動きをつける",
        "サーバーを構築する",
        "画像を編集する",
      ],
      correctIndex: 1,
      explanation: "JavaScriptはWebページに動きやインタラクションを追加します。",
    },
    {
      question: "関数（function）とは？",
      options: [
        "データの保存場所",
        "処理をまとめたもの",
        "画像ファイル",
        "HTMLタグ",
      ],
      correctIndex: 1,
      explanation: "関数は一連の処理をまとめて名前をつけたものです。",
    },
    {
      question: "変数（variable）とは？",
      options: [
        "データを入れる箱",
        "画面のデザイン",
        "ボタンの種類",
        "エラーメッセージ",
      ],
      correctIndex: 0,
      explanation: "変数はデータを一時的に保存しておく箱のようなものです。",
    },
    {
      question: "console.log()の役割は？",
      options: [
        "ファイルを保存する",
        "開発者ツールにメッセージを表示する",
        "画面を更新する",
        "データを削除する",
      ],
      correctIndex: 1,
      explanation: "console.logはデバッグ用にメッセージを表示する関数です。",
    },
    {
      question: "DOMとは？",
      options: [
        "JavaScriptのライブラリ",
        "HTMLをJavaScriptで操作するための仕組み",
        "CSSのフレームワーク",
        "データベースの種類",
      ],
      correctIndex: 1,
      explanation: "DOM（Document Object Model）はHTMLをJavaScriptで操作する仕組みです。",
    },
  ],

  summary: [
    "JavaScriptで動きをつける",
    "イベント（クリックなど）に反応",
    "関数で処理をまとめる",
    "DOMでHTMLを操作する",
  ],
};

