import type { CheckTypeId } from "@/lib/check";

const STORAGE_KEY = "resiapp.check.latestScores.v2";

export type LatestCheckScores = {
  phq?: number;
  gad?: number;
  psqi?: number;
  updatedAt?: string;
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadLatestCheckScores(): LatestCheckScores {
  if (!canUseStorage()) return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as LatestCheckScores;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveLatestCheckScore(typeId: CheckTypeId, score: number): void {
  if (!canUseStorage()) return;
  const prev = loadLatestCheckScores();
  const next: LatestCheckScores = {
    ...prev,
    [typeId]: score,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
