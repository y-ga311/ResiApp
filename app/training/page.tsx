"use client";

import Link from "next/link";
import { CircleCheck, Calendar, Zap, Brain, Target, MessageCircle, Moon } from "lucide-react";
import TabBar from "@/components/TabBar";
import AppHeader from "@/components/AppHeader";
import { SKILLS, USER } from "@/lib/mock-data";
import type { Skill } from "@/lib/types";

const SKILL_ICONS: Record<string, React.ElementType> = {
  Zap, Brain, Target, MessageCircle, Moon,
};

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = SKILL_ICONS[skill.icon] ?? Zap;
  const progressRatio = skill.totalLessons > 0 ? skill.completedLessons / skill.totalLessons : 0;

  return (
    <Link href={`/training/${skill.id}`} className="block">
      <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-[14px] px-4 py-4">
          <div
            className="w-[52px] h-[52px] rounded-[18px] flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${skill.color}22` }}
          >
            <Icon size={26} color={skill.color} />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <span className="text-[16px] font-bold text-t1">{skill.name}</span>
            <span className="text-[12px] text-t3 truncate">{skill.description}</span>
          </div>
        </div>

        <div className="flex items-center gap-[10px] px-4 pb-[14px]">
          <div
            className="flex-1 h-[7px] rounded-full overflow-hidden"
            style={{ backgroundColor: `${skill.color}22` }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressRatio * 100}%`,
                minWidth: skill.completedLessons > 0 ? 4 : 0,
                backgroundColor: skill.color,
              }}
            />
          </div>
          <span
            className="text-[11px] font-semibold flex-shrink-0"
            style={{ color: skill.color }}
          >
            {skill.completedLessons}/{skill.totalLessons}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function TrainingPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      <AppHeader showBadge />

      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-2 pb-4 flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-t1">トレーニング</h1>
        <div className="flex gap-[10px] flex-wrap">
          <div className="flex items-center gap-[6px] bg-accent-lt px-[14px] py-2 rounded-full">
            <CircleCheck size={14} className="text-accent" />
            <span className="text-[12px] font-semibold text-accent">{USER.totalLessons}レッスン完了</span>
          </div>
          <div className="flex items-center gap-[6px] bg-[#EEF2FF] px-[14px] py-2 rounded-full">
            <Calendar size={14} color="#818CF8" />
            <span className="text-[12px] font-semibold text-[#818CF8]">3週目継続中</span>
          </div>
        </div>
      </div>

      {/* Skill Cards — scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 px-4 py-4">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>

      <TabBar />
    </div>
  );
}
