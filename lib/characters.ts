/** ホーム表示用キャラ（スコア帯と進化形態の対応） */

export type CharacterLineId = "kokomo" | "fuwari" | "lunari";
export type CharacterStage = 1 | 2 | 3 | 4;

export interface HomeCharacter {
  id: string;
  lineId: CharacterLineId;
  stage: CharacterStage;
  name: string;
  image: string;
  bg: string;
  accent: string;
  lineLabel: string;
  levelLabel: string;
  message: string;
  checkKey: "PHQ" | "GAD" | "PSQI";
  stateLabel: string;
}

const KOKOMO_LINE: Record<CharacterStage, Omit<HomeCharacter, "stage">> = {
  1: {
    id: "kobimo",
    lineId: "kokomo",
    name: "コビモ",
    image: "/characters/kokomo/char-kobimo.png",
    bg: "#EEF2FF",
    accent: "#818CF8",
    lineLabel: "こころの相棒",
    levelLabel: "要注意",
    message: "ひとりじゃないよ。一緒にいよう。",
    checkKey: "PHQ",
    stateLabel: "こころの状態",
  },
  2: {
    id: "komori",
    lineId: "kokomo",
    name: "コモリ",
    image: "/characters/kokomo/char-komori.png",
    bg: "#EEF2FF",
    accent: "#818CF8",
    lineLabel: "こころの相棒",
    levelLabel: "要注意",
    message: "少しずつで大丈夫。一緒に育てよう。",
    checkKey: "PHQ",
    stateLabel: "こころの状態",
  },
  3: {
    id: "kokomo",
    lineId: "kokomo",
    name: "ココモ",
    image: "/characters/kokomo/char-kokomo.png",
    bg: "#EEF2FF",
    accent: "#818CF8",
    lineLabel: "こころの相棒",
    levelLabel: "軽度",
    message: "いつもそばにいるよ。この調子でいこう。",
    checkKey: "PHQ",
    stateLabel: "こころの状態",
  },
  4: {
    id: "kokoroha",
    lineId: "kokomo",
    name: "ココロハ",
    image: "/characters/kokomo/char-kokoroha.png",
    bg: "#EEF2FF",
    accent: "#818CF8",
    lineLabel: "こころの相棒",
    levelLabel: "良好",
    message: "がんばったね！こころが輝いているよ。",
    checkKey: "PHQ",
    stateLabel: "こころの状態",
  },
};

const FUWARI_LINE: Record<CharacterStage, Omit<HomeCharacter, "stage">> = {
  1: {
    id: "fuwafu",
    lineId: "fuwari",
    name: "フワフ",
    image: "/characters/fuwari/char-fuwafu.png",
    bg: "#E0F2FE",
    accent: "#38BDF8",
    lineLabel: "やすらぎの相棒",
    levelLabel: "要注意",
    message: "大丈夫。一緒に落ち着こう。",
    checkKey: "GAD",
    stateLabel: "やすらぎの状態",
  },
  2: {
    id: "fuwamu",
    lineId: "fuwari",
    name: "フワム",
    image: "/characters/fuwari/char-fuwamu.png",
    bg: "#E0F2FE",
    accent: "#38BDF8",
    lineLabel: "やすらぎの相棒",
    levelLabel: "要注意",
    message: "少しずつゆるめていこう。",
    checkKey: "GAD",
    stateLabel: "やすらぎの状態",
  },
  3: {
    id: "fuwari",
    lineId: "fuwari",
    name: "フワリ",
    image: "/characters/fuwari/char-fuwari.png",
    bg: "#E0F2FE",
    accent: "#38BDF8",
    lineLabel: "やすらぎの相棒",
    levelLabel: "軽度",
    message: "深呼吸していこう。そばにいるよ。",
    checkKey: "GAD",
    stateLabel: "やすらぎの状態",
  },
  4: {
    id: "fuwarea",
    lineId: "fuwari",
    name: "フワレア",
    image: "/characters/fuwari/char-fuwarea.png",
    bg: "#E0F2FE",
    accent: "#38BDF8",
    lineLabel: "やすらぎの相棒",
    levelLabel: "良好",
    message: "心がすっきり！風のように軽やかだよ。",
    checkKey: "GAD",
    stateLabel: "やすらぎの状態",
  },
};

const LUNARI_LINE: Record<CharacterStage, Omit<HomeCharacter, "stage">> = {
  1: {
    id: "lune",
    lineId: "lunari",
    name: "ルネ",
    image: "/characters/lunari/char-lune.png",
    bg: "#FFF7ED",
    accent: "#FB923C",
    lineLabel: "ねむりの相棒",
    levelLabel: "要注意",
    message: "一緒にリズムを育てよう。",
    checkKey: "PSQI",
    stateLabel: "ねむりの状態",
  },
  2: {
    id: "lunon",
    lineId: "lunari",
    name: "ルノン",
    image: "/characters/lunari/char-lunon.png",
    bg: "#FFF7ED",
    accent: "#FB923C",
    lineLabel: "ねむりの相棒",
    levelLabel: "注意",
    message: "少しずつ整えていこう。そばにいるよ。",
    checkKey: "PSQI",
    stateLabel: "ねむりの状態",
  },
  3: {
    id: "lunari",
    lineId: "lunari",
    name: "ルナリ",
    image: "/characters/lunari/char-lunari.png",
    bg: "#FFF7ED",
    accent: "#FB923C",
    lineLabel: "ねむりの相棒",
    levelLabel: "注意",
    message: "おやすみの準備、一緒にしよう。",
    checkKey: "PSQI",
    stateLabel: "ねむりの状態",
  },
  4: {
    id: "lunael",
    lineId: "lunari",
    name: "ルナエル",
    image: "/characters/lunari/char-lunael.png",
    bg: "#FFF7ED",
    accent: "#FB923C",
    lineLabel: "ねむりの相棒",
    levelLabel: "良好",
    message: "よく眠れてるね。星がきれいだよ。",
    checkKey: "PSQI",
    stateLabel: "ねむりの状態",
  },
};

/** PHQ-9 / GAD-7（低スコアほど元気）→ 形態 */
export function symptomScoreToStage(score: number): CharacterStage {
  if (score <= 4) return 4;
  if (score <= 9) return 3;
  if (score <= 14) return 2;
  return 1;
}

/** PSQI（0–21・低スコアほど元気）→ 形態 */
export function psqiScoreToStage(score: number): CharacterStage {
  if (score <= 4) return 4;
  if (score <= 7) return 3;
  if (score <= 14) return 2;
  return 1;
}

export function getKokomoCharacter(phqScore: number): HomeCharacter {
  const stage = symptomScoreToStage(phqScore);
  return { ...KOKOMO_LINE[stage], stage };
}

export function getFuwariCharacter(gadScore: number): HomeCharacter {
  const stage = symptomScoreToStage(gadScore);
  return { ...FUWARI_LINE[stage], stage };
}

export function getLunariCharacter(psqiScore: number): HomeCharacter {
  const stage = psqiScoreToStage(psqiScore);
  return { ...LUNARI_LINE[stage], stage };
}
