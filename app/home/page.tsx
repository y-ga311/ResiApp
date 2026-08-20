"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Sun,
  Smile,
  Meh,
  Frown,
  CloudRain,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import TabBar from "@/components/TabBar";
import AppHeader from "@/components/AppHeader";
import { SKILLS, CHECK_HISTORY } from "@/lib/mock-data";
import {
  getFuwariCharacter,
  getKokomoCharacter,
  getLunariCharacter,
  type HomeCharacter,
} from "@/lib/characters";
import { loadLatestCheckScores } from "@/lib/check-storage";

const MOOD_OPTIONS = [
  { icon: Sun, label: "最高", color: "#FBBF24", key: "great" },
  { icon: Smile, label: "良い", color: "#10B981", key: "good" },
  { icon: Meh, label: "普通", color: "#60A5FA", key: "okay" },
  { icon: Frown, label: "つらい", color: "#FB923C", key: "bad" },
  { icon: CloudRain, label: "最低", color: "#A78BFA", key: "rough" },
];

const LATEST = CHECK_HISTORY[CHECK_HISTORY.length - 1];
const FALLBACK_PHQ = LATEST?.phq ?? 3;
const FALLBACK_GAD = LATEST?.gad ?? 6;
const FALLBACK_PSQI = LATEST?.psqi ?? 7;

const CLEARED_LESSONS = SKILLS.reduce((sum, s) => sum + s.completedLessons, 0);
const TOTAL_LESSONS = SKILLS.reduce((sum, s) => sum + s.totalLessons, 0);
const REMAINING_LESSONS = Math.max(0, TOTAL_LESSONS - CLEARED_LESSONS);
const LESSON_PCT = TOTAL_LESSONS > 0 ? Math.round((CLEARED_LESSONS / TOTAL_LESSONS) * 100) : 0;

function CompanionCard({
  companion,
  score,
}: {
  companion: HomeCharacter;
  score: number;
}) {
  return (
    <div
      className="rounded-3xl overflow-hidden shadow-sm"
      style={{ backgroundColor: companion.bg }}
    >
      <div className="flex items-center gap-4 px-4 py-5">
        <div className="w-[148px] h-[148px] flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={companion.image}
            alt={companion.name}
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0 flex-1 py-0.5">
          <span className="text-[10px] font-semibold tracking-wide text-t3">
            {companion.lineLabel}
          </span>
          <h2 className="text-[20px] font-bold text-t1 leading-tight truncate">
            {companion.name}
          </h2>
          <span
            className="inline-flex w-fit px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
            style={{
              backgroundColor: `${companion.accent}22`,
              color: companion.accent,
            }}
          >
            {companion.stateLabel} {score} · {companion.levelLabel}
          </span>
          <p className="text-[13px] text-t2 leading-snug mt-0.5 line-clamp-3">
            {companion.message}
          </p>
        </div>
      </div>
    </div>
  );
}

function CompanionCarousel({
  items,
}: {
  items: { companion: HomeCharacter; score: number }[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(0);

  const getSlideWidth = (el: HTMLDivElement) => el.clientWidth * 0.86;

  const scrollTo = (index: number, behavior: ScrollBehavior = "smooth") => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = getSlideWidth(el);
    const next = ((index % items.length) + items.length) % items.length;
    el.scrollTo({ left: slide * next, behavior });
    activeRef.current = next;
    setActive(next);
  };

  const pauseAuto = () => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 5000);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const slide = getSlideWidth(el);
      const next = Math.round(el.scrollLeft / Math.max(slide, 1));
      const clamped = Math.min(items.length - 1, Math.max(0, next));
      activeRef.current = clamped;
      setActive(clamped);
    };

    const onPointerDown = () => pauseAuto();

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", onPointerDown);
    };
  }, [items.length]);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      const slide = getSlideWidth(el);
      const next = (activeRef.current + 1) % items.length;
      el.scrollTo({ left: slide * next, behavior: "smooth" });
      activeRef.current = next;
      setActive(next);
    }, 3500);
    return () => {
      clearInterval(id);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [items.length]);

  return (
    <div className="flex flex-col gap-2">
      <div className="px-1">
        <p className="text-[15px] font-bold text-t1">いまのあなたの状態</p>
        <p className="text-[12px] text-t3 mt-0.5 leading-snug">
          セルフチェックの結果に合わせて、相棒の姿が変わります
        </p>
      </div>

      <div className="flex flex-col gap-2 -mx-4">
        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto px-4 pb-0.5 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map(({ companion, score }) => (
            <div
              key={companion.lineId}
              className="w-[86%] flex-shrink-0 snap-center"
            >
              <CompanionCard companion={companion} score={score} />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 px-4">
          {items.map((item, i) => (
            <button
              key={item.companion.lineId}
              type="button"
              aria-label={`${item.companion.lineLabel}を表示`}
              onClick={() => {
                pauseAuto();
                scrollTo(i);
              }}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: active === i ? 16 : 6,
                backgroundColor:
                  active === i ? item.companion.accent : "#CBD5E1",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [phqScore, setPhqScore] = useState(FALLBACK_PHQ);
  const [gadScore, setGadScore] = useState(FALLBACK_GAD);
  const [psqiScore, setPsqiScore] = useState(FALLBACK_PSQI);

  const companions = [
    { companion: getKokomoCharacter(phqScore), score: phqScore },
    { companion: getFuwariCharacter(gadScore), score: gadScore },
    { companion: getLunariCharacter(psqiScore), score: psqiScore },
  ];

  useEffect(() => {
    const saved = loadLatestCheckScores();
    if (typeof saved.phq === "number") setPhqScore(saved.phq);
    if (typeof saved.gad === "number") setGadScore(saved.gad);
    if (typeof saved.psqi === "number") setPsqiScore(saved.psqi);
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      <AppHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 px-4 pt-2 pb-6">
          {/* 1. いまの気分 */}
          <div className="bg-card rounded-3xl px-4 py-4 flex flex-col gap-4 shadow-sm">
            <p className="text-[15px] font-bold text-t1">いまの気分はどう？</p>
            <div className="flex justify-between">
              {MOOD_OPTIONS.map(({ icon: Icon, label, color, key }) => {
                const isSelected = selectedMood === key;
                return (
                  <button
                    key={key}
                    type="button"
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

          {/* 2. 状態キャラ */}
          <CompanionCarousel items={companions} />

          {/* 3. クリアしたレッスン */}
          <Link href="/training" className="block">
            <div className="bg-card rounded-3xl px-5 py-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#DBE8FF] flex items-center justify-center">
                      <BookOpen size={16} color="#1B3A6B" strokeWidth={2.5} />
                    </div>
                    <span className="text-[15px] font-bold text-t1">
                      レッスンの進み具合
                    </span>
                  </div>
                  <p className="text-[12px] text-t3 pl-10">
                    クリアした数と、まだ残っている数
                  </p>
                </div>
                <span className="text-[12px] font-bold text-accent flex items-center gap-0.5 flex-shrink-0 pt-1">
                  一覧
                  <ArrowRight size={14} />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#DBE8FF] px-4 py-4 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-accent">
                    クリア済み
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[40px] font-bold text-accent leading-none">
                      {CLEARED_LESSONS}
                    </span>
                    <span className="text-[13px] font-semibold text-accent/70">
                      レッスン
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#F1F5F9] px-4 py-4 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-t3">あと</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[40px] font-bold text-t1 leading-none">
                      {REMAINING_LESSONS}
                    </span>
                    <span className="text-[13px] font-semibold text-t3">
                      レッスン
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-t3">全体 {TOTAL_LESSONS} レッスン中</span>
                  <span className="text-accent">{LESSON_PCT}% 完了</span>
                </div>
                <div className="h-3 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{ width: `${LESSON_PCT}%` }}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
