import React, { useState, useEffect } from 'react';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { RotateCcw, Zap, Sparkles, TrendingUp } from 'lucide-react';

export const ClickerGame: React.FC = () => {
  const [stardust, setStardust] = useState<number>(() => {
    const saved = localStorage.getItem('te_clicker_stardust');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [clickPower, setClickPower] = useState<number>(() => {
    const saved = localStorage.getItem('te_clicker_power');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [autoDrones, setAutoDrones] = useState<number>(() => {
    const saved = localStorage.getItem('te_clicker_drones');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  // Save progress
  useEffect(() => {
    localStorage.setItem('te_clicker_stardust', stardust.toString());
    localStorage.setItem('te_clicker_power', clickPower.toString());
    localStorage.setItem('te_clicker_drones', autoDrones.toString());
  }, [stardust, clickPower, autoDrones]);

  // Auto stardust generator interval
  useEffect(() => {
    if (autoDrones <= 0) return;
    const interval = setInterval(() => {
      setStardust(prev => prev + autoDrones);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoDrones]);

  const droneCost = Math.floor(15 * Math.pow(1.35, autoDrones));
  const powerCost = Math.floor(25 * Math.pow(1.5, clickPower - 1));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const gained = clickPower;
    const nextStardust = stardust + gained;
    setStardust(nextStardust);
    sound.playPop();

    // Floating +score visual
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + (Math.random() * 20 - 10);
    const y = e.clientY - rect.top - 10;
    const newId = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev.slice(-6), { id: newId, text: `+${gained}`, x, y }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(item => item.id !== newId));
    }, 800);

    // High Score Milestone Celebration check
    if (nextStardust >= 100 && stardust < 100) {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    } else if (nextStardust >= 500 && stardust < 500) {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
    }
  };

  const buyPower = () => {
    if (stardust >= powerCost) {
      setStardust(prev => prev - powerCost);
      setClickPower(prev => prev + 1);
      sound.playSuccess();
    }
  };

  const buyDrone = () => {
    if (stardust >= droneCost) {
      setStardust(prev => prev - droneCost);
      setAutoDrones(prev => prev + 1);
      sound.playSuccess();
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all cosmic stardust and upgrades?')) {
      setStardust(0);
      setClickPower(1);
      setAutoDrones(0);
      sound.playBlip();
    }
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <h3 className="font-bold text-lg text-slate-100">Cosmic Star Clicker</h3>
        </div>
        <button
          onClick={handleReset}
          title="Reset Clicker"
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="my-6">
        <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400">
          {stardust.toLocaleString()}
        </div>
        <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">Cosmic Stardust Harvested</p>
        <p className="text-xs text-indigo-300/80 mt-1">
          +{autoDrones}/sec passive • +{clickPower} per click
        </p>
      </div>

      {/* Main Click Target */}
      <div className="relative inline-block my-2">
        <button
          onClick={handleClick}
          className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 shadow-lg shadow-purple-500/25 active:scale-95 hover:scale-105 transition-all flex items-center justify-center cursor-pointer select-none group border-4 border-purple-400/30"
        >
          <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform select-none filter drop-shadow">
            ✨
          </span>
        </button>

        {/* Floating text effects */}
        {floatingTexts.map(item => (
          <span
            key={item.id}
            style={{ left: `${item.x}px`, top: `${item.y}px` }}
            className="pointer-events-none absolute font-bold text-amber-300 text-sm animate-bounce"
          >
            {item.text}
          </span>
        ))}
      </div>

      {/* Upgrades */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-left">
        <button
          onClick={buyPower}
          disabled={stardust < powerCost}
          className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
            stardust >= powerCost
              ? 'bg-purple-900/20 border-purple-500/40 hover:bg-purple-900/40 text-purple-200 cursor-pointer'
              : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60 cursor-not-allowed'
          }`}
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Cosmic Beam (Lvl {clickPower})</span>
            </div>
            <p className="text-[11px] text-slate-400">+1 Stardust per click</p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300">{powerCost} ⭐</span>
        </button>

        <button
          onClick={buyDrone}
          disabled={stardust < droneCost}
          className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
            stardust >= droneCost
              ? 'bg-pink-900/20 border-pink-500/40 hover:bg-pink-900/40 text-pink-200 cursor-pointer'
              : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60 cursor-not-allowed'
          }`}
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Probe Drone ({autoDrones})</span>
            </div>
            <p className="text-[11px] text-slate-400">+1 Stardust per second</p>
          </div>
          <span className="text-xs font-mono font-bold text-pink-300">{droneCost} ⭐</span>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
        <span>Tip: Keep harvesting to unlock passive drones!</span>
      </div>
    </div>
  );
};
