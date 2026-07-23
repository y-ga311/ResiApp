"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, BookOpen, PenLine, RotateCcw, Lock } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { SKILLS, LESSONS_BY_SKILL } from "@/lib/mock-data";
import type { Lesson } from "@/lib/types";

const TYPE_CONFIG = {
  learn:  { icon: BookOpen,  label: "学習",     color: "#1B3A6B" },
  work:   { icon: PenLine,   label: "ワーク",   color: "#818CF8" },
  review: { icon: RotateCcw, label: "振り返り", color: "#FB923C" },
};

function LessonRow({
  lesson,
  index,
  isUnlocked,
}: {
  lesson: Lesson;
  index: number;
  isUnlocked: boolean;
}) {
  const config = TYPE_CONFIG[lesson.type];
  const TypeIcon = config.icon;

  const inner = (
    <div
      className={`flex items-center gap-3 px-4 py-4 bg-card rounded-2xl transition-opacity ${
        isUnlocked ? "opacity-100" : "opacity-40"
      }`}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[13px]"
        style={{
          backgroundColor: lesson.completed
            ? "#1B3A6B"
            : isUnlocked
            ? "#DBE8FF"
            : "#F1F5F9",
          color: lesson.completed ? "#FFF" : isUnlocked ? "#1B3A6B" : "#94A3B8",
        }}
      >
        {lesson.completed ? <CheckCircle size={16} color="#FFF" /> : index + 1}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-[14px] font-semibold leading-snug ${
            isUnlocked ? "text-t1" : "text-t3"
          }`}
        >
          {lesson.title}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <TypeIcon size={11} color={config.color} />
          <span className="text-[11px]" style={{ color: config.color }}>
            {config.label}
          </span>
          <span className="text-[11px] text-t3 ml-1">{lesson.duration}分</span>
        </div>
      </div>

      {!isUnlocked && <Lock size={16} className="text-t3 flex-shrink-0" />}
    </div>
  );

  return isUnlocked ? (
    <Link href={`/training/${lesson.skillId}/${lesson.id}`}>{inner}</Link>
  ) : (
    <div>{inner}</div>
  );
}

export default function SkillPage({
  params,
}: {
  params: Promise<{ skillId: string }>;
}) {
  const { skillId } = use(params);
  const skill = SKILLS.find((s) => s.id === skillId);
  const lessons = LESSONS_BY_SKILL[skillId] ?? [];

  if (!skill)
    return (
      <div className="h-full flex items-center justify-center text-t2">
        スキルが見つかりません
      </div>
    );

  const progressRatio = skill.completedLessons / skill.totalLessons;

  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center gap-3 px-4 py-4"
        style={{ backgroundColor: skill.color }}
      >
        <Link href="/training">
          <ChevronLeft size={24} color="#FFF" />
        </Link>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[11px] text-white/70">{skill.shortName}</span>
          <span className="text-[20px] font-bold text-white truncate">{skill.name}</span>
        </div>
        <span className="text-[12px] text-white/80 flex-shrink-0">
          {skill.completedLessons}/{skill.totalLessons}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="flex-shrink-0 h-1.5 bg-stroke">
        <div
          className="h-full"
          style={{ width: `${progressRatio * 100}%`, backgroundColor: skill.color }}
        />
      </div>

      {/* Lesson List — scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 px-4 py-4">
          {lessons.length > 0 ? (
            lessons.map((lesson, i) => {
              const isUnlocked = lesson.completed || i === skill.completedLessons;
              return (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  index={i}
                  isUnlocked={isUnlocked}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: skill.bgColor }}
              >
                <BookOpen size={32} color={skill.color} />
              </div>
              <p className="text-[16px] font-bold text-t1">コンテンツ準備中</p>
              <p className="text-[13px] text-t2">このスキルのレッスンは近日公開予定です。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
