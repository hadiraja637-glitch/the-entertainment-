import React, { useState } from 'react';
import { sound } from '../../services/sound';
import { RefreshCw, Lock, Unlock, Copy, Check } from 'lucide-react';

interface Swatch {
  id: string;
  hex: string;
  isLocked: boolean;
}

const generateRandomPastel = (): string => {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 30) + 65; // 65-95%
  const l = Math.floor(Math.random() * 20) + 65; // 65-85%

  // Convert HSL to Hex
  const a = s * Math.min(l, 100 - l) / 10000;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

export const PaletteGenerator: React.FC = () => {
  const [swatches, setSwatches] = useState<Swatch[]>([
    { id: '1', hex: '#E0BBE4', isLocked: false },
    { id: '2', hex: '#957DAD', isLocked: false },
    { id: '3', hex: '#D291BC', isLocked: false },
    { id: '4', hex: '#FEC8D8', isLocked: false },
    { id: '5', hex: '#FFDFD3', isLocked: false },
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const shufflePalette = () => {
    sound.playPop();
    setSwatches(prev =>
      prev.map(swatch => (swatch.isLocked ? swatch : { ...swatch, hex: generateRandomPastel() }))
    );
  };

  const toggleLock = (id: string) => {
    sound.playBlip(350);
    setSwatches(prev =>
      prev.map(swatch => (swatch.id === id ? { ...swatch, isLocked: !swatch.isLocked } : swatch))
    );
  };

  const copyHex = (id: string, hex: string) => {
    navigator.clipboard.writeText(hex);
    sound.playSuccess();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎨</span>
          <h3 className="font-bold text-lg text-slate-100">Pastel Palette Lab</h3>
        </div>
        <button
          onClick={shufflePalette}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-all active:scale-95 cursor-pointer shadow-md shadow-purple-500/20"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Generate New</span>
        </button>
      </div>

      <p className="text-xs text-slate-400 mb-6">
        Lock colors you love and tap generate to find matching aesthetic harmonies.
      </p>

      {/* Palette cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
        {swatches.map(swatch => (
          <div
            key={swatch.id}
            className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex flex-col shadow-md"
          >
            <div
              style={{ backgroundColor: swatch.hex }}
              className="h-24 sm:h-28 w-full transition-colors duration-300 relative group flex items-center justify-center"
            >
              <button
                onClick={() => toggleLock(swatch.id)}
                className={`p-1.5 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                  swatch.isLocked
                    ? 'bg-black/60 text-amber-300 opacity-100'
                    : 'bg-black/40 text-white/80 opacity-0 group-hover:opacity-100'
                }`}
                title={swatch.isLocked ? 'Unlock color' : 'Lock color'}
              >
                {swatch.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="p-2 flex items-center justify-between bg-slate-950">
              <span className="font-mono text-[11px] font-bold text-slate-200">{swatch.hex}</span>
              <button
                onClick={() => copyHex(swatch.id, swatch.hex)}
                className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                title="Copy Hex"
              >
                {copiedId === swatch.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
