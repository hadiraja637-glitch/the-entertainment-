import React, { useState } from 'react';
import { TRIVIA_QUESTIONS, EMOJI_CIPHERS, WORD_SCRAMBLES } from '../../data/content';
import { sound } from '../../services/sound';
import { MASCOT } from '../../assets/mascot';
import { DailyChallengeCard } from './DailyChallengeCard';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Eye,
  Sparkles,
  Calendar,
  Brain,
  MessageSquare
} from 'lucide-react';

interface BrainSnacksProps {
  activeSection?: string;
  onSelectSection?: (sectionId: string) => void;
}

export const BrainSnacks: React.FC<BrainSnacksProps> = ({
  activeSection,
  onSelectSection
}) => {
  // Local section filter if not controlled
  const [internalSection, setInternalSection] = useState<string>('daily-challenge');
  const currentSection = activeSection || internalSection;

  const handleSectionChange = (sec: string) => {
    sound.playBlip();
    setInternalSection(sec);
    if (onSelectSection) {
      onSelectSection(sec);
    }
  };

  // --- TRIVIA STATE ---
  const [triviaPool] = useState(() => [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5));
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [selectedTriviaOption, setSelectedTriviaOption] = useState<number | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [completedTrivia, setCompletedTrivia] = useState(false);

  // --- EMOJI CIPHER STATE ---
  const [cipherIndex, setCipherIndex] = useState(0);
  const [showCipherAnswer, setShowCipherAnswer] = useState(false);
  const [cipherInput, setCipherInput] = useState('');
  const [cipherSolved, setCipherSolved] = useState(false);

  // --- WORD SCRAMBLE STATE ---
  const [scrambleIndex, setScrambleIndex] = useState(0);
  const [scrambleInput, setScrambleInput] = useState('');
  const [scrambleSolved, setScrambleSolved] = useState(false);
  const [showScrambleHint, setShowScrambleHint] = useState(false);

  // Current items
  const currentTrivia = triviaPool[triviaIndex] || TRIVIA_QUESTIONS[0];
  const currentCipher = EMOJI_CIPHERS[cipherIndex] || EMOJI_CIPHERS[0];
  const currentScramble = WORD_SCRAMBLES[scrambleIndex] || WORD_SCRAMBLES[0];

  // Trivia handling
  const handleTriviaSelect = (index: number) => {
    if (selectedTriviaOption !== null) return;

    setSelectedTriviaOption(index);
    if (index === currentTrivia.correctIndex) {
      sound.playSuccess();
      const newScore = triviaScore + 1;
      setTriviaScore(newScore);
      confetti({ particleCount: 35, spread: 55 });
    } else {
      sound.playBuzz();
    }
  };

  const nextTrivia = () => {
    sound.playPop();
    if (triviaIndex + 1 < triviaPool.length) {
      setTriviaIndex(prev => prev + 1);
      setSelectedTriviaOption(null);
    } else {
      setCompletedTrivia(true);
      sound.playSuccess();
      confetti({ particleCount: 80, spread: 80 });
    }
  };

  const restartTrivia = () => {
    sound.playBlip();
    setTriviaIndex(0);
    setSelectedTriviaOption(null);
    setTriviaScore(0);
    setCompletedTrivia(false);
  };

  // Emoji Cipher handling
  const handleCipherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cipherInput.trim().toLowerCase() === currentCipher.answer.toLowerCase()) {
      sound.playSuccess();
      setCipherSolved(true);
      setShowCipherAnswer(true);
      confetti({ particleCount: 40, spread: 60 });
    } else {
      sound.playBuzz();
    }
  };

  const nextCipher = () => {
    sound.playPop();
    setCipherIndex(prev => (prev + 1) % EMOJI_CIPHERS.length);
    setShowCipherAnswer(false);
    setCipherInput('');
    setCipherSolved(false);
  };

  // Word Scramble handling
  const handleScrambleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scrambleInput.trim().toUpperCase() === currentScramble.word) {
      sound.playSuccess();
      setScrambleSolved(true);
      confetti({ particleCount: 40, spread: 60 });
    } else {
      sound.playBuzz();
    }
  };

  const nextScramble = () => {
    sound.playPop();
    setScrambleIndex(prev => (prev + 1) % WORD_SCRAMBLES.length);
    setScrambleInput('');
    setScrambleSolved(false);
    setShowScrambleHint(false);
  };

  const showDaily = currentSection === 'daily-challenge' || currentSection === 'all-snacks' || !currentSection;
  const showTrivia = currentSection === 'trivia' || currentSection === 'all-snacks';
  const showCipher = currentSection === 'emoji-cipher' || currentSection === 'all-snacks';
  const showScramble = currentSection === 'scramble' || currentSection === 'all-snacks';

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Brain Snacks Category Sub-Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <span className="text-xs font-bold text-slate-400 pl-2">Brain Snacks Modes:</span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'daily-challenge', label: '📅 Daily Challenge', badge: 'New' },
            { id: 'trivia', label: '🧠 Trivia Gauntlet' },
            { id: 'emoji-cipher', label: '🍿 Emoji Cipher' },
            { id: 'scramble', label: '🔤 Word Scramble' },
            { id: 'all-snacks', label: '✨ All Snacks' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleSectionChange(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentSection === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] uppercase tracking-wider bg-emerald-400 text-slate-950 font-black">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 1. DAILY CHALLENGE (Featured Top Feature) */}
      {showDaily && (
        <section aria-label="Daily Challenge">
          <DailyChallengeCard />
        </section>
      )}

      {/* 2. General Knowledge Trivia Gauntlet */}
      {showTrivia && (
        <div className="bg-[#121829] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner">
                🧠
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">Verified Trivia Gauntlet</h3>
                <p className="text-xs text-emerald-300 font-mono">
                  {TRIVIA_QUESTIONS.length} curated questions • Explanations checked
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-indigo-300 font-mono font-bold px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                Score: {triviaScore} / {triviaIndex + (selectedTriviaOption !== null ? 1 : 0)}
              </span>
              <button
                onClick={restartTrivia}
                title="Restart Quiz"
                className="p-2 rounded-xl text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!completedTrivia ? (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-purple-300 font-bold border border-slate-700">
                  {currentTrivia.topic}
                </span>
                <span className="font-mono text-slate-400">
                  Question {triviaIndex + 1} of {triviaPool.length}
                </span>
              </div>

              <p className="text-base sm:text-xl font-bold text-slate-100 my-5">
                {currentTrivia.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentTrivia.options.map((opt, idx) => {
                  const isSelected = selectedTriviaOption === idx;
                  const isCorrect = idx === currentTrivia.correctIndex;
                  const showResults = selectedTriviaOption !== null;

                  let btnStyle = 'bg-slate-900 border-slate-700/80 hover:border-purple-500/60 text-slate-200';
                  if (showResults) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleTriviaSelect(idx)}
                      disabled={showResults}
                      className={`p-4 rounded-2xl border text-left font-medium text-sm flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showResults && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {showResults && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {selectedTriviaOption !== null && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 animate-scale mb-4">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    💡 <strong className="text-purple-300">Explanation:</strong> {currentTrivia.explanation}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={nextTrivia}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-lg shadow-purple-600/20"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-10 text-center animate-scale">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl">
                <img src={MASCOT.celebrate} alt="Cosmo celebrating" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-2xl font-black text-slate-100 mb-2">Gauntlet Completed!</h4>
              <p className="text-lg text-purple-300 font-medium">
                You scored <strong className="text-amber-300">{triviaScore}</strong> out of {triviaPool.length}!
              </p>
              <button
                onClick={restartTrivia}
                className="mt-6 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-transform active:scale-95 cursor-pointer shadow-lg"
              >
                Play Another Round
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Emoji Pop & Movie Cipher */}
      {showCipher && (
        <div className="bg-[#121829] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl shadow-inner">
                🍿
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">Emoji Cipher Decoded</h3>
                <p className="text-xs text-purple-300">Crack the titles from emoji clues</p>
              </div>
            </div>
            <button
              onClick={nextCipher}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Cipher</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-6">
            Can you guess the movie or book title described entirely with emojis?
          </p>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center mb-6">
            <div className="text-4xl sm:text-6xl tracking-widest my-2 select-none">
              {currentCipher.emojis}
            </div>
            <p className="text-xs text-slate-400 mt-4 italic font-medium">Clue: {currentCipher.hint}</p>

            {showCipherAnswer && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-extrabold text-lg animate-scale max-w-sm mx-auto">
                {currentCipher.answer}
              </div>
            )}
          </div>

          {!showCipherAnswer ? (
            <form onSubmit={handleCipherSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={cipherInput}
                onChange={e => setCipherInput(e.target.value)}
                placeholder="Enter title guess..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Guess
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playBlip();
                  setShowCipherAnswer(true);
                }}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                title="Reveal answer"
              >
                <Eye className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={nextCipher}
                className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
              >
                Try Next Cipher
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. Word Scramble */}
      {showScramble && (
        <div className="bg-[#121829] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner">
                🔤
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">Word Unscramble Sprint</h3>
                <p className="text-xs text-amber-300">Anagram mental agility</p>
              </div>
            </div>
            <button
              onClick={nextScramble}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Word</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center mb-6">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Unscramble the letters:</p>
            <div className="text-3xl sm:text-5xl font-mono font-black text-amber-300 tracking-widest my-2">
              {currentScramble.scrambled}
            </div>

            {showScrambleHint && (
              <p className="text-xs text-indigo-300 mt-3 italic">Hint: {currentScramble.hint}</p>
            )}

            {scrambleSolved && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-extrabold text-lg animate-scale max-w-sm mx-auto">
                Solved: {currentScramble.word}! 🎉
              </div>
            )}
          </div>

          {!scrambleSolved ? (
            <form onSubmit={handleScrambleSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={scrambleInput}
                onChange={e => setScrambleInput(e.target.value)}
                placeholder="Unscrambled word..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-sm uppercase font-mono text-slate-100 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Submit
              </button>
              {!showScrambleHint && (
                <button
                  type="button"
                  onClick={() => {
                    sound.playBlip();
                    setShowScrambleHint(true);
                  }}
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
                  title="Clue"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              )}
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={nextScramble}
                className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
              >
                Play Next Word
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
