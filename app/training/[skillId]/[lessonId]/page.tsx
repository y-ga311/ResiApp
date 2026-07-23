"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { SKILLS, LESSONS_BY_SKILL, TODAY_LESSON } from "@/lib/mock-data";
import { SK1_SLIDES } from "@/lib/slides-sk1";
import LessonSlidePlayer from "@/components/LessonSlidePlayer";

const SLIDES_MAP: Record<string, Record<string, import("@/lib/types").Slide[]>> = {
  sk1: SK1_SLIDES,
};

export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ skillId: string; lessonId: string }>;
}) {
  const { skillId, lessonId } = use(params);
  const router = useRouter();
  const [completed, setCompleted] = useState(false);

  const skill = SKILLS.find((s) => s.id === skillId);
  const lessons = LESSONS_BY_SKILL[skillId] ?? [];
  const lesson = lessons.find((l) => l.id === lessonId) ?? TODAY_LESSON;

  // Check if slide data exists for this lesson
  const slides = SLIDES_MAP[skillId]?.[lessonId];

  if (!skill)
    return (
      <div className="h-full flex items-center justify-center text-t2">
        スキルが見つかりません
      </div>
    );

  // ── Completion screen ─────────────────────────────────────
  if (completed) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-8 gap-6 bg-bg">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${skill.color}20` }}
        >
          <CheckCircle size={48} color={skill.color} />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-[24px] font-bold text-t1">よく頑張ったね！</h2>
          <p className="text-[14px] text-t2 leading-relaxed">
            今日もレッスンを完了しました。
            <br />
            この調子で続けていこう！
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/home"
            className="flex items-center justify-center h-[54px] rounded-[27px] text-white font-bold text-[15px]"
            style={{ backgroundColor: skill.color }}
          >
            ホームに戻る
          </Link>
          <Link
            href={`/training/${skillId}`}
            className="flex items-center justify-center h-[54px] rounded-[27px] border-2 font-bold text-[15px]"
            style={{ borderColor: skill.color, color: skill.color }}
          >
            次のレッスンを見る
          </Link>
        </div>
      </div>
    );
  }

  // ── Slide player (SK01 and others with slide data) ────────
  if (slides && slides.length > 0) {
    return (
      <LessonSlidePlayer
        slides={slides}
        skill={skill}
        lessonTitle={lesson.title}
        onComplete={() => setCompleted(true)}
        onBack={() => router.push(`/training/${skillId}`)}
      />
    );
  }

  // ── Legacy text viewer (SK02–05 until slides are added) ──
  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-4 bg-card shadow-sm">
        <Link href={`/training/${skillId}`}>
          <ChevronLeft size={24} className="text-t1" />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-t3">{skill.name}</p>
          <p className="text-[15px] font-bold text-t1 truncate">{lesson.title}</p>
        </div>
        <span className="text-[12px] text-t3 flex-shrink-0">{lesson.duration}分</span>
      </div>

      {/* Skill color accent bar */}
      <div className="flex-shrink-0 h-1" style={{ backgroundColor: skill.color }} />

      {/* Content — scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {lesson.content.trim() ? (
          <div className="text-[14px] text-t1 leading-relaxed whitespace-pre-wrap">
            {lesson.content.trim()}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div
              className="rounded-2xl p-4"
              style={{ backgroundColor: `${skill.color}18` }}
            >
              <p className="text-[13px] font-semibold" style={{ color: skill.color }}>
                📖 このレッスンについて
              </p>
              <p className="text-[13px] text-t2 mt-2">
                「{lesson.title}」について学びます。
              </p>
            </div>
            <p className="text-[14px] text-t1 leading-relaxed">
              レジリエンスを高めるためのスキルを、日常生活の中で少しずつ実践していきましょう。1日5分からはじめられる具体的なワークが用意されています。
            </p>
            <div className="bg-card rounded-2xl p-4 shadow-sm">
              <p className="text-[13px] font-bold text-t1 mb-2">今日のワーク</p>
              <p className="text-[13px] text-t2 leading-relaxed">
                今日感じたことや気づいたことを、簡単にメモしてみましょう。どんな小さなことでも大丈夫です。
              </p>
            </div>
            <div
              className="rounded-2xl p-4 text-center"
              style={{ backgroundColor: `${skill.color}10` }}
            >
              <p className="text-[13px]" style={{ color: skill.color }}>
                🚧 このレッスンのコンテンツは近日公開予定です
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Complete Button */}
      <div className="flex-shrink-0 px-4 py-4 bg-bg border-t border-stroke">
        <button
          onClick={() => setCompleted(true)}
          className="w-full flex items-center justify-center h-[54px] rounded-[27px] text-white font-bold text-[15px]"
          style={{ backgroundColor: skill.color }}
        >
          レッスン完了！
        </button>
      </div>
    </div>
  );
}
