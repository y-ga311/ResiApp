import type { Slide } from "./types";

// ─────────────────────────────────────────────────────────────
// SK04 アサーション — 全10レッスン スライドデータ
// ─────────────────────────────────────────────────────────────

export const SK4_SLIDES: Record<string, Slide[]> = {

  "sk4-l1": [
    {
      id: "s1", type: "intro",
      emoji: "💬",
      title: "アサーションとは？",
      image: "/training/アサーション/sk4-l1-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🎭",
      title: "3つのスタイル",
      image: "/training/アサーション/sk4-l1-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🤝",
      title: "アサーティブのイメージ",
      image: "/training/アサーション/sk4-l1-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "アサーティブに近いのは？",
        options: [
          { label: "自分の気持ちを伝えつつ相手も尊重する", correct: true },
          { label: "相手を論破して従わせる", correct: false },
          { label: "何も言わず我慢する", correct: false },
        ],
        explanation: "自分も相手も大切にするのがアサーティブです。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🌱",
      title: "最初はぎこちなくてOK",
      image: "/training/アサーション/sk4-l1-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `最近の会話を振り返ろう。`,
      work: {
        prompt: "攻撃的／受け身／アサーティブ、どれが多かった？例を1つ",
        hint: "例：受け身 — 嫌な予定も断れず引き受けた",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/アサーション/sk4-l1-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk4-l2": [
    {
      id: "s1",
      type: "intro",
      emoji: "🪞",
      title: "自分のコミュニケーションスタイルを知る",
      image: "/training/アサーション/sk4-l2-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "📊",
      title: "傾向を観察する",
      image: "/training/アサーション/sk4-l2-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "🔍",
      title: "チェックの視点",
      image: "/training/アサーション/sk4-l2-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "スタイル把握で大切なのは？",
        options: [
          { label: "自分を責めること", correct: false },
          { label: "傾向に気づき、選び直せるようにすること", correct: true },
          { label: "一回で完璧に変えること", correct: false },
        ],
        explanation: "気づきが目的。責めずに観察することが変化につながります。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "📝",
      title: "場面メモ",
      image: "/training/アサーション/sk4-l2-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `自分の傾向を言葉にしよう。`,
      work: {
        prompt: "よく出るスタイルと、典型的な場面を書いてみよう",
        hint: "例：受け身 — 先生や先輩の頼みを断れない",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/アサーション/sk4-l2-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk4-l3": [
    {
      id: "s1",
      type: "intro",
      emoji: "🙅",
      title: "断る権利",
      image: "/training/アサーション/sk4-l3-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "💭",
      title: "罪悪感の正体",
      image: "/training/アサーション/sk4-l3-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "🗣️",
      title: "断りの基本形",
      image: "/training/アサーション/sk4-l3-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "アサーティブな断りに近いのは？",
        options: [
          { label: "無視する", correct: false },
          { label: "怒って拒絶する", correct: false },
          { label: "感謝しつつ、できないことを伝える", correct: true },
        ],
        explanation: "相手を尊重しつつ、自分の境界線を示すのがポイントです。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "🧊",
      title: "即答しなくてOK",
      image: "/training/アサーション/sk4-l3-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `断りたい場面のセリフを作ろう。`,
      work: {
        prompt: "丁寧な断り文を1つ書いてみよう",
        hint: "例：ありがとう。今週は課題で難しいです。",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/アサーション/sk4-l3-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk4-l4": [
    {
      id: "s1",
      type: "intro",
      emoji: "📐",
      title: "DEスクリプト法を学ぶ",
      image: "/training/アサーション/sk4-l4-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "🔤",
      title: "DESCの型",
      image: "/training/アサーション/sk4-l4-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "📌",
      title: "例文",
      image: "/training/アサーション/sk4-l4-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "DESCで最初に伝えるとよいのは？",
        options: [
          { label: "事実の描写", correct: true },
          { label: "相手の性格批判", correct: false },
          { label: "怒鳴る", correct: false },
        ],
        explanation: "まず事実（Describe）から入ると、対立が増えにくいです。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "🧩",
      title: "メモしてから話す",
      image: "/training/アサーション/sk4-l4-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `伝えたい場面をDESCで書いてみよう。`,
      work: {
        prompt: "D/E/S/C を短く書いてみよう",
        hint: "例：D遅れた／E不安／S事前連絡してほしい／C予定を合わせやすい",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/アサーション/sk4-l4-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk4-l5": [
    {
      id: "s1",
      type: "intro",
      emoji: "🎤",
      title: "依頼・断りの練習",
      image: "/training/アサーション/sk4-l5-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "🙏",
      title: "依頼のコツ",
      image: "/training/アサーション/sk4-l5-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "🙅",
      title: "断りのコツ（復習）",
      image: "/training/アサーション/sk4-l5-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "良い依頼に近いのは？",
        options: [
          { label: "やって当然だろ", correct: false },
          { label: "もしよければ、ここだけ手伝ってほしい", correct: true },
          { label: "黙って押し付ける", correct: false },
        ],
        explanation: "具体的で、断る余地がある依頼がアサーティブです。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "🎭",
      title: "声に出して練習",
      image: "/training/アサーション/sk4-l5-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `依頼と断りのセリフを1つずつ作ろう。`,
      work: {
        prompt: "依頼文／断り文 を書いてみよう",
        hint: "例：依頼＝ノート見せて／断り＝今度は難しいです",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/アサーション/sk4-l5-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk4-l6": [
    {
      id: "s1",
      type: "intro",
      emoji: "💗",
      title: "感情を言葉にする",
      image: "/training/アサーション/sk4-l6-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "👤",
      title: "Iメッセージとは？",
      image: "/training/アサーション/sk4-l6-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "🗣️",
      title: "型",
      image: "/training/アサーション/sk4-l6-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "Iメッセージに近いのは？",
        options: [
          { label: "お前が悪い", correct: false },
          { label: "常識的に考えておかしい", correct: false },
          { label: "予定が変わると不安になる", correct: true },
        ],
        explanation: "自分の感情を主語にするのがIメッセージです。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "📚",
      title: "感情ボキャブラリー",
      image: "/training/アサーション/sk4-l6-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `伝えたい気持ちをIメッセージにしよう。`,
      work: {
        prompt: "Iメッセージの一文を書いてみよう",
        hint: "例：返信がないと不安になる。一言だけでももらえると助かる",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/アサーション/sk4-l6-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk4-l7": [
    {
      id: "s1",
      type: "intro",
      emoji: "🛡️",
      title: "批判・クレームへの対応",
      image: "/training/アサーション/sk4-l7-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "🔥",
      title: "反応の前に一呼吸",
      image: "/training/アサーション/sk4-l7-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "💬",
      title: "返し方の例",
      image: "/training/アサーション/sk4-l7-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "批判を受けたとき最初に良いのは？",
        options: [
          { label: "一呼吸して要点を確認する", correct: true },
          { label: "すぐに言い返す", correct: false },
          { label: "完全に無視し続ける", correct: false },
        ],
        explanation: "感情が落ち着いてから返すと、建設的になりやすいです。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "🧊",
      title: "クールダウン時間",
      image: "/training/アサーション/sk4-l7-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `批判への返し方を用意しよう。`,
      work: {
        prompt: "よくありそうな批判と、自分の返しを書いてみよう",
        hint: "例：批判「適当」→返し「どの点が不十分だったか教えてほしい」",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/アサーション/sk4-l7-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk4-l8": [
    {
      id: "s1",
      type: "intro",
      emoji: "📱",
      title: "SNS・メールでのアサーション",
      image: "/training/アサーション/sk4-l8-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "⚠️",
      title: "テキストの落とし穴",
      image: "/training/アサーション/sk4-l8-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "✅",
      title: "テキストの工夫",
      image: "/training/アサーション/sk4-l8-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "テキスト送信前に良い習慣は？",
        options: [
          { label: "勢いのまま送る", correct: false },
          { label: "一度読み返してトーンを確認する", correct: true },
          { label: "既読無視を責める長文を送る", correct: false },
        ],
        explanation: "読み返しで誤解や攻撃性を減らせます。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "⏳",
      title: "下書き保存",
      image: "/training/アサーション/sk4-l8-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `伝えたいメッセージを下書きしよう。`,
      work: {
        prompt: "送る前の文面（丁寧版）を書いてみよう",
        hint: "例：返信遅くなってごめん。金曜までに確認してほしい",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/アサーション/sk4-l8-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk4-l9": [
    {
      id: "s1",
      type: "intro",
      emoji: "👂",
      title: "相手の気持ちを読む（共感力）",
      image: "/training/アサーション/sk4-l9-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "🧠",
      title: "共感と同意は違う",
      image: "/training/アサーション/sk4-l9-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "🗣️",
      title: "共感入りの伝え方",
      image: "/training/アサーション/sk4-l9-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "アサーティブな共感の使い方は？",
        options: [
          { label: "相手に合わせて我慢するだけ", correct: false },
          { label: "相手の気持ちを無視する", correct: false },
          { label: "相手を理解したうえで自分の希望も伝える", correct: true },
        ],
        explanation: "共感と自己主張の両立がポイントです。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "❓",
      title: "確認質問",
      image: "/training/アサーション/sk4-l9-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `相手の事情＋自分の希望の文を作ろう。`,
      work: {
        prompt: "共感の一言と、自分のお願いを書いてみよう",
        hint: "例：忙しいのは分かる。でも提出前に確認だけお願いしたい",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/アサーション/sk4-l9-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk4-l10": [
    {
      id: "s1",
      type: "intro",
      emoji: "🏁",
      title: "まとめと宣言",
      image: "/training/アサーション/sk4-l10-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "📚",
      title: "ここまで学んだこと",
      image: "/training/アサーション/sk4-l10-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "quiz",
      quiz: {
        question: "最初の実践として良いのは？",
        options: [
          { label: "小さな場面で1回だけ試す", correct: true },
          { label: "いきなり大きな対立で使う", correct: false },
          { label: "完璧になるまで話さない", correct: false },
        ],
        explanation: "小さな成功体験から始めると続きやすいです。",
      },
    },
    {
      id: "s4",
      type: "tip",
      emoji: "⭐",
      title: "今週の一言宣言",
      image: "/training/アサーション/sk4-l10-s4.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s5",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `今週のアサーション宣言を決めよう。`,
      work: {
        prompt: "いつ・誰に・どんな伝え方をする？",
        hint: "例：金曜に友だちへ、予定を丁寧に断る",
      },
    },
    {
      id: "s6",
      type: "summary",
      emoji: "🏆",
      title: "SK04 アサーション 完了！",
      image: "/training/アサーション/sk4-l10-s6.png",
      // 画像内に文言があるため body は省略
    },
  ],
};
