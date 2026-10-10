import React, { useState } from 'react';
import { sound } from '../../services/sound';
import { Copy, Check, Shuffle } from 'lucide-react';

const PRESETS = [
  { c1: '#8b5cf6', c2: '#ec4899', c3: '#3b82f6', angle: 135 },
  { c1: '#06b6d4', c2: '#3b82f6', c3: '#9333ea', angle: 90 },
  { c1: '#f43f5e', c2: '#fb923c', c3: '#facc15', angle: 45 },
  { c1: '#10b981', c2: '#06b6d4', c3: '#3b82f6', angle: 180 },
  { c1: '#a855f7', c2: '#6366f1', c3: '#ec4899', angle: 220 },
];

export const GradientGenerator: React.FC = () => {
  const [color1, setColor1] = useState('#8b5cf6');
  const [color2, setColor2] = useState('#ec4899');
  const [color3, setColor3] = useState('#3b82f6');
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const gradientCss = `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;

  const copyCss = () => {
    navigator.clipboard.writeText(`background: ${gradientCss};`);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const randomize = () => {
    sound.playPop();
    const preset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
    setColor1(preset.c1);
    setColor2(preset.c2);
    setColor3(preset.c3);
    setAngle(preset.angle);
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌈</span>
          <h3 className="font-bold text-lg text-slate-100">Cosmic Gradient Studio</h3>
        </div>
        <button
          onClick={randomize}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Shuffle</span>
        </button>
      </div>

      <p className="text-xs text-slate-400 mb-6">
        Generate smooth multi-stop linear gradients and export ready-to-paste CSS.
      </p>

      {/* Preview */}
      <div
        style={{ background: gradientCss }}
        className="w-full h-40 rounded-2xl shadow-lg border border-white/10 flex items-center justify-center mb-6 transition-all duration-300"
      >
        <button
          onClick={copyCss}
          className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold font-mono flex items-center gap-2 hover:bg-black/80 transition-all cursor-pointer shadow-lg"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
          <span>{copied ? 'CSS Copied!' : 'Copy CSS'}</span>
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Start:</span>
          <input
            type="color"
            value={color1}
            onChange={e => setColor1(e.target.value)}
            className="w-8 h-8 rounded-lg bg-transparent cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Mid:</span>
          <input
            type="color"
            value={color2}
            onChange={e => setColor2(e.target.value)}
            className="w-8 h-8 rounded-lg bg-transparent cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">End:</span>
          <input
            type="color"
            value={color3}
            onChange={e => setColor3(e.target.value)}
            className="w-8 h-8 rounded-lg bg-transparent cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Angle: {angle}°</span>
        <input
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={e => setAngle(parseInt(e.target.value, 10))}
          className="w-48 accent-purple-500 cursor-pointer"
        />
      </div>
    </div>
  );
};
