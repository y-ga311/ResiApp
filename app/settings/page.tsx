"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, User, Bell, Phone, LogOut } from "lucide-react";

const MENU_ITEMS = [
  { icon: User,  label: "プロフィール", sub: "田中さん · 高校2年生" },
  { icon: Bell,  label: "通知設定",     sub: "毎日 20:00" },
  { icon: Phone, label: "相談窓口",     sub: "学生相談室・外部窓口" },
];

export default function SettingsPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-4 bg-card shadow-sm">
        <Link href="/home">
          <ChevronLeft size={24} className="text-t1" />
        </Link>
        <h1 className="text-[18px] font-bold text-t1">設定</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 px-4 py-4">
          {/* Profile Card */}
          <div className="bg-card rounded-3xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-accent-lt flex items-center justify-center flex-shrink-0">
              <span className="text-[22px] font-bold text-accent">山</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[16px] font-bold text-t1">田中さん</p>
              <p className="text-[13px] text-t2">Lv. 4 · 7日連続達成中 🔥</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-3">
            {MENU_ITEMS.map(({ icon: Icon, label, sub }) => (
              <button
                key={label}
                className="w-full flex items-center gap-4 bg-card rounded-2xl px-4 py-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-lt flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-accent" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[14px] font-semibold text-t1">{label}</p>
                  <p className="text-[12px] text-t3 truncate">{sub}</p>
                </div>
                <ChevronRight size={18} className="text-t3 flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* Logout */}
          <button className="w-full flex items-center justify-center gap-2 bg-card rounded-2xl px-4 py-4 shadow-sm">
            <LogOut size={18} color="#FB923C" />
            <span className="text-[14px] font-semibold text-[#FB923C]">ログアウト</span>
          </button>

          {/* Version */}
          <p className="text-center text-[11px] text-t3 py-4">
            ResiliApp v0.1.0 — Demo
          </p>
        </div>
      </div>
    </div>
  );
}
