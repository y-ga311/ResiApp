import type { Slide } from "./types";

// ─────────────────────────────────────────────────────────────
// SK01 行動活性化 — 全10レッスン スライドデータ
// ─────────────────────────────────────────────────────────────

export const SK1_SLIDES: Record<string, Slide[]> = {

  "sk1-l1": [
    {
      id: "s1", type: "intro",
      emoji: "🌱",
      title: "行動活性化とは？",
      image: "/training/行動活性化/sk1-l1-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "😔",
      title: "うつの「悪循環」って知ってる？",
      image: "/training/行動活性化/sk1-l1-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "⚡",
      title: "行動が気分を変える！",
      image: "/training/行動活性化/sk1-l1-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "行動活性化では、どちらが正しい？",
        options: [
          { label: "やる気が出てから行動する", correct: false },
          { label: "行動することでやる気が出る", correct: true },
          { label: "まず計画を完璧に立てる", correct: false },
        ],
        explanation: "「行動 → 気分が変わる → またやる気が出る」という好循環を作るのが行動活性化の考え方です。気分が変わるのを待たなくていいんです！",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🌟",
      title: "「5分だけ」でOK",
      image: "/training/行動活性化/sk1-l1-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: "最近「少しでもやってよかった」と思えた行動を思い出してみよう。",
      work: {
        prompt: "あなたの「気分が上がった行動」は何でしたか？",
        hint: "例：友だちと話した、散歩した、好きな音楽を聴いた…",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎯",
      title: "今日のまとめ",
      image: "/training/行動活性化/sk1-l1-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk1-l2": [
    {
      id: "s1", type: "intro",
      emoji: "🔗",
      title: "気分と行動のつながり",
      image: "/training/行動活性化/sk1-l2-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🔄",
      title: "2つのループがある",
      image: "/training/行動活性化/sk1-l2-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🧠",
      title: "脳の仕組みから見ると…",
      image: "/training/行動活性化/sk1-l2-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "気分スコアをつけるとき、何点が「まあまあ普通」？",
        options: [
          { label: "0〜2点", correct: false },
          { label: "5〜6点", correct: true },
          { label: "9〜10点", correct: false },
        ],
        explanation: "気分スコアは0〜10点。5〜6点が「まあまあ普通」、7点以上が元気な状態です。毎日つけていると変化のパターンが見えてきます。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "📊",
      title: "気分スコアをつけよう",
      image: "/training/行動活性化/sk1-l2-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "✏️",
      title: "今日のワーク",
      body: "過去1週間を振り返って、気分が少し上がった瞬間を思い出してみよう。",
      work: {
        prompt: "気分が上がったとき、何をしていた？（2〜3個）",
        hint: "例：美味しいものを食べた、好きな音楽を聴いた、友だちと話した…",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "💪",
      title: "今日のまとめ",
      image: "/training/行動活性化/sk1-l2-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk1-l3": [
    {
      id: "s1", type: "intro",
      emoji: "📒",
      title: "活動日記をつけてみよう",
      image: "/training/行動活性化/sk1-l3-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🗂️",
      title: "活動日記ってなに？",
      image: "/training/行動活性化/sk1-l3-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🔍",
      title: "なぜ記録するの？",
      image: "/training/行動活性化/sk1-l3-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "活動日記に書くのはどれ？",
        options: [
          { label: "「良い行動」だけを記録する", correct: false },
          { label: "普通の行動も含めて記録する", correct: true },
          { label: "気分が10点のときだけ書く", correct: false },
        ],
        explanation: "「良い行動」だけじゃなく、ゴロゴロしていた時間も記録するのが大切です。全体のパターンが見えてくるからです。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "💡",
      title: "続けるコツ",
      image: "/training/行動活性化/sk1-l3-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: "今日1日を振り返って書いてみよう。",
      work: {
        prompt: "今日いちばん気分が上がった行動は何でしたか？",
        hint: "例：昼に友だちと話した（7点）、帰りにコンビニでアイスを買った（6点）…",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌈",
      title: "今日のまとめ",
      image: "/training/行動活性化/sk1-l3-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk1-l4": [
    {
      id: "s1", type: "intro",
      emoji: "📋",
      title: "好きなことリストを作る",
      image: "/training/行動活性化/sk1-l4-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🤔",
      title: "なぜリストが必要なの？",
      image: "/training/行動活性化/sk1-l4-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🗃️",
      title: "4つのカテゴリで考えよう",
      image: "/training/行動活性化/sk1-l4-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "活動リストには何を入れるべき？",
        options: [
          { label: "楽しめると確信できるものだけ", correct: false },
          { label: "小さいものでも、不安なものでも入れていい", correct: true },
          { label: "お金がかかるものは入れない", correct: false },
        ],
        explanation: "「大したことない」と思うことも、「楽しめるか不安」なものも全部入れてOK。特に「すぐできる小さいもの」が実際には一番使いやすいです。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "⭐",
      title: "「気軽さ」で分類しよう",
      image: "/training/行動活性化/sk1-l4-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "✨",
      title: "今日のワーク",
      body: "自分の「活動リスト」を作ろう。思い浮かぶものを書いてみて。",
      work: {
        prompt: "すぐできる好きなこと・やりたいことを3つ書いてみよう",
        hint: "例：好きなアーティストの曲を聴く、コンビニスイーツを買う、友だちにLINEする…",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🎒",
      title: "今日のまとめ",
      image: "/training/行動活性化/sk1-l4-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk1-l5": [
    {
      id: "s1", type: "intro",
      emoji: "🏆",
      title: "達成感を増やす方法",
      image: "/training/行動活性化/sk1-l5-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "🎮",
      title: "「楽しさ」と「達成感」の違い",
      image: "/training/行動活性化/sk1-l5-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "💎",
      title: "達成感が特に大切な理由",
      image: "/training/行動活性化/sk1-l5-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "達成感を得るには、大きなことをやる必要がある？",
        options: [
          { label: "はい。大きなことをやらないと意味がない", correct: false },
          { label: "いいえ。小さなことでも「やった！」はカウントできる", correct: true },
          { label: "テストで良い点を取ることだけが達成感", correct: false },
        ],
        explanation: "「今日の日記を書いた」「シャワーを浴びた」「朝ごはんを食べた」、これだけで達成感はカウントOKです。小さな積み重ねが大切！",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "✅",
      title: "小さな「できた！」を集めよう",
      image: "/training/行動活性化/sk1-l5-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: "自分の活動リストを「楽しさ系」と「達成感系」に分けよう。",
      work: {
        prompt: "達成感がありそうなことを1つ書いて、今週試してみよう",
        hint: "例：机の上だけ片付ける、宿題を1問だけやる、5分だけ散歩する…",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🚀",
      title: "今日のまとめ",
      image: "/training/行動活性化/sk1-l5-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk1-l6": [
    {
      id: "s1", type: "intro",
      emoji: "🕐",
      title: "毎日のルーティンを見直す",
      image: "/training/行動活性化/sk1-l6-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "😴",
      title: "ルーティンが崩れると…",
      image: "/training/行動活性化/sk1-l6-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "⚓",
      title: "3つのアンカーを決めよう",
      image: "/training/行動活性化/sk1-l6-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "ルーティンが崩れた日はどうする？",
        options: [
          { label: "自分を責めて反省する", correct: false },
          { label: "次の日にリセットすればOK", correct: true },
          { label: "もう諦めてルーティンをやめる", correct: false },
        ],
        explanation: "崩れた日があっても、次の日にリセットすればOKです。「完璧に守る」より「崩れても続ける」の方がずっと大切です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "📅",
      title: "ルーティンに好きな活動を組み込む",
      image: "/training/行動活性化/sk1-l6-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "🗓️",
      title: "今日のワーク",
      body: "明日1日の「理想のタイムライン」を作ってみよう。",
      work: {
        prompt: "起床・就寝時刻と、1つやりたい活動を書こう",
        hint: "例：7時起床、23時就寝、放課後に友だちに連絡する",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌙",
      title: "今日のまとめ",
      image: "/training/行動活性化/sk1-l6-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk1-l7": [
    {
      id: "s1", type: "intro",
      emoji: "🤝",
      title: "人とのつながりを大切に",
      image: "/training/行動活性化/sk1-l7-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "❤️",
      title: "つながりは「幸福ホルモン」を生む",
      image: "/training/行動活性化/sk1-l7-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "💬",
      title: "「大きなつながり」じゃなくていい",
      image: "/training/行動活性化/sk1-l7-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "「人と話すのが億劫…」と感じるのは？",
        options: [
          { label: "ただのわがまま", correct: false },
          { label: "落ち込みの症状のひとつ", correct: true },
          { label: "性格の問題", correct: false },
        ],
        explanation: "「人と話すのが億劫」「どうせ迷惑になる」と感じるのは、落ち込みの典型的な症状です。自分を責めずに、まず小さな一歩だけ踏み出してみましょう。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "📱",
      title: "「返信不要LINEを送るだけ」でOK",
      image: "/training/行動活性化/sk1-l7-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "💌",
      title: "今日のワーク",
      body: "今週、誰かに「ひとこと連絡」してみよう。",
      work: {
        prompt: "連絡する相手と、何を送るか書いてみよう",
        hint: "例：○○ちゃんに「最近どう？」とLINEする",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🌸",
      title: "今日のまとめ",
      image: "/training/行動活性化/sk1-l7-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk1-l8": [
    {
      id: "s1", type: "intro",
      emoji: "🗓️",
      title: "週間活動計画を立てる",
      image: "/training/行動活性化/sk1-l8-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "📆",
      title: "なぜ週間計画が必要？",
      image: "/training/行動活性化/sk1-l8-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🎯",
      title: "週間計画の作り方 3ステップ",
      image: "/training/行動活性化/sk1-l8-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "週間計画が実行できなかった日はどうする？",
        options: [
          { label: "計画が失敗したので諦める", correct: false },
          { label: "自分を責めず、できた日だけカウントする", correct: true },
          { label: "計画を増やして挽回する", correct: false },
        ],
        explanation: "完璧に実行できなくてOKです。「できた日だけカウント」で続けることが大切。週に5〜7つの活動ができれば十分です。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "✨",
      title: "計画のコツ",
      image: "/training/行動活性化/sk1-l8-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "📝",
      title: "今日のワーク",
      body: "今週の「活動計画」を作ってみよう。",
      work: {
        prompt: "今週試す活動を2〜3つ、曜日と一緒に書いてみよう",
        hint: "例：月曜放課後に散歩15分、木曜夜に好きな音楽を聴く",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🏁",
      title: "今日のまとめ",
      image: "/training/行動活性化/sk1-l8-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk1-l9": [
    {
      id: "s1", type: "intro",
      emoji: "👟",
      title: "「小さな一歩」で気分を変える",
      image: "/training/行動活性化/sk1-l9-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "⚠️",
      title: "落とし穴① やる気待ち",
      image: "/training/行動活性化/sk1-l9-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "learn",
      emoji: "🎯",
      title: "落とし穴② 完璧主義",
      image: "/training/行動活性化/sk1-l9-s3.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s4", type: "quiz",
      quiz: {
        question: "「5分だけやってみる」ルールの効果は？",
        options: [
          { label: "5分では何も変わらない", correct: false },
          { label: "始めることで脳がやる気を出し始める（作業興奮）", correct: true },
          { label: "5分では達成感が得られない", correct: false },
        ],
        explanation: "「作業興奮」という心理現象で、始めることで脳がやる気を出し始めます。「5分だけ」と決めて始めると、多くの場合そのまま続けられます。",
      },
    },
    {
      id: "s5", type: "tip",
      emoji: "🌱",
      title: "「小さな一歩」の例",
      image: "/training/行動活性化/sk1-l9-s5.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s6", type: "work",
      emoji: "💪",
      title: "今日のワーク",
      body: "自分が陥りやすい落とし穴と、その対策を考えよう。",
      work: {
        prompt: "「やる気待ち」or「完璧主義」、どちらが当てはまる？その対策は？",
        hint: "例：完璧主義が当てはまる。対策：5分だけやると決めて始める",
      },
    },
    {
      id: "s7", type: "summary",
      emoji: "🔥",
      title: "今日のまとめ",
      image: "/training/行動活性化/sk1-l9-s7.png",
      // 画像内に文言があるため body は省略
    },
  ],

  "sk1-l10": [
    {
      id: "s1", type: "intro",
      emoji: "🎓",
      title: "行動活性化の振り返り",
      image: "/training/行動活性化/sk1-l10-s1.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s2", type: "learn",
      emoji: "📚",
      title: "ここまで学んできたこと",
      image: "/training/行動活性化/sk1-l10-s2.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s3", type: "quiz",
      quiz: {
        question: "行動活性化でいちばん大切なことは？",
        options: [
          { label: "大きな行動を完璧にやり切ること", correct: false },
          { label: "小さな行動を続けて気分の好循環を作ること", correct: true },
          { label: "毎日必ず計画通りに行動すること", correct: false },
        ],
        explanation: "小さな行動を続けることで気分の好循環が生まれます。完璧じゃなくていい。「少しやれた」を積み重ねることが、長期的な変化につながります。",
      },
    },
    {
      id: "s4", type: "tip",
      emoji: "🌟",
      title: "これからのために覚えておこう",
      image: "/training/行動活性化/sk1-l10-s4.png",
      // 画像内に文言があるため body は省略
    },
    {
      id: "s5", type: "work",
      emoji: "📋",
      title: "マイ行動活性化プランを作ろう",
      body: "これからの自分のためのプランを決めよう。",
      work: {
        prompt: "気分が上がる行動TOP3と、落ち込んだときの最初の一歩を書こう",
        hint: "例：好きな音楽を聴く、友だちにLINE、5分散歩 / まず外の空気を吸う",
      },
    },
    {
      id: "s6", type: "summary",
      emoji: "🏆",
      title: "SK01 行動活性化 完了！",
      image: "/training/行動活性化/sk1-l10-s6.png",
      // 画像内に文言があるため body は省略
    },
  ],

};
