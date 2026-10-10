import React, { useState, useEffect } from 'react';
import { sound } from '../../services/sound';
import { MASCOT } from '../../assets/mascot';
import confetti from 'canvas-confetti';
import { RotateCcw, Trophy, Timer, Award, Sparkles } from 'lucide-react';

interface CardItem {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const THEMES = {
  cosmic: { name: 'Cosmic Galaxy', icons: ['🚀', '🪐', '⭐', '👾', '🌙', '🔮', '⚡', '🛸'] },
  arcade: { name: 'Retro Arcade', icons: ['🎮', '🕹️', '💎', '🎲', '🎯', '🏆', '🥇', '🤖'] },
  fantasy: { name: 'Mystic Fantasy', icons: ['🐉', '⚔️', '🛡️', '🧪', '🗝️', '👑', '🦄', '🏹'] },
};

export const MemoryMatch: React.FC = () => {
  const [selectedThemeKey, setSelectedThemeKey] = useState<keyof typeof THEMES>('cosmic');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [bestMoves, setBestMoves] = useState<number | null>(() => {
    const saved = localStorage.getItem('te_memory_best_moves');
    return saved ? parseInt(saved, 10) : null;
  });

  const initGame = (themeKey = selectedThemeKey) => {
    const currentTheme = THEMES[themeKey];
    const paired = [...currentTheme.icons, ...currentTheme.icons]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({
        id: idx,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(paired);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
    setSeconds(0);
    setTimerActive(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && !isWon) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isWon]);

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length === 2) {
      return;
    }

    if (!timerActive) {
      setTimerActive(true);
    }

    sound.playPop();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const currentMoves = moves + 1;
      setMoves(currentMoves);
      const [firstIdx, secondIdx] = newFlipped;

      if (cards[firstIdx].emoji === cards[secondIdx].emoji) {
        // Matched!
        setTimeout(() => {
          sound.playSuccess();
          const matchedCards = [...cards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);

          if (matchedCards.every(c => c.isMatched)) {
            setIsWon(true);
            confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
            if (!bestMoves || currentMoves < bestMoves) {
              setBestMoves(currentMoves);
              localStorage.setItem('te_memory_best_moves', currentMoves.toString());
            }
          }
        }, 400);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleThemeChange = (key: keyof typeof THEMES) => {
    setSelectedThemeKey(key);
    initGame(key);
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto text-center shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🃏</span>
          <h3 className="font-extrabold text-lg text-white">Cosmic Memory Match</h3>
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3">
          {bestMoves && (
            <div className="flex items-center gap-1 text-[11px] text-amber-300 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
              <Award className="w-3 h-3" />
              <span>Record: {bestMoves} moves</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Timer className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-mono text-slate-200">{seconds}s</span>
          </div>
          <div className="text-xs text-slate-400">
            Moves: <span className="font-mono text-slate-100 font-bold">{moves}</span>
          </div>
          <button
            onClick={() => {
              sound.playBlip();
              initGame();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
            title="Restart Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Theme selector tabs */}
      <div className="flex justify-center gap-2 mb-4">
        {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map(k => (
          <button
            key={k}
            onClick={() => handleThemeChange(k)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              selectedThemeKey === k
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {THEMES[k].name}
          </button>
        ))}
      </div>

      {isWon ? (
        <div className="py-8 bg-purple-950/40 rounded-3xl border border-purple-500/30 mb-4 animate-scale">
          <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl">
            <img src={MASCOT.celebrate} alt="Cosmo celebrating" className="w-full h-full object-cover" />
          </div>
          <h4 className="text-2xl font-black text-white">Cosmic Alignment Complete!</h4>
          <p className="text-sm text-purple-200 mt-1">
            Cleared in <span className="font-bold text-amber-300">{moves} moves</span> and{' '}
            <span className="font-bold text-amber-300">{seconds} seconds</span>!
          </p>
          <button
            onClick={() => initGame()}
            className="mt-5 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-transform active:scale-95 shadow-lg shadow-purple-600/25"
          >
            Play Next Round
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 my-4">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`aspect-square rounded-2xl text-3xl sm:text-4xl flex items-center justify-center font-bold transition-all duration-300 cursor-pointer select-none border shadow-md ${
                card.isMatched
                  ? 'bg-emerald-950/40 border-emerald-500/50 opacity-60 scale-95'
                  : card.isFlipped
                  ? 'bg-gradient-to-tr from-purple-900 to-indigo-800 border-purple-400/80 shadow-md shadow-purple-500/25'
                  : 'bg-slate-900 border-slate-700/80 hover:border-purple-500/50 hover:bg-slate-800/80'
              }`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '✨'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
