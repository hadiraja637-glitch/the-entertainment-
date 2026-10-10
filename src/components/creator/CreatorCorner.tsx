import React, { useState } from 'react';
import { sound } from '../../services/sound';
import { Dices, Copy, Check, Sparkles, Video, Compass, Zap } from 'lucide-react';

const NICHES = ['Gaming', 'Tech & Coding', 'Productivity', 'Cooking', 'Mindset', 'Art & Design', 'Science'];
const FORMATS = ['I spent 7 days testing...', 'The hidden psychology behind...', 'Stop doing this mistake...', 'Ranking every single...', 'How I secretly improved...'];
const TWISTS = ['with zero budget', 'without telling anyone', 'using only vintage gear', 'in under 10 minutes', 'like a complete beginner'];

const HOOKS = [
  'Almost everyone gets this completely backward...',
  'If you only learn one thing about this today, make it this:',
  'Here is what nobody tells you about starting out:',
  'I tested this weird trick for 48 hours so you don’t have to.',
  'Do not make this painful mistake before you see this:',
  'The simplest trick that completely changed how I work:'
];

export const CreatorCorner: React.FC = () => {
  const [niche, setNiche] = useState('Tech & Coding');
  const [format, setFormat] = useState('I spent 7 days testing...');
  const [twist, setTwist] = useState('in under 10 minutes');

  const [hookIndex, setHookIndex] = useState(0);
  const [copiedHook, setCopiedHook] = useState(false);
  const [copiedIdea, setCopiedIdea] = useState(false);

  const spinIdea = () => {
    sound.playSuccess();
    setNiche(NICHES[Math.floor(Math.random() * NICHES.length)]);
    setFormat(FORMATS[Math.floor(Math.random() * FORMATS.length)]);
    setTwist(TWISTS[Math.floor(Math.random() * TWISTS.length)]);
    setCopiedIdea(false);
  };

  const spinHook = () => {
    sound.playPop();
    setHookIndex(prev => (prev + 1) % HOOKS.length);
    setCopiedHook(false);
  };

  const copyIdea = () => {
    const text = `Video Concept [${niche}]: "${format} ${twist}"`;
    navigator.clipboard.writeText(text);
    sound.playSuccess();
    setCopiedIdea(true);
    setTimeout(() => setCopiedIdea(false), 1200);
  };

  const copyHook = () => {
    navigator.clipboard.writeText(HOOKS[hookIndex]);
    sound.playSuccess();
    setCopiedHook(true);
    setTimeout(() => setCopiedHook(false), 1200);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Video Idea Slot Machine */}
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎰</span>
            <h3 className="font-bold text-lg text-slate-100">Video Idea Roulette</h3>
          </div>
          <button
            onClick={spinIdea}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/40 text-xs font-semibold hover:bg-orange-500/30 transition-all cursor-pointer"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Spin Concept</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Spin rule-based creative combinations across niches, formats, and surprising narrative angles.
        </p>

        {/* Roulette slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block mb-1">Niche</span>
            <p className="font-bold text-slate-200 text-sm">{niche}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] uppercase tracking-wider font-bold text-purple-400 block mb-1">Core Hook</span>
            <p className="font-bold text-purple-200 text-sm">{format}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 block mb-1">Angle / Twist</span>
            <p className="font-bold text-amber-200 text-sm">{twist}</p>
          </div>
        </div>

        {/* Combined Idea */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between mt-4">
          <div>
            <span className="text-xs text-slate-400">Generated Video Title:</span>
            <p className="text-sm font-bold text-slate-100 mt-0.5">
              "{format} {twist}"
            </p>
          </div>
          <button
            onClick={copyIdea}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedIdea ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedIdea ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* 2. Short-Form Hook Generator */}
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪝</span>
            <h3 className="font-bold text-lg text-slate-100">3-Second Short Form Hook Sparks</h3>
          </div>
          <button
            onClick={spinHook}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-semibold hover:bg-purple-600/50 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Next Hook</span>
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between my-2">
          <p className="text-base font-bold text-slate-100">"{HOOKS[hookIndex]}"</p>
          <button
            onClick={copyHook}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ml-4"
          >
            {copiedHook ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedHook ? 'Copied' : 'Copy Hook'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
