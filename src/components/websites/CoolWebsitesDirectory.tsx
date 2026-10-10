import React, { useState } from 'react';
import { COOL_WEBSITES } from '../../data/content';
import { sound } from '../../services/sound';
import { ExternalLink, Star, ShieldCheck, AlertCircle } from 'lucide-react';

interface CoolWebsitesDirectoryProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const CoolWebsitesDirectory: React.FC<CoolWebsitesDirectoryProps> = ({
  favorites,
  toggleFavorite,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const handleGemClick = (e: React.MouseEvent<HTMLAnchorElement>, realUrl: string) => {
    e.preventDefault();
    const hasSeenAd = sessionStorage.getItem('monetag_triggered');

    if (!hasSeenAd) {
      window.open('https://uplcm.com/4/11990008', '_blank');
      sessionStorage.setItem('monetag_triggered', 'true');
    } else {
      window.open(realUrl, '_blank');
      sessionStorage.removeItem('monetag_triggered');
    }
  };
  
  const categories = ['All', ...new Set(COOL_WEBSITES.map(w => w.category))];

  const filtered = selectedTag === 'All'
    ? COOL_WEBSITES
    : COOL_WEBSITES.filter(w => w.category === selectedTag);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🌐</span>
          <h3 className="font-bold text-lg text-slate-100">Curated Internet Gems</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          A hand-selected directory of wholesome, artistic, and educational treasures from across the open web.
        </p>

        {/* Disclaimer banner required by prompt */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400 mb-6">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>External Links Notice:</strong> All links below lead to independent third-party websites. They open in a new tab with standard security protections (<code className="font-mono text-slate-300">rel="noopener noreferrer"</code>).
          </span>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                sound.playBlip();
                setSelectedTag(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedTag === cat
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(site => {
            const isFav = favorites.includes(site.id);

            return (
              <div
                key={site.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{site.emoji}</span>
                      <h4 className="font-bold text-slate-100 text-sm group-hover:text-teal-300 transition-colors">
                        {site.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => toggleFavorite(site.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isFav ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={isFav ? 'Remove favorite' : 'Add to favorites'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {site.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 font-medium text-[11px] border border-teal-500/20">
                    {site.category}
                  </span>

                  <a
                    href={site.url} 
                    onClick={(e) => handleGemClick(e, site.url)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 font-semibold text-teal-400 hover:text-teal-300 group-hover:underline cursor-pointer"
                 >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
