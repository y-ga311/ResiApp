"use client";

import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import TabBar from "@/components/TabBar";
import AppHeader from "@/components/AppHeader";
import { CHECK_HISTORY } from "@/lib/mock-data";
import { CHECK_TYPE_LIST } from "@/lib/check";

const LATEST = CHECK_HISTORY[CHECK_HISTORY.length - 1];
const PREV = CHECK_HISTORY[CHECK_HISTORY.length - 2];
const DELTA = LATEST.total - PREV.total;

const scoreLevel = (score: number) => {
  if (score >= 75) return { label: "良好", color: "#27AE76", bg: "#27AE7622" };
  if (score >= 50) return { label: "普通", color: "#FBBF24", bg: "#FBBF2422" };
  return { label: "注意", color: "#FB923C", bg: "#FB923C22" };
};

const level = scoreLevel(LATEST.total);
const maxBar = 100;

export default function CheckPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      <AppHeader showBadge />

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-5 pt-2 pb-6">
          <h1 className="text-2xl font-bold text-t1">セルフチェック ✓</h1>

          <div className="bg-card rounded-3xl p-5 flex flex-col items-center gap-[10px] shadow-sm">
            <span className="text-[12px] text-t3">今週の総合スコア</span>
            <span className="text-[52px] font-bold text-accent leading-none">{LATEST.total}</span>
            <div className="px-4 py-[5px] rounded-full" style={{ backgroundColor: level.bg }}>
              <span className="text-[12px] font-semibold" style={{ color: level.color }}>
                {level.label}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[12px] text-t2">
              <TrendingUp size={14} color="#27AE76" />
              先週より +{DELTA} ポイント上昇
            </div>
          </div>

          <div className="flex gap-[10px]">
            {CHECK_TYPE_LIST.map((check) => {
              const value =
                check.id === "phq"
                  ? LATEST.phq
                  : check.id === "gad"
                    ? LATEST.gad
                    : LATEST.psqi;
              const label =
                check.id === "phq"
                  ? "うつ症状"
                  : check.id === "gad"
                    ? "不安症状"
                    : "睡眠の質";
              return (
                <Link
                  key={check.id}
                  href={`/check/question?type=${check.id}`}
                  className="flex-1 flex flex-col items-center gap-[3px] py-4 rounded-[16px] transition-opacity active:opacity-80"
                  style={{ backgroundColor: check.bg }}
                >
                  <span
                    className="text-[22px] font-bold leading-none"
                    style={{ color: check.color }}
                  >
                    {value}点
                  </span>
                  <span
                    className="text-[11px] font-semibold mt-1"
                    style={{ color: check.color }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[10px] opacity-70"
                    style={{ color: check.color }}
                  >
                    {check.shortName.replace("簡易版", "")}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-[10px]">
            <h2 className="text-[14px] font-bold text-t2">受けたいチェックを選ぶ</h2>
            <p className="text-[12px] text-t3 -mt-1">
              3種類から自由に選べます。診断ではなく、今の状態を知るための参考です。
            </p>
            <div className="flex flex-col gap-3">
              {CHECK_TYPE_LIST.map((check) => (
                <Link
                  key={check.id}
                  href={`/check/question?type=${check.id}`}
                  className="bg-card rounded-2xl p-4 shadow-sm flex items-center gap-3 border border-stroke/60"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: check.bg }}
                  >
                    <span className="text-[11px] font-bold" style={{ color: check.color }}>
                      {check.shortName.split("簡易")[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-bold text-t1">{check.name}</p>
                    <p className="text-[12px] text-t3 mt-0.5 truncate">{check.description}</p>
                    <p className="text-[11px] font-semibold mt-1" style={{ color: check.color }}>
                      {check.duration}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-t3 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <h2 className="text-[14px] font-bold text-t2">4週間の推移</h2>
            <div className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-end justify-between gap-2 h-28">
                {CHECK_HISTORY.map((h, i) => {
                  const ratio = h.total / maxBar;
                  const isLatest = i === CHECK_HISTORY.length - 1;
                  return (
                    <div key={h.week} className="flex flex-col items-center gap-1 flex-1">
                      <span
                        className="text-[10px] font-semibold"
                        style={{ color: isLatest ? "#1B3A6B" : "#94A3B8" }}
                      >
                        {h.total}
                      </span>
                      <div
                        className="w-full rounded-t-lg"
                        style={{
                          height: `${ratio * 80}px`,
                          backgroundColor: isLatest ? "#1B3A6B" : "#E2E8F0",
                          minHeight: 4,
                        }}
                      />
                      <span className="text-[9px] text-t3 text-center leading-tight">
                        {h.week}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
