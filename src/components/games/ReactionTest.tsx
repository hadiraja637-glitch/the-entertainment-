import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Zap, RotateCcw, Award } from 'lucide-react';

type GameState = 'idle' | 'waiting' | 'ready' | 'result' | 'early';

export const ReactionTest: React.FC = () => {
  const [state, setState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(() => {
    const saved = localStorage.getItem('te_reaction_best');
    return saved ? parseInt(saved, 10) : null;
  });
  const [recentScores, setRecentScores] = useState<number[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const startTest = () => {
    setState('waiting');
    setReactionTime(null);
    sound.playBlip(300);

    // Random delay between 2000ms and 5000ms
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    timerRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setState('ready');
      sound.playBlip(600);
    }, randomDelay);
  };

  const handleClickZone = () => {
    if (state === 'idle') {
      startTest();
    } else if (state === 'waiting') {
      // Too early!
      if (timerRef.current) clearTimeout(timerRef.current);
      setState('early');
      sound.playBuzz();
    } else if (state === 'ready') {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setState('result');
      sound.playSuccess();

      setRecentScores(prev => [elapsed, ...prev.slice(0, 4)]);

      const isNewBest = !bestTime || elapsed < bestTime;
      if (isNewBest) {
        setBestTime(elapsed);
        localStorage.setItem('te_reaction_best', elapsed.toString());
      }

      if (elapsed < 230 || isNewBest) {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      }
    } else if (state === 'result' || state === 'early') {
      startTest();
    }
  };

  const getRating = (ms: number) => {
    if (ms < 180) return { label: 'Incredible! Godlike Reflexes ⚡', color: 'text-amber-300' };
    if (ms < 230) return { label: 'Lightning Fast! Pro Gamer Tier 🚀', color: 'text-emerald-300' };
    if (ms < 300) return { label: 'Great Reflexes! Above Average ✨', color: 'text-sky-300' };
    if (ms < 400) return { label: 'Solid Everyday Human Reaction ⏱️', color: 'text-purple-300' };
    return { label: 'A bit sleepy! Grab some water ☕', color: 'text-slate-300' };
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <h3 className="font-bold text-lg text-slate-100">Reflex Reaction Timer</h3>
        </div>
        {bestTime && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>Best: {bestTime} ms</span>
          </div>
        )}
      </div>

      {/* Interactive Reaction Surface */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleClickZone}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleClickZone();
          }
        }}
        className={`w-full h-64 rounded-2xl flex flex-col items-center justify-center cursor-pointer select-none transition-colors border-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 ${
          state === 'idle'
            ? 'bg-slate-900/80 border-slate-700 hover:border-purple-500/50 text-slate-300'
            : state === 'waiting'
            ? 'bg-rose-950/60 border-rose-500/60 text-rose-200 animate-pulse'
            : state === 'ready'
            ? 'bg-emerald-600/90 border-emerald-400 text-white'
            : state === 'early'
            ? 'bg-amber-950/80 border-amber-500/70 text-amber-200'
            : 'bg-purple-950/60 border-purple-500/70 text-purple-100'
        }`}
      >
        {state === 'idle' && (
          <div className="p-4">
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-2 animate-bounce" />
            <p className="text-xl font-bold text-slate-100">Click anywhere to start</p>
            <p className="text-xs text-slate-400 mt-2">When the screen turns green, click as fast as you can!</p>
          </div>
        )}

        {state === 'waiting' && (
          <div className="p-4">
            <div className="w-8 h-8 rounded-full bg-rose-500 mx-auto mb-2 animate-ping" />
            <p className="text-2xl font-black uppercase tracking-wider">Wait for Green...</p>
            <p className="text-xs text-rose-300/80 mt-1">Don't click yet!</p>
          </div>
        )}

        {state === 'ready' && (
          <div className="p-4">
            <p className="text-4xl font-black uppercase tracking-wider animate-scale">CLICK NOW!!</p>
            <p className="text-sm font-bold mt-1 text-emerald-100">Tap fast!</p>
          </div>
        )}

        {state === 'early' && (
          <div className="p-4">
            <p className="text-2xl font-black text-amber-300">Too Early! 🚨</p>
            <p className="text-sm text-slate-300 mt-1">You clicked before it turned green.</p>
            <p className="text-xs text-slate-400 mt-3 underline">Click to try again</p>
          </div>
        )}

        {state === 'result' && reactionTime !== null && (
          <div className="p-4">
            <div className="text-5xl font-black font-mono text-purple-200">{reactionTime} ms</div>
            <p className={`text-sm font-semibold mt-2 ${getRating(reactionTime).color}`}>
              {getRating(reactionTime).label}
            </p>
            <p className="text-xs text-slate-400 mt-4 underline">Click to test again</p>
          </div>
        )}
      </div>

      {recentScores.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span>Recent:</span>
          {recentScores.map((score, i) => (
            <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              {score}ms
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
