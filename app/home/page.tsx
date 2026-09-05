"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sun,
  Smile,
  Meh,
  Frown,
  CloudRain,
  ArrowRight,
  CloudSun,
  Droplets,
  Gauge,
  Sparkles,
} from "lucide-react";
import TabBar from "@/components/TabBar";
import AppHeader from "@/components/AppHeader";
import {
  BODY_TAG_OPTIONS,
  getConditionLog,
  todayKey,
  upsertConditionLog,
  type BodyTag,
  type MoodKey,
} from "@/lib/condition-storage";
import {
  fetchWeatherSnapshot,
  loadWeatherPrefs,
  pressureAlertCopy,
  type WeatherSnapshot,
} from "@/lib/weather";

const MOOD_OPTIONS: {
  icon: typeof Sun;
  label: string;
  color: string;
  key: MoodKey;
}[] = [
  { icon: Sun, label: "最高", color: "#FBBF24", key: "great" },
  { icon: Smile, label: "良い", color: "#10B981", key: "good" },
  { icon: Meh, label: "普通", color: "#E8895B", key: "okay" },
  { icon: Frown, label: "つらい", color: "#FB923C", key: "bad" },
  { icon: CloudRain, label: "最低", color: "#C45C2A", key: "rough" },
];

function WeatherCard({
  weather,
  loading,
  failed,
}: {
  weather: WeatherSnapshot | null;
  loading: boolean;
  failed: boolean;
}) {
  if (loading && !weather) {
    return (
      <div className="bg-card rounded-3xl px-4 py-4 shadow-sm">
        <p className="text-[13px] text-t3">天気・気圧を取得中…</p>
      </div>
    );
  }
  if (failed && !weather) {
    return (
      <div className="bg-card rounded-3xl px-4 py-4 shadow-sm">
        <p className="text-[13px] text-t3">
          天気情報を取得できませんでした。あとでまた試してみてください。
        </p>
      </div>
    );
  }
  if (!weather) return null;

  const copy = pressureAlertCopy(weather.pressureAlert);
  const deltaText =
    weather.pressureDeltaHpa > 0
      ? `+${weather.pressureDeltaHpa}`
      : `${weather.pressureDeltaHpa}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-card rounded-3xl px-4 py-4 shadow-sm flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-accent-lt flex items-center justify-center flex-shrink-0">
              <CloudSun size={20} className="text-accent" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-t1">
                {weather.regionLabel} · {weather.weatherLabel}
              </p>
              <p className="text-[12px] text-t3 mt-0.5">
                環境の目安（診断・予報ではありません）
              </p>
            </div>
          </div>
          <span className="text-[22px] font-bold text-accent leading-none flex-shrink-0">
            {Math.round(weather.temperatureC)}°
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-bg px-3 py-2.5 flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold text-t3 flex items-center gap-1">
              <Gauge size={11} /> 気圧
            </span>
            <span className="text-[14px] font-bold text-t1">
              {weather.pressureHpa}
              <span className="text-[10px] font-semibold text-t3 ml-0.5">
                hPa
              </span>
            </span>
          </div>
          <div className="rounded-2xl bg-bg px-3 py-2.5 flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold text-t3">24h変化</span>
            <span className="text-[14px] font-bold text-t1">{deltaText}</span>
          </div>
          <div className="rounded-2xl bg-bg px-3 py-2.5 flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold text-t3 flex items-center gap-1">
              <Droplets size={11} /> 湿度
            </span>
            <span className="text-[14px] font-bold text-t1">
              {weather.humidityPct}%
            </span>
          </div>
        </div>
      </div>

      <div
        className="rounded-3xl px-4 py-3.5 flex flex-col gap-2"
        style={{ backgroundColor: copy.bg }}
      >
        <p className="text-[14px] font-bold" style={{ color: copy.tone }}>
          {copy.title}
        </p>
        <p className="text-[13px] leading-snug" style={{ color: copy.tone }}>
          {copy.body}
        </p>
        {weather.pressureAlert !== "normal" && (
          <Link
            href="/training/sk5"
            className="inline-flex items-center gap-1 text-[12px] font-bold mt-0.5"
            style={{ color: copy.tone }}
          >
            ねむりレッスンを見てみる
            <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [bodyTags, setBodyTags] = useState<BodyTag[]>([]);
  const [note, setNote] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const [hasTodayLog, setHasTodayLog] = useState(false);
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherFailed, setWeatherFailed] = useState(false);
  const [weatherEnabled, setWeatherEnabled] = useState(true);

  useEffect(() => {
    const today = getConditionLog(todayKey());
    if (today) {
      setSelectedMood(today.mood);
      setBodyTags(today.bodyTags);
      setNote(today.note);
      setHasTodayLog(true);
    }
  }, []);

  useEffect(() => {
    const prefs = loadWeatherPrefs();
    setWeatherEnabled(prefs.enabled);
    if (!prefs.enabled) {
      setWeatherLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setWeatherLoading(true);
      const snap = await fetchWeatherSnapshot(prefs.regionKey);
      if (cancelled) return;
      if (snap) {
        setWeather(snap);
        setWeatherFailed(false);
      } else {
        setWeatherFailed(true);
      }
      setWeatherLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleTag = (tag: BodyTag) => {
    setBodyTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSaveCondition = () => {
    if (!selectedMood) return;
    upsertConditionLog({
      date: todayKey(),
      mood: selectedMood,
      bodyTags,
      note: note.trim(),
      pressureAlert: weather?.pressureAlert ?? null,
    });
    setHasTodayLog(true);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-bg">
      <AppHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 px-4 pt-2 pb-6">
          {weatherEnabled && (
            <WeatherCard
              weather={weather}
              loading={weatherLoading}
              failed={weatherFailed}
            />
          )}

          <div className="bg-card rounded-3xl px-4 py-4 flex flex-col gap-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[15px] font-bold text-t1">今日の体調</p>
                <p className="text-[12px] text-t3 mt-0.5">
                  {hasTodayLog
                    ? "記録済み。いつでも上書きできます"
                    : "30秒でOK。調子を軽く残しておこう"}
                </p>
              </div>
              {savedFlash && (
                <span className="text-[11px] font-bold text-accent flex items-center gap-1 flex-shrink-0">
                  <Sparkles size={12} />
                  保存したよ
                </span>
              )}
            </div>

            <div className="flex justify-between">
              {MOOD_OPTIONS.map(({ icon: Icon, label, color, key }) => {
                const isSelected = selectedMood === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedMood(key)}
                    className="flex flex-col items-center gap-[7px] flex-1"
                  >
                    <div
                      className="w-[46px] h-[46px] rounded-full flex items-center justify-center transition-all border-2"
                      style={{
                        backgroundColor: isSelected
                          ? `${color}20`
                          : "transparent",
                        borderColor: isSelected ? color : "transparent",
                      }}
                    >
                      <Icon
                        size={22}
                        color={color}
                        strokeWidth={isSelected ? 2.5 : 1.8}
                      />
                    </div>
                    <span
                      className="text-[10px] leading-none"
                      style={{
                        color: isSelected ? "#4A3321" : "#A89080",
                        fontWeight: isSelected ? 700 : 400,
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[12px] font-semibold text-t2">
                からだの気配（任意）
              </p>
              <div className="flex flex-wrap gap-2">
                {BODY_TAG_OPTIONS.map(({ key, label }) => {
                  const on = bodyTags.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleTag(key)}
                      className="px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all"
                      style={{
                        backgroundColor: on ? "#FFE8D6" : "#FFF8EE",
                        borderColor: on ? "#E8895B" : "#F0E4D8",
                        color: on ? "#C45C2A" : "#6B5344",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-t2">
                一言メモ（任意）
              </span>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={80}
                placeholder="例：午後から少しだるい"
                className="h-11 rounded-2xl border-2 border-stroke bg-bg px-3 text-[14px] text-t1 placeholder:text-t3 focus:outline-none focus:border-accent"
              />
            </label>

            <button
              type="button"
              disabled={!selectedMood}
              onClick={handleSaveCondition}
              className="h-12 rounded-[24px] bg-accent text-white text-[15px] font-bold disabled:opacity-40"
            >
              {hasTodayLog ? "体調を更新する" : "体調を記録する"}
            </button>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
