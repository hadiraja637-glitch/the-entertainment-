import React, { useState } from 'react';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles } from 'lucide-react';

const BUBBLES_COUNT = 36;

export const BubblePopper: React.FC = () => {
  const [poppedMap, setPoppedMap] = useState<boolean[]>(Array(BUBBLES_COUNT).fill(false));
  const [totalPops, setTotalPops] = useState<number>(() => {
    const saved = localStorage.getItem('te_bubble_pops');
    return saved ? parseInt(saved, 10) : 0;
  });

  const handlePop = (index: number) => {
    if (poppedMap[index]) return;

    sound.playPop();
    const updated = [...poppedMap];
    updated[index] = true;
    setPoppedMap(updated);

    const newTotal = totalPops + 1;
    setTotalPops(newTotal);
    localStorage.setItem('te_bubble_pops', newTotal.toString());

    // If all are popped on board
    if (updated.every(Boolean)) {
      sound.playSuccess();
      confetti({ particleCount: 50, spread: 60 });
      // Reset sheet after short delay for infinite fun
      setTimeout(() => {
        setPoppedMap(Array(BUBBLES_COUNT).fill(false));
      }, 700);
    }
  };

  const resetSheet = () => {
    sound.playBlip();
    setPoppedMap(Array(BUBBLES_COUNT).fill(false));
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🫧</span>
          <h3 className="font-bold text-lg text-slate-100">Bubble Popper Delight</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400">
            Total Popped: <span className="font-mono font-bold text-pink-400">{totalPops}</span>
          </div>
          <button
            onClick={resetSheet}
            title="Reset Sheet"
            className="p-1.5 rounded-lg text-slate-400 hover:text-pink-400 hover:bg-pink-500/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-6">
        Click or tap the bubbles to pop them with satisfying synthesized audio clicks. Clear the sheet to regenerate!
      </p>

      {/* Bubble Grid */}
      <div className="grid grid-cols-6 gap-3 max-w-md mx-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        {poppedMap.map((isPopped, idx) => (
          <button
            key={idx}
            onClick={() => handlePop(idx)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer select-none ${
              isPopped
                ? 'bg-slate-950/80 border border-slate-800/80 scale-90 opacity-40 shadow-inner'
                : 'bg-gradient-to-tr from-pink-500/30 via-purple-500/30 to-cyan-400/30 border-2 border-pink-400/50 hover:border-pink-300 hover:scale-105 shadow-md shadow-pink-500/20 active:scale-90'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full transition-transform ${
                isPopped ? 'scale-0' : 'bg-white/40 shadow-sm'
              }`}
            />
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        <span>Synthesized popping sound generated directly with Web Audio API</span>
      </div>
    </div>
  );
};
