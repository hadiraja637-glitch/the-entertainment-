import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { RotateCcw, Keyboard, CheckCircle, Timer } from 'lucide-react';

const SENTENCES = [
  'The cosmos is full of wandering comets, glowing nebulae, and quiet constellations waiting to be observed.',
  'A clever fox leaped across the crystalline stream and disappeared into the twilight forest without a sound.',
  'Curiosity is the engine of human adventure, turning everyday questions into extraordinary breakthroughs.',
  'Beneath the quiet ocean surface, colorful bioluminescent creatures light up the midnight depths.'
];

export const QuickTyping: React.FC = () => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const targetText = SENTENCES[sentenceIndex];

  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const resetGame = () => {
    sound.playBlip();
    setSentenceIndex(prev => (prev + 1) % SENTENCES.length);
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setWpm(null);
    setAccuracy(null);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (!startTime) {
      setStartTime(performance.now());
    }

    setInput(val);

    // If completed target sentence
    if (val === targetText) {
      const finish = performance.now();
      setEndTime(finish);

      const elapsedMinutes = (finish - (startTime || finish)) / 60000;
      const minutesSafe = Math.max(elapsedMinutes, 0.05);
      const wordsCount = targetText.length / 5;
      const calculatedWpm = Math.round(wordsCount / minutesSafe);

      // Accuracy
      let correctChars = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === targetText[i]) correctChars++;
      }
      const calculatedAcc = Math.round((correctChars / val.length) * 100);

      setWpm(calculatedWpm);
      setAccuracy(calculatedAcc);
      sound.playSuccess();
      confetti({ particleCount: 50, spread: 70 });
    }
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⌨️</span>
          <h3 className="font-bold text-lg text-slate-100">Quick Typing Challenge</h3>
        </div>
        <button
          onClick={resetGame}
          title="New Prompt"
          className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Type the sentence below as accurately and swiftly as you can. Timer begins on your first keystroke!
      </p>

      {/* Target text with visual character-by-character highlights */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 text-left font-mono text-sm leading-relaxed mb-4 select-none">
        {targetText.split('').map((char, idx) => {
          let color = 'text-slate-400';
          if (idx < input.length) {
            color = input[idx] === char ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40';
          }
          return (
            <span key={idx} className={color}>
              {char}
            </span>
          );
        })}
      </div>

      {/* Input box */}
      {!wpm ? (
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 font-mono focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
      ) : (
        <div className="p-5 rounded-xl bg-purple-950/40 border border-purple-500/40 animate-scale">
          <div className="flex items-center justify-center gap-8 mb-4">
            <div>
              <p className="text-4xl font-black text-amber-300 font-mono">{wpm}</p>
              <p className="text-xs uppercase text-slate-400 mt-1">WPM (Speed)</p>
            </div>
            <div>
              <p className="text-4xl font-black text-emerald-400 font-mono">{accuracy}%</p>
              <p className="text-xs uppercase text-slate-400 mt-1">Accuracy</p>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-transform active:scale-95"
          >
            Try Another Sentence
          </button>
        </div>
      )}

      <p className="text-[11px] text-slate-500 mt-4">
        *WPM standardly calculated as (characters / 5) divided by elapsed time in minutes.
      </p>
    </div>
  );
};
