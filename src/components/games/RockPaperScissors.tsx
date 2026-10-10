import React, { useState } from 'react';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { RotateCcw } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';

const CHOICES: { id: Choice; label: string; icon: string; beats: Choice }[] = [
  { id: 'rock', label: 'Rock', icon: '🪨', beats: 'scissors' },
  { id: 'paper', label: 'Paper', icon: '📄', beats: 'rock' },
  { id: 'scissors', label: 'Scissors', icon: '✂️', beats: 'paper' },
];

export const RockPaperScissors: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [botChoice, setBotChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [isShaking, setIsShaking] = useState(false);

  const play = (choice: Choice) => {
    sound.playPop();
    setIsShaking(true);
    setPlayerChoice(choice);
    setBotChoice(null);
    setResult(null);

    setTimeout(() => {
      const randomBot = CHOICES[Math.floor(Math.random() * CHOICES.length)].id;
      setBotChoice(randomBot);
      setIsShaking(false);

      if (choice === randomBot) {
        setResult('draw');
        setStats(s => ({ ...s, draws: s.draws + 1 }));
        sound.playBlip(380);
      } else {
        const item = CHOICES.find(c => c.id === choice);
        if (item && item.beats === randomBot) {
          setResult('win');
          sound.playSuccess();
          const nextStreak = streak + 1;
          setStreak(nextStreak);
          if (nextStreak >= 3) {
            confetti({ particleCount: 40, spread: 60 });
          }
          setStats(s => ({ ...s, wins: s.wins + 1 }));
        } else {
          setResult('lose');
          sound.playBuzz();
          setStreak(0);
          setStats(s => ({ ...s, losses: s.losses + 1 }));
        }
      }
    }, 450);
  };

  const resetStats = () => {
    sound.playBlip();
    setStreak(0);
    setStats({ wins: 0, losses: 0, draws: 0 });
    setPlayerChoice(null);
    setBotChoice(null);
    setResult(null);
  };

  const getChoiceIcon = (c: Choice | null) => {
    if (!c) return '❔';
    return CHOICES.find(item => item.id === c)?.icon || '❔';
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✊</span>
          <h3 className="font-bold text-lg text-slate-100">Rock Paper Scissors</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-amber-300 font-mono">Streak: {streak} 🔥</span>
          <button
            onClick={resetStats}
            title="Reset Score"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Arena view */}
      <div className="flex items-center justify-around my-6 py-6 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-center">
          <p className="text-xs text-slate-400 mb-2 uppercase font-medium">You</p>
          <div className={`text-5xl select-none ${isShaking ? 'animate-bounce' : ''}`}>
            {getChoiceIcon(playerChoice)}
          </div>
        </div>

        <div className="text-2xl font-black text-slate-600">VS</div>

        <div className="text-center">
          <p className="text-xs text-slate-400 mb-2 uppercase font-medium">Cosmic Bot</p>
          <div className={`text-5xl select-none ${isShaking ? 'animate-spin' : ''}`}>
            {getChoiceIcon(botChoice)}
          </div>
        </div>
      </div>

      {/* Result feedback */}
      {result && (
        <div className="mb-4 text-center animate-scale">
          {result === 'win' && <p className="text-xl font-bold text-emerald-400">You Won! 🎉</p>}
          {result === 'lose' && <p className="text-xl font-bold text-rose-400">Bot took this round! 🤖</p>}
          {result === 'draw' && <p className="text-xl font-bold text-amber-300">Stalemate! Draw! 🤝</p>}
        </div>
      )}

      {/* Choice Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {CHOICES.map(c => (
          <button
            key={c.id}
            onClick={() => play(c.id)}
            disabled={isShaking}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-purple-900/30 border border-slate-700 hover:border-purple-500/50 transition-all flex flex-col items-center gap-1 cursor-pointer active:scale-95 group"
          >
            <span className="text-3xl group-hover:scale-125 transition-transform">{c.icon}</span>
            <span className="text-xs font-semibold text-slate-200 mt-1">{c.label}</span>
          </button>
        ))}
      </div>

      {/* Scoreboard stats */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex justify-center gap-6 text-xs text-slate-400 font-mono">
        <span>Won: <strong className="text-emerald-400">{stats.wins}</strong></span>
        <span>Lost: <strong className="text-rose-400">{stats.losses}</strong></span>
        <span>Ties: <strong className="text-amber-400">{stats.draws}</strong></span>
      </div>
    </div>
  );
};
