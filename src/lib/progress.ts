// 学習進捗管理ユーティリティ

const STORAGE_KEY = "surviveai_progress";

export interface UserProgress {
  xp: number;
  level: number;
  completedSteps: string[];
  badges: string[];
  lastUpdated: string;
}

const defaultProgress: UserProgress = {
  xp: 0,
  level: 1,
  completedSteps: [],
  badges: [],
  lastUpdated: new Date().toISOString(),
};

// レベル計算
const levelThresholds = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];

export function calculateLevel(xp: number): number {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (xp >= levelThresholds[i]) {
      return i + 1;
    }
  }
  return 1;
}

export function getXpForNextLevel(level: number): number {
  if (level >= levelThresholds.length) return levelThresholds[levelThresholds.length - 1];
  return levelThresholds[level];
}

// 進捗を取得
export function getProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress;
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load progress:", error);
  }
  return defaultProgress;
}

// 進捗を保存
export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  
  try {
    progress.lastUpdated = new Date().toISOString();
    progress.level = calculateLevel(progress.xp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
}

// XPを追加
export function addXP(amount: number): UserProgress {
  const progress = getProgress();
  progress.xp += amount;
  progress.level = calculateLevel(progress.xp);
  saveProgress(progress);
  return progress;
}

// STEPを完了
export function completeStep(stepId: string, xpEarned: number): UserProgress {
  const progress = getProgress();
  
  // 既に完了している場合はXPを追加しない（復習モード）
  if (!progress.completedSteps.includes(stepId)) {
    progress.completedSteps.push(stepId);
    progress.xp += xpEarned;
    progress.level = calculateLevel(progress.xp);
    
    // バッジ付与
    const badge = getBadgeForStep(stepId);
    if (badge && !progress.badges.includes(badge)) {
      progress.badges.push(badge);
    }
  }
  
  saveProgress(progress);
  return progress;
}

// STEPに応じたバッジを取得
function getBadgeForStep(stepId: string): string | null {
  const badges: { [key: string]: string } = {
    step01: "🎯 First Step",
    step03: "📐 Designer",
    step05: "💻 Coder",
    step08: "⚡ Developer",
    step09: "🤖 AI Master",
    step10: "🚀 Ship It!",
  };
  return badges[stepId] || null;
}

// STEPが完了しているかチェック
export function isStepCompleted(stepId: string): boolean {
  const progress = getProgress();
  return progress.completedSteps.includes(stepId);
}

// 進捗をリセット
export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

