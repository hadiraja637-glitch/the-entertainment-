import React, { useState } from 'react';
import { MASCOT, COSMO_QUOTES } from '../assets/mascot';
import { sound } from '../services/sound';
import { Sparkles, MessageCircle, X, Shuffle } from 'lucide-react';

interface CosmoCompanionProps {
  onSurpriseMe?: () => void;
  onOpenJokes?: () => void;
  onOpenChill?: () => void;
  className?: string;
}

export const CosmoCompanion: React.FC<CosmoCompanionProps> = ({
  onSurpriseMe,
  onOpenJokes,
  onOpenChill,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const currentQuote = COSMO_QUOTES[quoteIndex];

  const handleNextQuote = () => {
    sound.playBlip(520);
    setQuoteIndex(prev => (prev + 1) % COSMO_QUOTES.length);
  };

  const handleAvatarClick = () => {
    sound.playPop();
    setIsOpen(!isOpen);
    if (!isOpen) {
      handleNextQuote();
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-40 select-none ${className}`}>
      {/* Expanded Speech Bubble / Mascot Dialog */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 p-4 rounded-3xl bg-[#121829]/95 border-2 border-purple-500/40 shadow-2xl backdrop-blur-xl animate-scale text-left">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="font-extrabold text-xs text-white">
                Cosmo • Cosmic Guide
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              title="Close companion"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="my-3 p-3.5 rounded-2xl border border-slate-800 bg-slate-900/90 text-slate-200 text-xs leading-relaxed font-medium">
            "{currentQuote}"
          </div>

          {/* Quick interactive actions */}
          <div className="space-y-1.5 pt-1">
            <button
              onClick={handleNextQuote}
              className="w-full py-1.5 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shuffle className="w-3 h-3 text-purple-300" />
              <span>Another spark</span>
            </button>

            {onSurpriseMe && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSurpriseMe();
                }}
                className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-md"
              >
                <Sparkles className="w-3 h-3" />
                <span>Teleport to a Surprise!</span>
              </button>
            )}

            <div className="flex gap-1.5 pt-1">
              {onOpenJokes && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenJokes();
                  }}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Jokes</span>
                </button>
              )}
              {onOpenChill && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenChill();
                  }}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <span>🌙 Chill</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Mascot Button */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={handleAvatarClick}
          aria-label="Cosmo robot mascot companion"
          className="relative group rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-0.5 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer animate-float-slow"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-purple-400/50 shadow-purple-500/20 bg-[#0b0f19] flex items-center justify-center relative">
            <img
              src={MASCOT.hero}
              alt="Cosmo robot mascot"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Sparkle Badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-500 text-white font-black text-[11px] flex items-center justify-center shadow-lg border border-purple-300">
            ✨
          </span>
        </button>
      </div>
    </div>
  );
};
