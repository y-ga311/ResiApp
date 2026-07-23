"use client";

import { CircleCheck, Flame, BookOpen, Trophy } from "lucide-react";
import TabBar from "@/components/TabBar";
import AppHeader from "@/components/AppHeader";
import { SKILLS, BADGES, USER, CHECK_HISTORY } from "@/lib/mock-data";

const BADGE_ICONS: Record<string, React.ElementType> = {
  CircleCheck, Flame, BookOpen, Trophy,
};

const CURRENT_LEVEL = USER.level;
const NEXT_LEVEL = CURRENT_LEVEL + 1;
const LEVEL_PROGRESS = 0.68;

const GRAPH_DATA = CHECK_HISTORY.map((h, i) => ({
  label: `W${i + 1}`,
  value: Math.round(h.total * (0.6 + i * 0.1)),
}));

export default function GrowthPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      <AppHeader showBadge />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-5 pt-2 pb-6">
          <h1 className="text-2xl font-bold text-t1">成長記録</h1>

          {/* Level Hero */}
          <div className="bg-accent-lt rounded-3xl p-5 flex flex-col items-center gap-2 shadow-sm">
            <span className="text-[12px] text-t2">あなたのレジリエンスレベル</span>
            <span className="text-[48px] font-bold text-accent leading-none">Lv. {CURRENT_LEVEL}</span>
            <span className="text-[13px] font-semibold text-accent">
              スタート時から +{USER.growthPoints}ポイント成長！
            </span>
            <div className="w-full flex flex-col gap-1 mt-2">
              <div className="flex justify-between text-[10px]">
                <span className="font-semibold text-accent">Lv.{CURRENT_LEVEL}</span>
                <span className="text-t3">Lv.{NEXT_LEVEL}</span>
              </div>
              <div className="h-2 rounded-full bg-white/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${LEVEL_PROGRESS * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Weekly Graph */}
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-[14px] font-bold text-t2">週次の成長推移</h2>
            <div className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-end justify-between gap-1 h-28">
                {GRAPH_DATA.map(({ label, value }, i) => {
                  const isLatest = i === GRAPH_DATA.length - 1;
                  return (
                    <div key={label} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className="w-full rounded-t-lg"
                        style={{
                          height: `${(value / 100) * 80}px`,
                          backgroundColor: isLatest ? "#1B3A6B" : "#E2E8F0",
                          minHeight: 4,
                        }}
                      />
                      <span className="text-[9px] text-t3">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Skill Progress */}
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-[14px] font-bold text-t2">スキル習熟度</h2>
            <div className="bg-card rounded-2xl p-4 shadow-sm flex flex-col gap-[14px]">
              {SKILLS.map((skill) => {
                const ratio = skill.completedLessons / skill.totalLessons;
                return (
                  <div key={skill.id} className="flex items-center gap-3">
                    <span className="text-[12px] text-t2 w-24 flex-shrink-0 truncate">{skill.name}</span>
                    <div className="flex-1 h-[7px] rounded-full overflow-hidden bg-stroke">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${ratio * 100}%`,
                          minWidth: ratio > 0 ? 4 : 0,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                    <span
                      className="text-[11px] font-semibold flex-shrink-0 w-8 text-right"
                      style={{ color: skill.color }}
                    >
                      {Math.round(ratio * 100)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col gap-[10px] pb-4">
            <h2 className="text-[14px] font-bold text-t2">獲得バッジ</h2>
            <div className="flex flex-wrap gap-2">
              {BADGES.map((badge) => {
                const Icon = BADGE_ICONS[badge.icon] ?? CircleCheck;
                return (
                  <div
                    key={badge.id}
                    className="flex items-center gap-[6px] px-[14px] py-2 rounded-full"
                    style={{
                      backgroundColor: badge.earned ? `${badge.color}22` : "#F1F5F9",
                      border: `1px solid ${badge.earned ? `${badge.color}44` : "#E2E8F0"}`,
                    }}
                  >
                    {badge.earned && <Icon size={13} color={badge.color} />}
                    <span
                      className="text-[11px] font-semibold"
                      style={{ color: badge.earned ? badge.color : "#94A3B8" }}
                    >
                      {badge.name}
                    </span>
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
