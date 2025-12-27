// STEP 07: Webの仕組みを理解する

export const step07Data = {
  step: "07",
  title: "Webの仕組みを理解する",
  subtitle: "HTTP、API、サーバーとクライアント。通信の基礎",
  phase: "理解",
  phaseColor: "#ec4899",
  xpReward: 100,

  dialogues: [
    {
      speaker: "teacher" as const,
      message:
        "ここまでで画面が作れるようになったね！\n次は『Webの仕組み』を理解しよう。\nこれがわかると、外部サービスと連携できるよ。",
    },
    {
      speaker: "student" as const,
      message: "Webの仕組みってどういうことですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "インターネットでデータがどう流れるか、だね。\n\n例えばこのアプリを使うとき:\n1. あなた（クライアント）がリクエスト送信\n2. サーバーが処理\n3. サーバーがレスポンスを返す\n4. 画面に表示\n\nこの流れが基本だよ！",
    },
    {
      speaker: "student" as const,
      message: "APIって聞いたことあります",
    },
    {
      speaker: "teacher" as const,
      message:
        "API（Application Programming Interface）は\n『サービス同士をつなぐ窓口』だよ。\n\n例えば:\n・天気APIで天気情報を取得\n・翻訳APIで文章を翻訳\n・OpenAI APIでAIと会話\n\n他のサービスの機能を借りられるんだ！",
    },
    {
      speaker: "student" as const,
      message: "どうやってAPIを使うんですか？",
    },
    {
      speaker: "teacher" as const,
      message:
        "fetch()という関数を使うよ。\n\n```javascript\nconst response = await fetch('APIのURL');\nconst data = await response.json();\n```\n\nURLにリクエストを送って、\n返ってきたデータを使う。\nこれだけ！",
    },
  ],

  interactiveChoices: [
    {
      question: "クライアントとサーバーの関係は？",
      choices: [
        "同じもの",
        "クライアントがリクエスト、サーバーがレスポンス",
        "サーバーがリクエスト、クライアントがレスポンス",
      ],
      correctIndex: 1,
      explanation: "クライアント（ブラウザ）がリクエストを送り、サーバーがレスポンスを返します。",
    },
    {
      question: "APIとは？",
      choices: ["プログラミング言語", "サービス同士をつなぐ窓口", "データベース"],
      correctIndex: 1,
      explanation: "APIは異なるサービス間でデータをやり取りするための窓口です。",
    },
  ],

  quiz: [
    {
      question: "HTTPとは？",
      options: [
        "プログラミング言語",
        "Web通信のプロトコル（ルール）",
        "データベースの種類",
        "画像形式",
      ],
      correctIndex: 1,
      explanation: "HTTPはWeb上でデータをやり取りするための通信ルールです。",
    },
    {
      question: "APIの役割は？",
      options: [
        "画像を編集する",
        "異なるサービス間でデータをやり取りする",
        "動画を再生する",
        "文書を作成する",
      ],
      correctIndex: 1,
      explanation: "APIは異なるサービス間でデータを交換するための仕組みです。",
    },
    {
      question: "JSONとは？",
      options: [
        "画像形式",
        "データ交換用のテキスト形式",
        "プログラミング言語",
        "Webブラウザ",
      ],
      correctIndex: 1,
      explanation: "JSONはJavaScript Object Notationの略で、データ交換に使われます。",
    },
    {
      question: "GETリクエストの用途は？",
      options: [
        "データを削除する",
        "データを取得する",
        "データを更新する",
        "データを作成する",
      ],
      correctIndex: 1,
      explanation: "GETはサーバーからデータを取得するときに使います。",
    },
    {
      question: "POSTリクエストの用途は？",
      options: [
        "データを取得する",
        "データを送信・作成する",
        "画面を更新する",
        "ログアウトする",
      ],
      correctIndex: 1,
      explanation: "POSTはサーバーにデータを送信・作成するときに使います。",
    },
  ],

  summary: [
    "クライアントがリクエスト、サーバーがレスポンス",
    "APIはサービス同士をつなぐ窓口",
    "JSONでデータをやり取り",
    "fetch()でAPIを呼び出す",
  ],
};

