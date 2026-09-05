# DB設計書
## ResiApp — 学生向けレジリエンス強化アプリ

**作成日：** 2026年7月17日  
**更新日：** 2026年9月5日  
**バージョン：** 1.1  
**備考：** Supabase（PostgreSQL）での実装を前提とした設計。Supabase連携は後工程。  
**v1.1 追記：** 日常体調記録（`condition_logs`）と天気スナップショット（`weather_snapshots`）— 要件定義書 F07 対応

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
| 4 | `mood_logs` | 毎日の気分記録（既存。F07では `condition_logs` へ拡張移行可） |
| 5 | `weather_snapshots` | 取得した天気・気圧のスナップショット【F07】 |
| 6 | `condition_logs` | 毎日の体調記録（気分＋身体タグ＋メモ）【F07】 |
| 7 | `lesson_completions` | レッスン完了記録 |
| 8 | `work_answers` | レッスン内ワーク（テキスト入力）の記録 |
| 9 | `user_badges` | 獲得バッジの記録 |
| 10 | `notification_settings` | プッシュ通知設定 |
| 11 | `user_preferences` | 表示地域などユーザー設定【F07】 |

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

> **移行方針（F07）：** 新規実装では `condition_logs` を正とする。既存 `mood_logs` がある場合は気分カラムを移行し、`mood_logs` は後方互換のため当面残してもよい。

---

### 2.4b `weather_snapshots` — 天気・気圧スナップショット（F07）

API応答をそのまま個人ログに大量保存せず、**表示・注意判定に必要な要約**を保存する。  
（`condition_logs` が参照するため、先に定義する。）

```sql
CREATE TABLE weather_snapshots (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES users(id) ON DELETE CASCADE, -- NULL可（地域共通キャッシュ運用時）
  region_key        TEXT NOT NULL,          -- 例: 'osaka' / 'tokyo'
  fetched_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  weather_code      TEXT,                   -- APIの天気コード or 簡易ラベル
  temperature_c     NUMERIC(4,1),
  humidity_pct      SMALLINT,
  pressure_hpa      NUMERIC(6,1),           -- 現在気圧
  pressure_delta_hpa NUMERIC(5,1),          -- 直近の変化（例: 24h差）。下降は負
  pressure_alert    TEXT NOT NULL DEFAULT 'normal'
                    CHECK (pressure_alert IN ('normal', 'mild', 'caution')),
  source            TEXT NOT NULL DEFAULT 'open-meteo',
  raw_summary       JSONB,                  -- デバッグ用の要約JSON（個人情報を含めない）
  expires_at        TIMESTAMPTZ             -- キャッシュ期限
);
```

| カラム | 型 | 説明 |
|--------|-----|------|
| `region_key` | TEXT | 表示地域のキー |
| `pressure_hpa` | NUMERIC | 現在気圧 |
| `pressure_delta_hpa` | NUMERIC | 変化量（実装で定義した窓：例 24時間） |
| `pressure_alert` | TEXT | アプリ判定結果 |
| `expires_at` | TIMESTAMPTZ | これ以降は再取得 |

**pressure_alert 判定（初期案・チューニング前提）**
```
|pressure_delta_hpa| < 3     → normal
3 ≤ |delta| < 6             → mild
|delta| ≥ 6                 → caution
（下降をより重視する場合は下降側の閾値を小さくする）
```

---

### 2.4c `condition_logs` — 毎日の体調記録（F07）

```sql
CREATE TABLE condition_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date            DATE NOT NULL DEFAULT CURRENT_DATE,
  mood            TEXT NOT NULL
                  CHECK (mood IN ('great', 'good', 'okay', 'bad', 'rough')),
  mood_score      SMALLINT NOT NULL CHECK (mood_score BETWEEN 1 AND 5),
  -- 身体タグ（複数可）。空配列可
  body_tags       TEXT[] NOT NULL DEFAULT '{}',
  note            TEXT,
  -- 記録時点の気圧注意レベル（天気API判定結果のコピー。任意）
  pressure_alert  TEXT
                  CHECK (pressure_alert IS NULL OR pressure_alert IN ('normal', 'mild', 'caution')),
  weather_snapshot_id UUID REFERENCES weather_snapshots(id) ON DELETE SET NULL,
  logged_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (user_id, date)
);
```

| カラム | 型 | 説明 |
|--------|-----|------|
| `mood` / `mood_score` | TEXT / SMALLINT | ホームの5段階気分と同一定義 |
| `body_tags` | TEXT[] | 許可値例：`headache`, `fatigue`, `sleepy`, `stiff_shoulder`, `stomach`, `other` |
| `note` | TEXT | 任意の一言メモ |
| `pressure_alert` | TEXT | 記録時の注意レベル（後から振り返り用に保存） |
| `weather_snapshot_id` | UUID | 紐づく天気スナップショット（任意） |

**body_tags のアプリ側マスタ**

| 値 | 表示 |
|----|------|
| `headache` | 頭痛 |
| `fatigue` | だるさ |
| `sleepy` | 眠気 |
| `stiff_shoulder` | 肩こり |
| `stomach` | 胃の不調 |
| `other` | その他 |

---

### 2.4d `user_preferences` — ユーザー設定（F07 含む）

```sql
CREATE TABLE user_preferences (
  user_id            UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  weather_region_key TEXT NOT NULL DEFAULT 'osaka',
  weather_enabled    BOOLEAN NOT NULL DEFAULT true,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

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
  ├─< mood_logs                    （既存・互換）
  ├─< condition_logs ──> weather_snapshots   （F07）
  ├─< lesson_completions
  ├─< work_answers
  ├─< user_badges
  ├── notification_settings  (1:1)
  └── user_preferences       (1:1, F07)
```

**主なリレーション**
- `users` 1 : N `check_sessions`（1ユーザーが複数回チェック）
- `check_sessions` 1 : N `check_answers`（1セッションに複数回答）
- `users` 1 : N `mood_logs`（1日1記録）
- `users` 1 : N `condition_logs`（1日1体調記録）
- `condition_logs` N : 1 `weather_snapshots`（任意紐付け）
- `users` 1 : N `lesson_completions`（1レッスンにつき1記録）
- `users` 1 : N `work_answers`
- `users` 1 : N `user_badges`
- `users` 1 : 1 `notification_settings`
- `users` 1 : 1 `user_preferences`

---

## 4. インデックス設計

```sql
-- セルフチェック履歴の時系列取得
CREATE INDEX idx_check_sessions_user_date
  ON check_sessions (user_id, completed_at DESC);

-- 気分ログのカレンダー表示
CREATE INDEX idx_mood_logs_user_date
  ON mood_logs (user_id, date DESC);

-- 体調ログ（F07）
CREATE INDEX idx_condition_logs_user_date
  ON condition_logs (user_id, date DESC);

CREATE INDEX idx_condition_logs_pressure
  ON condition_logs (user_id, pressure_alert, date DESC);

-- 天気スナップショット（地域＋取得時刻）
CREATE INDEX idx_weather_snapshots_region_fetched
  ON weather_snapshots (region_key, fetched_at DESC);

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
| `condition_logs` | 本人のみ自分の行をSELECT/INSERT/UPDATE可能 |
| `weather_snapshots` | 本人紐付け行は本人のみ。地域共通キャッシュ運用時は読み取り専用ポリシーを別途定義 |
| `user_preferences` | 本人のみSELECT/UPDATE可能 |
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
| 気圧注意レベル | `weather_snapshots.pressure_delta_hpa` からアプリ側で判定し、結果を `pressure_alert` に保存 |
| 体調×注意日の振り返り | `condition_logs` と `pressure_alert` / 日付で結合して成長画面に表示 |

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
| 端末位置による天気 | `user_preferences`に緯度経度（同意必須）またはGeocoding結果を追加 |
| 生理周期など高度な体調予報 | 別テーブル。初期スコープ外（要件定義書 F07） |

---

*本設計書は要件定義書・参考資料コンテンツ仕様書と合わせて参照してください。*  
*Supabase連携時はRow Level Security・Edge Functionsの実装詳細を別途作成すること。*

*最終更新：2026年9月5日*
