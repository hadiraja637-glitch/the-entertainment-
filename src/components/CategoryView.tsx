import React, { useState } from 'react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { ENTERTAINMENT_ITEMS } from '../data/items';
import { sound } from '../services/sound';
import { CategoryIcon } from './CategoryIcon';
import { ArrowLeft, Star, Play, Sparkles } from 'lucide-react';

// Category child tools & mini-games
import { LolFactory } from './lol/LolFactory';
import { ClickerGame } from './games/ClickerGame';
import { ReactionTest } from './games/ReactionTest';
import { MemoryMatch } from './games/MemoryMatch';
import { RockPaperScissors } from './games/RockPaperScissors';
import { TicTacToe } from './games/TicTacToe';
import { NumberGuesser } from './games/NumberGuesser';
import { RandomPicker } from './games/RandomPicker';
import { QuickTyping } from './games/QuickTyping';

import { BubblePopper } from './toys/BubblePopper';
import { ParticlePlayground } from './toys/ParticlePlayground';
import { DrawingCanvas } from './toys/DrawingCanvas';
import { ColorMixer } from './toys/ColorMixer';
import { GradientGenerator } from './toys/GradientGenerator';
import { HarmonicVisualizer } from './toys/HarmonicVisualizer';
import { PaletteGenerator } from './toys/PaletteGenerator';

import { BrainSnacks } from './brain/BrainSnacks';
import { MidnightCorner } from './midnight/MidnightCorner';
import { WeirdCuriosities } from './weird/WeirdCuriosities';
import { CreativeLab } from './creative/CreativeLab';
import { CreatorCorner } from './creator/CreatorCorner';
import { QuickEscape } from './escape/QuickEscape';
import { CoolWebsitesDirectory } from './websites/CoolWebsitesDirectory';
import { SponsoredPlacement } from './SponsoredPlacement';

interface CategoryViewProps {
  categoryId: CategoryId;
  activeComponentId?: string;
  onBackToHome: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onSelectComponent: (componentId: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categoryId,
  activeComponentId,
  onBackToHome,
  favorites,
  toggleFavorite,
  onSelectComponent,
}) => {
  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const items = ENTERTAINMENT_ITEMS.filter(i => i.category === categoryId);

  // Default active sub-game or tool for categories with multiple tools
  const [selectedSubTool, setSelectedSubTool] = useState<string>(() => {
    if (activeComponentId) return activeComponentId;
    return items[0]?.componentId || 'default';
  });

  // Keep synced if parent changes activeComponentId
  React.useEffect(() => {
    if (activeComponentId) {
      setSelectedSubTool(activeComponentId);
    } else if (items[0]) {
      setSelectedSubTool(items[0].componentId);
    }
  }, [activeComponentId, categoryId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      {/* Top Breadcrumb & Category Header */}
      <div className="mb-8">
        <button
          onClick={() => {
            sound.playBlip();
            onBackToHome();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121829] via-[#1a2238] to-[#121829] border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 border backdrop-blur-md bg-purple-500/10 border-purple-500/20 text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{category.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {category.name}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex items-center justify-center p-4 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl self-start md:self-auto">
            <CategoryIcon category={category.id} size="xl" />
          </div>
        </div>
      </div>

      {/* Sub-tools Tab bar if in Play Zone or Oddly Satisfying */}
      {categoryId === 'play' && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Select a Play Zone Mini-Game:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'clicker', label: 'Star Clicker ⭐' },
              { id: 'reaction', label: 'Reaction Reflex ⚡' },
              { id: 'memory', label: 'Memory Match 🃏' },
              { id: 'rps', label: 'Rock Paper Scissors ✊' },
              { id: 'tictactoe', label: 'Tic-Tac-Toe ❌' },
              { id: 'number-guess', label: 'Number Guess 🔢' },
              { id: 'picker', label: 'Decision Wheel 🎯' },
              { id: 'typing', label: 'Typing Sprint ⌨️' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playBlip();
                  setSelectedSubTool(tab.id);
                  onSelectComponent(tab.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSubTool === tab.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 scale-105'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {categoryId === 'satisfying' && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Select a Satisfying Sensory Toy:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'bubbles', label: 'Bubble Popper 🫧' },
              { id: 'particles', label: 'Particle Fountain ✨' },
              { id: 'draw', label: 'Glow Drawing 🎨' },
              { id: 'color-mix', label: 'Color Mixer 🧪' },
              { id: 'gradients', label: 'Gradient Studio 🌈' },
              { id: 'harmonic', label: 'Harmonic Waves 🌊' },
              { id: 'palette', label: 'Pastel Palettes 🎨' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playBlip();
                  setSelectedSubTool(tab.id);
                  onSelectComponent(tab.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSubTool === tab.id
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20 scale-105'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {categoryId === 'brain' && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Select a Brain Challenge Mode:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'daily-challenge', label: 'Daily Challenge 📅' },
              { id: 'trivia', label: 'Trivia Gauntlet 🧠' },
              { id: 'emoji-cipher', label: 'Emoji Cipher 🍿' },
              { id: 'scramble', label: 'Word Scramble 🔤' },
              { id: 'all-snacks', label: 'All Brain Snacks ✨' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playBlip();
                  setSelectedSubTool(tab.id);
                  onSelectComponent(tab.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSubTool === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Interactive Category Rendering */}
      <div className="my-6">
        {/* Category 1: LOL Factory */}
        {categoryId === 'lol' && <LolFactory />}

        {/* Category 2: Play Zone */}
        {categoryId === 'play' && (
          <div>
            {selectedSubTool === 'clicker' && <ClickerGame />}
            {selectedSubTool === 'reaction' && <ReactionTest />}
            {selectedSubTool === 'memory' && <MemoryMatch />}
            {selectedSubTool === 'rps' && <RockPaperScissors />}
            {selectedSubTool === 'tictactoe' && <TicTacToe />}
            {selectedSubTool === 'number-guess' && <NumberGuesser />}
            {selectedSubTool === 'picker' && <RandomPicker />}
            {selectedSubTool === 'typing' && <QuickTyping />}
          </div>
        )}

        {/* Category 3: Oddly Satisfying */}
        {categoryId === 'satisfying' && (
          <div>
            {selectedSubTool === 'bubbles' && <BubblePopper />}
            {selectedSubTool === 'particles' && <ParticlePlayground />}
            {selectedSubTool === 'draw' && <DrawingCanvas />}
            {selectedSubTool === 'color-mix' && <ColorMixer />}
            {selectedSubTool === 'gradients' && <GradientGenerator />}
            {selectedSubTool === 'harmonic' && <HarmonicVisualizer />}
            {selectedSubTool === 'palette' && <PaletteGenerator />}
          </div>
        )}

        {/* Category 4: Brain Snacks */}
        {categoryId === 'brain' && (
          <BrainSnacks
            activeSection={selectedSubTool}
            onSelectSection={setSelectedSubTool}
          />
        )}

        {/* Category 5: Midnight Corner */}
        {categoryId === 'midnight' && <MidnightCorner />}

        {/* Category 6: Weird & Wonderful */}
        {categoryId === 'weird' && <WeirdCuriosities />}

        {/* Category 7: Emoji & Creative Lab */}
        {categoryId === 'creative' && <CreativeLab />}

        {/* Category 8: Quick Escape */}
        {categoryId === 'escape' && (
          <QuickEscape
            onSelectItem={onSelectComponent}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}

        {/* Category 9: Discover Cool Websites */}
        {categoryId === 'websites' && (
          <CoolWebsitesDirectory
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}

        {/* Category 10: Creator Corner */}
        {categoryId === 'creator' && <CreatorCorner />}
      </div>

      {/* Optional Sponsored Placement */}
      <SponsoredPlacement className="mt-12" variant="card" />
    </div>
  );
};
