"use client";

import { useState } from "react";
import { Heart, Music2 } from "lucide-react";
import TabBar from "@/components/TabBar";
import AppHeader from "@/components/AppHeader";
import { SKILLS, CHECK_HISTORY } from "@/lib/mock-data";

type MetricKey = "phq" | "gad" | "psqi";

const METRICS: {
  key: MetricKey;
  short: string;
  label: string;
  color: string;
  bg: string;
  max: number;
  icon: "heart" | "music" | "sleep";
}[] = [
  {
    key: "phq",
    short: "こころ",
    label: "こころの状態",
    color: "#818CF8",
    bg: "#EEF2FF",
    max: 27,
    icon: "heart",
  },
  {
    key: "gad",
    short: "やすらぎ",
    label: "やすらぎの状態",
    color: "#38BDF8",
    bg: "#E0F2FE",
    max: 21,
    icon: "music",
  },
  {
    key: "psqi",
    short: "ねむり",
    label: "ねむりの状態",
    color: "#FB923C",
    bg: "#FFF7ED",
    max: 21,
    icon: "sleep",
  },
];

const WEEK_TITLES = ["3週前", "2週前", "1週前", "今週"];

function MetricIcon({
  kind,
  color,
  size = 18,
}: {
  kind: "heart" | "music" | "sleep";
  color: string;
  size?: number;
}) {
  if (kind === "sleep") {
    return (
      <span
        className="font-black leading-none tracking-tighter"
        style={{ color, fontSize: size * 0.72 }}
        aria-hidden
      >
        zzz
      </span>
    );
  }
  if (kind === "music") {
    return <Music2 size={size} color={color} strokeWidth={2.4} />;
  }
  return (
    <Heart size={size} color={color} strokeWidth={2.4} fill={color} fillOpacity={0.15} />
  );
}

export default function GrowthPage() {
  const [activeKey, setActiveKey] = useState<MetricKey>("phq");
  const active = METRICS.find((m) => m.key === activeKey) ?? METRICS[0];
  const values = CHECK_HISTORY.map((h) => h[active.key]);
  const first = values[0] ?? 0;
  const latest = values[values.length - 1] ?? 0;
  const improvedBy = first - latest; // 低いほど良い

  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      <AppHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-5 px-5 pt-2 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-t1">成長記録</h1>
            <p className="text-[13px] text-t3 mt-1 leading-snug">
              点数が下がると、調子がよくなっているサインです
            </p>
          </div>

          {/* 3項目の切り替え */}
          <div className="grid grid-cols-3 gap-2">
            {METRICS.map((metric) => {
              const latestVal = CHECK_HISTORY[CHECK_HISTORY.length - 1][metric.key];
              const startVal = CHECK_HISTORY[0][metric.key];
              const better = startVal - latestVal;
              const selected = metric.key === activeKey;
              return (
                <button
                  key={metric.key}
                  type="button"
                  onClick={() => setActiveKey(metric.key)}
                  className="rounded-2xl px-2 py-3 flex flex-col items-center gap-1.5 transition-all border-2"
                  style={{
                    backgroundColor: selected ? metric.bg : "#FFFFFF",
                    borderColor: selected ? metric.color : "transparent",
                    boxShadow: selected ? "none" : "0 1px 2px rgba(15,23,42,0.06)",
                  }}
                >
                  <MetricIcon kind={metric.icon} color={metric.color} />
                  <span
                    className="text-[11px] font-bold"
                    style={{ color: metric.color }}
                  >
                    {metric.short}
                  </span>
                  <span
                    className="text-[22px] font-bold leading-none"
                    style={{ color: metric.color }}
                  >
                    {latestVal}
                  </span>
                  <span
                    className="text-[10px] font-semibold"
                    style={{
                      color: better > 0 ? "#27AE76" : better < 0 ? "#EF4444" : "#94A3B8",
                    }}
                  >
                    {better > 0 ? `↓${better}` : better < 0 ? `↑${Math.abs(better)}` : "→0"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 選択中の詳細グラフ（1つだけ大きく） */}
          <div
            className="rounded-3xl p-5 flex flex-col gap-5 shadow-sm"
            style={{ backgroundColor: active.bg }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl bg-white/80 flex items-center justify-center flex-shrink-0"
              >
                <MetricIcon kind={active.icon} color={active.color} size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[16px] font-bold text-t1">{active.label}</p>
                <p className="text-[12px] text-t2 mt-0.5">
                  {improvedBy > 0
                    ? `4週間で ${improvedBy} 点よくなりました`
                    : improvedBy < 0
                      ? `4週間で ${Math.abs(improvedBy)} 点増えました`
                      : "4週間で変化はありません"}
                </p>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl px-4 py-5">
              <div className="flex items-end justify-between gap-2 h-44">
                {values.map((value, i) => {
                  const isLatest = i === values.length - 1;
                  const barH = Math.max(16, (value / active.max) * 132);
                  return (
                    <div
                      key={`${active.key}-${i}`}
                      className="flex flex-col items-center gap-2 flex-1 min-w-0"
                    >
                      <span
                        className="text-[16px] font-bold leading-none"
                        style={{ color: isLatest ? active.color : "#64748B" }}
                      >
                        {value}
                      </span>
                      <div className="w-full flex items-end justify-center h-[132px]">
                        <div
                          className="w-[78%] max-w-[52px] rounded-t-2xl transition-all"
                          style={{
                            height: barH,
                            backgroundColor: active.color,
                            opacity: isLatest ? 1 : 0.28,
                          }}
                        />
                      </div>
                      <span
                        className="text-[12px] font-semibold"
                        style={{ color: isLatest ? active.color : "#94A3B8" }}
                      >
                        {WEEK_TITLES[i] ?? `W${i + 1}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-[12px] font-semibold px-1">
              <span className="text-t2">
                はじめ <span style={{ color: active.color }}>{first}点</span>
              </span>
              <span className="text-t3">→</span>
              <span className="text-t2">
                いま <span style={{ color: active.color }}>{latest}点</span>
              </span>
            </div>
          </div>

          {/* スキル */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[15px] font-bold text-t1">スキルの進み具合</h2>
            <div className="bg-card rounded-3xl p-4 shadow-sm flex flex-col gap-4">
              {SKILLS.map((skill) => {
                const ratio = skill.completedLessons / skill.totalLessons;
                const pct = Math.round(ratio * 100);
                return (
                  <div key={skill.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-semibold text-t1 truncate">
                        {skill.name}
                      </span>
                      <span
                        className="text-[12px] font-bold flex-shrink-0"
                        style={{ color: skill.color }}
                      >
                        {skill.completedLessons}/{skill.totalLessons}
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden bg-stroke">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          minWidth: pct > 0 ? 6 : 0,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
