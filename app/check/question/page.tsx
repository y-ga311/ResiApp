"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { PHQ9_QUESTIONS, ANSWER_OPTIONS } from "@/lib/mock-data";

export default function CheckQuestionPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const total = PHQ9_QUESTIONS.length;
  const progress = (current / total) * 100;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 >= total) {
      setDone(true);
    } else {
      setCurrent(current + 1);
    }
  };

  if (done) {
    const score = answers.reduce((a, b) => a + b, 0);
    const levelLabel = score <= 4 ? "良好" : score <= 9 ? "軽度" : "注意";
    const levelColor = score <= 4 ? "#27AE76" : score <= 9 ? "#FBBF24" : "#FB923C";

    return (
      <div className="h-full flex flex-col items-center justify-center px-8 gap-6 bg-bg">
        <div className="w-24 h-24 rounded-full bg-accent-lt flex items-center justify-center">
          <CheckCircle size={48} color="#1B3A6B" />
        </div>
        <h2 className="text-[24px] font-bold text-t1">チェック完了！</h2>
        <div className="bg-card rounded-3xl p-6 w-full flex flex-col items-center gap-3 shadow-sm">
          <span className="text-[13px] text-t3">PHQ-9 スコア</span>
          <span className="text-[48px] font-bold leading-none" style={{ color: levelColor }}>
            {score}
          </span>
          <div
            className="px-4 py-1 rounded-full text-[13px] font-semibold"
            style={{ backgroundColor: `${levelColor}22`, color: levelColor }}
          >
            {levelLabel}
          </div>
          <p className="text-[13px] text-t2 text-center leading-relaxed mt-1">
            {score <= 4
              ? "現在の状態は良好です。この調子でトレーニングを続けましょう！"
              : score <= 9
              ? "少し心に負担がかかっているかもしれません。無理せず過ごしてください。"
              : "心が疲れているサインかもしれません。学生相談室への相談も考えてみてください。"}
          </p>
        </div>
        <Link
          href="/check"
          className="w-full flex items-center justify-center h-[54px] rounded-[27px] bg-accent text-white font-bold text-[15px]"
        >
          結果を確認する
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-4 bg-card">
        <Link href="/check">
          <ChevronLeft size={24} className="text-t1" />
        </Link>
        <span className="text-[14px] font-semibold text-t1">
          PHQ-9 うつ症状チェック
        </span>
        <span className="ml-auto text-[12px] text-t3">{current + 1} / {total}</span>
      </div>

      {/* Progress Bar */}
      <div className="flex-shrink-0 h-1.5 bg-stroke">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto flex flex-col px-5 py-8 gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-[12px] text-t3 font-semibold">
            過去2週間のあいだ、どのくらいの頻度でありましたか？
          </p>
          <p className="text-[18px] font-bold text-t1 leading-snug">
            {PHQ9_QUESTIONS[current]}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {ANSWER_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSelected(value)}
              className={`w-full py-4 px-5 rounded-2xl text-left text-[15px] font-semibold transition-all border-2 ${
                selected === value
                  ? "bg-accent-lt border-accent text-accent"
                  : "bg-card border-stroke text-t1"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex-shrink-0 px-5 pb-8 pt-3 bg-bg border-t border-stroke">
        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`w-full h-[54px] rounded-[27px] text-[15px] font-bold transition-all ${
            selected !== null
              ? "bg-accent text-white"
              : "bg-stroke text-t3 cursor-not-allowed"
          }`}
        >
          {current + 1 === total ? "完了する" : "次へ"}
        </button>
      </div>
    </div>
  );
}
