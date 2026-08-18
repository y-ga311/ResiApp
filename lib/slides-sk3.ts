import type { Slide } from "./types";

// ─────────────────────────────────────────────────────────────
// SK03 問題解決 — 全8レッスン スライドデータ
// ─────────────────────────────────────────────────────────────

export const SK3_SLIDES: Record<string, Slide[]> = {

  "sk3-l1": [
    {
      id: "s1", type: "intro",
      emoji: "🎯",
      title: "問題解決法とは？",
      image: "/training/問題解決/sk3-l1-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🌀",
      title: "避け続けるとどうなる？",
      image: "/training/問題解決/sk3-l1-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🪜",
      title: "系統的に解く",
      image: "/training/問題解決/sk3-l1-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "問題解決で最初に大事な姿勢は？",
        options: [
          { label: "全部まとめて一気に解く", correct: false },
          { label: "小さく定義して一歩進む", correct: true },
          { label: "考えないようにする", correct: false },
        ],
        explanation: "小さく具体化して一歩進むことが、負担を減らし成果につながります。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🌱",
      title: "完璧な解決は後回し",
      image: "/training/問題解決/sk3-l1-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `今モヤモヤしていることを1つ挙げよう。`,
      work: {
        prompt: "避けがちだった悩みを、短く書いてみよう",
        hint: "例：課題が溜まって手をつけられない",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/問題解決/sk3-l1-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk3-l2": [
    {
      id: "s1", type: "intro",
      emoji: "🔎",
      title: "問題を明確に定義する",
      image: "/training/問題解決/sk3-l2-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🌫️",
      title: "曖昧な悩みのままでは動けない",
      image: "/training/問題解決/sk3-l2-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "✍️",
      title: "定義の例",
      image: "/training/問題解決/sk3-l2-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "良い問題定義に近いのは？",
        options: [
          { label: "人生がうまくいかない", correct: false },
          { label: "金曜までに提出物を1つ完成させる", correct: true },
          { label: "自分がダメな人間だ", correct: false },
        ],
        explanation: "具体的で行動可能な形が、良い問題定義です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🧩",
      title: "一文チェック",
      image: "/training/問題解決/sk3-l2-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `モヤモヤを具体的な問題文に書き換えよう。`,
      work: {
        prompt: "曖昧な悩み → 具体的な問題文",
        hint: "例：不安 → 英単語を今夜20個覚える",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/問題解決/sk3-l2-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk3-l3": [
    {
      id: "s1", type: "intro",
      emoji: "💡",
      title: "ブレインストーミング",
      image: "/training/問題解決/sk3-l3-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🚫",
      title: "ジャッジは後回し",
      image: "/training/問題解決/sk3-l3-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "📝",
      title: "出し方のコツ",
      image: "/training/問題解決/sk3-l3-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "ブレインストーミングで大切なのは？",
        options: [
          { label: "最初から最良案だけ出す", correct: false },
          { label: "評価せずに量を出す", correct: true },
          { label: "実行できる案だけ出す", correct: false },
        ],
        explanation: "この段階では実行可能性より発想の量が大事です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "⏱️",
      title: "5分タイマー",
      image: "/training/問題解決/sk3-l3-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `具体化した問題に対して案を出そう。`,
      work: {
        prompt: "解決案をできるだけ多く書いてみよう（目標10）",
        hint: "例：友達に聞く／先生に質問／動画で復習／朝早起き…",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/問題解決/sk3-l3-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk3-l4": [
    {
      id: "s1", type: "intro",
      emoji: "✅",
      title: "解決策を評価・選択する",
      image: "/training/問題解決/sk3-l4-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "⚖️",
      title: "評価の観点",
      image: "/training/問題解決/sk3-l4-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🏁",
      title: "選び方",
      image: "/training/問題解決/sk3-l4-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "最初に選ぶ案として良いのは？",
        options: [
          { label: "最大効果だが今は無理な案", correct: false },
          { label: "効果が中くらいでも今週できる案", correct: true },
          { label: "何もしない", correct: false },
        ],
        explanation: "実行可能性が高い案から試すと、学習が進みます。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🥇",
      title: "本命と控えを持つ",
      image: "/training/問題解決/sk3-l4-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `案を評価して選ぼう。`,
      work: {
        prompt: "本命案と控え案、選んだ理由を書いてみよう",
        hint: "例：本命＝先生に質問／控え＝友だちと一緒に解く",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/問題解決/sk3-l4-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk3-l5": [
    {
      id: "s1", type: "intro",
      emoji: "📅",
      title: "アクションプランを立てる",
      image: "/training/問題解決/sk3-l5-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🧭",
      title: "曖昧な計画は実行されない",
      image: "/training/問題解決/sk3-l5-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "📌",
      title: "プラン例",
      image: "/training/問題解決/sk3-l5-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "良いアクションプランは？",
        options: [
          { label: "そのうちやる", correct: false },
          { label: "木曜の放課後、図書館でプリント1枚", correct: true },
          { label: "気合を入れる", correct: false },
        ],
        explanation: "日時と場所と行動が具体的なほど実行しやすいです。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🔔",
      title: "リマインダーを味方に",
      image: "/training/問題解決/sk3-l5-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `選んだ案のアクションプランを作ろう。`,
      work: {
        prompt: "いつ／どこで／何をする を書いてみよう",
        hint: "例：水曜17時／自宅机／数学プリントの問1だけ",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/問題解決/sk3-l5-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk3-l6": [
    {
      id: "s1", type: "intro",
      emoji: "🔁",
      title: "実行して振り返る",
      image: "/training/問題解決/sk3-l6-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "📊",
      title: "振り返りの観点",
      image: "/training/問題解決/sk3-l6-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🔄",
      title: "うまくいかないとき",
      image: "/training/問題解決/sk3-l6-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "振り返りで大切な見方は？",
        options: [
          { label: "できなかったら才能がない", correct: false },
          { label: "結果を次の仮説の材料にする", correct: true },
          { label: "二度と試さない", correct: false },
        ],
        explanation: "うまくいかなくても、学びがあれば前進です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🧪",
      title: "実験だと思う",
      image: "/training/問題解決/sk3-l6-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `直近の挑戦を振り返ろう（まだなら仮想でもOK）。`,
      work: {
        prompt: "結果／助け／妨げ／次の一手 を書いてみよう",
        hint: "例：半分できた／タイマーが助け／眠気が妨げ／時間を前倒し",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/問題解決/sk3-l6-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk3-l7": [
    {
      id: "s1", type: "intro",
      emoji: "⭕",
      title: "コントロールできないことへの向き合い方",
      image: "/training/問題解決/sk3-l7-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "⭕",
      title: "2つの円",
      image: "/training/問題解決/sk3-l7-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🎯",
      title: "内側に戻す質問",
      image: "/training/問題解決/sk3-l7-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "コントロールしやすいのはどれ？",
        options: [
          { label: "友だちの機嫌", correct: false },
          { label: "自分が送るメッセージの内容", correct: true },
          { label: "昨日の失敗を無かったことにする", correct: false },
        ],
        explanation: "変えやすいのは自分の行動や伝え方です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🫧",
      title: "心配リストを分ける",
      image: "/training/問題解決/sk3-l7-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `今の悩みを2つに分けよう。`,
      work: {
        prompt: "コントロールできること／できないこと を書いてみよう",
        hint: "例：できる＝質問する／できない＝点数そのもの",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/問題解決/sk3-l7-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk3-l8": [
    {
      id: "s1", type: "intro",
      emoji: "🏁",
      title: "まとめと振り返り",
      image: "/training/問題解決/sk3-l8-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "📚",
      title: "問題解決の6ステップ",
      image: "/training/問題解決/sk3-l8-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "quiz",
      quiz: {
        question: "行き詰まったら最初に戻るのは？",
        options: [
          { label: "いきなり全部やり直す", correct: false },
          { label: "問題の明確化に戻る", correct: true },
          { label: "考えるのをやめる", correct: false },
        ],
        explanation: "ステップ1に戻ると、次の手が再び見えやすくなります。",
      },
    },
    {
      id: "s4", type: "tip",
      emoji: "🧰",
      title: "ポケット手順",
      image: "/training/問題解決/sk3-l8-s4.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s5", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `これから使う問題解決プランを決めよう。`,
      work: {
        prompt: "よく使うステップと、次に解く問題を書いてみよう",
        hint: "例：具体化と小さく実行／次は提出物の遅れ",
      },
    },
    {
      id: "s6", type: "summary",
      emoji: "🏆",
      title: "SK03 問題解決 完了！",
      image: "/training/問題解決/sk3-l8-s6.png",
      // 画像内に文言があるため body は省略
    },
  ],
};
