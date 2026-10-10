import React, { useState } from 'react';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Dices, Sparkles, Plus, Trash2 } from 'lucide-react';

const DEFAULT_OPTIONS = ['Order Pizza 🍕', 'Make Tacos 🌮', 'Cook Pasta 🍝', 'Sushi Night 🍣', 'Thai Curry 🍛'];

export const RandomPicker: React.FC = () => {
  const [itemsText, setItemsText] = useState<string>(DEFAULT_OPTIONS.join('\n'));
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);

  const getList = () => {
    return itemsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);
  };

  const handlePick = () => {
    const list = getList();
    if (list.length < 2) {
      alert('Please enter at least 2 choices!');
      return;
    }

    setIsSpinning(true);
    setSelectedWinner(null);
    let counter = 0;
    const maxSpins = 20;

    const interval = setInterval(() => {
      counter++;
      const randIdx = Math.floor(Math.random() * list.length);
      setHighlightIdx(randIdx);
      sound.playPop();

      if (counter >= maxSpins) {
        clearInterval(interval);
        const finalWinner = list[Math.floor(Math.random() * list.length)];
        setSelectedWinner(finalWinner);
        setIsSpinning(false);
        sound.playSuccess();
        confetti({ particleCount: 50, spread: 70 });
      }
    }, 90);
  };

  const list = getList();

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <h3 className="font-bold text-lg text-slate-100">Random Decision Picker</h3>
        </div>
        <button
          onClick={() => setItemsText(DEFAULT_OPTIONS.join('\n'))}
          className="text-xs text-purple-400 hover:text-purple-300 underline"
        >
          Reset sample choices
        </button>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Stuck between choices? Write them below (one per line) and let the cosmic decider choose!
      </p>

      {/* Textarea */}
      <textarea
        rows={4}
        value={itemsText}
        onChange={e => setItemsText(e.target.value)}
        disabled={isSpinning}
        placeholder="Enter your choices, one per line..."
        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 mb-4 resize-none"
      />

      {/* Visual Carousel/Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[40px]">
        {list.map((item, idx) => (
          <span
            key={idx}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              highlightIdx === idx
                ? 'bg-purple-500 text-white scale-110 shadow-lg shadow-purple-500/40 ring-2 ring-purple-300'
                : selectedWinner === item
                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400 scale-105'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Winner Spotlight */}
      {selectedWinner && !isSpinning && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-purple-900/40 border border-purple-500/40 animate-scale">
          <p className="text-xs uppercase tracking-widest text-purple-300 font-bold mb-1">Cosmic Choice Selected</p>
          <p className="text-2xl font-black text-white">{selectedWinner}</p>
        </div>
      )}

      {/* Spin Button */}
      <button
        onClick={handlePick}
        disabled={isSpinning || list.length < 2}
        className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
          isSpinning || list.length < 2
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/20 active:scale-[0.98]'
        }`}
      >
        <Dices className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
        <span>{isSpinning ? 'Deciding...' : 'Pick for Me!'}</span>
      </button>
    </div>
  );
};
