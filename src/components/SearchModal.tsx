import React, { useState, useEffect } from 'react';
import { ENTERTAINMENT_ITEMS } from '../data/items';
import { sound } from '../services/sound';
import { CategoryIcon } from './CategoryIcon';
import { MASCOT } from '../assets/mascot';
import { Search, X, Play, Clock, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (componentId: string, categoryId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectItem }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.trim().toLowerCase();
  const results = normalized === ''
    ? ENTERTAINMENT_ITEMS.slice(0, 8) // show top suggestions
    : ENTERTAINMENT_ITEMS.filter(item =>
        item.title.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.tags.some(t => t.toLowerCase().includes(normalized)) ||
        item.category.toLowerCase().includes(normalized)
      );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search The Entertainment"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#121829] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-scale"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-4 border-b border-slate-800 gap-3 bg-slate-900/90">
          <Search className="w-5 h-5 text-purple-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search games, riddles, toys, trivia, ambient sounds..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-lg"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 font-mono"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-800/60">
          {results.length > 0 ? (
            results.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  sound.playPop();
                  onSelectItem(item.componentId, item.category);
                  onClose();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-800/60 transition-colors flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    <CategoryIcon category={item.category} size="sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.timeEstimate}
                  </span>
                  <Play className="w-3.5 h-3.5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                <img src={MASCOT.thinking} alt="Cosmo thinking" className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-slate-300 text-sm">No discoveries found for "{query}"</p>
              <p className="mt-1 text-slate-400">Cosmo suggests searching for "game", "bubbles", "trivia", "rain", or "joke"</p>
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>{results.length} discoveries found</span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
