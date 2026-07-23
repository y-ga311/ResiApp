export type SkillId = "sk1" | "sk2" | "sk3" | "sk4" | "sk5";

export interface Skill {
  id: SkillId;
  name: string;
  shortName: string;
  description: string;
  color: string;
  bgColor: string;
  icon: string;
  totalLessons: number;
  completedLessons: number;
}

// ─── Slide types ───────────────────────────────────────────────
export type SlideType = "intro" | "learn" | "tip" | "quiz" | "work" | "summary";

export interface QuizSlide {
  question: string;
  options: { label: string; correct: boolean }[];
  explanation: string;
}

export interface WorkSlide {
  prompt: string;
  hint?: string;
}

export interface Slide {
  id: string;
  type: SlideType;
  emoji?: string;
  title?: string;
  body?: string;
  image?: string; // e.g. /training/行動活性化/sk1-l1-s1.png
  accentColor?: string; // override skill color for this slide
  quiz?: QuizSlide;
  work?: WorkSlide;
}

export interface Lesson {
  id: string;
  skillId: SkillId;
  title: string;
  duration: number; // minutes
  type: "learn" | "work" | "review";
  content: string;
  slides?: Slide[]; // if present, use slide player instead of text view
  completed: boolean;
}

export interface CheckScore {
  week: string;
  phq: number;
  gad: number;
  psqi: number;
  total: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  earned: boolean;
}

export interface UserProfile {
  nickname: string;
  level: number;
  streak: number;
  totalLessons: number;
  growthPoints: number;
}

export type MoodType = "great" | "good" | "okay" | "bad" | "rough";
