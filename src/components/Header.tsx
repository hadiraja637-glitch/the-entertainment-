import React, { useState } from 'react';
import { sound } from '../services/sound';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types';
import { MASCOT } from '../assets/mascot';
import { Search, Sparkles, Star, Volume2, VolumeX, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentCategory: CategoryId | 'home';
  onNavigateCategory: (cat: CategoryId | 'home') => void;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
  onSurpriseMe: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onNavigateCategory,
  onOpenSearch,
  onOpenFavorites,
  favoritesCount,
  onSurpriseMe,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMute = () => {
    const nextState = !isMuted;
    sound.setMuted(nextState);
    setIsMuted(nextState);
    if (!nextState) sound.playBlip();
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0b0f19]/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & 3D Mascot Brandmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sound.playPop();
              onNavigateCategory('home');
            }}
            className="flex items-center gap-2.5 cursor-pointer group text-left"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-purple-400/60 shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform bg-[#121829] shrink-0">
              <img
                src={MASCOT.logo}
                alt="The Entertainment logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 group-hover:brightness-110 transition-all">
                The Entertainment
              </span>
              <p className="hidden md:block text-[10px] text-purple-400/80 font-medium tracking-wide">
                Your Little Corner of the Internet
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-300">
          <button
            onClick={() => {
              sound.playBlip();
              onNavigateCategory('home');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              currentCategory === 'home'
                ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm'
                : 'hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Home Hub
          </button>
          {CATEGORIES.slice(0, 6).map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playBlip();
                onNavigateCategory(cat.id);
              }}
              className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentCategory === cat.id
                  ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm'
                  : 'hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Search Trigger */}
          <button
            onClick={() => {
              sound.playBlip();
              onOpenSearch();
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white flex items-center gap-2 text-xs transition-colors cursor-pointer"
            title="Search discoveries (Ctrl+K or /)"
          >
            <Search className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="hidden lg:inline text-slate-400">Search playground...</span>
          </button>

          {/* Surprise Me Button */}
          <button
            onClick={onSurpriseMe}
            className="px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black text-xs shadow-md shadow-purple-500/25 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            title="Teleport to a random game or activity"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Surprise Me!</span>
          </button>

          {/* Saved Favorites Trigger */}
          <button
            onClick={() => {
              sound.playBlip();
              onOpenFavorites();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white transition-colors cursor-pointer relative"
            title="View saved favorites"
          >
            <Star className="w-4 h-4 text-amber-400" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute synthesized audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white xl:hidden cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#121829] border-b border-slate-800 p-4 space-y-3 animate-fade-in shadow-2xl">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-1 mb-2">
            Explore All 10 Categories
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                sound.playBlip();
                onNavigateCategory('home');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-2xl text-left text-xs font-bold flex items-center gap-2 cursor-pointer ${
                currentCategory === 'home'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              <span>🏠</span>
              <span>Home Hub</span>
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playBlip();
                  onNavigateCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-2xl text-left text-xs font-bold flex items-center gap-2 cursor-pointer ${
                  currentCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="truncate">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
