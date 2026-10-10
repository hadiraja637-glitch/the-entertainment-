import React, { useState, useEffect } from 'react';
import { CategoryId } from './types';
import { CATEGORIES } from './data/categories';
import { ENTERTAINMENT_ITEMS } from './data/items';
import { sound } from './services/sound';
import { MASCOT } from './assets/mascot';
import confetti from 'canvas-confetti';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MoodSelector } from './components/MoodSelector';
import { QuickFunBar } from './components/QuickFunBar';
import { CategoryView } from './components/CategoryView';
import { SearchModal } from './components/SearchModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AboutModal, PrivacyModal } from './components/Modals';
import { SponsoredPlacement } from './components/SponsoredPlacement';
import { CategoryIcon } from './components/CategoryIcon';
import { CosmoCompanion } from './components/CosmoCompanion';

import {
  Sparkles,
  Play,
  Star,
  Clock,
  Compass,
  ArrowRight,
  Zap,
  Flame,
  Award,
  Volume2
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentCategory, setCurrentCategory] = useState<CategoryId | 'home'>(() => {
    const hash = window.location.hash.replace('#', '') as CategoryId;
    if (CATEGORIES.some(c => c.id === hash)) {
      return hash;
    }
    return 'home';
  });

  const [activeComponentId, setActiveComponentId] = useState<string | undefined>(undefined);

  // Favorites in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('te_favorites');
      return saved ? JSON.parse(saved) : ['play-clicker', 'play-reaction', 'satisfying-bubbles'];
    } catch {
      return ['play-clicker', 'play-reaction', 'satisfying-bubbles'];
    }
  });

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as CategoryId;
      if (CATEGORIES.some(c => c.id === hash)) {
        setCurrentCategory(hash);
      } else if (!window.location.hash || window.location.hash === '#home') {
        setCurrentCategory('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToCategory = (cat: CategoryId | 'home', componentId?: string) => {
    setCurrentCategory(cat);
    setActiveComponentId(componentId);
    window.location.hash = cat === 'home' ? '' : `#${cat}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    sound.playPop();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('te_favorites', JSON.stringify(next));
      return next;
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.filter(item => item !== id);
      localStorage.setItem('te_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Surprise Me Action
  const handleSurpriseMe = () => {
    sound.playSuccess();
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.3 } });
    const randomItem = ENTERTAINMENT_ITEMS[Math.floor(Math.random() * ENTERTAINMENT_ITEMS.length)];
    navigateToCategory(randomItem.category, randomItem.componentId);
  };

  // Reset all local storage data
  const handleResetLocalData = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all local playground data? This will clear saved favorites, local high scores, and content freshness histories.'
      )
    ) {
      localStorage.clear();
      setFavorites([]);
      sound.playBlip();
      alert('All local data and freshness caches have been reset.');
      window.location.reload();
    }
  };

  // Featured list for Home Page
  const featuredItems = ENTERTAINMENT_ITEMS.filter(item => item.featured);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col cosmic-gradient">
      {/* Header */}
      <Header
        currentCategory={currentCategory}
        onNavigateCategory={cat => navigateToCategory(cat)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        favoritesCount={favorites.length}
        onSurpriseMe={handleSurpriseMe}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentCategory === 'home' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* CINEMATIC HERO SECTION WITH ORIGINAL 3D ROBOT MASCOT */}
            <section className="relative pt-8 pb-16 sm:pt-16 sm:pb-20 overflow-hidden">
              {/* Atmospheric Background Lighting */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-600/15 to-cyan-500/15 blur-3xl -z-10 animate-glow-pulse" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Hero Column: Copy & Actions */}
                <div className="lg:col-span-7 text-center lg:text-left z-10">
                  {/* Eyebrow badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold mb-6 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>The Internet Playground • Meet Cosmo!</span>
                  </div>

                  {/* Exact required headline */}
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight sm:leading-none">
                    BORED? GOOD.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-amber-300">
                      YOU'RE IN THE RIGHT PLACE.
                    </span>
                  </h1>

                  {/* Exact required supporting copy */}
                  <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Tiny games, ridiculous questions, satisfying toys, and unexpected internet adventures. Pick a vibe and disappear into the fun.
                  </p>

                  {/* Call-to-action buttons */}
                  <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <button
                      onClick={() => {
                        sound.playPop();
                        const el = document.getElementById('categories-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-purple-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Enter the Fun</span>
                    </button>

                    <button
                      onClick={handleSurpriseMe}
                      className="px-7 py-3.5 rounded-2xl bg-[#141b2d] hover:bg-[#1a233a] border border-slate-700/80 hover:border-slate-500 text-slate-200 font-bold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shadow-lg"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Surprise Me</span>
                    </button>
                  </div>
                </div>

                {/* Right Hero Column: 3D Mascot Showcase */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center z-10">
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => {
                      sound.playSuccess();
                      confetti({ particleCount: 45, spread: 60 });
                    }}
                  >
                    {/* Glowing aura */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/40 via-cyan-400/30 to-pink-500/30 blur-2xl group-hover:scale-110 transition-transform -z-10" />

                    {/* Mascot 3D Hero Artwork */}
                    <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-purple-400/40 shadow-2xl bg-[#121829] relative animate-float-slow group-hover:border-amber-400 transition-colors">
                      <img
                        src={MASCOT.hero}
                        alt="Cosmo original 3D robot mascot waving"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Speech bubble sticker */}
                    <div className="absolute -bottom-3 -right-2 sm:-right-4 px-4 py-2 rounded-2xl bg-[#121829]/95 border border-cyan-400/50 shadow-xl backdrop-blur-md text-xs font-bold text-cyan-200 flex items-center gap-1.5 animate-bounce">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                      <span>"Hi! I'm Cosmo! Tap me!"</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* B. PICK YOUR MOOD SECTION */}
            <MoodSelector
              onSelectMood={(categoryId, componentId) => navigateToCategory(categoryId, componentId)}
            />

            {/* D. QUICK FUN BAR */}
            <QuickFunBar
              onOpenItem={(comp, cat) => navigateToCategory(cat as any, comp)}
            />

            {/* C. FEATURED DISCOVERIES */}
            <section className="my-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Curated Picks
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Featured Discoveries</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Original mini-games, sensory canvas toys, and tested puzzles ready to play.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredItems.map(item => {
                  const isFav = favorites.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-3xl bg-[#121829] border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
                            <CategoryIcon category={item.category} size="sm" />
                          </div>
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isFav ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
                            }`}
                            title={isFav ? 'Remove favorite' : 'Add to favorites'}
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                        </div>

                        <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 block mb-1">
                          {CATEGORIES.find(c => c.id === item.category)?.name}
                        </span>

                        <h3 className="font-extrabold text-slate-100 text-sm group-hover:text-purple-300 transition-colors mb-1.5">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {item.timeEstimate}
                        </span>

                        <button
                          onClick={() => {
                            sound.playPop();
                            navigateToCategory(item.category, item.componentId);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <span>Launch</span>
                          <Play className="w-3 h-3 fill-current" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* E. EXPLORE ALL 10 CATEGORIES */}
            <section id="categories-section" className="my-16 scroll-mt-20">
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20">
                  Full Catalogue
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  Explore All 10 Entertainment Vaults
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg mx-auto">
                  Every category has a dedicated playground filled with original games, sensory tools, quizzes, and discoveries.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playPop();
                      navigateToCategory(cat.id);
                    }}
                    className="p-6 rounded-3xl bg-[#121829] border border-slate-800 hover:border-purple-500/40 text-left transition-all hover:scale-[1.02] hover:-translate-y-1 cursor-pointer group shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
                          <CategoryIcon category={cat.id} size="md" />
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${cat.badgeBg}`}>
                          {cat.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-white group-hover:text-purple-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs font-semibold text-purple-400 mt-0.5 mb-2">
                        {cat.tagline}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-semibold group-hover:text-white transition-colors">
                      <span>Open vault</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-purple-400" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Optional Monetag Sponsored Link Placeholder */}
            <SponsoredPlacement variant="banner" className="my-10" />
          </div>
        ) : (
          /* CATEGORY PAGE VIEW */
          <CategoryView
            categoryId={currentCategory}
            activeComponentId={activeComponentId}
            onBackToHome={() => navigateToCategory('home')}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onSelectComponent={comp => setActiveComponentId(comp)}
          />
        )}
      </main>

      {/* FOOTER */}
      <Footer
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onResetLocalData={handleResetLocalData}
      />

      {/* FLOATING 3D COSMO MASCOT COMPANION */}
      <CosmoCompanion
        onSurpriseMe={handleSurpriseMe}
        onOpenJokes={() => navigateToCategory('lol', 'jokes')}
        onOpenChill={() => navigateToCategory('midnight', 'ambient')}
      />

      {/* SEARCH MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={(componentId, categoryId) => {
          navigateToCategory(categoryId as any, componentId);
        }}
      />

      {/* FAVORITES DRAWER */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        onSelectItem={(componentId, categoryId) => {
          navigateToCategory(categoryId as any, componentId);
        }}
      />

      {/* ABOUT MODAL */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* PRIVACY MODAL */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
