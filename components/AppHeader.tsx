"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";
import { USER } from "@/lib/mock-data";

interface AppHeaderProps {
  showBadge?: boolean;
}

function todayLabel() {
  const d = new Date();
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${d.getMonth() + 1}月${d.getDate()}日 ${days[d.getDay()]}曜日`;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return "おはよう";
  if (h < 18) return "こんにちは";
  return "お疲れさま";
}

export default function AppHeader({ showBadge = false }: AppHeaderProps) {
  return (
    <div className="flex-shrink-0 flex items-center justify-between px-5 pt-4 pb-2 bg-bg">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
          <Image src="/icon.png" alt="icon" width={44} height={44} className="object-cover" />
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-[12px] text-t3">{todayLabel()}</span>
          <span className="text-[19px] font-bold text-t1 leading-tight">
            {greeting()}、{USER.nickname}！
          </span>
        </div>
      </div>
      <Link href="/settings" className="relative">
        <div className="w-10 h-10 rounded-full bg-card shadow-sm flex items-center justify-center">
          <Bell size={20} className="text-t2" />
        </div>
        {showBadge && (
          <span className="absolute top-[2px] right-[2px] w-[10px] h-[10px] rounded-full bg-red-500 border-2 border-bg" />
        )}
      </Link>
    </div>
  );
}
