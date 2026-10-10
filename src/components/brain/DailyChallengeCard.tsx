import React, { useState, useEffect } from 'react';
import {
  getDailyPuzzleForDate,
  getDailyChallengeProfile,
  getDayProgress,
  recordDaySolve,
  recordHintViewed,
  verifyAnswer,
  getFormattedDateLabel,
  getCountdownToMidnight,
  calculateCurrentStreak,
  getDateKey,
  DailyChallengeProfile,
  StoredDayProgress
} from '../../services/dailyChallenge';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Calendar,
  Flame,
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
  Brain,
  ListFilter,
  Eye,
  RotateCcw
} from 'lucide-react';

export const DailyChallengeCard: React.FC = () => {
  // Current date & puzzle selection
  const [todayEntry] = useState(() => getDailyPuzzleForDate());
  const { dateKey, puzzle, dayNumber } = todayEntry;

  // Local storage state
  const [profile, setProfile] = useState<DailyChallengeProfile>(() => getDailyChallengeProfile());
  const [progress, setProgress] = useState<StoredDayProgress>(() => getDayProgress(dateKey, puzzle.id));

  // Form states
  const [textGuess, setTextGuess] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'choices'>('text');
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isHintExpanded, setIsHintExpanded] = useState(progress.hintUsed);
  const [showConfirmReveal, setShowConfirmReveal] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Live countdown timer to midnight
  const [countdown, setCountdown] = useState(() => getCountdownToMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownToMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update profile & progress helper
  const refreshState = () => {
    const p = getDailyChallengeProfile();
    setProfile(p);
    setProgress(getDayProgress(dateKey, puzzle.id));
  };

  const isCompleted = progress.status === 'solved' || progress.status === 'revealed';
  const isSolved = progress.status === 'solved';
  const activeStreak = calculateCurrentStreak(profile, dateKey);

  // Handle free text guess submission
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textGuess.trim() || isCompleted) return;

    const isCorrect = verifyAnswer(textGuess, puzzle);

    if (isCorrect) {
      sound.playSuccess();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
      recordDaySolve(dateKey, puzzle.id, textGuess, true);
      setFeedbackMessage({ text: 'Brilliant deduction! You solved today\'s daily challenge!', isError: false });
      refreshState();
    } else {
      sound.playBuzz();
      recordDaySolve(dateKey, puzzle.id, textGuess, false);
      setFeedbackMessage({
        text: 'Not quite! Try thinking about it from another angle, or check the hint.',
        isError: true
      });
      refreshState();
    }
  };

  // Handle multiple-choice option click
  const handleChoiceSelect = (index: number) => {
    if (isCompleted || selectedChoice !== null) return;

    setSelectedChoice(index);
    const isCorrect = index === puzzle.correctOptionIndex;

    if (isCorrect) {
      sound.playSuccess();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
      recordDaySolve(dateKey, puzzle.id, puzzle.options[index], true);
      setFeedbackMessage({ text: 'Correct! Phenomenal critical thinking!', isError: false });
      refreshState();
    } else {
      sound.playBuzz();
      recordDaySolve(dateKey, puzzle.id, puzzle.options[index], false);
      setFeedbackMessage({
        text: 'That option is incorrect. Re-examine the clues or check the hint!',
        isError: true
      });
      refreshState();
    }
  };

  // Toggle or reveal hint
  const handleToggleHint = () => {
    sound.playBlip();
    if (!isHintExpanded && !progress.hintUsed) {
      recordHintViewed(dateKey, puzzle.id);
      refreshState();
    }
    setIsHintExpanded(prev => !prev);
  };

  // Confirm reveal solution / give up
  const handleConfirmReveal = () => {
    sound.playPop();
    recordDaySolve(dateKey, puzzle.id, 'Revealed Solution', false, true);
    setShowConfirmReveal(false);
    refreshState();
  };

  // Share result to clipboard
  const handleShare = () => {
    sound.playPop();
    const resultEmoji = isSolved ? '🎉 Solved' : '💡 Explored';
    const streakStr = profile.streak > 0 ? `🔥 Streak: ${profile.streak} days` : '⭐ Brain Sharpener';
    const textToCopy = `🧠 Brain Snacks Daily Challenge (${getFormattedDateLabel(dateKey)})\n${resultEmoji}: "${puzzle.title}"\n${streakStr}\nTry today's free riddle on Cosmic Playground!`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }).catch(() => {
      // Fallback
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    });
  };

  // Type badge styling
  const getTypeBadge = () => {
    switch (puzzle.type) {
      case 'logic':
        return { label: 'Logic Deduction', icon: '🧩', bg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' };
      case 'riddle':
        return { label: 'Classic Riddle', icon: '🔮', bg: 'bg-purple-500/10 text-purple-300 border-purple-500/30' };
      case 'lateral':
        return { label: 'Lateral Thinking', icon: '💡', bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30' };
      case 'math':
        return { label: 'Math Deduction', icon: '📐', bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' };
      default:
        return { label: 'Brain Puzzle', icon: '🧠', bg: 'bg-blue-500/10 text-blue-300 border-blue-500/30' };
    }
  };

  const typeBadge = getTypeBadge();

  // Past 7 days streak dots
  const renderPastDaysDots = () => {
    const dots = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const k = getDateKey(d);
      const isTodayDot = i === 0;
      const historyItem = profile.history[k];
      const isDaySolved = historyItem && historyItem.status === 'solved';
      const isDayRevealed = historyItem && historyItem.status === 'revealed';

      const dayLetter = d.toLocaleDateString(undefined, { weekday: 'narrow' });

      dots.push(
        <div key={k} className="flex flex-col items-center gap-1">
          <div
            title={`${getFormattedDateLabel(k)}: ${isDaySolved ? 'Solved' : isDayRevealed ? 'Revealed' : isTodayDot ? 'Today' : 'Missed'}`}
            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
              isDaySolved
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                : isDayRevealed
                ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300'
                : isTodayDot
                ? 'bg-purple-600/30 border-2 border-dashed border-purple-400 text-purple-200 animate-pulse'
                : 'bg-slate-800/80 border border-slate-700/60 text-slate-500'
            }`}
          >
            {isDaySolved ? '✓' : isDayRevealed ? '•' : isTodayDot ? '?' : '—'}
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-mono">{dayLetter}</span>
        </div>
      );
    }
    return dots;
  };

  return (
    <div className="bg-gradient-to-br from-[#121829] via-[#161f36] to-[#0f1424] border-2 border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Daily Challenge</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
              Seed #{dateKey.replace(/-/g, '')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20">
              100% Free • Non-Repeating
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Today's Brain Snack</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>{getFormattedDateLabel(dateKey)}</span>
          </p>
        </div>

        {/* Stats & Streak counters */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3 shadow-inner">
            <div className="flex items-center gap-1.5">
              <Flame className={`w-5 h-5 ${activeStreak > 0 ? 'text-amber-400 animate-bounce' : 'text-slate-500'}`} />
              <div>
                <div className="text-xs font-extrabold text-white leading-none">
                  {activeStreak} {activeStreak === 1 ? 'Day' : 'Days'}
                </div>
                <div className="text-[10px] text-amber-400 font-mono">Current Streak</div>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-800" />

            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-indigo-400" />
              <div>
                <div className="text-xs font-bold text-slate-200 leading-none">{profile.bestStreak}</div>
                <div className="text-[10px] text-slate-400 font-mono">Best</div>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-800" />

            <div>
              <div className="text-xs font-bold text-emerald-400 leading-none">{profile.totalSolved}</div>
              <div className="text-[10px] text-slate-400 font-mono">Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day History Track */}
      <div className="relative z-10 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80">
        <div className="text-xs text-slate-400">
          <span className="font-semibold text-slate-300">7-Day Completion Status:</span> Complete today to maintain your streak!
        </div>
        <div className="flex items-center gap-2">
          {renderPastDaysDots()}
        </div>
      </div>

      {/* Main Puzzle Card Body */}
      <div className="relative z-10 mt-6">
        {/* Puzzle Metadata & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${typeBadge.bg}`}>
              <span>{typeBadge.icon}</span>
              <span>{typeBadge.label}</span>
            </span>
            <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300">
              Difficulty: {puzzle.difficulty}
            </span>
          </div>

          {/* Mode Switcher (only when unsolved) */}
          {!isCompleted && (
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => {
                  sound.playBlip();
                  setInputMode('text');
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  inputMode === 'text'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ✍️ Type Guess
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playBlip();
                  setInputMode('choices');
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  inputMode === 'choices'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🔘 Multiple Choice
              </button>
            </div>
          )}
        </div>

        {/* Puzzle Title & Statement */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-inner mb-6">
          <h3 className="text-lg sm:text-xl font-black text-slate-100 mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400 shrink-0" />
            <span>{puzzle.title}</span>
          </h3>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {puzzle.question}
          </p>
        </div>

        {/* Clue / Hint Section */}
        <div className="mb-6">
          <button
            onClick={handleToggleHint}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-amber-300 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isHintExpanded ? 'Hide Hint' : 'Need a Clue? (Reveal Hint)'}</span>
            {isHintExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isHintExpanded && (
            <div className="mt-3 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs sm:text-sm animate-scale leading-relaxed">
              💡 <strong className="font-bold text-amber-300">Clue:</strong> {puzzle.hint}
            </div>
          )}
        </div>

        {/* FEEDBACK BANNER */}
        {feedbackMessage && !isCompleted && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold mb-6 flex items-center gap-2.5 animate-scale ${
              feedbackMessage.isError
                ? 'bg-rose-950/70 border border-rose-500/40 text-rose-200'
                : 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-200'
            }`}
          >
            {feedbackMessage.isError ? (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{feedbackMessage.text}</span>
          </div>
        )}

        {/* INTERACTION AREA (Unsolved) */}
        {!isCompleted ? (
          <div>
            {inputMode === 'text' ? (
              <form onSubmit={handleTextSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
                  <input
                    type="text"
                    value={textGuess}
                    onChange={e => setTextGuess(e.target.value)}
                    placeholder="Enter your deduction or answer..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                  <button
                    type="submit"
                    disabled={!textGuess.trim()}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm shadow-lg shadow-purple-600/20 cursor-pointer transition-all active:scale-95 shrink-0"
                  >
                    Submit Answer
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                  <span>Attempts so far today: <strong className="text-slate-200">{progress.attempts}</strong></span>
                  <button
                    type="button"
                    onClick={() => setShowConfirmReveal(true)}
                    className="text-slate-400 hover:text-slate-200 underline cursor-pointer"
                  >
                    Can't solve it? Reveal Solution
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Select the most accurate logical conclusion:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {puzzle.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoiceSelect(idx)}
                      disabled={selectedChoice !== null}
                      className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/60 text-left font-medium text-xs sm:text-sm text-slate-200 transition-all hover:bg-slate-800/80 cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <span>{option}</span>
                      <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 group-hover:border-purple-500 group-hover:text-purple-400 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowConfirmReveal(true)}
                    className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
                  >
                    Reveal Solution
                  </button>
                </div>
              </div>
            )}

            {/* CONFIRM REVEAL MODAL / POPUP */}
            {showConfirmReveal && (
              <div className="mt-4 p-5 rounded-2xl bg-slate-900 border border-slate-700 animate-scale">
                <h4 className="font-extrabold text-sm text-white mb-1">Reveal Today's Solution?</h4>
                <p className="text-xs text-slate-300 mb-4">
                  Revealing will uncover the full step-by-step reasoning so you can learn the solution, but today's streak will not increase.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmReveal}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer"
                  >
                    Yes, Reveal Answer
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmReveal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer"
                  >
                    Keep Trying
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* COMPLETED / SOLVED CELEBRATION CARD */
          <div className="space-y-6 animate-scale">
            <div className={`p-6 rounded-2xl border ${
              isSolved
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
                : 'bg-indigo-950/40 border-indigo-500/50 text-indigo-100'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl ${
                    isSolved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {isSolved ? '🎉' : '💡'}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg text-white">
                      {isSolved ? 'Daily Challenge Completed!' : 'Solution Revealed'}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {isSolved
                        ? `Solved in ${progress.attempts || 1} ${progress.attempts === 1 ? 'attempt' : 'attempts'}!`
                        : 'Challenge reviewed for today.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow"
                  >
                    {copiedToast ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>Share Result</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Canonical Solution Box */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Canonical Answer:
                </span>
                <p className="font-mono font-black text-emerald-300 text-sm sm:text-base">
                  {puzzle.answer}
                </p>
              </div>

              {/* Explanation Breakdown */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-purple-300 block mb-1">🧠 Logical Breakdown:</strong>
                {puzzle.explanation}
              </div>

              {/* Fun Fact */}
              {puzzle.funFact && (
                <div className="mt-3 text-xs text-slate-400 italic">
                  ✨ <strong>Did You Know?</strong> {puzzle.funFact}
                </div>
              )}
            </div>

            {/* Countdown to Next Day's Challenge */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-white">Next Daily Challenge Unlocks In:</h5>
                  <p className="text-[11px] text-slate-400">One new non-repeating riddle every single calendar day.</p>
                </div>
              </div>

              <div className="font-mono font-black text-lg sm:text-xl text-purple-300 px-4 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 tracking-widest text-center">
                {countdown.formatted}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
