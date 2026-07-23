# DB設計書
## ResiApp — 学生向けレジリエンス強化アプリ

**作成日：** 2026年7月17日  
**バージョン：** 1.0  
**備考：** Supabase（PostgreSQL）での実装を前提とした設計。Supabase連携は後工程。

---

## 目次

1. [テーブル一覧](#1-テーブル一覧)
2. [テーブル詳細](#2-テーブル詳細)
3. [ER図（テキスト表現）](#3-er図)
4. [インデックス設計](#4-インデックス設計)
5. [Row Level Security（RLS）方針](#5-rls方針)
6. [計算値・派生データの方針](#6-計算値派生データの方針)
7. [将来拡張の考慮事項](#7-将来拡張の考慮事項)

---

## 1. テーブル一覧

| # | テーブル名 | 概要 |
|---|-----------|------|
| 1 | `users` | ユーザープロフィール |
| 2 | `check_sessions` | セルフチェックの実施記録（1回分） |
| 3 | `check_answers` | セルフチェックの各設問への回答 |
| 4 | `mood_logs` | 毎日の気分記録 |
| 5 | `lesson_completions` | レッスン完了記録 |
| 6 | `work_answers` | レッスン内ワーク（テキスト入力）の記録 |
| 7 | `user_badges` | 獲得バッジの記録 |
| 8 | `notification_settings` | プッシュ通知設定 |

---

## 2. テーブル詳細

---

### 2.1 `users` — ユーザープロフィール

```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id       TEXT NOT NULL UNIQUE,      -- 学校が発行するID（学籍番号等）
  nickname        TEXT NOT NULL,             -- 表示名（本名不要）
  grade           SMALLINT,                  -- 学年（1〜4等）
  department      TEXT,                      -- 学部・学科
  level           SMALLINT NOT NULL DEFAULT 1,
  growth_points   INTEGER  NOT NULL DEFAULT 0,
  streak_days     SMALLINT NOT NULL DEFAULT 0,
  last_active_at  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

| カラム | 型 | 説明 |
|--------|-----|------|
| `id` | UUID | PK。アプリ内部で使う識別子 |
| `school_id` | TEXT | 学校システムと紐付けるID。ログイン認証に使用 |
| `nickname` | TEXT | ホーム画面に表示する名前 |
| `grade` | SMALLINT | 学年（任意） |
| `level` | SMALLINT | レジリエンスレベル（1〜） |
| `growth_points` | INTEGER | レベルアップに使うポイント |
| `streak_days` | SMALLINT | 連続利用日数 |
| `last_active_at` | TIMESTAMPTZ | 最終利用日時（streak計算用） |

---

### 2.2 `check_sessions` — セルフチェック実施記録

1回のセルフチェック（PHQ-9、GAD-7 等）につき1行。

```sql
CREATE TABLE check_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_type    TEXT NOT NULL CHECK (session_type IN ('weekly', 'monthly', 'initial')),
  phq9_score      SMALLINT,         -- PHQ-9合計（0〜27）
  gad7_score      SMALLINT,         -- GAD-7合計（0〜21）
  psqi_score      SMALLINT,         -- PSQI簡易版合計（0〜21）
  resilience_score SMALLINT,        -- レジリエンス指標合計（8〜40）
  total_score     SMALLINT,         -- 総合スコア（アプリ独自換算）
  alert_level     TEXT NOT NULL DEFAULT 'normal'
                  CHECK (alert_level IN ('normal', 'caution', 'warning', 'urgent')),
  completed_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

| カラム | 型 | 説明 |
|--------|-----|------|
| `session_type` | TEXT | `weekly`（週次）/ `monthly`（月次）/ `initial`（初回） |
| `phq9_score` | SMALLINT | PHQ-9合計点。NULLは未実施 |
| `alert_level` | TEXT | スコアに基づく警戒レベル。高スコア時に相談窓口へ誘導 |

**判定ロジック（アプリ側またはDB関数で実装）**
```
phq9_score >= 20 OR gad7_score >= 15  → urgent
phq9_score >= 10 OR gad7_score >= 10  → warning
phq9_score >= 5  OR gad7_score >= 5   → caution
それ以外                               → normal
```

---

### 2.3 `check_answers` — セルフチェック各設問の回答

```sql
CREATE TABLE check_answers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID NOT NULL REFERENCES check_sessions(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scale           TEXT NOT NULL CHECK (scale IN ('phq9', 'gad7', 'psqi', 'resilience')),
  question_no     SMALLINT NOT NULL,   -- 設問番号（1〜）
  answer_value    SMALLINT NOT NULL,   -- 選択値（0〜3 または 1〜5）
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (session_id, scale, question_no)
);
```

| カラム | 型 | 説明 |
|--------|-----|------|
| `scale` | TEXT | `phq9` / `gad7` / `psqi` / `resilience` |
| `question_no` | SMALLINT | 1始まりの設問番号 |
| `answer_value` | SMALLINT | PHQ-9/GAD-7は0〜3、レジリエンスは1〜5 |

---

### 2.4 `mood_logs` — 毎日の気分記録

```sql
CREATE TABLE mood_logs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mood       TEXT NOT NULL CHECK (mood IN ('great', 'good', 'okay', 'bad', 'rough')),
  mood_score SMALLINT NOT NULL CHECK (mood_score BETWEEN 1 AND 5),
  note       TEXT,                    -- 任意メモ（将来拡張用）
  logged_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  date       DATE NOT NULL DEFAULT CURRENT_DATE,  -- 重複チェック用

  UNIQUE (user_id, date)              -- 1日1回のみ記録
);
```

| カラム | 型 | 説明 |
|--------|-----|------|
| `mood` | TEXT | `great`=5点 / `good`=4点 / `okay`=3点 / `bad`=2点 / `rough`=1点 |
| `mood_score` | SMALLINT | moodの数値版。グラフ描画に使用 |
| `date` | DATE | UNIQUE制約で1日1記録を保証 |

---

### 2.5 `lesson_completions` — レッスン完了記録

```sql
CREATE TABLE lesson_completions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id      TEXT NOT NULL CHECK (skill_id IN ('sk1', 'sk2', 'sk3', 'sk4', 'sk5')),
  lesson_id     TEXT NOT NULL,        -- 例: 'sk1-l1'
  completed_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  time_spent_sec INTEGER,             -- 所要時間（秒）

  UNIQUE (user_id, lesson_id)         -- 1ユーザーにつき1レッスン1記録
);
```

| カラム | 型 | 説明 |
|--------|-----|------|
| `skill_id` | TEXT | スキル識別子。`lesson_id` との整合性確認用 |
| `lesson_id` | TEXT | `sk1-l1` 形式。マスタはアプリコードで管理 |
| `time_spent_sec` | INTEGER | エンゲージメント計測用（任意） |

---

### 2.6 `work_answers` — ワークのテキスト回答

レッスン内「ワーク」スライドへのテキスト入力を保存。

```sql
CREATE TABLE work_answers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id    TEXT NOT NULL,         -- 例: 'sk1-l1'
  slide_id     TEXT NOT NULL,         -- 例: 's6'
  answer_text  TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (user_id, lesson_id, slide_id)  -- 上書き更新を想定
);
```

---

### 2.7 `user_badges` — 獲得バッジ

```sql
CREATE TABLE user_badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id    TEXT NOT NULL,          -- 例: 'first-check', 'streak-7'
  earned_at   TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (user_id, badge_id)
);
```

**バッジ付与トリガーの条件（アプリ側ロジックで判定）**

| `badge_id` | 付与条件 |
|------------|---------|
| `first-check` | 初回セルフチェック完了 |
| `first-lesson` | 初回レッスン完了 |
| `streak-7` | 7日連続利用 |
| `streak-30` | 30日連続利用 |
| `days-30` | 登録から30日経過かつアクティブ |
| `sk1-complete` | SK01全レッスン完了 |
| `all-skills` | 全スキル完了 |
| `check-10` | セルフチェック10回完了 |

---

### 2.8 `notification_settings` — プッシュ通知設定

```sql
CREATE TABLE notification_settings (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  push_enabled        BOOLEAN NOT NULL DEFAULT true,
  daily_reminder      BOOLEAN NOT NULL DEFAULT true,
  daily_reminder_time TIME NOT NULL DEFAULT '20:00:00',  -- 毎日のリマインダー時刻
  weekly_check_day    SMALLINT DEFAULT 1                  -- 0=日曜〜6=土曜
                      CHECK (weekly_check_day BETWEEN 0 AND 6),
  inactivity_alert    BOOLEAN NOT NULL DEFAULT true,      -- 3日未使用で通知
  score_alert         BOOLEAN NOT NULL DEFAULT true,      -- 高スコア検出時に通知
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## 3. ER図

```
users
  ├─< check_sessions ──< check_answers
  ├─< mood_logs
  ├─< lesson_completions
  ├─< work_answers
  ├─< user_badges
  └── notification_settings  (1:1)
```

**主なリレーション**
- `users` 1 : N `check_sessions`（1ユーザーが複数回チェック）
- `check_sessions` 1 : N `check_answers`（1セッションに複数回答）
- `users` 1 : N `mood_logs`（1日1記録）
- `users` 1 : N `lesson_completions`（1レッスンにつき1記録）
- `users` 1 : N `work_answers`
- `users` 1 : N `user_badges`
- `users` 1 : 1 `notification_settings`

---

## 4. インデックス設計

```sql
-- セルフチェック履歴の時系列取得
CREATE INDEX idx_check_sessions_user_date
  ON check_sessions (user_id, completed_at DESC);

-- 気分ログのカレンダー表示
CREATE INDEX idx_mood_logs_user_date
  ON mood_logs (user_id, date DESC);

-- レッスン進捗のスキル別集計
CREATE INDEX idx_lesson_completions_user_skill
  ON lesson_completions (user_id, skill_id);

-- バッジ一覧の高速取得
CREATE INDEX idx_user_badges_user
  ON user_badges (user_id);

-- 直近のチェックセッション取得（ホーム画面の「前回からN日」表示用）
CREATE INDEX idx_check_sessions_latest
  ON check_sessions (user_id, completed_at DESC)
  WHERE session_type IN ('weekly', 'initial');
```

---

## 5. RLS方針

Supabase連携時に設定する行レベルセキュリティの基本方針。

| テーブル | 方針 |
|---------|------|
| `users` | 本人のみ自分の行をSELECT/UPDATE可能 |
| `check_sessions` | 本人のみ自分の行をSELECT/INSERT可能。UPDATEは原則禁止 |
| `check_answers` | 本人のみ自分の行をSELECT/INSERT可能 |
| `mood_logs` | 本人のみ自分の行をSELECT/INSERT可能 |
| `lesson_completions` | 本人のみ自分の行をSELECT/INSERT可能 |
| `work_answers` | 本人のみ自分の行をSELECT/INSERT/UPDATE可能 |
| `user_badges` | 本人はSELECTのみ。INSERTはサーバー側関数（Supabase Edge Function）経由 |
| `notification_settings` | 本人のみSELECT/UPDATE可能 |

> **管理者アクセス**：学校管理者は集計データ（個人を特定しない統計）のみ閲覧可。個別の回答内容は閲覧不可とする（要件定義書 3.3節）。

---

## 6. 計算値・派生データの方針

DBには**生データのみ保存**し、以下はアプリ側またはDB関数で都度計算する。

| 値 | 算出方法 |
|----|---------|
| `streak_days` | `last_active_at`と現在日時を比較してアプリ側で計算。`users`テーブルに保持 |
| `level` | `growth_points`をしきい値（例：10pt/Lv）で割り算。`users`テーブルに保持 |
| スキル別完了数 | `lesson_completions`をスキルIDでCOUNT |
| 今週チェック済みか | `check_sessions`を今週の月曜以降でフィルタ |
| 前回チェックからの経過日数 | `check_sessions`の最新`completed_at`と現在日時の差分 |
| 総合スコア推移グラフ | `check_sessions`を時系列でSELECT |

---

## 7. 将来拡張の考慮事項

| 機能 | 対応テーブル・カラム |
|------|-------------------|
| 担任/スクールカウンセラーによる状況確認 | `users`に`counselor_id`を追加。`check_sessions`の`alert_level`をもとに通知 |
| 学校管理者ダッシュボード | 個人を特定しない集計ビュー（`school_analytics_view`）を別途作成 |
| 複数学校対応 | `schools`テーブルを追加し、`users.school_id`を外部キーに変更 |
| LDAPとのSSO連携 | `users`に`external_auth_id`カラムを追加 |
| レッスンコンテンツのCMS管理 | `skills`・`lessons`テーブルをDBに移行（現在はコードで管理） |
| Web Push通知の購読情報 | `push_subscriptions`テーブルを追加（endpoint, p256dh, auth） |

---

*本設計書は要件定義書・参考資料コンテンツ仕様書と合わせて参照してください。*  
*Supabase連携時はRow Level Security・Edge Functionsの実装詳細を別途作成すること。*

*最終更新：2026年7月17日*
