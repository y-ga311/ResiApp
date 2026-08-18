import type { Slide } from "./types";

// ─────────────────────────────────────────────────────────────
// SK02 認知再構成 — 全12レッスン スライドデータ（仕様書準拠）
// ─────────────────────────────────────────────────────────────

export const SK2_SLIDES: Record<string, Slide[]> = {

  "sk2-l1": [
    {
      id: "s1", type: "intro",
      emoji: "🧠",
      title: "思考と感情の関係",
      image: "/training/認知再構成/sk2-l1-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🔗",
      title: "ABCモデル",
      image: "/training/認知再構成/sk2-l1-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "💡",
      title: "変えやすいのはB",
      image: "/training/認知再構成/sk2-l1-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "ABCモデルで見直しやすいのは？",
        options: [
          { label: "出来事そのもの", correct: false },
          { label: "自分の思考（考え方）", correct: true },
          { label: "他人の性格", correct: false },
        ],
        explanation: "変えやすいのは思考（B）。出来事は変えられなくても、捉え方は調整できます。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🌟",
      title: "まずは気づくだけでOK",
      image: "/training/認知再構成/sk2-l1-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `最近ちょっとつらかった場面を1つ思い出そう。`,
      work: {
        prompt: "出来事と、そのとき頭に浮かんだ考えを書いてみよう",
        hint: "例：テスト返却 →「またダメだと思われた」",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l1-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l2": [
    {
      id: "s1", type: "intro",
      emoji: "💭",
      title: "自動思考に気づく",
      image: "/training/認知再構成/sk2-l2-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "⚡",
      title: "自動思考って？",
      image: "/training/認知再構成/sk2-l2-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🎣",
      title: "捕まえるコツ",
      image: "/training/認知再構成/sk2-l2-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "自動思考を捕まえる良いタイミングは？",
        options: [
          { label: "1週間あとでゆっくり思い出す", correct: false },
          { label: "気持ちが動いた直後", correct: true },
          { label: "考えが消えてから", correct: false },
        ],
        explanation: "気持ちが動いた直後がいちばん捕まえやすいです。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "📱",
      title: "メモの味方",
      image: "/training/認知再構成/sk2-l2-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `今日あった自動思考を1つ捕まえよう。`,
      work: {
        prompt: "場面／浮かんだ考え／感情の強さ（0〜100）",
        hint: "例：朝の教室／「浮いてる」／不安70",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l2-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l3": [
    {
      id: "s1", type: "intro",
      emoji: "📋",
      title: "認知の歪みを知る①",
      image: "/training/認知再構成/sk2-l3-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "⬛",
      title: "全か無か思考",
      image: "/training/認知再構成/sk2-l3-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🔁",
      title: "過度な一般化／心の読みすぎ",
      image: "/training/認知再構成/sk2-l3-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "「一度失敗したから、もう無理」に近い歪みは？",
        options: [
          { label: "心の読みすぎ", correct: false },
          { label: "過度な一般化", correct: true },
          { label: "べき思考", correct: false },
        ],
        explanation: "一度の出来事を全体に広げるのが過度な一般化です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🏷️",
      title: "名前をつける効果",
      image: "/training/認知再構成/sk2-l3-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `今日の3つの歪みのうち、当てはまりやすいものを探そう。`,
      work: {
        prompt: "当てはまりやすい歪みと、最近の例を1つ",
        hint: "例：心の読みすぎ — 既読無視＝嫌われたと決めつけた",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l3-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l4": [
    {
      id: "s1", type: "intro",
      emoji: "🌪️",
      title: "認知の歪みを知る②",
      image: "/training/認知再構成/sk2-l4-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "💥",
      title: "破局化／感情的決めつけ",
      image: "/training/認知再構成/sk2-l4-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "📏",
      title: "べき思考／レッテル貼り",
      image: "/training/認知再構成/sk2-l4-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "「緊張した＝絶対失敗する」に近いのは？",
        options: [
          { label: "感情的決めつけ", correct: true },
          { label: "過度な一般化", correct: false },
          { label: "心の読みすぎ", correct: false },
        ],
        explanation: "感情をそのまま事実のように扱うのが感情的決めつけです。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🧯",
      title: "破局化を弱める一言",
      image: "/training/認知再構成/sk2-l4-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `今日の4つのうち、自分に多いものを選ぼう。`,
      work: {
        prompt: "多い歪みと、そのときの自動思考を書いてみよう",
        hint: "例：べき思考 —「ミスしたら謝り続けなきゃ」",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l4-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l5": [
    {
      id: "s1", type: "intro",
      emoji: "🔍",
      title: "自分の歪みパターンを見つける",
      image: "/training/認知再構成/sk2-l5-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🧭",
      title: "パターン探しの視点",
      image: "/training/認知再構成/sk2-l5-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "📌",
      title: "例",
      image: "/training/認知再構成/sk2-l5-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "パターン発見で大切なのは？",
        options: [
          { label: "自分を責めること", correct: false },
          { label: "よく出るクセに気づくこと", correct: true },
          { label: "クセを完全に消すこと", correct: false },
        ],
        explanation: "まずは気づき。責めずに観察することが変化の土台です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "📓",
      title: "マイ歪みメモ",
      image: "/training/認知再構成/sk2-l5-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `自分の定番パターンを言葉にしよう。`,
      work: {
        prompt: "場面／歪み名／自動思考／その後の行動",
        hint: "例：発表前／破局化／「絶対恥かく」／練習を避ける",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l5-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l6": [
    {
      id: "s1", type: "intro",
      emoji: "⚖️",
      title: "証拠を集める",
      image: "/training/認知再構成/sk2-l6-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🔎",
      title: "賛成と反対の証拠",
      image: "/training/認知再構成/sk2-l6-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🧩",
      title: "例",
      image: "/training/認知再構成/sk2-l6-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "証拠集めの目的は？",
        options: [
          { label: "自分を論破して黙らせる", correct: false },
          { label: "一方的な見方を、公平に近づける", correct: true },
          { label: "ポジティブに無理に塗り替える", correct: false },
        ],
        explanation: "無理な明るさではなく、偏りを減らすのが目的です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🧑‍⚖️",
      title: "弁護士と検察官",
      image: "/training/認知再構成/sk2-l6-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `1つの自動思考について証拠を集めよう。`,
      work: {
        prompt: "思考／支持する証拠／反する証拠／公平な結論",
        hint: "例：嫌われた／既読無視／以前は相談された／忙しい可能性もある",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l6-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l7": [
    {
      id: "s1", type: "intro",
      emoji: "🔄",
      title: "別の見方を探す",
      image: "/training/認知再構成/sk2-l7-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "👥",
      title: "友だちフィルター",
      image: "/training/認知再構成/sk2-l7-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🪞",
      title: "別の説明を3つ",
      image: "/training/認知再構成/sk2-l7-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "別の見方を探すとき良いのは？",
        options: [
          { label: "最初の考えだけを信じる", correct: false },
          { label: "別の説明をいくつか考えてみる", correct: true },
          { label: "考えないように我慢する", correct: false },
        ],
        explanation: "選択肢を増やすと、気持ちの固さがほぐれやすくなります。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "⏱️",
      title: "24時間ルール",
      image: "/training/認知再構成/sk2-l7-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `自動思考に、別の見方を添えよう。`,
      work: {
        prompt: "自動思考 → 友だちなら何と言う？／別の説明",
        hint: "例：嫌われた →「忙しいだけかも。確認の一言を送ってみたら？」",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l7-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l8": [
    {
      id: "s1", type: "intro",
      emoji: "🧘",
      title: "バランスのとれた考えを作る",
      image: "/training/認知再構成/sk2-l8-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "⚖️",
      title: "バランス思考の条件",
      image: "/training/認知再構成/sk2-l8-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "✍️",
      title: "書き換え例",
      image: "/training/認知再構成/sk2-l8-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "良いバランス思考に近いのは？",
        options: [
          { label: "全部うまくいくに決まってる", correct: false },
          { label: "今回は失敗した。次は準備時間を増やそう", correct: true },
          { label: "自分は価値がない", correct: false },
        ],
        explanation: "事実を認めつつ、次の行動につながる考えがバランス思考です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "📉",
      title: "感情スコアで確認",
      image: "/training/認知再構成/sk2-l8-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `バランス思考を1文作ろう。`,
      work: {
        prompt: "自動思考 → バランスのとれた考え",
        hint: "例：嫌われた → 忙しくて返せないこともある。確認してみよう",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l8-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l9": [
    {
      id: "s1", type: "intro",
      emoji: "🌳",
      title: "コアビリーフを探る",
      image: "/training/認知再構成/sk2-l9-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🪨",
      title: "コアビリーフとは？",
      image: "/training/認知再構成/sk2-l9-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🪜",
      title: "掘り下げ方",
      image: "/training/認知再構成/sk2-l9-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "コアビリーフへの向き合い方として良いのは？",
        options: [
          { label: "一気に根こそぎ消そうとする", correct: false },
          { label: "気づき、少しずつ柔軟な表現に変える", correct: true },
          { label: "無視して考えない", correct: false },
        ],
        explanation: "深い信念は時間がかかります。少しずつ柔軟化していくのが現実的です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🌱",
      title: "柔軟な言い換え",
      image: "/training/認知再構成/sk2-l9-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `自分のコアビリーフ候補を探そう。`,
      work: {
        prompt: "よく出る自動思考 → 奥にありそうな信念 → 柔軟な言い換え",
        hint: "例：失敗した→自分はダメ→失敗しても立て直せる",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l9-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l10": [
    {
      id: "s1", type: "intro",
      emoji: "📊",
      title: "思考記録表を使いこなす",
      image: "/training/認知再構成/sk2-l10-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🗂️",
      title: "記録表の欄",
      image: "/training/認知再構成/sk2-l10-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "✅",
      title: "使い方のコツ",
      image: "/training/認知再構成/sk2-l10-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "思考記録で最初に書くと良いのは？",
        options: [
          { label: "完璧なバランス思考", correct: false },
          { label: "状況と感情、自動思考", correct: true },
          { label: "他人への批判", correct: false },
        ],
        explanation: "まず状況・感情・自動思考を捕まえることがスタートラインです。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🧾",
      title: "テンプレを保存",
      image: "/training/認知再構成/sk2-l10-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `思考記録を1件書いてみよう。`,
      work: {
        prompt: "状況／感情／自動思考／証拠／バランス思考",
        hint: "例：授業で当てられた／不安80／間違える／前回は答えられた／準備すれば対応できる",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l10-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l11": [
    {
      id: "s1", type: "intro",
      emoji: "💗",
      title: "セルフ・コンパッション",
      image: "/training/認知再構成/sk2-l11-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🫂",
      title: "3つの要素",
      image: "/training/認知再構成/sk2-l11-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🗣️",
      title: "やさしい一言",
      image: "/training/認知再構成/sk2-l11-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "セルフ・コンパッションに近いのは？",
        options: [
          { label: "失敗をなかったことにする", correct: false },
          { label: "つらい事実は認めつつ、自分を責めすぎない", correct: true },
          { label: "努力をやめること", correct: false },
        ],
        explanation: "甘やかすのではなく、回復できる形で自分を支えることです。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🤲",
      title: "ハンド・オン・ハート",
      image: "/training/認知再構成/sk2-l11-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `自分へのやさしい一言を作ろう。`,
      work: {
        prompt: "自己批判の言葉 → セルフ・コンパッションの一言",
        hint: "例：ダメ人間 → 今日はうまくいかなかった。でも学び直せる",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/認知再構成/sk2-l11-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk2-l12": [
    {
      id: "s1", type: "intro",
      emoji: "🏁",
      title: "まとめと振り返り",
      image: "/training/認知再構成/sk2-l12-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🧰",
      title: "ここまで学んだこと",
      image: "/training/認知再構成/sk2-l12-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "quiz",
      quiz: {
        question: "日常での使い方として良いのは？",
        options: [
          { label: "強い感情のときだけ記録して見直す", correct: true },
          { label: "完璧に毎日10件書く", correct: false },
          { label: "考えを完全に消す", correct: false },
        ],
        explanation: "続く形が大事。強い感情のとき1件でも十分効果があります。",
      },
    },
    {
      id: "s4", type: "tip",
      emoji: "⭐",
      title: "これからのミニ習慣",
      image: "/training/認知再構成/sk2-l12-s4.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s5", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: `今後の活用プランを決めよう。`,
      work: {
        prompt: "いつ・どんな場面で・どの技法を使う？",
        hint: "例：夜に不安が出たら証拠集めとバランス思考",
      },
    },
    {
      id: "s6", type: "summary",
      emoji: "🏆",
      title: "SK02 認知再構成 完了！",
      image: "/training/認知再構成/sk2-l12-s6.png",
      // 画像内に文言があるため body は省略
    },
  ],

};
