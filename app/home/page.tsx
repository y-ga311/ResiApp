"use client";

import { useState } from "react";
import Link from "next/link";import {
  Star, BookOpen,
  Sun, Smile, Meh, Frown, CloudRain,
  Sparkles, ArrowRight, Droplets,
  ClipboardCheck, ChevronRight, AlertCircle,
} from "lucide-react";import TabBar from "@/components/TabBar";
import AppHeader from "@/components/AppHeader";
import { USER, SKILLS, TODAY_LESSON, CHECK_HISTORY } from "@/lib/mock-data";

const MOOD_OPTIONS = [
  { icon: Sun,       label: "最高",  color: "#FBBF24", key: "great" },
  { icon: Smile,     label: "良い",  color: "#10B981", key: "good" },
  { icon: Meh,       label: "普通",  color: "#60A5FA", key: "okay" },
  { icon: Frown,     label: "つらい",color: "#FB923C", key: "bad" },
  { icon: CloudRain, label: "辛い",  color: "#A78BFA", key: "rough" },
];

const STAT_ITEMS = [
  {
    icon: Droplets,
    value: `${USER.streak}日連続`,
    sub:   "目標キープ中！",
    color: "#1B3A6B",
    bg:    "#DBE8FF",
  },
  {
    icon: Star,
    value: `Lv. ${USER.level}`,
    sub:   `次はLv.${USER.level + 1}！`,
    color: "#1B3A6B",
    bg:    "#DBE8FF",
  },
  {
    icon: BookOpen,
    value: `${USER.totalLessons}レッスン`,
    sub:   "すばらしい！",
    color: "#1B3A6B",
    bg:    "#DBE8FF",
  },
];

// Mock: last check was 6 days ago → needs to be done this week
const LAST_CHECK_DAYS_AGO = 6;
const CHECK_DONE_THIS_WEEK = false; // flip to true to see "done" state

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const todaySkill = SKILLS[0];
  const progress = todaySkill.completedLessons / todaySkill.totalLessons;
  const latestScore = CHECK_HISTORY[CHECK_HISTORY.length - 1];

  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">

      {/* ── Top bar ── */}
      <AppHeader showBadge={!CHECK_DONE_THIS_WEEK} />

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 px-4 pt-2 pb-6">

          {/* ── Stats row ── */}
          <div className="flex gap-3">
            {STAT_ITEMS.map(({ icon: Icon, value, sub, color, bg }) => (
              <div
                key={value}
                className="flex-1 rounded-2xl px-3 py-3 flex flex-col gap-1"
                style={{ backgroundColor: bg }}
              >
                <div className="flex items-center gap-1">
                  <Icon size={14} color={color} strokeWidth={2.5} />
                  <span className="text-[13px] font-bold text-t1 truncate">{value}</span>
                </div>
                <span className="text-[10px] text-t3 truncate">{sub}</span>
              </div>
            ))}
          </div>

          {/* ── Mood check ── */}
          <div className="bg-card rounded-3xl px-4 py-4 flex flex-col gap-4 shadow-sm">
            <p className="text-[15px] font-bold text-t1">今の気分はどう？</p>
            <div className="flex justify-between">
              {MOOD_OPTIONS.map(({ icon: Icon, label, color, key }) => {
                const isSelected = selectedMood === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedMood(key)}
                    className="flex flex-col items-center gap-[7px] flex-1"
                  >
                    <div
                      className="w-[46px] h-[46px] rounded-full flex items-center justify-center transition-all border-2"
                      style={{
                        backgroundColor: isSelected ? `${color}20` : "transparent",
                        borderColor: isSelected ? color : "transparent",
                      }}
                    >
                      <Icon size={22} color={color} strokeWidth={isSelected ? 2.5 : 1.8} />
                    </div>
                    <span
                      className="text-[10px] leading-none"
                      style={{
                        color: isSelected ? "#1A1F2E" : "#94A3B8",
                        fontWeight: isSelected ? 700 : 400,
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Weekly self-check banner ── */}
          {!CHECK_DONE_THIS_WEEK ? (
            /* 未実施：アクションを促すバナー */
            <Link href="/check/question">
              <div className="rounded-3xl overflow-hidden shadow-md">
                {/* 上部：警告ストライプ */}
                <div className="bg-accent px-5 py-3 flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <AlertCircle size={22} color="white" />
                    {/* 点滅ドット */}
                    <span className="absolute -top-0.5 -right-0.5 w-[8px] h-[8px] rounded-full bg-yellow-400 animate-ping" />
                    <span className="absolute -top-0.5 -right-0.5 w-[8px] h-[8px] rounded-full bg-yellow-400" />
                  </div>
                  <p className="text-white font-bold text-[14px]">
                    今週のセルフチェックをしよう
                  </p>
                  <ChevronRight size={18} color="white" className="ml-auto flex-shrink-0" />
                </div>
                {/* 下部：詳細 */}
                <div className="bg-card px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                      <ClipboardCheck size={20} color="#D97706" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-bold text-t1">
                        前回から {LAST_CHECK_DAYS_AGO} 日経過
                      </span>
                      <span className="text-[11px] text-t3">
                        約3分 ・ PHQ-9 + GAD-7
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-white bg-accent px-3 py-1.5 rounded-full flex-shrink-0">
                    チェック →
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            /* 実施済み：スコアサマリー */
            <div className="bg-card rounded-3xl px-5 py-4 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#D1FAE5] flex items-center justify-center flex-shrink-0">
                <ClipboardCheck size={22} color="#10B981" />
              </div>
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-[13px] font-bold text-t1">今週のチェック完了 ✓</span>
                <span className="text-[11px] text-t3">
                  総合スコア {latestScore.total} / 100 点
                </span>
              </div>
              <Link href="/check" className="text-[11px] font-bold text-accent flex-shrink-0">
                詳細を見る
              </Link>
            </div>
          )}

          {/* ── Today's lesson card ── */}
          <div className="bg-card rounded-3xl p-5 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${todaySkill.color}20` }}
              >
                <span className="text-[22px]">🌱</span>
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-[16px] font-bold text-t1 leading-snug">
                  今日のレッスンをつづけよう
                </p>
                <p className="text-[12px] text-t3">習慣化が、こころを強くする。</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="h-[8px] rounded-full bg-[#DBE8FF] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all bg-accent"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="flex justify-end">
                <span className="text-[11px] font-semibold text-accent">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </div>

            <Link
              href="/training/sk1/sk1-l9"
              className="flex items-center justify-center gap-2 h-[54px] rounded-[27px] text-white font-bold text-[15px] shadow-md bg-accent"
            >
              <Sparkles size={16} color="white" />
              レッスンをはじめる
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </div>

      <TabBar />
    </div>
  );
}
