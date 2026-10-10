import React, { useState, useEffect } from 'react';
import { JOKES, RIDDLES, WOULD_YOU_RATHER, SILLY_CAPTIONS } from '../../data/content';
import { freshness } from '../../services/freshness';
import { sound } from '../../services/sound';
import { MASCOT } from '../../assets/mascot';
import confetti from 'canvas-confetti';
import { Copy, Check, Shuffle, HelpCircle, Eye, Sparkles, MessageSquare, Compass } from 'lucide-react';

export const LolFactory: React.FC = () => {
  // Joke State with Freshness Engine
  const [currentJoke, setCurrentJoke] = useState(() => freshness.getNextFreshItem(JOKES, 'jokes').item);
  const [jokeCopied, setJokeCopied] = useState(false);
  const [jokeStats, setJokeStats] = useState(() => freshness.getStats('jokes', JOKES.length));

  // Riddle State with Freshness Engine
  const [currentRiddle, setCurrentRiddle] = useState(() => freshness.getNextFreshItem(RIDDLES, 'riddles').item);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [riddleStats, setRiddleStats] = useState(() => freshness.getStats('riddles', RIDDLES.length));

  // Would You Rather State with Freshness Engine
  const [currentWyr, setCurrentWyr] = useState(() => freshness.getNextFreshItem(WOULD_YOU_RATHER, 'wyr').item);
  const [selectedVote, setSelectedVote] = useState<'A' | 'B' | null>(null);
  const [wyrStats, setWyrStats] = useState(() => freshness.getStats('wyr', WOULD_YOU_RATHER.length));

  // Caption State with Freshness Engine
  const captionPool = SILLY_CAPTIONS.map((text, idx) => ({ id: `sc${idx}`, text }));
  const [currentCaption, setCurrentCaption] = useState(() => freshness.getNextFreshItem(captionPool, 'captions').item);
  const [captionCopied, setCaptionCopied] = useState(false);

  // Handlers
  const nextJoke = () => {
    sound.playPop();
    const result = freshness.getNextFreshItem(JOKES, 'jokes', currentJoke.id);
    setCurrentJoke(result.item);
    setJokeCopied(false);
    setJokeStats(freshness.getStats('jokes', JOKES.length));
  };

  const copyJoke = () => {
    const text = `${currentJoke.setup} — ${currentJoke.punchline}`;
    navigator.clipboard.writeText(text);
    sound.playSuccess();
    setJokeCopied(true);
    setTimeout(() => setJokeCopied(false), 1500);
  };

  const nextRiddle = () => {
    sound.playPop();
    const result = freshness.getNextFreshItem(RIDDLES, 'riddles', currentRiddle.id);
    setCurrentRiddle(result.item);
    setShowAnswer(false);
    setShowHint(false);
    setRiddleStats(freshness.getStats('riddles', RIDDLES.length));
  };

  const handleWyrVote = (choice: 'A' | 'B') => {
    if (selectedVote) return;
    sound.playSuccess();
    setSelectedVote(choice);
    confetti({ particleCount: 30, spread: 50 });
  };

  const nextWyr = () => {
    sound.playPop();
    const result = freshness.getNextFreshItem(WOULD_YOU_RATHER, 'wyr', currentWyr.id);
    setCurrentWyr(result.item);
    setSelectedVote(null);
    setWyrStats(freshness.getStats('wyr', WOULD_YOU_RATHER.length));
  };

  const nextCaption = () => {
    sound.playPop();
    const result = freshness.getNextFreshItem(captionPool, 'captions', currentCaption.id);
    setCurrentCaption(result.item);
    setCaptionCopied(false);
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(currentCaption.text);
    sound.playSuccess();
    setCaptionCopied(true);
    setTimeout(() => setCaptionCopied(false), 1500);
  };

  // Calculate WYR percentages
  const totalVotes = currentWyr.votesA + currentWyr.votesB + (selectedVote ? 1 : 0);
  const votesACount = currentWyr.votesA + (selectedVote === 'A' ? 1 : 0);
  const percentA = Math.round((votesACount / totalVotes) * 100);
  const percentB = 100 - percentA;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Joke Generator */}
      <div className="bg-[#121829] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner">
              😂
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Clean Joke Generator</h3>
              <p className="text-xs text-amber-300/80 font-mono">
                Freshness Engine: {jokeStats.seen} of {jokeStats.total} explored
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyJoke}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Copy joke"
            >
              {jokeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{jokeCopied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={nextJoke}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Next Joke</span>
            </button>
          </div>
        </div>

        <div className="my-6 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center relative">
          <p className="text-lg sm:text-2xl font-bold text-slate-100 mb-4 leading-relaxed">
            "{currentJoke.setup}"
          </p>
          <p className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-amber-200 tracking-wide">
            {currentJoke.punchline}
          </p>
        </div>
      </div>

      {/* 2. Would You Rather */}
      <div className="bg-[#121829] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl shadow-inner">
              ⚖️
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Would You Rather?</h3>
              <p className="text-xs text-purple-300/80 font-mono">
                Dilemmas explored: {wyrStats.seen} of {wyrStats.total}
              </p>
            </div>
          </div>
          <button
            onClick={nextWyr}
            className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Next Dilemma</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Make a tough choice below to reveal how community votes compare with your answer!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A */}
          <button
            onClick={() => handleWyrVote('A')}
            disabled={!!selectedVote}
            className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
              selectedVote === 'A'
                ? 'bg-purple-900/40 border-purple-400 ring-2 ring-purple-400/50 shadow-lg shadow-purple-500/20'
                : 'bg-slate-900/80 border-slate-700/80 hover:border-purple-500/60'
            }`}
          >
            <span className="text-xs uppercase tracking-widest font-black text-purple-400 block mb-2">Option A</span>
            <p className="text-base font-bold text-slate-100 leading-snug">{currentWyr.optionA}</p>
            {selectedVote && (
              <div className="mt-4 pt-3 border-t border-purple-500/20 flex items-center justify-between">
                <span className="text-2xl font-black text-purple-300 font-mono">{percentA}%</span>
                <span className="text-xs text-slate-400 font-medium">({votesACount.toLocaleString()} votes)</span>
              </div>
            )}
          </button>

          {/* Option B */}
          <button
            onClick={() => handleWyrVote('B')}
            disabled={!!selectedVote}
            className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
              selectedVote === 'B'
                ? 'bg-cyan-900/40 border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/80 border-slate-700/80 hover:border-cyan-500/60'
            }`}
          >
            <span className="text-xs uppercase tracking-widest font-black text-cyan-400 block mb-2">Option B</span>
            <p className="text-base font-bold text-slate-100 leading-snug">{currentWyr.optionB}</p>
            {selectedVote && (
              <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between">
                <span className="text-2xl font-black text-cyan-300 font-mono">{percentB}%</span>
                <span className="text-xs text-slate-400 font-medium">({(totalVotes - votesACount).toLocaleString()} votes)</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* 3. Riddle of the Mystery */}
      <div className="bg-[#121829] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-inner">
              ❓
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Riddle of the Mystery</h3>
              <p className="text-xs text-cyan-300/80 font-mono">
                Riddles solved: {riddleStats.seen} of {riddleStats.total}
              </p>
            </div>
          </div>
          <button
            onClick={nextRiddle}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Next Riddle</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center my-4">
          <p className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed">
            "{currentRiddle.riddle}"
          </p>

          {showHint && (
            <p className="text-xs text-indigo-300 mt-4 italic bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/30 max-w-md mx-auto">
              💡 Hint: {currentRiddle.hint}
            </p>
          )}

          {showAnswer && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 animate-scale max-w-md mx-auto">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 block mb-1">Answer</span>
              <p className="text-xl font-black text-emerald-300">{currentRiddle.answer}</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 mt-6">
            {!showHint && !showAnswer && (
              <button
                onClick={() => {
                  sound.playBlip();
                  setShowHint(true);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Show Clue</span>
              </button>
            )}

            {!showAnswer && (
              <button
                onClick={() => {
                  sound.playSuccess();
                  setShowAnswer(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 shadow-md shadow-emerald-600/20"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Reveal Answer</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. Silly Caption Sparks */}
      <div className="bg-[#121829] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <h3 className="font-extrabold text-lg text-white">Silly Caption Sparks</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyCaption}
              className="p-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              {captionCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{captionCopied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={nextCaption}
              className="px-3.5 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Next</span>
            </button>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center font-medium text-slate-200 text-sm">
          "{currentCaption.text}"
        </div>
      </div>
    </div>
  );
};
