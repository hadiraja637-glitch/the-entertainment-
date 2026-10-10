import React from 'react';
import { ENTERTAINMENT_ITEMS } from '../data/items';
import { COOL_WEBSITES } from '../data/content';
import { sound } from '../services/sound';
import { CategoryIcon } from './CategoryIcon';
import { MASCOT } from '../assets/mascot';
import { X, Star, Trash2, ExternalLink, Play } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onRemoveFavorite: (id: string) => void;
  onSelectItem: (componentId: string, categoryId: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectItem,
}) => {
  if (!isOpen) return null;

  // Resolve favorite items from ENTERTAINMENT_ITEMS or COOL_WEBSITES
  const favoriteEntries = favorites.map(id => {
    const item = ENTERTAINMENT_ITEMS.find(i => i.id === id);
    if (item) return { ...item, type: 'app' as const };
    const site = COOL_WEBSITES.find(s => s.id === id);
    if (site) return { ...site, title: site.name, type: 'site' as const, icon: site.emoji };
    return null;
  }).filter(Boolean);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved Favorites"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#121829] border-l border-slate-800 p-6 flex flex-col shadow-2xl overflow-hidden animate-slide-left"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-current" />
            <h3 className="font-bold text-slate-100 text-lg">Saved Favorites</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-amber-400/10 text-amber-300 border border-amber-400/20">
              {favorites.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Favorites list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {favoriteEntries.length > 0 ? (
            favoriteEntries.map((fav: any) => (
              <div
                key={fav.id}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 group hover:border-slate-700"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="shrink-0 p-1.5 rounded-xl bg-slate-950 border border-slate-800">
                    {fav.type === 'app' ? (
                      <CategoryIcon category={fav.category} size="sm" />
                    ) : (
                      <span className="text-xl">{fav.icon || '🌐'}</span>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-slate-200 truncate">{fav.title}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{fav.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {fav.type === 'app' ? (
                    <button
                      onClick={() => {
                        sound.playPop();
                        onSelectItem(fav.componentId, fav.category);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Open</span>
                    </button>
                  ) : (
                    <a
                      href={fav.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[11px] font-semibold flex items-center gap-1 hover:bg-teal-500/30 cursor-pointer"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      sound.playBlip();
                      onRemoveFavorite(fav.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-slate-500">
              <div className="w-20 h-20 mx-auto mb-3 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                <img src={MASCOT.hero} alt="Cosmo" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm font-bold text-slate-300">No favorites saved yet</p>
              <p className="text-xs mt-1 max-w-xs mx-auto text-slate-400">
                Tap the star icon on any game, tool, or gem to pin it here with Cosmo for instant 1-click access!
              </p>
            </div>
          )}
        </div>

        {favorites.length > 0 && (
          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              onClick={() => {
                if (window.confirm('Clear all saved favorites?')) {
                  favorites.forEach(id => onRemoveFavorite(id));
                }
              }}
              className="text-xs text-rose-400 hover:underline cursor-pointer"
            >
              Clear all saved favorites
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
