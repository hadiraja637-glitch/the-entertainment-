import React, { useState } from 'react';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Copy, Check, Shuffle, Sparkles, Wand2 } from 'lucide-react';

const EMOJI_BANK = ['🐱', '🤖', '👻', '🍕', '🚀', '🌺', '⚡', '🌙', '🧸', '🥑', '👾', '🔥'];

const USERNAME_THEMES = {
  cyberpunk: ['NeonPhantom', 'GlitchVortex', 'CyberDrifter', 'EchoViper', 'ZeroProtocol', 'PulseSamurai', 'ByteShadow'],
  cozy: ['VelvetLatte', 'MatchaMornings', 'SoftPebble', 'CozyRaindrops', 'QuietHoney', 'CloverMeadow', 'WarmBreeze'],
  fantasy: ['AstralWeaver', 'RuneWanderer', 'EmberKnight', 'MysticFalcon', 'LunarDruid', 'SilverGryphon', 'FrostSorcerer'],
  aesthetic: ['SolaceCloud', 'PaleStardust', 'QuietHaze', 'LushMirage', 'VelvetBloom', 'OpalDrift', 'AetherGlow']
};

const ASCII_TEMPLATES = [
  {
    name: 'Cosmic Star',
    art: `     .
    / \\
  =*(   )*=
    \\ /
     '`
  },
  {
    name: 'Sleepy Cat',
    art: ` /\\_/\\  
( o.o ) 
 > ^ <`
  },
  {
    name: 'Retro Robot',
    art: ` [o_o]
 /|_|\\
  / \\`
  },
  {
    name: 'Little Alien',
    art: ` .---.
| o_o |
 \\ - /
  | |`
  }
];

export const CreativeLab: React.FC = () => {
  // Emoji mashup state
  const [emoji1, setEmoji1] = useState('🐱');
  const [emoji2, setEmoji2] = useState('🚀');
  const [mashResult, setMashResult] = useState('Astro-Kitten 🌌');

  // Username generator state
  const [theme, setTheme] = useState<keyof typeof USERNAME_THEMES>('cyberpunk');
  const [currentUsername, setCurrentUsername] = useState('NeonPhantom');
  const [copiedUsername, setCopiedUsername] = useState(false);

  // ASCII state
  const [asciiCopiedIndex, setAsciiCopiedIndex] = useState<number | null>(null);

  const handleMixEmoji = () => {
    sound.playSuccess();
    const e1 = EMOJI_BANK[Math.floor(Math.random() * EMOJI_BANK.length)];
    const e2 = EMOJI_BANK[Math.floor(Math.random() * EMOJI_BANK.length)];
    setEmoji1(e1);
    setEmoji2(e2);

    const combos: Record<string, string> = {
      '🐱+🚀': 'Cosmic Astro-Cat 🐱🚀',
      '🤖+🍕': 'Robo-Pizza Courier 🤖🍕',
      '👻+🌙': 'Moonlight Specter 👻🌙',
      '👾+🔥': 'Pixel Fire Elemental 👾🔥',
    };
    const key = `${e1}+${e2}`;
    setMashResult(combos[key] || `Hybrid Wonder ${e1}${e2}`);
    confetti({ particleCount: 30, spread: 50 });
  };

  const handleGenerateUsername = () => {
    sound.playPop();
    const list = USERNAME_THEMES[theme];
    const picked = list[Math.floor(Math.random() * list.length)] + (Math.floor(Math.random() * 89) + 10);
    setCurrentUsername(picked);
    setCopiedUsername(false);
  };

  const copyUsername = () => {
    navigator.clipboard.writeText(currentUsername);
    sound.playSuccess();
    setCopiedUsername(true);
    setTimeout(() => setCopiedUsername(false), 1200);
  };

  const copyAscii = (art: string, idx: number) => {
    navigator.clipboard.writeText(art);
    sound.playSuccess();
    setAsciiCopiedIndex(idx);
    setTimeout(() => setAsciiCopiedIndex(null), 1200);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Emoji Mashup Studio */}
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl text-center">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧬</span>
            <h3 className="font-bold text-lg text-slate-100">Emoji Mashup Studio</h3>
          </div>
          <button
            onClick={handleMixEmoji}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Random Mashup</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Combine any two emojis to forge playful creature hybrids and concepts.
        </p>

        {/* Display */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center gap-6 my-4">
          <span className="text-5xl select-none animate-float-slow">{emoji1}</span>
          <span className="text-2xl font-black text-purple-400">+</span>
          <span className="text-5xl select-none animate-float-slow">{emoji2}</span>
          <span className="text-2xl font-black text-purple-400">=</span>
          <div className="px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 font-bold text-sm">
            {mashResult}
          </div>
        </div>
      </div>

      {/* 2. Cosmic Username Generator */}
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏷️</span>
            <h3 className="font-bold text-lg text-slate-100">Cosmic Handle Generator</h3>
          </div>
          <button
            onClick={handleGenerateUsername}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-semibold hover:bg-pink-500/30 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Spin Handle</span>
          </button>
        </div>

        {/* Theme pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(USERNAME_THEMES) as Array<keyof typeof USERNAME_THEMES>).map(t => (
            <button
              key={t}
              onClick={() => {
                setTheme(t);
                sound.playBlip();
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                theme === t
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Output */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <span className="font-mono text-lg font-bold text-slate-100 tracking-wide">{currentUsername}</span>
          <button
            onClick={copyUsername}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedUsername ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedUsername ? 'Copied!' : 'Copy Handle'}</span>
          </button>
        </div>
      </div>

      {/* 3. ASCII Art Gallery & Stamps */}
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">👾</span>
          <h3 className="font-bold text-lg text-slate-100">ASCII Art & Retro Stamps</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ASCII_TEMPLATES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-slate-300 mb-2">{item.name}</p>
                <pre className="font-mono text-xs text-purple-300 leading-tight bg-black/40 p-3 rounded-lg overflow-x-auto select-all">
                  {item.art}
                </pre>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => copyAscii(item.art, idx)}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  {asciiCopiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{asciiCopiedIndex === idx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
