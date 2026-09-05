export type PressureAlert = "normal" | "mild" | "caution";

export type WeatherRegion = {
  key: string;
  label: string;
  lat: number;
  lon: number;
};

export const WEATHER_REGIONS: WeatherRegion[] = [
  { key: "osaka", label: "大阪", lat: 34.6937, lon: 135.5023 },
  { key: "tokyo", label: "東京", lat: 35.6762, lon: 139.6503 },
  { key: "kyoto", label: "京都", lat: 35.0116, lon: 135.7681 },
  { key: "nagoya", label: "名古屋", lat: 35.1815, lon: 136.9066 },
  { key: "fukuoka", label: "福岡", lat: 33.5904, lon: 130.4017 },
  { key: "sapporo", label: "札幌", lat: 43.0618, lon: 141.3545 },
];

export type WeatherSnapshot = {
  regionKey: string;
  regionLabel: string;
  fetchedAt: string;
  expiresAt: string;
  weatherCode: number;
  weatherLabel: string;
  temperatureC: number;
  humidityPct: number;
  pressureHpa: number;
  pressureDeltaHpa: number;
  pressureAlert: PressureAlert;
  source: "open-meteo";
};

const CACHE_MS = 45 * 60 * 1000;
const PREFS_KEY = "resiapp.weather.prefs.v1";
const CACHE_KEY = "resiapp.weather.cache.v1";

export type WeatherPrefs = {
  regionKey: string;
  enabled: boolean;
};

const DEFAULT_PREFS: WeatherPrefs = {
  regionKey: "osaka",
  enabled: true,
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadWeatherPrefs(): WeatherPrefs {
  if (!canUseStorage()) return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<WeatherPrefs>;
    const regionOk = WEATHER_REGIONS.some((r) => r.key === parsed.regionKey);
    return {
      regionKey: regionOk ? (parsed.regionKey as string) : DEFAULT_PREFS.regionKey,
      enabled: typeof parsed.enabled === "boolean" ? parsed.enabled : true,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function saveWeatherPrefs(prefs: WeatherPrefs): void {
  if (!canUseStorage()) return;
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function getRegion(key: string): WeatherRegion {
  return WEATHER_REGIONS.find((r) => r.key === key) ?? WEATHER_REGIONS[0];
}

export function weatherLabelFromCode(code: number): string {
  if (code === 0) return "晴れ";
  if (code <= 3) return "くもり";
  if (code <= 48) return "霧";
  if (code <= 67) return "雨";
  if (code <= 77) return "雪";
  if (code <= 82) return "にわか雨";
  if (code <= 86) return "にわか雪";
  if (code <= 99) return "雷雨";
  return "天気不明";
}

export function classifyPressureAlert(deltaHpa: number): PressureAlert {
  const abs = Math.abs(deltaHpa);
  // 下降をより重視：下降側は閾値を少し下げる
  if (deltaHpa <= -5 || abs >= 6) return "caution";
  if (deltaHpa <= -3 || abs >= 3) return "mild";
  return "normal";
}

export function pressureAlertCopy(alert: PressureAlert): {
  title: string;
  body: string;
  tone: string;
  bg: string;
} {
  switch (alert) {
    case "caution":
      return {
        title: "気圧に注意のヒント",
        body: "不調が出やすい条件かも。水分・休憩・睡眠を意識してみよう",
        tone: "#C45C2A",
        bg: "#FFE0CC",
      };
    case "mild":
      return {
        title: "気圧が変わりやすい日かも",
        body: "ペースを落として、無理しない一日にしよう",
        tone: "#D97706",
        bg: "#FEF3C7",
      };
    default:
      return {
        title: "気圧は安定気味",
        body: "特に気圧の大きな変化はなさそうです",
        tone: "#6B5344",
        bg: "#FFF1E6",
      };
  }
}

function loadCache(): WeatherSnapshot | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WeatherSnapshot;
  } catch {
    return null;
  }
}

function saveCache(snapshot: WeatherSnapshot): void {
  if (!canUseStorage()) return;
  localStorage.setItem(CACHE_KEY, JSON.stringify(snapshot));
}

type OpenMeteoResponse = {
  current?: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    surface_pressure: number;
  };
  hourly?: {
    time: string[];
    surface_pressure: (number | null)[];
  };
};

function pressureDeltaFromHourly(
  hourly: OpenMeteoResponse["hourly"],
  currentPressure: number,
  currentTimeIso: string
): number {
  if (!hourly?.time?.length || !hourly.surface_pressure?.length) return 0;
  const currentMs = Date.parse(currentTimeIso);
  let bestIdx = -1;
  let bestDiff = Number.POSITIVE_INFINITY;
  for (let i = 0; i < hourly.time.length; i++) {
    const t = Date.parse(hourly.time[i]);
    const age = currentMs - t;
    // 約24時間前（20〜28時間の窓）を探す
    if (age < 20 * 3600_000 || age > 28 * 3600_000) continue;
    const pressure = hourly.surface_pressure[i];
    if (pressure == null) continue;
    const diff = Math.abs(age - 24 * 3600_000);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIdx = i;
    }
  }
  if (bestIdx < 0) {
    // フォールバック：最も古い有効値との差
    for (let i = 0; i < hourly.surface_pressure.length; i++) {
      const p = hourly.surface_pressure[i];
      if (p != null) return Math.round((currentPressure - p) * 10) / 10;
    }
    return 0;
  }
  const past = hourly.surface_pressure[bestIdx] as number;
  return Math.round((currentPressure - past) * 10) / 10;
}

export async function fetchWeatherSnapshot(
  regionKey: string,
  opts?: { force?: boolean }
): Promise<WeatherSnapshot | null> {
  const region = getRegion(regionKey);
  const cached = loadCache();
  const now = Date.now();
  if (
    !opts?.force &&
    cached &&
    cached.regionKey === region.key &&
    Date.parse(cached.expiresAt) > now
  ) {
    return cached;
  }

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${region.lat}&longitude=${region.lon}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,surface_pressure` +
    `&hourly=surface_pressure&timezone=Asia%2FTokyo&forecast_days=2` +
    `&past_days=1`;

  try {
    const res = await fetch(url);
    if (!res.ok) return cached;
    const data = (await res.json()) as OpenMeteoResponse;
    const current = data.current;
    if (!current) return cached;

    const pressure = current.surface_pressure;
    const delta = pressureDeltaFromHourly(
      data.hourly,
      pressure,
      current.time
    );
    const alert = classifyPressureAlert(delta);
    const snapshot: WeatherSnapshot = {
      regionKey: region.key,
      regionLabel: region.label,
      fetchedAt: new Date().toISOString(),
      expiresAt: new Date(now + CACHE_MS).toISOString(),
      weatherCode: current.weather_code,
      weatherLabel: weatherLabelFromCode(current.weather_code),
      temperatureC: Math.round(current.temperature_2m * 10) / 10,
      humidityPct: Math.round(current.relative_humidity_2m),
      pressureHpa: Math.round(pressure * 10) / 10,
      pressureDeltaHpa: delta,
      pressureAlert: alert,
      source: "open-meteo",
    };
    saveCache(snapshot);
    return snapshot;
  } catch {
    return cached;
  }
}
