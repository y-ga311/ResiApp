import type { Slide } from "./types";

// ─────────────────────────────────────────────────────────────
// SK05 睡眠行動療法 — 全10レッスン スライドデータ
// ─────────────────────────────────────────────────────────────

export const SK5_SLIDES: Record<string, Slide[]> = {

  "sk5-l1": [
    {
      id: "s1",
      type: "intro",
      emoji: "🌙",
      title: "睡眠のしくみを知ろう",
      image: "/training/睡眠行動療法/sk5-l1-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "🔄",
      title: "睡眠の基本",
      image: "/training/睡眠行動療法/sk5-l1-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "💡",
      title: "学生に起きやすいこと",
      image: "/training/睡眠行動療法/sk5-l1-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "体内時計をリセットしやすいのは？",
        options: [
          { label: "深夜にスマホを長く見る", correct: false },
          { label: "朝に光を浴びる", correct: true },
          { label: "昼に昼寝を3時間する", correct: false },
        ],
        explanation: "朝の光は体内時計の重要なリセット信号です。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "☀️",
      title: "まず知ることから",
      image: "/training/睡眠行動療法/sk5-l1-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `自分の睡眠の悩みを一言で書こう。`,
      work: {
        prompt: "いちばん困っている睡眠の問題は？",
        hint: "例：寝つきが悪い／夜中に起きる／朝起きられない",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/睡眠行動療法/sk5-l1-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk5-l2": [
    {
      id: "s1",
      type: "intro",
      emoji: "📒",
      title: "自分の睡眠パターンを記録する",
      image: "/training/睡眠行動療法/sk5-l2-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "✍️",
      title: "睡眠日誌で見ること",
      image: "/training/睡眠行動療法/sk5-l2-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "📈",
      title: "記録のメリット",
      image: "/training/睡眠行動療法/sk5-l2-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "睡眠記録で大切なのは？",
        options: [
          { label: "1日だけ精密に測る", correct: false },
          { label: "ざっくりでも続ける", correct: true },
          { label: "記録せず我慢する", correct: false },
        ],
        explanation: "継続できる粒度で続けることが改善につながります。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "📱",
      title: "メモは朝1分",
      image: "/training/睡眠行動療法/sk5-l2-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `昨夜〜今朝の記録をつけてみよう。`,
      work: {
        prompt: "就寝／起床／眠りの満足度（0〜10）",
        hint: "例：0:30／7:10／満足度4",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/睡眠行動療法/sk5-l2-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk5-l3": [
    {
      id: "s1",
      type: "intro",
      emoji: "🛏️",
      title: "睡眠衛生（スリープハイジーン）",
      image: "/training/睡眠行動療法/sk5-l3-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "📋",
      title: "チェックしやすい項目",
      image: "/training/睡眠行動療法/sk5-l3-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "🌙",
      title: "今夜からできる例",
      image: "/training/睡眠行動療法/sk5-l3-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "睡眠衛生の始め方として良いのは？",
        options: [
          { label: "全部同時に完璧に変える", correct: false },
          { label: "変えやすい習慣を1つ選ぶ", correct: true },
          { label: "気にせず夜更かしする", correct: false },
        ],
        explanation: "小さな1変化の方が続き、効果も実感しやすいです。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "⭐",
      title: "今夜の1アクション",
      image: "/training/睡眠行動療法/sk5-l3-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `改善する習慣を1つ選ぼう。`,
      work: {
        prompt: "今夜から試す睡眠衛生を1つ書いてみよう",
        hint: "例：21時以降カフェインなし／ベッドで動画を見ない",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/睡眠行動療法/sk5-l3-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk5-l4": [
    {
      id: "s1",
      type: "intro",
      emoji: "🛌",
      title: "刺激制御法",
      image: "/training/睡眠行動療法/sk5-l4-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "🔗",
      title: "条件づけの考え方",
      image: "/training/睡眠行動療法/sk5-l4-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "📌",
      title: "基本ルール（例）",
      image: "/training/睡眠行動療法/sk5-l4-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "刺激制御の狙いに近いのは？",
        options: [
          { label: "ベッドでたくさん勉強する", correct: false },
          { label: "ベッドと眠りの結びつきを強める", correct: true },
          { label: "絶対に昼寝しない", correct: false },
        ],
        explanation: "ベッドを眠りの場所として再学習するのが目的です。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "💡",
      title: "眠れない夜の逃げ道",
      image: "/training/睡眠行動療法/sk5-l4-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `ベッドでやっている「眠り以外」を洗い出そう。`,
      work: {
        prompt: "減らしたいベッド習慣を1つ書いてみよう",
        hint: "例：ベッドで長時間の動画視聴",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/睡眠行動療法/sk5-l4-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk5-l5": [
    {
      id: "s1",
      type: "intro",
      emoji: "⏱️",
      title: "睡眠制限法",
      image: "/training/睡眠行動療法/sk5-l5-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "📉",
      title: "なぜ制限するの？",
      image: "/training/睡眠行動療法/sk5-l5-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "⚠️",
      title: "注意",
      image: "/training/睡眠行動療法/sk5-l5-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "睡眠制限で大切なのは？",
        options: [
          { label: "極端に削るほど良い", correct: false },
          { label: "無理のない範囲で効率を上げる", correct: true },
          { label: "昼に補って夜更かしする", correct: false },
        ],
        explanation: "安全と継続が最優先。極端な制限は避けます。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "🧭",
      title: "まずは起床固定",
      image: "/training/睡眠行動療法/sk5-l5-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `現実的な起床時刻を決めよう。`,
      work: {
        prompt: "今週守る起床時刻（休日含む目安）を書いてみよう",
        hint: "例：7:00（休日も±1時間）",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/睡眠行動療法/sk5-l5-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk5-l6": [
    {
      id: "s1",
      type: "intro",
      emoji: "🧘",
      title: "リラクセーション技法",
      image: "/training/睡眠行動療法/sk5-l6-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "🌬️",
      title: "かんたん呼吸",
      image: "/training/睡眠行動療法/sk5-l6-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "😌",
      title: "体ほぐし",
      image: "/training/睡眠行動療法/sk5-l6-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "入眠前に向いているのは？",
        options: [
          { label: "激しい運動をすぐやる", correct: false },
          { label: "ゆっくり長い吐息の呼吸", correct: true },
          { label: "興奮する動画を見る", correct: false },
        ],
        explanation: "ゆるむ方向の呼吸や筋弛緩が入眠を助けます。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "⏱️",
      title: "3分でOK",
      image: "/training/睡眠行動療法/sk5-l6-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `今夜のリラクセーションを決めよう。`,
      work: {
        prompt: "どの技法を何分やる？",
        hint: "例：ベッドに入る前に吐く息長めの呼吸3分",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/睡眠行動療法/sk5-l6-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk5-l7": [
    {
      id: "s1",
      type: "intro",
      emoji: "💭",
      title: "眠れない夜の思考パターン",
      image: "/training/睡眠行動療法/sk5-l7-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "🔄",
      title: "悪循環",
      image: "/training/睡眠行動療法/sk5-l7-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "🫧",
      title: "対処の考え方",
      image: "/training/睡眠行動療法/sk5-l7-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "眠れない夜に避けたいのは？",
        options: [
          { label: "呼吸で体をゆるめる", correct: false },
          { label: "時計を何度も見て焦る", correct: true },
          { label: "休息でもOKと自分に言う", correct: false },
        ],
        explanation: "時計チェックと破局化は焦りを強めます。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "🔕",
      title: "時計を遠ざける",
      image: "/training/睡眠行動療法/sk5-l7-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `眠れない夜のセルフトークを用意しよう。`,
      work: {
        prompt: "焦ったときに自分へ言う一言を書いてみよう",
        hint: "例：今夜は休みでもいい。呼吸だけしよう",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/睡眠行動療法/sk5-l7-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk5-l8": [
    {
      id: "s1",
      type: "intro",
      emoji: "🌅",
      title: "体内時計を整える",
      image: "/training/睡眠行動療法/sk5-l8-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "☀️",
      title: "光の力",
      image: "/training/睡眠行動療法/sk5-l8-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "⏰",
      title: "起床の一定化",
      image: "/training/睡眠行動療法/sk5-l8-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "体内時計を整えやすい行動は？",
        options: [
          { label: "毎日違う時間に起きる", correct: false },
          { label: "毎朝だいたい同じ時間に起き、光を浴びる", correct: true },
          { label: "昼に長い昼寝をする", correct: false },
        ],
        explanation: "起床の一定化と朝の光が基本です。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "🚶",
      title: "朝のミニ行動",
      image: "/training/睡眠行動療法/sk5-l8-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `朝のリセット行動を決めよう。`,
      work: {
        prompt: "起床時刻と、光を浴びる方法を書いてみよう",
        hint: "例：7時起床→カーテンを開けて2分外気",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/睡眠行動療法/sk5-l8-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk5-l9": [
    {
      id: "s1",
      type: "intro",
      emoji: "📵",
      title: "昼寝・アルコール・スマホとの付き合い方",
      image: "/training/睡眠行動療法/sk5-l9-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "😴",
      title: "昼寝",
      image: "/training/睡眠行動療法/sk5-l9-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "learn",
      emoji: "📱",
      title: "アルコールとスマホ",
      image: "/training/睡眠行動療法/sk5-l9-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4",
      type: "quiz",
      quiz: {
        question: "夜の眠りを守りやすいのは？",
        options: [
          { label: "寝る直前までSNS", correct: false },
          { label: "ベッドに入ったら画面オフを目標にする", correct: true },
          { label: "寝酒で無理やり眠る", correct: false },
        ],
        explanation: "刺激と質を下げる要因を減らすのが基本です。",
      },
    },
    {
      id: "s5",
      type: "tip",
      emoji: "🔌",
      title: "充電は部屋の入口で",
      image: "/training/睡眠行動療法/sk5-l9-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `3大要因のうち、減らすものを1つ選ぼう。`,
      work: {
        prompt: "昼寝／アルコール／スマホ、どれをどう変える？",
        hint: "例：スマホ — 0時以降は別室充電",
      },
    },
    {
      id: "s7",
      type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/睡眠行動療法/sk5-l9-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],
  "sk5-l10": [
    {
      id: "s1",
      type: "intro",
      emoji: "🏁",
      title: "まとめと睡眠改善プラン",
      image: "/training/睡眠行動療法/sk5-l10-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2",
      type: "learn",
      emoji: "📚",
      title: "ここまで学んだこと",
      image: "/training/睡眠行動療法/sk5-l10-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3",
      type: "quiz",
      quiz: {
        question: "睡眠改善の始め方として良いのは？",
        options: [
          { label: "全部同時に厳守", correct: false },
          { label: "今夜の1アクションから始める", correct: true },
          { label: "眠れない自分を責める", correct: false },
        ],
        explanation: "小さな1手から始める方が続き、効果も出やすいです。",
      },
    },
    {
      id: "s4",
      type: "tip",
      emoji: "⭐",
      title: "マイ3ルール",
      image: "/training/睡眠行動療法/sk5-l10-s4.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s5",
      type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `マイ睡眠ルーティンを宣言しよう。`,
      work: {
        prompt: "守るルールを3つ書いてみよう",
        hint: "例：7時起床／21時以降カフェインなし／呼吸3分",
      },
    },
    {
      id: "s6",
      type: "summary",
      emoji: "🏆",
      title: "SK05 睡眠行動療法 完了！",
      image: "/training/睡眠行動療法/sk5-l10-s6.png",
      // 画像内に文言があるため body は省略
    },
  ],
};
