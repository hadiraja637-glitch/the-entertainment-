import React, { useState } from 'react';
import { sound } from '../../services/sound';
import { Copy, Check, Sliders } from 'lucide-react';

export const ColorMixer: React.FC = () => {
  const [red, setRed] = useState(140);
  const [green, setGreen] = useState(110);
  const [blue, setBlue] = useState(250);
  const [copied, setCopied] = useState(false);

  const rgbString = `rgb(${red}, ${green}, ${blue})`;
  const hex = `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1).toUpperCase()}`;

  const copyCode = () => {
    navigator.clipboard.writeText(hex);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧪</span>
          <h3 className="font-bold text-lg text-slate-100">Chromatic Color Mixer</h3>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-6">
        Blend red, green, and blue light channels to mix custom cosmic shades.
      </p>

      {/* Color Preview Swatch */}
      <div
        style={{ backgroundColor: rgbString }}
        className="w-full h-32 rounded-2xl shadow-inner border border-white/10 flex items-center justify-center transition-colors duration-200 mb-6 relative group"
      >
        <button
          onClick={copyCode}
          className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md text-white font-mono text-sm font-bold flex items-center gap-2 hover:bg-black/80 transition-all cursor-pointer shadow-lg"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
          <span>{copied ? 'Copied!' : hex}</span>
        </button>
      </div>

      {/* Sliders */}
      <div className="space-y-4 max-w-md mx-auto text-left">
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-rose-400">Red Channel</span>
            <span className="font-mono text-slate-300">{red}</span>
          </div>
          <input
            type="range"
            min="0"
            max="255"
            value={red}
            onChange={e => setRed(parseInt(e.target.value, 10))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-emerald-400">Green Channel</span>
            <span className="font-mono text-slate-300">{green}</span>
          </div>
          <input
            type="range"
            min="0"
            max="255"
            value={green}
            onChange={e => setGreen(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-sky-400">Blue Channel</span>
            <span className="font-mono text-slate-300">{blue}</span>
          </div>
          <input
            type="range"
            min="0"
            max="255"
            value={blue}
            onChange={e => setBlue(parseInt(e.target.value, 10))}
            className="w-full accent-sky-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
