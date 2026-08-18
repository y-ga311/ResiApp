#!/usr/bin/env python3
"""Generate lib/slides-sk2.ts aligned with 参考資料・コンテンツ仕様書.md SK02."""

from pathlib import Path
from textwrap import dedent

OUT = Path(__file__).resolve().parents[1] / "lib" / "slides-sk2.ts"


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def lesson(lid: str, slides: list[dict]) -> str:
    parts = []
    for s in slides:
        t = s["type"]
        if t == "quiz":
            opts = ",\n".join(
                f'      {{ label: "{o["label"]}", correct: {str(o["correct"]).lower()} }}'
                for o in s["options"]
            )
            parts.append(
                dedent(
                    f"""\
                {{
                  id: "{s["id"]}", type: "quiz",
                  quiz: {{
                    question: "{s["question"]}",
                    options: [
                {opts}
                    ],
                    explanation: "{s["explanation"]}",
                  }},
                }},"""
                )
            )
        elif t == "work":
            parts.append(
                dedent(
                    f"""\
                {{
                  id: "{s["id"]}", type: "work",
                  emoji: "{s.get("emoji", "📝")}",
                  title: "{s["title"]}",
                  body: `{esc(s["body"])}`,
                  work: {{
                    prompt: "{s["prompt"]}",
                    hint: "{s["hint"]}",
                  }},
                }},"""
                )
            )
        else:
            parts.append(
                dedent(
                    f"""\
                {{
                  id: "{s["id"]}", type: "{t}",
                  emoji: "{s.get("emoji", "")}",
                  title: "{s["title"]}",
                  body: `{esc(s["body"])}`,
                }},"""
                )
            )
    body = "\n".join(parts)
    return f'  "{lid}": [\n{body}\n  ],\n'


LESSONS = [
    (
        "sk2-l1",
        [
            {"id": "s1", "type": "intro", "emoji": "🧠", "title": "思考と感情の関係", "body": "つらい気持ちの前に、どんな「考え」がはさまれているか見てみよう。"},
            {"id": "s2", "type": "learn", "emoji": "🔗", "title": "ABCモデル", "body": "A：出来事（例：友だちが既読無視）\nB：思考（例：「嫌われたんだ」）\nC：感情（例：落ち込み・不安）\n\n出来事そのものより、そのあと浮かぶ考えが気持ちを左右します。"},
            {"id": "s3", "type": "learn", "emoji": "💡", "title": "変えやすいのはB", "body": "出来事（A）は変えられないことが多い。\nでも思考（B）は、気づいて見直せます。\n\n考え方が少し柔らかくなると、感情（C）も少し楽になる——それが認知再構成です。"},
            {"id": "s4", "type": "quiz", "question": "ABCモデルで見直しやすいのは？", "options": [
                {"label": "出来事そのもの", "correct": False},
                {"label": "自分の思考（考え方）", "correct": True},
                {"label": "他人の性格", "correct": False},
            ], "explanation": "変えやすいのは思考（B）。出来事は変えられなくても、捉え方は調整できます。"},
            {"id": "s5", "type": "tip", "emoji": "🌟", "title": "まずは気づくだけでOK", "body": "最初から上手に書き換えなくて大丈夫。\n\n「今、どんな考えが浮かんだ？」と問うだけでも、立派なトレーニングです。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "最近ちょっとつらかった場面を1つ思い出そう。", "prompt": "出来事と、そのとき頭に浮かんだ考えを書いてみよう", "hint": "例：テスト返却 →「またダメだと思われた」"},
            {"id": "s7", "type": "summary", "emoji": "🎯", "title": "今日のまとめ", "body": "出来事と感情のあいだに「思考」がある！\n\n気づくことが、心を軽くする第一歩です。"},
        ],
    ),
    (
        "sk2-l2",
        [
            {"id": "s1", "type": "intro", "emoji": "💭", "title": "自動思考に気づく", "body": "パッと浮かぶ考えを、捕まえられるようになろう。"},
            {"id": "s2", "type": "learn", "emoji": "⚡", "title": "自動思考って？", "body": "状況に反応してパッと浮かぶ考えです。\n速い・短い・感情を動かす、のが特徴。\n\n例：「また失敗する」「嫌われた」「どうせ無理」"},
            {"id": "s3", "type": "learn", "emoji": "🎣", "title": "捕まえるコツ", "body": "気持ちが動いた瞬間に、\n「いま頭に浮かんだ言葉は？」と自分に聞く。\n\n感情の強さ（0〜100）もメモすると、あとで振り返りやすい。"},
            {"id": "s4", "type": "quiz", "question": "自動思考を捕まえる良いタイミングは？", "options": [
                {"label": "1週間あとでゆっくり思い出す", "correct": False},
                {"label": "気持ちが動いた直後", "correct": True},
                {"label": "考えが消えてから", "correct": False},
            ], "explanation": "気持ちが動いた直後がいちばん捕まえやすいです。"},
            {"id": "s5", "type": "tip", "emoji": "📱", "title": "メモの味方", "body": "スマホのメモや音声入力でOK。\n完璧な文章はいりません。キーワードだけで十分。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "今日あった自動思考を1つ捕まえよう。", "prompt": "場面／浮かんだ考え／感情の強さ（0〜100）", "hint": "例：朝の教室／「浮いてる」／不安70"},
            {"id": "s7", "type": "summary", "emoji": "🌈", "title": "今日のまとめ", "body": "自動思考は捕まえられる！\n\n気づきが、次の書き換え練習につながります。"},
        ],
    ),
    (
        "sk2-l3",
        [
            {"id": "s1", "type": "intro", "emoji": "📋", "title": "認知の歪みを知る①", "body": "よくある考え方のクセに、名前をつけてみよう。"},
            {"id": "s2", "type": "learn", "emoji": "⬛", "title": "全か無か思考", "body": "完璧か最悪か、のどちらかしかない見方。\n\n例：「90点じゃ意味ない」「少しでもミスしたら終わり」\n\n現実はグレーが多い、と覚えておこう。"},
            {"id": "s3", "type": "learn", "emoji": "🔁", "title": "過度な一般化／心の読みすぎ", "body": "過度な一般化：一度の失敗を「いつも」「絶対」に広げる\n心の読みすぎ：相手の気持ちを決めつける\n\n例：「また無視された＝みんな嫌い」「無言＝怒ってる」"},
            {"id": "s4", "type": "quiz", "question": "「一度失敗したから、もう無理」に近い歪みは？", "options": [
                {"label": "心の読みすぎ", "correct": False},
                {"label": "過度な一般化", "correct": True},
                {"label": "べき思考", "correct": False},
            ], "explanation": "一度の出来事を全体に広げるのが過度な一般化です。"},
            {"id": "s5", "type": "tip", "emoji": "🏷️", "title": "名前をつける効果", "body": "「あ、これ全か無かだ」と言えるだけで、考えとの距離が少し取れます。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "今日の3つの歪みのうち、当てはまりやすいものを探そう。", "prompt": "当てはまりやすい歪みと、最近の例を1つ", "hint": "例：心の読みすぎ — 既読無視＝嫌われたと決めつけた"},
            {"id": "s7", "type": "summary", "emoji": "🎯", "title": "今日のまとめ", "body": "全か無か／過度な一般化／心の読みすぎ。\n\n名前がわかると、クセに気づきやすくなる！"},
        ],
    ),
    (
        "sk2-l4",
        [
            {"id": "s1", "type": "intro", "emoji": "🌪️", "title": "認知の歪みを知る②", "body": "あと4つのよくあるクセをチェックしよう。"},
            {"id": "s2", "type": "learn", "emoji": "💥", "title": "破局化／感情的決めつけ", "body": "破局化：最悪の未来を一気に想像する\n感情的決めつけ：「怖い＝危険に違いない」と感情を事実扱い\n\n気持ちは大事なサイン。でも事実そのものではないことも多い。"},
            {"id": "s3", "type": "learn", "emoji": "📏", "title": "べき思考／レッテル貼り", "body": "べき思考：「〜すべき／すべきでない」で自分や他人を縛る\nレッテル貼り：「自分はダメ人間」など固定ラベルを貼る\n\nラベルより、具体的な行動に注目しよう。"},
            {"id": "s4", "type": "quiz", "question": "「緊張した＝絶対失敗する」に近いのは？", "options": [
                {"label": "感情的決めつけ", "correct": True},
                {"label": "過度な一般化", "correct": False},
                {"label": "心の読みすぎ", "correct": False},
            ], "explanation": "感情をそのまま事実のように扱うのが感情的決めつけです。"},
            {"id": "s5", "type": "tip", "emoji": "🧯", "title": "破局化を弱める一言", "body": "「最悪は何か？」「いちばん現実的な結末は？」\n2つ並べると、頭が少し冷静になります。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "今日の4つのうち、自分に多いものを選ぼう。", "prompt": "多い歪みと、そのときの自動思考を書いてみよう", "hint": "例：べき思考 —「ミスしたら謝り続けなきゃ」"},
            {"id": "s7", "type": "summary", "emoji": "🌈", "title": "今日のまとめ", "body": "破局化・感情的決めつけ・べき思考・レッテル貼り。\n\nクセに名前がつくと、選べる幅が広がる！"},
        ],
    ),
    (
        "sk2-l5",
        [
            {"id": "s1", "type": "intro", "emoji": "🔍", "title": "自分の歪みパターンを見つける", "body": "よく使うクセを知ると、対策が立てやすい。"},
            {"id": "s2", "type": "learn", "emoji": "🧭", "title": "パターン探しの視点", "body": "・どの場面で出やすい？（学校／友だち／家族／SNS）\n・どの歪みが多い？\n・そのあとどう行動しがち？（回避・確認・自己攻撃）"},
            {"id": "s3", "type": "learn", "emoji": "📌", "title": "例", "body": "場面：グループLINE\n歪み：心の読みすぎ\n考え：「返信遅い＝嫌われてる」\n行動：何度も既読を確認して疲れる"},
            {"id": "s4", "type": "quiz", "question": "パターン発見で大切なのは？", "options": [
                {"label": "自分を責めること", "correct": False},
                {"label": "よく出るクセに気づくこと", "correct": True},
                {"label": "クセを完全に消すこと", "correct": False},
            ], "explanation": "まずは気づき。責めずに観察することが変化の土台です。"},
            {"id": "s5", "type": "tip", "emoji": "📓", "title": "マイ歪みメモ", "body": "「自分の定番歪み TOP2」を決めておくと、\n次に出たときすぐ気づきやすくなります。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "自分の定番パターンを言葉にしよう。", "prompt": "場面／歪み名／自動思考／その後の行動", "hint": "例：発表前／破局化／「絶対恥かく」／練習を避ける"},
            {"id": "s7", "type": "summary", "emoji": "🎯", "title": "今日のまとめ", "body": "自分のクセが見えると、対策が具体的になる！\n\n定番パターンを味方につけよう。"},
        ],
    ),
    (
        "sk2-l6",
        [
            {"id": "s1", "type": "intro", "emoji": "⚖️", "title": "証拠を集める", "body": "ネガティブ思考を、法廷の証言みたいに調べてみよう。"},
            {"id": "s2", "type": "learn", "emoji": "🔎", "title": "賛成と反対の証拠", "body": "自動思考を「仮説」として扱う。\n\n① それを支持する証拠は？\n② 反する証拠・別の説明は？\n③ いちばん公平な結論は？"},
            {"id": "s3", "type": "learn", "emoji": "🧩", "title": "例", "body": "思考：「誰も自分を必要としてない」\n支持：今日は話しかけられなかった\n反対：昨日友だちから相談のLINEが来た\n公平：今日は静かだっただけで、関係が消えたわけではない"},
            {"id": "s4", "type": "quiz", "question": "証拠集めの目的は？", "options": [
                {"label": "自分を論破して黙らせる", "correct": False},
                {"label": "一方的な見方を、公平に近づける", "correct": True},
                {"label": "ポジティブに無理に塗り替える", "correct": False},
            ], "explanation": "無理な明るさではなく、偏りを減らすのが目的です。"},
            {"id": "s5", "type": "tip", "emoji": "🧑‍⚖️", "title": "弁護士と検察官", "body": "頭の中で「両方の立場」を演じると、\n片方だけの証拠に引っ張られにくくなります。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "1つの自動思考について証拠を集めよう。", "prompt": "思考／支持する証拠／反する証拠／公平な結論", "hint": "例：嫌われた／既読無視／以前は相談された／忙しい可能性もある"},
            {"id": "s7", "type": "summary", "emoji": "🌈", "title": "今日のまとめ", "body": "証拠を集めると、考えが少し柔軟になる！\n\n仮説として扱う練習を続けよう。"},
        ],
    ),
    (
        "sk2-l7",
        [
            {"id": "s1", "type": "intro", "emoji": "🔄", "title": "別の見方を探す", "body": "同じ出来事でも、見方はひとつじゃない。"},
            {"id": "s2", "type": "learn", "emoji": "👥", "title": "友だちフィルター", "body": "「もし友だちが同じ状況なら、自分は何と言う？」\n\n他人にはやさしく言える言葉を、自分にも向けてみよう。"},
            {"id": "s3", "type": "learn", "emoji": "🪞", "title": "別の説明を3つ", "body": "自動思考以外の説明を、あえて3つ出す。\n\n例：返信がない\n①忙しい ②気づいてない ③後で返そうとしている"},
            {"id": "s4", "type": "quiz", "question": "別の見方を探すとき良いのは？", "options": [
                {"label": "最初の考えだけを信じる", "correct": False},
                {"label": "別の説明をいくつか考えてみる", "correct": True},
                {"label": "考えないように我慢する", "correct": False},
            ], "explanation": "選択肢を増やすと、気持ちの固さがほぐれやすくなります。"},
            {"id": "s5", "type": "tip", "emoji": "⏱️", "title": "24時間ルール", "body": "強い結論は、できれば一晩おいて見直す。\n朝になると「別の見方」が見えやすいことも多い。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "自動思考に、別の見方を添えよう。", "prompt": "自動思考 → 友だちなら何と言う？／別の説明", "hint": "例：嫌われた →「忙しいだけかも。確認の一言を送ってみたら？」"},
            {"id": "s7", "type": "summary", "emoji": "🎯", "title": "今日のまとめ", "body": "見方を増やすと、心の余白が生まれる！\n\n友だちフィルターを日常で使ってみよう。"},
        ],
    ),
    (
        "sk2-l8",
        [
            {"id": "s1", "type": "intro", "emoji": "🧘", "title": "バランスのとれた考えを作る", "body": "偏りすぎない「中くらいの考え」を文章化しよう。"},
            {"id": "s2", "type": "learn", "emoji": "⚖️", "title": "バランス思考の条件", "body": "・事実に合う\n・役に立つ（次の行動につながる）\n・自分にも他人にも過度に残酷でない\n\n明るく塗り替えるのではなく、公平にする。"},
            {"id": "s3", "type": "learn", "emoji": "✍️", "title": "書き換え例", "body": "前：「自分は何をやってもダメ」\n後：「今回は準備不足だった。次は前日に30分見直そう」\n\nラベル → 具体的な改善点、に変えるのがコツ。"},
            {"id": "s4", "type": "quiz", "question": "良いバランス思考に近いのは？", "options": [
                {"label": "全部うまくいくに決まってる", "correct": False},
                {"label": "今回は失敗した。次は準備時間を増やそう", "correct": True},
                {"label": "自分は価値がない", "correct": False},
            ], "explanation": "事実を認めつつ、次の行動につながる考えがバランス思考です。"},
            {"id": "s5", "type": "tip", "emoji": "📉", "title": "感情スコアで確認", "body": "書き換え前後で不安や落ち込みが\n少しでも下がれば成功。ゼロを狙わなくてOK。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "バランス思考を1文作ろう。", "prompt": "自動思考 → バランスのとれた考え", "hint": "例：嫌われた → 忙しくて返せないこともある。確認してみよう"},
            {"id": "s7", "type": "summary", "emoji": "🌈", "title": "今日のまとめ", "body": "バランス思考は、心を現実に戻す道具！\n\n完璧なポジティブでなくていい。"},
        ],
    ),
    (
        "sk2-l9",
        [
            {"id": "s1", "type": "intro", "emoji": "🌳", "title": "コアビリーフを探る", "body": "思考の奥にある「深い信念」に、やさしく触れてみよう。"},
            {"id": "s2", "type": "learn", "emoji": "🪨", "title": "コアビリーフとは？", "body": "表面の自動思考の下にある、自分や世界についての信念。\n\n例：「自分は価値がない」「人は信じられない」「失敗は許されない」"},
            {"id": "s3", "type": "learn", "emoji": "🪜", "title": "掘り下げ方", "body": "自動思考に「それが本当なら、自分について何を意味する？」と聞く。\n\n何層か掘ると、短い信念の言葉にたどり着くことがある。"},
            {"id": "s4", "type": "quiz", "question": "コアビリーフへの向き合い方として良いのは？", "options": [
                {"label": "一気に根こそぎ消そうとする", "correct": False},
                {"label": "気づき、少しずつ柔軟な表現に変える", "correct": True},
                {"label": "無視して考えない", "correct": False},
            ], "explanation": "深い信念は時間がかかります。少しずつ柔軟化していくのが現実的です。"},
            {"id": "s5", "type": "tip", "emoji": "🌱", "title": "柔軟な言い換え", "body": "「価値がない」→「うまくいかない日もあるが、学び直せる」\n完全否定ではなく、余地を残す言葉にする。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "自分のコアビリーフ候補を探そう。", "prompt": "よく出る自動思考 → 奥にありそうな信念 → 柔軟な言い換え", "hint": "例：失敗した→自分はダメ→失敗しても立て直せる"},
            {"id": "s7", "type": "summary", "emoji": "🎯", "title": "今日のまとめ", "body": "深い信念にも、やさしく触れられる！\n\n柔軟な言葉が、思考の土台を変えていく。"},
        ],
    ),
    (
        "sk2-l10",
        [
            {"id": "s1", "type": "intro", "emoji": "📊", "title": "思考記録表を使いこなす", "body": "状況・感情・思考・根拠・バランス思考を一枚にまとめよう。"},
            {"id": "s2", "type": "learn", "emoji": "🗂️", "title": "記録表の欄", "body": "①状況（いつ・どこで・何が）\n②感情（名前と強さ0〜100）\n③自動思考\n④支持／反する証拠\n⑤バランス思考\n⑥感情の再評価"},
            {"id": "s3", "type": "learn", "emoji": "✅", "title": "使い方のコツ", "body": "毎日たくさん書かなくてOK。\n強い感情が出たときだけ1件で十分。\n短くていいので、続けることが大事。"},
            {"id": "s4", "type": "quiz", "question": "思考記録で最初に書くと良いのは？", "options": [
                {"label": "完璧なバランス思考", "correct": False},
                {"label": "状況と感情、自動思考", "correct": True},
                {"label": "他人への批判", "correct": False},
            ], "explanation": "まず状況・感情・自動思考を捕まえることがスタートラインです。"},
            {"id": "s5", "type": "tip", "emoji": "🧾", "title": "テンプレを保存", "body": "メモアプリに見出しだけ保存しておくと、\nその場で書き始めやすくなります。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "思考記録を1件書いてみよう。", "prompt": "状況／感情／自動思考／証拠／バランス思考", "hint": "例：授業で当てられた／不安80／間違える／前回は答えられた／準備すれば対応できる"},
            {"id": "s7", "type": "summary", "emoji": "🌈", "title": "今日のまとめ", "body": "思考記録表は、頭の中を外に出す道具！\n\n続けるほど、書き換えが上手くなる。"},
        ],
    ),
    (
        "sk2-l11",
        [
            {"id": "s1", "type": "intro", "emoji": "💗", "title": "セルフ・コンパッション", "body": "自己批判をゆるめ、自分への思いやりを育てよう。"},
            {"id": "s2", "type": "learn", "emoji": "🫂", "title": "3つの要素", "body": "①自分へのやさしさ（責めすぎない）\n②共通の人間性（苦しむのは自分だけじゃない）\n③マインドフルネス（感情を否定せず気づく）"},
            {"id": "s3", "type": "learn", "emoji": "🗣️", "title": "やさしい一言", "body": "失敗した自分に向けて：\n「つらいよね。でもここまで来た。次は小さくやり直そう」\n\n友だちにする声かけを、自分にも。"},
            {"id": "s4", "type": "quiz", "question": "セルフ・コンパッションに近いのは？", "options": [
                {"label": "失敗をなかったことにする", "correct": False},
                {"label": "つらい事実は認めつつ、自分を責めすぎない", "correct": True},
                {"label": "努力をやめること", "correct": False},
            ], "explanation": "甘やかすのではなく、回復できる形で自分を支えることです。"},
            {"id": "s5", "type": "tip", "emoji": "🤲", "title": "ハンド・オン・ハート", "body": "胸やお腹に手をあてて、ゆっくり呼吸。\n体の安心感が、自己批判を少し弱めてくれることがある。"},
            {"id": "s6", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "自分へのやさしい一言を作ろう。", "prompt": "自己批判の言葉 → セルフ・コンパッションの一言", "hint": "例：ダメ人間 → 今日はうまくいかなかった。でも学び直せる"},
            {"id": "s7", "type": "summary", "emoji": "🎯", "title": "今日のまとめ", "body": "自分への思いやりは、弱さじゃない！\n\n回復のための、大切なスキルです。"},
        ],
    ),
    (
        "sk2-l12",
        [
            {"id": "s1", "type": "intro", "emoji": "🏁", "title": "まとめと振り返り", "body": "認知再構成の道具箱を、これから使う形にまとめよう。"},
            {"id": "s2", "type": "learn", "emoji": "🧰", "title": "ここまで学んだこと", "body": "・ABCモデル\n・自動思考のキャッチ\n・認知の歪み\n・証拠集めと別の見方\n・バランス思考\n・コアビリーフ\n・思考記録表\n・セルフ・コンパッション"},
            {"id": "s3", "type": "quiz", "question": "日常での使い方として良いのは？", "options": [
                {"label": "強い感情のときだけ記録して見直す", "correct": True},
                {"label": "完璧に毎日10件書く", "correct": False},
                {"label": "考えを完全に消す", "correct": False},
            ], "explanation": "続く形が大事。強い感情のとき1件でも十分効果があります。"},
            {"id": "s4", "type": "tip", "emoji": "⭐", "title": "これからのミニ習慣", "body": "①気持ちが動いたら自動思考を一言メモ\n②週1回、思考記録を見返す\n③自分へのやさしい一言を1つ用意しておく"},
            {"id": "s5", "type": "work", "emoji": "📝", "title": "今日のワーク", "body": "今後の活用プランを決めよう。", "prompt": "いつ・どんな場面で・どの技法を使う？", "hint": "例：夜に不安が出たら証拠集めとバランス思考"},
            {"id": "s6", "type": "summary", "emoji": "🏆", "title": "SK02 認知再構成 完了！", "body": "よく頑張ったね！\n\n考え方のクセに気づき、ほぐす力がつきました。\n次のスキルにも挑戦してみよう。"},
        ],
    ),
]


def main() -> None:
    chunks = [lesson(lid, slides) for lid, slides in LESSONS]
    # drop trailing comma on last lesson entry is fine in TS
    text = (
        'import type { Slide } from "./types";\n\n'
        "// ─────────────────────────────────────────────────────────────\n"
        "// SK02 認知再構成 — 全12レッスン スライドデータ（仕様書準拠）\n"
        "// ─────────────────────────────────────────────────────────────\n\n"
        "export const SK2_SLIDES: Record<string, Slide[]> = {\n\n"
        + "\n".join(chunks)
        + "\n};\n"
    )
    OUT.write_text(text, encoding="utf-8")
    print("wrote", OUT, "lessons=", len(LESSONS))


if __name__ == "__main__":
    main()
