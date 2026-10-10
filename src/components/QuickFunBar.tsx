import React, { useState } from 'react';
import { JOKES, WOULD_YOU_RATHER } from '../data/content';
import { sound } from '../services/sound';
import { Shuffle, Zap, HelpCircle, Dices, ArrowRight } from 'lucide-react';

interface QuickFunBarProps {
  onOpenItem: (componentId: string, categoryId: string) => void;
}

export const QuickFunBar: React.FC<QuickFunBarProps> = ({ onOpenItem }) => {
  const [activeTab, setActiveTab] = useState<'joke' | 'coin' | 'wyr'>('joke');
  const [jokeIdx, setJokeIdx] = useState(0);
  const [coinResult, setCoinResult] = useState<'Heads 🪙' | 'Tails 🌙' | null>(null);
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [wyrIdx, setWyrIdx] = useState(0);
  const [voted, setVoted] = useState<'A' | 'B' | null>(null);

  const joke = JOKES[jokeIdx];
  const wyr = WOULD_YOU_RATHER[wyrIdx];

  const handleNextJoke = () => {
    sound.playPop();
    setJokeIdx(prev => (prev + 1) % JOKES.length);
  };

  const handleFlipCoin = () => {
    sound.playPop();
    setCoinFlipping(true);
    setCoinResult(null);

    setTimeout(() => {
      const res = Math.random() > 0.5 ? 'Heads 🪙' : 'Tails 🌙';
      setCoinResult(res);
      setCoinFlipping(false);
      sound.playSuccess();
    }, 400);
  };

  const handleNextWyr = () => {
    sound.playPop();
    setWyrIdx(prev => (prev + 1) % WOULD_YOU_RATHER.length);
    setVoted(null);
  };

  return (
    <section className="my-12 p-6 rounded-3xl bg-[#121829]/90 border border-slate-800 shadow-2xl max-w-5xl mx-auto backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
            Instant Play
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Quick Fun Right Now</h2>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              sound.playBlip();
              setActiveTab('joke');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'joke' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Instant Joke 😂
          </button>
          <button
            onClick={() => {
              sound.playBlip();
              setActiveTab('coin');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'coin' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cosmic Coin 🪙
          </button>
          <button
            onClick={() => {
              sound.playBlip();
              setActiveTab('wyr');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'wyr' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dilemma ⚖️
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'joke' && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-semibold text-slate-300">"{joke.setup}"</p>
            <p className="text-base font-black text-amber-300 mt-1">{joke.punchline}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleNextJoke}
              className="px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Another</span>
            </button>
            <button
              onClick={() => onOpenItem('jokes', 'lol')}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>LOL Factory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'coin' && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 ${coinFlipping ? 'animate-spin' : ''}`}>
              🪙
            </div>
            <div>
              <p className="text-xs text-slate-400">Can't decide between two options?</p>
              <p className="text-base font-black text-white mt-0.5">
                {coinResult ? coinResult : 'Flip to reveal cosmic fate'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFlipCoin}
              disabled={coinFlipping}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs transition-all active:scale-95 cursor-pointer"
            >
              Flip Coin
            </button>
            <button
              onClick={() => onOpenItem('picker', 'play')}
              className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:text-white cursor-pointer"
            >
              More Pickers
            </button>
          </div>
        </div>
      )}

      {activeTab === 'wyr' && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">Quick Dilemma:</p>
            <button
              onClick={handleNextWyr}
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
            >
              <Shuffle className="w-3 h-3" />
              <span>Shuffle</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                sound.playSuccess();
                setVoted('A');
              }}
              className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                voted === 'A' ? 'bg-purple-900/40 border-purple-400 text-purple-200' : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              A: {wyr.optionA}
            </button>
            <button
              onClick={() => {
                sound.playSuccess();
                setVoted('B');
              }}
              className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                voted === 'B' ? 'bg-cyan-900/40 border-cyan-400 text-cyan-200' : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              B: {wyr.optionB}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
