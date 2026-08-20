"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  LogOut,
  Info,
  School,
  BookOpen,
} from "lucide-react";
import { USER } from "@/lib/mock-data";

const PROFILE_KEY = "resiapp.settings.profile";

type ProfileDraft = {
  school: string;
  department: string;
};

const DEFAULT_PROFILE: ProfileDraft = {
  school: "",
  department: "",
};

const CONSULTATION = [
  {
    name: "スチューデントサービスセンター",
    items: [
      {
        label: "スマホで予約",
        value: "www.jtsc-ssc.com/yoyaku/so.php",
        href: "https://www.jtsc-ssc.com/yoyaku/so.php",
        note: "24時間受付（受信後返信）",
      },
      {
        label: "電話で予約",
        value: "06-6152-5638",
        href: "tel:0661525638",
        note: "受付時間：月〜金 10:00〜17:00",
      },
      {
        label: "HPで予約",
        value: "www.jtsc-ssc.com",
        href: "https://www.jtsc-ssc.com",
        note: "24時間受付（受信後返信）",
      },
    ],
  },
  {
    name: "慶生会クリニック",
    items: [
      {
        label: "電話",
        value: "06-6533-8118",
        href: "tel:0665338118",
        note: "健康や病気に関すること",
      },
    ],
  },
  {
    name: "寮生活に関すること",
    items: [
      {
        label: "電話",
        value: "06-6245-6781",
        href: "tel:0662456781",
      },
    ],
  },
  {
    name: "教務部 / 事務局",
    items: [
      {
        label: "電話",
        value: "06-6398-2255",
        href: "tel:0663982255",
      },
    ],
  },
];

function loadProfile(): ProfileDraft {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw) as ProfileDraft;
    return {
      school: typeof parsed.school === "string" ? parsed.school : "",
      department: typeof parsed.department === "string" ? parsed.department : "",
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export default function SettingsPage() {
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [saved, setSaved] = useState(false);
  const initial = USER.nickname.replace(/さん$/, "").slice(0, 1) || "？";

  useEffect(() => {
    const profile = loadProfile();
    setSchool(profile.school);
    setDepartment(profile.department);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#support") return;
    const el = document.getElementById("support");
    if (!el) return;
    window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const handleSaveProfile = () => {
    const next: ProfileDraft = {
      school: school.trim(),
      department: department.trim(),
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-4 bg-card shadow-sm">
        <Link href="/home" aria-label="戻る" className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-t1" />
        </Link>
        <h1 className="text-[18px] font-bold text-t1">設定</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 px-4 py-5 pb-8">
          {/* アカウント */}
          <section className="flex flex-col gap-2">
            <h2 className="text-[12px] font-bold text-t3 px-1">アカウント</h2>
            <div className="bg-card rounded-3xl p-5 flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-accent-lt flex items-center justify-center flex-shrink-0">
                <span className="text-[22px] font-bold text-accent">{initial}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[16px] font-bold text-t1 truncate">
                  {USER.nickname}
                </p>
                <p className="text-[12px] text-t3 mt-0.5">
                  {[school, department].filter(Boolean).join(" · ") ||
                    "所属未登録"}
                </p>
              </div>
              <User size={18} className="text-t3 flex-shrink-0" />
            </div>
          </section>

          {/* 所属登録 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-[12px] font-bold text-t3 px-1">所属の登録</h2>
            <div className="bg-card rounded-3xl p-4 shadow-sm flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-semibold text-t2 flex items-center gap-1.5">
                  <School size={14} className="text-accent" />
                  所属学校
                </span>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="例：○○専門学校"
                  className="h-12 rounded-2xl border-2 border-stroke bg-bg px-4 text-[15px] font-medium text-t1 placeholder:text-t3 focus:outline-none focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-semibold text-t2 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-accent" />
                  学科
                </span>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="例：看護学科"
                  className="h-12 rounded-2xl border-2 border-stroke bg-bg px-4 text-[15px] font-medium text-t1 placeholder:text-t3 focus:outline-none focus:border-accent"
                />
              </label>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="h-12 rounded-[24px] bg-accent text-white text-[15px] font-bold"
              >
                {saved ? "保存しました" : "所属を保存"}
              </button>
            </div>
          </section>

          {/* 相談窓口 */}
          <section id="support" className="flex flex-col gap-2 scroll-mt-4">
            <h2 className="text-[12px] font-bold text-t3 px-1">サポート</h2>
            <div className="bg-card rounded-3xl overflow-hidden shadow-sm">
              <div className="px-4 py-3.5 flex items-center gap-3 border-b border-stroke">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                  <Phone size={20} color="#D97706" />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-t1">相談窓口</p>
                  <p className="text-[12px] text-t3">
                    つらいときはひとりで抱えなくて大丈夫です
                  </p>
                </div>
              </div>

              <div className="divide-y divide-stroke">
                {CONSULTATION.map((group) => (
                  <div key={group.name} className="px-4 py-4 flex flex-col gap-3">
                    <p className="text-[14px] font-bold text-t1">{group.name}</p>
                    <div className="flex flex-col gap-2.5">
                      {group.items.map((item) => {
                        const content = (
                          <>
                            <div className="min-w-0">
                              <p className="text-[11px] font-semibold text-t3">
                                {item.label}
                              </p>
                              <p className="text-[14px] font-bold text-accent break-all mt-0.5">
                                {item.value}
                              </p>
                              {"note" in item && item.note ? (
                                <p className="text-[11px] text-t3 mt-0.5">
                                  {item.note}
                                </p>
                              ) : null}
                            </div>
                            {"href" in item && item.href ? (
                              <ChevronRight
                                size={16}
                                className="text-t3 flex-shrink-0 mt-1"
                              />
                            ) : null}
                          </>
                        );

                        if ("href" in item && item.href) {
                          const external = item.href.startsWith("http");
                          return (
                            <a
                              key={`${group.name}-${item.label}`}
                              href={item.href}
                              {...(external
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                              className="rounded-2xl bg-bg px-3 py-2.5 flex items-start justify-between gap-2"
                            >
                              {content}
                            </a>
                          );
                        }

                        return (
                          <div
                            key={`${group.name}-${item.label}`}
                            className="rounded-2xl bg-bg px-3 py-2.5"
                          >
                            {content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* その他 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-[12px] font-bold text-t3 px-1">その他</h2>
            <div className="bg-card rounded-3xl overflow-hidden shadow-sm">
              <Link
                href="/settings/about"
                className="w-full flex items-center gap-3 px-4 py-4 active:bg-bg/60"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-lt flex items-center justify-center flex-shrink-0">
                  <Info size={20} className="text-accent" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[14px] font-semibold text-t1">アプリについて</p>
                  <p className="text-[12px] text-t3 mt-0.5">
                    セルフチェックは医療診断ではありません
                  </p>
                </div>
                <ChevronRight size={18} className="text-t3 flex-shrink-0" />
              </Link>
            </div>
          </section>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-card rounded-2xl px-4 py-4 shadow-sm"
          >
            <LogOut size={18} color="#FB923C" />
            <span className="text-[14px] font-semibold text-[#FB923C]">
              ログアウト
            </span>
          </button>

          <p className="text-center text-[11px] text-t3">
            ResiApp v0.1.0 — Demo
          </p>
        </div>
      </div>
    </div>
  );
}
