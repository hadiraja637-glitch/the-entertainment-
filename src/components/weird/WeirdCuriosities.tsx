import React, { useState } from 'react';
import { STRANGE_FACTS, OPTICAL_ILLUSIONS } from '../../data/content';
import { freshness } from '../../services/freshness';
import { sound } from '../../services/sound';
import { MASCOT } from '../../assets/mascot';
import { Shuffle, Eye, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export const WeirdCuriosities: React.FC = () => {
  const [currentFact, setCurrentFact] = useState(() => freshness.getNextFreshItem(STRANGE_FACTS, 'facts').item);
  const [factStats, setFactStats] = useState(() => freshness.getStats('facts', STRANGE_FACTS.length));
  const [activeIllusionId, setActiveIllusionId] = useState('ill1');

  const activeIllusion = OPTICAL_ILLUSIONS.find(i => i.id === activeIllusionId) || OPTICAL_ILLUSIONS[0];

  const nextFact = () => {
    sound.playPop();
    const result = freshness.getNextFreshItem(STRANGE_FACTS, 'facts', currentFact.id);
    setCurrentFact(result.item);
    setFactStats(freshness.getStats('facts', STRANGE_FACTS.length));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Verified Strange-But-True Facts */}
      <div className="bg-[#121829] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl shadow-inner">
              🛸
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Strange-But-True Fact Vault</h3>
              <p className="text-xs text-purple-300 font-mono">
                Freshness Engine: {factStats.seen} of {factStats.total} explored
              </p>
            </div>
          </div>
          <button
            onClick={nextFact}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-lg shadow-purple-600/20 self-start sm:self-auto"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Next Fact</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Every oddity here is strictly fact-checked and verified by scientific journals, space agencies, and museum archives.
        </p>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-left my-2 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {currentFact.topic}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Citation</span>
            </div>
          </div>

          <p className="text-base sm:text-xl font-bold text-slate-100 leading-relaxed my-3">
            "{currentFact.fact}"
          </p>

          <div className="mt-5 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <strong className="text-slate-300">Source:</strong> {currentFact.source}
          </div>
        </div>

        <p className="text-[11px] text-purple-300/80 text-right mt-2 font-mono">
          Discovered {factStats.seen} of {factStats.total} verified facts
        </p>
      </div>

      {/* 2. Interactive Optical Illusions */}
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌀</span>
            <h3 className="font-bold text-lg text-slate-100">Optical Illusions Laboratory</h3>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Original SVG & CSS visual illusions testing how the human retina and visual cortex process light, contrast, and edge detection.
        </p>

        {/* Tab selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {OPTICAL_ILLUSIONS.map(ill => (
            <button
              key={ill.id}
              onClick={() => {
                sound.playBlip();
                setActiveIllusionId(ill.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeIllusionId === ill.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {ill.title}
            </button>
          ))}
        </div>

        {/* Display Active Illusion */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
          {activeIllusion.type === 'hermann-grid' && (
            <div className="grid grid-cols-4 gap-2 bg-white p-3 rounded-lg max-w-[240px]">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-12 h-12 bg-black rounded-xs" />
              ))}
            </div>
          )}

          {activeIllusion.type === 'cafe-wall' && (
            <div className="w-full max-w-sm flex flex-col gap-1 py-4">
              {[0, 8, 16, 8, 0, 8].map((offset, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex h-5 border-b border-slate-400 overflow-hidden"
                  style={{ transform: `translateX(${offset}px)` }}
                >
                  {Array.from({ length: 12 }).map((_, colIdx) => (
                    <div
                      key={colIdx}
                      className={`w-8 h-full shrink-0 ${colIdx % 2 === 0 ? 'bg-black' : 'bg-white'}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeIllusion.type === 'motion-rings' && (
            <svg viewBox="0 0 200 200" className="w-52 h-52">
              <defs>
                <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </radialGradient>
              </defs>
              {[70, 55, 40, 25, 10].map((r, idx) => (
                <circle
                  key={idx}
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="6"
                  strokeDasharray={`${idx * 4 + 4} ${idx * 2 + 2}`}
                />
              ))}
            </svg>
          )}
        </div>

        {/* Explanation Card */}
        <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
          <h4 className="font-bold text-slate-100 text-sm mb-1">{activeIllusion.title}</h4>
          <p className="text-xs text-purple-300 font-medium mb-2">{activeIllusion.description}</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Why it happens:</strong> {activeIllusion.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
