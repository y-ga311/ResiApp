#!/usr/bin/env python3
"""スライドTSから画像生成プロンプトMDを生成する。"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROMPTS = ROOT / "public" / "training" / "prompts"
LIB = ROOT / "lib"

IMAGE_TYPES = {"intro", "learn", "tip", "summary"}

SKILLS = [
    {
        "id": "sk1",
        "num": "01",
        "folder": "行動活性化",
        "name": "行動活性化",
        "accent": "#10B981",
        "file": "slides-sk1.ts",
        # L1-L2 は実装済み画像あり → 別ファイルに残し、L3以降を本生成
        "skip_lessons": {"sk1-l1", "sk1-l2"},
        "out_name": "L3-L10.md",
        "title_md": "行動活性化 L3–L10 画像生成プロンプト",
    },
    {
        "id": "sk2",
        "num": "02",
        "folder": "認知再構成",
        "name": "認知再構成",
        "accent": "#6366F1",
        "accent_soft": "#E0E7FF",
        "bg": "#EEF2FF",
        "file": "slides-sk2.ts",
        "skip_lessons": set(),
        "out_name": "全レッスン.md",
        "title_md": "認知再構成 画像生成プロンプト",
    },
    {
        "id": "sk3",
        "num": "03",
        "folder": "問題解決",
        "name": "問題解決",
        "accent": "#EA580C",
        "accent_soft": "#FED7AA",
        "bg": "#FFF7ED",
        "file": "slides-sk3.ts",
        "skip_lessons": set(),
        "out_name": "全レッスン.md",
        "title_md": "問題解決 画像生成プロンプト",
    },
    {
        "id": "sk4",
        "num": "04",
        "folder": "アサーション",
        "name": "アサーション",
        "accent": "#F472B6",
        "file": "slides-sk4.ts",
        "skip_lessons": set(),
        "out_name": "全レッスン.md",
        "title_md": "アサーション 画像生成プロンプト",
    },
    {
        "id": "sk5",
        "num": "05",
        "folder": "睡眠行動療法",
        "name": "睡眠行動療法",
        "accent": "#38BDF8",
        "file": "slides-sk5.ts",
        "skip_lessons": set(),
        "out_name": "全レッスン.md",
        "title_md": "睡眠行動療法 画像生成プロンプト",
    },
]

# NOTE: _共通スタイル.md は手編集を優先。再生成時は上書きしない。
COMMON = None


def extract_balanced(text: str, start: int) -> tuple[str, int]:
    """start が '[' または '{' の位置。対応する閉じまで返す。"""
    open_ch = text[start]
    close_ch = "]" if open_ch == "[" else "}"
    depth = 0
    i = start
    in_str = None
    escape = False
    while i < len(text):
        ch = text[i]
        if in_str:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == in_str:
                in_str = None
        else:
            if ch in ("'", '"', "`"):
                in_str = ch
            elif ch == open_ch:
                depth += 1
            elif ch == close_ch:
                depth -= 1
                if depth == 0:
                    return text[start : i + 1], i + 1
        i += 1
    raise ValueError("unbalanced")


def parse_field(block: str, key: str) -> str | None:
    # string: title: "..."
    m = re.search(rf'{key}:\s*"((?:\\.|[^"\\])*)"', block)
    if m:
        return m.group(1)
    # template: body: `...`
    m = re.search(rf"{key}:\s*`([\s\S]*?)`", block)
    if m:
        return m.group(1)
    return None


def parse_slides_file(path: Path) -> dict[str, list[dict]]:
    text = path.read_text(encoding="utf-8")
    lessons: dict[str, list[dict]] = {}
    for m in re.finditer(r'"(sk\d-l\d+)":\s*\[', text):
        lid = m.group(1)
        arr, _ = extract_balanced(text, m.end() - 1)
        inner = arr[1:-1]
        slides: list[dict] = []
        pos = 0
        while True:
            brace = inner.find("{", pos)
            if brace < 0:
                break
            obj, next_pos = extract_balanced(inner, brace)
            sid = parse_field(obj, "id")
            stype = parse_field(obj, "type")
            if sid and stype:
                slides.append(
                    {
                        "id": sid,
                        "type": stype,
                        "emoji": parse_field(obj, "emoji") or "",
                        "title": parse_field(obj, "title") or "",
                        "body": parse_field(obj, "body") or "",
                    }
                )
            pos = next_pos
        lessons[lid] = slides
    return lessons


def visual_for(skill: dict, slide: dict, lesson_title: str) -> tuple[str, str]:
    """(visual, tone)"""
    stype = slide["type"]
    title = slide["title"]
    body = slide["body"]
    accent = skill["accent"]
    accent_soft = skill.get("accent_soft", accent)
    bg = skill.get("bg", "#F0F4FF")
    emoji = slide["emoji"]

    base = [
        f"- メインカラー：{accent}／背景：{bg} 〜 白／アクセント：{accent_soft}",
        f"- レッスン「{lesson_title}」の文脈に合うイラスト",
        "- 余白を十分に取り、スマホ縦画面で読みやすいレイアウト",
    ]

    if stype == "intro":
        visual = "\n".join(
            base
            + [
                f"- 導入スライド：中央に大きなモチーフ（絵文字の雰囲気：{emoji or 'やさしいイラスト'}）",
                "- タイトルを大きく、本文は短く下部または中央下",
                "- テーマが一目で伝わるシンプル構成",
            ]
        )
        tone = "やさしい導入・前向き・安心感"
    elif stype == "learn":
        tips = ["- 学習スライド：概念を図解（カード／番号／矢印／2〜3分割レイアウト）"]
        if "①" in body or "1." in body or "・" in body:
            tips.append("- 箇条書きは番号付きカードやアイコン付きリストで見やすく")
        if "→" in body or "A：" in body or "A:" in body:
            tips.append("- 流れ・因果は左→右、または上→下の矢印で図解")
        if "例" in body or "例：" in body:
            tips.append("- 具体例は吹き出しや小さなシーンイラストで補強")
        tips.append("- 文字は正確。長文は段落分けして読みやすく")
        visual = "\n".join(base + tips)
        tone = "わかりやすい学習・納得感"
    elif stype == "tip":
        visual = "\n".join(
            base
            + [
                "- ポイントカード風：上部に小さめラベル「ポイント」",
                "- 実践しやすいヒント感（電球・メモ・チェックなど）",
                "- ハードルが低く、気軽に試せそうな雰囲気",
            ]
        )
        tone = "気軽・実践的・やさしい励まし"
    else:  # summary
        visual = "\n".join(
            base
            + [
                "- まとめスライド：区切り感と達成感（小さな虹・星・一歩など可）",
                "- タイトル＋要点を簡潔に。締めの一文が印象に残る構図",
                "- 次の行動への後押しが伝わる明るさ",
            ]
        )
        tone = "前向き・まとめ・実践への後押し"

    # keyword-based extra hints
    keywords = title + body
    extras = []
    mapping = [
        (r"ABC|自動思考|認知", "頭の中の考えと気持ちをやさしく図解（吹き出し可）"),
        (r"睡眠|ベッド|眠", "寝室・ベッド・月夜のやさしいシーン（暗すぎない）"),
        (r"断る|アサー|伝え", "会話・吹き出し・2人のやさしいやりとり"),
        (r"問題|プラン|ブレイン", "付箋・ノート・ステップ図で整理感"),
        (r"日記|記録|ログ", "ノート／スマホメモの記録シーン"),
        (r"呼吸|リラックス", "深呼吸・リラックスする学生の穏やかな姿"),
        (r"SNS|メール|LINE", "スマホ画面とメッセージのモチーフ（実在UIロゴは使わない）"),
    ]
    for pat, hint in mapping:
        if re.search(pat, keywords):
            extras.append(f"- {hint}")
    if extras:
        visual += "\n" + "\n".join(dict.fromkeys(extras))  # unique preserve order

    return visual, tone


def format_body_for_prompt(body: str) -> str:
    body = body.strip()
    if not body:
        return "（短い導入文。タイトルを引き立てる余白中心でOK）"
    # Keep as-is; prefix with 本文：
    return "本文：\n" + body


def prompt_block(
    filename: str,
    folder: str,
    lesson_title: str,
    slide: dict,
    visual: str,
    tone: str,
) -> str:
    tip_label = ""
    if slide["type"] == "tip":
        tip_label = "ラベル（上部・小さめ）：\nポイント\n\n"
    title = slide["title"] or lesson_title
    text = format_body_for_prompt(slide["body"])
    return f"""### {filename}

**ファイル名：** `{filename}`  
**保存先：** `public/training/{folder}/{filename}`  
**サイズ：** 縦長（9:16 推奨）  
**レッスン：** {lesson_title} / スライド{slide["id"]}（{slide["type"]}）

```
（共通スタイルを先頭に付ける）

【用途】
レッスン「{lesson_title}」のスライド。

【テーマ】
{title}

【画面に入れる日本語テキスト（必ず正確に入れる）】
{tip_label}タイトル（大きめ）：
{title}

{text}

【ビジュアル指示】
{visual}

【トーン】
{tone}
```
"""


def lesson_title_from_slides(slides: list[dict], fallback: str) -> str:
    for s in slides:
        if s["type"] == "intro" and s["title"]:
            return s["title"]
    for s in slides:
        if s["title"]:
            return s["title"]
    return fallback


def generate_skill(skill: dict) -> tuple[str, int, list[str]]:
    lessons = parse_slides_file(LIB / skill["file"])
    # natural sort by lesson number
    def sort_key(lid: str) -> int:
        return int(re.search(r"l(\d+)", lid).group(1))

    parts = [
        f"# {skill['title_md']}",
        "",
        "> 共通スタイルは `_共通スタイル.md` を毎回先頭に。",
    ]
    if skill["id"] == "sk2":
        parts.extend(
            [
                "> **カラー：** インディゴ系（メイン `#6366F1`／背景 `#EEF2FF`／アクセント `#E0E7FF`）",
                "> `_共通スタイル.md` の色設定（認知再構成用）を必ず先頭に付けること。",
            ]
        )
    if skill["id"] == "sk3":
        parts.extend(
            [
                "> **カラー：** オレンジ系（メイン `#EA580C`／背景 `#FFF7ED`／アクセント `#FED7AA`）",
                "> `_共通スタイル.md` の色設定（問題解決用）を必ず先頭に付けること。",
            ]
        )
    parts.extend(
        [
            "> **画像対象：** intro / learn / tip / summary（quiz・work は画像なし）",
            f"> **保存先：** `public/training/{skill['folder']}/`",
            f"> **ファイル名規則：** `{skill['id']}-lN-sN.png`",
            "",
        ]
    )
    count = 0
    filenames: list[str] = []
    for lid in sorted(lessons.keys(), key=sort_key):
        if lid in skill["skip_lessons"]:
            continue
        slides = lessons[lid]
        ltitle = lesson_title_from_slides(slides, lid)
        n = int(re.search(r"l(\d+)", lid).group(1))
        parts.append(f"## L{n} {ltitle} (`{lid}`)")
        parts.append("")
        for slide in slides:
            if slide["type"] not in IMAGE_TYPES:
                continue
            # skip learn/intro without title and body (image-only already done)
            if not slide["title"] and not slide["body"]:
                continue
            fname = f"{lid}-{slide['id']}.png"
            visual, tone = visual_for(skill, slide, ltitle)
            parts.append(prompt_block(fname, skill["folder"], ltitle, slide, visual, tone))
            count += 1
            filenames.append(fname)
        parts.append("")
    return "\n".join(parts).rstrip() + "\n", count, filenames


def write_index(counts: dict[str, int]) -> None:
    total_new = sum(counts.values())
    content = f"""# ResiApp トレーニング画像プロンプト一覧

**方針：** 全スキル・全レッスンを実装する前提。クイズ／ワーク画面以外は画像付きスライド。  
**ソース：** `lib/slides-sk*.ts` の本文から自動生成（文言・ファイル名を一致）。

## フォルダ構成

```
public/training/prompts/
├── _共通スタイル.md
├── README.md（このファイル）
├── 01_行動活性化/
│   ├── L1-L2_完了済み.md
│   └── L3-L10.md
├── 02_認知再構成/全レッスン.md
├── 03_問題解決/全レッスン.md
├── 04_アサーション/全レッスン.md
└── 05_睡眠行動療法/全レッスン.md
```

## 進捗サマリー

| スキル | プロンプト | 画像実装 | 枚数 |
|--------|-----------|---------|------|
| SK01 行動活性化 L1–L2 | 完了済み | **実装済み** | 10 |
| SK01 行動活性化 L3–L10 | **本md** | 未 | {counts.get("sk1", 0)} |
| SK02 認知再構成（12レッスン） | **本md** | 未 | {counts.get("sk2", 0)} |
| SK03 問題解決（8レッスン） | **本md** | 未 | {counts.get("sk3", 0)} |
| SK04 アサーション（10レッスン） | **本md** | 未 | {counts.get("sk4", 0)} |
| SK05 睡眠行動療法（10レッスン） | **本md** | 未 | {counts.get("sk5", 0)} |
| **未生成プロンプト合計** | | | **{total_new}** |

## 使い方

1. `_共通スタイル.md` の共通ブロックをコピー
2. 対象レッスンのプロンプト本文を続けて ChatGPT（画像生成）に貼る
3. 生成画像を `public/training/{{スキル名}}/{{ファイル名}}` に保存
4. Agent に「`ファイル名` をスライドに表示して」と依頼して差し込み

## 推奨生成順

1. SK01 L3 → L10
2. SK02 認知再構成
3. SK03 → SK04 → SK05

## ファイル名の例

| ファイル名 | 保存先 |
|-----------|--------|
| `sk1-l3-s1.png` | `public/training/行動活性化/` |
| `sk2-l1-s1.png` | `public/training/認知再構成/` |
| `sk3-l1-s1.png` | `public/training/問題解決/` |
| `sk4-l1-s1.png` | `public/training/アサーション/` |
| `sk5-l1-s1.png` | `public/training/睡眠行動療法/` |

## 画像保存先

```
public/training/
├── 行動活性化/
├── 認知再構成/
├── 問題解決/
├── アサーション/
└── 睡眠行動療法/
```
"""
    (PROMPTS / "README.md").write_text(content, encoding="utf-8")
    print("wrote", PROMPTS / "README.md")


def write_pointer() -> None:
    path = ROOT / "public" / "training" / "画像生成プロンプト.md"
    path.write_text(
        """# 画像生成プロンプト（移行案内）

プロンプト一覧は以下に整理しました。

→ **`public/training/prompts/README.md`**

| ファイル | 内容 |
|----------|------|
| `prompts/_共通スタイル.md` | 毎回付ける共通指示 |
| `prompts/01_行動活性化/L1-L2_完了済み.md` | 実装済み（再生成不要） |
| `prompts/01_行動活性化/L3-L10.md` | SK01 残り |
| `prompts/02_認知再構成/全レッスン.md` | SK02 全レッスン |
| `prompts/03_問題解決/全レッスン.md` | SK03 全レッスン |
| `prompts/04_アサーション/全レッスン.md` | SK04 全レッスン |
| `prompts/05_睡眠行動療法/全レッスン.md` | SK05 全レッスン |

スライド本文（`lib/slides-sk*.ts`）と文言・ファイル名を一致させています。  
再生成する場合は `python3 scripts/generate_image_prompts_from_slides.py` を実行。
""",
        encoding="utf-8",
    )
    print("wrote", path)


def main() -> None:
    PROMPTS.mkdir(parents=True, exist_ok=True)
    # _共通スタイル.md は手編集を保持（上書きしない）

    # keep L1-L2 completed note
    done = PROMPTS / "01_行動活性化" / "L1-L2_完了済み.md"
    done.parent.mkdir(parents=True, exist_ok=True)
    done.write_text(
        """# SK01 行動活性化 — L1・L2（完了済み）

以下はアプリに差し込み済みです。再生成不要。

## L1 行動活性化とは？
| ファイル名 | 保存先 |
|-----------|--------|
| `sk1-l1-s1.png` | `public/training/行動活性化/sk1-l1-s1.png` |
| `sk1-l1-s2.png` | `public/training/行動活性化/sk1-l1-s2.png` |
| `sk1-l1-s3.png` | `public/training/行動活性化/sk1-l1-s3.png` |
| `sk1-l1-s5.png` | `public/training/行動活性化/sk1-l1-s5.png` |
| `sk1-l1-s7.png` | `public/training/行動活性化/sk1-l1-s7.png` |

## L2 気分と行動のつながり
| ファイル名 | 保存先 |
|-----------|--------|
| `sk1-l2-s1.png` | `public/training/行動活性化/sk1-l2-s1.png` |
| `sk1-l2-s2.png` | `public/training/行動活性化/sk1-l2-s2.png` |
| `sk1-l2-s3.png` | `public/training/行動活性化/sk1-l2-s3.png` |
| `sk1-l2-s5.png` | `public/training/行動活性化/sk1-l2-s5.png` |
| `sk1-l2-s7.png` | `public/training/行動活性化/sk1-l2-s7.png` |
""",
        encoding="utf-8",
    )

    counts: dict[str, int] = {}
    for skill in SKILLS:
        content, n, filenames = generate_skill(skill)
        out = PROMPTS / f"{skill['num']}_{skill['folder']}" / skill["out_name"]
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(content, encoding="utf-8")
        counts[skill["id"]] = n
        print(f"wrote {out} prompts={n} files={len(filenames)}")
        # also write a compact filename checklist
        checklist = out.with_name("ファイル名一覧.md")
        lines = [
            f"# {skill['name']} 画像ファイル名一覧",
            "",
            f"保存先：`public/training/{skill['folder']}/`",
            "",
            "| # | ファイル名 |",
            "|---|-----------|",
        ]
        for i, fn in enumerate(filenames, 1):
            lines.append(f"| {i} | `{fn}` |")
        lines.append("")
        checklist.write_text("\n".join(lines), encoding="utf-8")
        print("wrote", checklist)

    write_index(counts)
    write_pointer()
    print("TOTAL", sum(counts.values()))


if __name__ == "__main__":
    main()
