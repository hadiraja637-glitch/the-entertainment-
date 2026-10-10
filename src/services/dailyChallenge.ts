import { DAILY_PUZZLES, DailyPuzzle } from '../data/dailyPuzzles';

export interface DailyChallengeEntry {
  dateKey: string; // "YYYY-MM-DD"
  puzzle: DailyPuzzle;
  dayNumber: number;
}

export interface StoredDayProgress {
  dateKey: string;
  puzzleId: string;
  status: 'unsolved' | 'solved' | 'revealed';
  completedAt?: string;
  userGuess?: string;
  attempts: number;
  hintUsed: boolean;
}

export interface DailyChallengeProfile {
  streak: number;
  bestStreak: number;
  totalSolved: number;
  lastSolvedDate: string | null;
  history: Record<string, StoredDayProgress>;
}

const STORAGE_KEY = 'cosmic_brain_daily_challenge_v1';
const ANCHOR_EPOCH = new Date(2026, 0, 1).getTime(); // Jan 1, 2026 anchor

/**
 * Format date as "YYYY-MM-DD" in local time
 */
export function getDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Human-readable date label, e.g. "Saturday, Oct 10, 2026"
 */
export function getFormattedDateLabel(dateKey: string): string {
  try {
    const [y, m, d] = dateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateKey;
  }
}

/**
 * Calculates continuous day count from anchor
 */
export function getDayNumber(date: Date = new Date()): number {
  const localMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return Math.floor((localMidnight - ANCHOR_EPOCH) / 86400000);
}

/**
 * Deterministic pseudo-random permutation for a cycle of length N
 * Guarantees NO repeats within each cycle of N days.
 */
function getCyclePermutation(cycle: number, length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  // Linear congruential generator with cycle-specific seed
  let seed = Math.abs((cycle * 1664525 + 1013904223) % 2147483647) || 777;
  
  function nextFloat() {
    seed = (seed * 1664525 + 1013904223) % 2147483647;
    return seed / 2147483647;
  }

  // Fisher-Yates shuffle
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(nextFloat() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices;
}

/**
 * Deterministically selects one unique, non-repeating riddle/logic puzzle for a date
 */
export function getDailyPuzzleForDate(date: Date = new Date()): DailyChallengeEntry {
  const dateKey = getDateKey(date);
  const dayNum = getDayNumber(date);
  const N = DAILY_PUZZLES.length;

  const cycle = Math.floor(dayNum / N);
  const dayInCycle = ((dayNum % N) + N) % N;

  const permutation = getCyclePermutation(cycle, N);
  const puzzleIndex = permutation[dayInCycle];
  const puzzle = DAILY_PUZZLES[puzzleIndex] || DAILY_PUZZLES[0];

  return {
    dateKey,
    puzzle,
    dayNumber: dayNum
  };
}

/**
 * Retrieve saved profile from localStorage
 */
export function getDailyChallengeProfile(): DailyChallengeProfile {
  const defaultProfile: DailyChallengeProfile = {
    streak: 0,
    bestStreak: 0,
    totalSolved: 0,
    lastSolvedDate: null,
    history: {}
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw);
    return {
      streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
      bestStreak: typeof parsed.bestStreak === 'number' ? parsed.bestStreak : 0,
      totalSolved: typeof parsed.totalSolved === 'number' ? parsed.totalSolved : 0,
      lastSolvedDate: parsed.lastSolvedDate || null,
      history: parsed.history && typeof parsed.history === 'object' ? parsed.history : {}
    };
  } catch (e) {
    console.warn('Failed to parse daily challenge profile from localStorage', e);
    return defaultProfile;
  }
}

/**
 * Save profile to localStorage safely
 */
export function saveDailyChallengeProfile(profile: DailyChallengeProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Failed to save daily challenge profile to localStorage', e);
  }
}

/**
 * Get current day's progress record
 */
export function getDayProgress(dateKey: string, puzzleId: string): StoredDayProgress {
  const profile = getDailyChallengeProfile();
  if (profile.history[dateKey]) {
    return profile.history[dateKey];
  }
  return {
    dateKey,
    puzzleId,
    status: 'unsolved',
    attempts: 0,
    hintUsed: false
  };
}

/**
 * Calculate active streak considering if user solved today or yesterday
 */
export function calculateCurrentStreak(profile: DailyChallengeProfile, todayKey: string): number {
  if (!profile.lastSolvedDate) return 0;
  if (profile.lastSolvedDate === todayKey) return profile.streak;

  // Check if last solved date was yesterday
  const [ty, tm, td] = todayKey.split('-').map(Number);
  const today = new Date(ty, tm - 1, td);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday);

  if (profile.lastSolvedDate === yesterdayKey) {
    return profile.streak;
  }

  // Broken streak
  return 0;
}

/**
 * Record a user guess or solve
 */
export function recordDaySolve(
  dateKey: string,
  puzzleId: string,
  guess: string,
  isSolutionCorrect: boolean,
  giveUpReveal: boolean = false
): StoredDayProgress {
  const profile = getDailyChallengeProfile();
  const current = profile.history[dateKey] || {
    dateKey,
    puzzleId,
    status: 'unsolved',
    attempts: 0,
    hintUsed: false
  };

  current.attempts += 1;
  current.userGuess = guess;

  if (isSolutionCorrect && current.status !== 'solved') {
    current.status = 'solved';
    current.completedAt = new Date().toISOString();

    // Update streak
    const activeStreak = calculateCurrentStreak(profile, dateKey);
    const newStreak = activeStreak + 1;
    profile.streak = newStreak;
    profile.bestStreak = Math.max(profile.bestStreak, newStreak);
    profile.totalSolved += 1;
    profile.lastSolvedDate = dateKey;
  } else if (giveUpReveal && current.status !== 'solved') {
    current.status = 'revealed';
    current.completedAt = new Date().toISOString();
  }

  profile.history[dateKey] = current;
  saveDailyChallengeProfile(profile);
  return current;
}

/**
 * Record that hint was viewed
 */
export function recordHintViewed(dateKey: string, puzzleId: string): void {
  const profile = getDailyChallengeProfile();
  const current = profile.history[dateKey] || {
    dateKey,
    puzzleId,
    status: 'unsolved',
    attempts: 0,
    hintUsed: true
  };
  current.hintUsed = true;
  profile.history[dateKey] = current;
  saveDailyChallengeProfile(profile);
}

/**
 * Normalize and clean a user answer string
 */
function cleanString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/^(a|an|the)\s+/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Check if the user guess matches the canonical answer or keywords
 */
export function verifyAnswer(userGuess: string, puzzle: DailyPuzzle): boolean {
  if (!userGuess || !userGuess.trim()) return false;
  const cleanedGuess = cleanString(userGuess);
  const cleanedAnswer = cleanString(puzzle.answer);

  // Exact or subset match with answer
  if (cleanedGuess === cleanedAnswer) return true;
  if (cleanedGuess.length >= 3 && cleanedAnswer.includes(cleanedGuess)) return true;
  if (cleanedAnswer.length >= 3 && cleanedGuess.includes(cleanedAnswer)) return true;

  // Check against acceptable keyword stems
  for (const kw of puzzle.acceptableKeywords) {
    const cleanedKw = cleanString(kw);
    if (cleanedGuess === cleanedKw) return true;
    if (cleanedGuess.includes(cleanedKw) || cleanedKw.includes(cleanedGuess)) return true;
  }

  // Check correct option string
  const correctOption = cleanString(puzzle.options[puzzle.correctOptionIndex] || '');
  if (cleanedGuess === correctOption || (cleanedGuess.length > 3 && correctOption.includes(cleanedGuess))) {
    return true;
  }

  return false;
}

/**
 * Compute countdown until local midnight for the next daily challenge
 */
export function getCountdownToMidnight(): { hours: number; minutes: number; seconds: number; formatted: string } {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const diffMs = Math.max(0, tomorrow.getTime() - now.getTime());

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  return { hours, minutes, seconds, formatted };
}
