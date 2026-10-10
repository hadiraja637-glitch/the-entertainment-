import React, { useState } from 'react';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { RotateCcw, HelpCircle, CheckCircle2, ArrowUp, ArrowDown } from 'lucide-react';

export const NumberGuesser: React.FC = () => {
  const [target, setTarget] = useState<number>(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'high' | 'low' | 'win' | 'invalid' } | null>(null);
  const [isWon, setIsWon] = useState<boolean>(false);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage({ text: 'Please enter a valid number between 1 and 100', type: 'invalid' });
      sound.playBuzz();
      return;
    }

    if (attempts.includes(num)) {
      setMessage({ text: `You already tried ${num}!`, type: 'invalid' });
      return;
    }

    sound.playPop();
    const updatedAttempts = [...attempts, num];
    setAttempts(updatedAttempts);
    setGuess('');

    if (num === target) {
      setIsWon(true);
      setMessage({ text: `Spot on! The secret number was indeed ${target}! 🎉`, type: 'win' });
      sound.playSuccess();
      confetti({ particleCount: 60, spread: 70 });
    } else if (num < target) {
      const diff = target - num;
      const hint = diff <= 5 ? 'Very warm! Slightly higher 📈' : 'Too low! Go higher ⬆️';
      setMessage({ text: hint, type: 'low' });
    } else {
      const diff = num - target;
      const hint = diff <= 5 ? 'Very warm! Slightly lower 📉' : 'Too high! Go lower ⬇️';
      setMessage({ text: hint, type: 'high' });
    }
  };

  const resetGame = () => {
    sound.playBlip();
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts([]);
    setMessage(null);
    setIsWon(false);
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔢</span>
          <h3 className="font-bold text-lg text-slate-100">Number Guessing Game</h3>
        </div>
        <button
          onClick={resetGame}
          title="New Number"
          className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-400 mb-6">
        I am thinking of an integer between <strong className="text-slate-200">1</strong> and{' '}
        <strong className="text-slate-200">100</strong>. Can you guess it in fewest tries?
      </p>

      {/* Input form */}
      {!isWon ? (
        <form onSubmit={handleGuess} className="flex gap-2 max-w-xs mx-auto mb-6">
          <input
            type="number"
            min="1"
            max="100"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            placeholder="1 - 100"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-lg font-bold text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            autoFocus
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-sm text-white transition-all active:scale-95 cursor-pointer"
          >
            Guess
          </button>
        </form>
      ) : (
        <div className="mb-6">
          <button
            onClick={resetGame}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white transition-all active:scale-95"
          >
            Play Again with New Number
          </button>
        </div>
      )}

      {/* Hint / Message */}
      {message && (
        <div
          className={`p-3 rounded-xl border text-sm font-semibold max-w-sm mx-auto mb-4 flex items-center justify-center gap-2 animate-scale ${
            message.type === 'win'
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
              : message.type === 'high'
              ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-300'
              : message.type === 'low'
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
              : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
          }`}
        >
          {message.type === 'win' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {message.type === 'high' && <ArrowDown className="w-4 h-4 text-indigo-400" />}
          {message.type === 'low' && <ArrowUp className="w-4 h-4 text-amber-400" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Attempt history */}
      {attempts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Attempts ({attempts.length}):</span>
          <div className="flex flex-wrap justify-center gap-1.5 mt-2">
            {attempts.map((num, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                  num === target
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
