import Link from "next/link";
import Image from "next/image";

const FEATURES = [
  "セルフチェックで心の健康状態がわかる",
  "1日5分からトレーニングができる",
  "レジリエンスの成長度を確認できる",
];

export default function WelcomePage() {
  return (
    <div className="h-full flex flex-col bg-accent overflow-hidden">
      {/* Status Bar */}
      <div className="flex-shrink-0 h-[52px]" />

      {/* Main Content — scrolls if needed */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-8 gap-7 py-8">
        {/* Illustration */}
        <div className="w-48 h-48 flex-shrink-0">
          <Image
            src="/pict.png"
            alt="ResiApp イラスト"
            width={192}
            height={192}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* App Name & Tagline */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[32px] font-bold text-white">ResiApp</h1>
          <p className="text-[16px] text-white/80">
            こころのしなやかさを、毎日少しずつ。
          </p>
        </div>

        {/* Feature List */}
        <div className="flex flex-col gap-3 w-full">
          {FEATURES.map((f) => (
            <div key={f} className="flex items-center gap-[10px]">
              <div className="w-[6px] h-[6px] rounded-full bg-white flex-shrink-0" />
              <span className="text-[14px] text-white/85">{f}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/home"
          className="w-full h-[52px] rounded-[26px] bg-white flex items-center justify-center"
        >
          <span className="text-[16px] font-bold text-accent">はじめる</span>
        </Link>
      </div>
    </div>
  );
}
