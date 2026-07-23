"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";
import TabBar from "@/components/TabBar";
import AppHeader from "@/components/AppHeader";
import { CHECK_HISTORY } from "@/lib/mock-data";

const LATEST = CHECK_HISTORY[CHECK_HISTORY.length - 1];
const PREV    = CHECK_HISTORY[CHECK_HISTORY.length - 2];
const DELTA   = LATEST.total - PREV.total;

const scoreLevel = (score: number) => {
  if (score >= 75) return { label: "良好", color: "#27AE76", bg: "#27AE7622" };
  if (score >= 50) return { label: "普通", color: "#FBBF24", bg: "#FBBF2422" };
  return { label: "注意", color: "#FB923C", bg: "#FB923C22" };
};

const METRICS = [
  { label: "うつ症状", sub: "PHQ-9", value: LATEST.phq, color: "#818CF8", bg: "#EEF2FF" },
  { label: "不安症状", sub: "GAD-7", value: LATEST.gad, color: "#38BDF8", bg: "#E0F2FE" },
  { label: "睡眠の質", sub: "PSQI",  value: LATEST.psqi,color: "#FB923C", bg: "#FFF7ED" },
];

const level = scoreLevel(LATEST.total);
const maxBar = 100;

export default function CheckPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      <AppHeader showBadge />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-5 pt-2 pb-6">
          <h1 className="text-2xl font-bold text-t1">セルフチェック ✓</h1>

          {/* Score Hero */}
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

          {/* Metrics */}
          <div className="flex gap-[10px]">
            {METRICS.map(({ label, sub, value, color, bg }) => (
              <div
                key={label}
                className="flex-1 flex flex-col items-center gap-[3px] py-4 rounded-[16px]"
                style={{ backgroundColor: bg }}
              >
                <span className="text-[22px] font-bold leading-none" style={{ color }}>{value}点</span>
                <span className="text-[11px] font-semibold mt-1" style={{ color }}>{label}</span>
                <span className="text-[10px] opacity-70" style={{ color }}>{sub}</span>
              </div>
            ))}
          </div>

          {/* 4-Week History */}
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
                      <span className="text-[9px] text-t3 text-center leading-tight">{h.week}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/check/question"
            className="flex items-center justify-center h-[54px] rounded-[27px] bg-accent text-white font-bold text-[15px] shadow-sm"
          >
            今週のチェックをする
          </Link>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
