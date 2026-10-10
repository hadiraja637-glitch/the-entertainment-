import React, { useState } from 'react';
import { ENTERTAINMENT_ITEMS } from '../../data/items';
import { sound } from '../../services/sound';
import { Clock, Play, Star, Sparkles } from 'lucide-react';

interface QuickEscapeProps {
  onSelectItem: (componentId: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const QuickEscape: React.FC<QuickEscapeProps> = ({
  onSelectItem,
  favorites,
  toggleFavorite,
}) => {
  const [timeFilter, setTimeFilter] = useState<'all' | '<1' | '1-3' | '3-5'>('all');

  const filteredItems = timeFilter === 'all'
    ? ENTERTAINMENT_ITEMS
    : ENTERTAINMENT_ITEMS.filter(item => item.timeCategory === timeFilter);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">⏳</span>
          <h3 className="font-bold text-lg text-slate-100">Quick Escape: Five-Minute Haven</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Got a tiny coffee break or a few minutes between tasks? Filter instant mini-adventures by how much time you have.
        </p>

        {/* Time filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {[
            { id: 'all', label: 'All Activities', desc: 'Any duration' },
            { id: '<1', label: 'Under 1 Minute', desc: 'Instant micro-boost' },
            { id: '1-3', label: '1 to 3 Minutes', desc: 'Quick coffee break' },
            { id: '3-5', label: '3 to 5 Minutes', desc: 'Complete reset' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                sound.playBlip();
                setTimeFilter(f.id as any);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                timeFilter === f.id
                  ? 'bg-sky-500/20 border-sky-400 ring-1 ring-sky-400/40 text-sky-200 shadow-md shadow-sky-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-xs">{f.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{f.desc}</div>
            </button>
          ))}
        </div>

        {/* List of matched activities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredItems.map(item => {
            const isFav = favorites.includes(item.id);

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                        isFav ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={isFav ? 'Remove favorite' : 'Add favorite'}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-100 text-xs mb-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] text-sky-400 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{item.timeEstimate}</span>
                  </span>

                  <button
                    onClick={() => {
                      sound.playPop();
                      onSelectItem(item.componentId);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>Play</span>
                    <Play className="w-2.5 h-2.5 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
