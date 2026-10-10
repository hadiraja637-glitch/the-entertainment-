import React from 'react';
import { sound } from '../services/sound';
import { CategoryId } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface MoodOption {
  id: string;
  label: string;
  categoryId: CategoryId;
  componentId?: string;
  description: string;
  color: string;
}

const MOODS: MoodOption[] = [
  {
    id: 'laugh',
    label: 'I Need a Laugh',
    categoryId: 'lol',
    componentId: 'jokes',
    description: 'Instant clean jokes, riddles & silly dilemmas',
    color: 'from-amber-500/15 via-orange-500/10 to-transparent border-amber-500/30 hover:border-amber-400/80 shadow-amber-500/5',
  },
  {
    id: 'play',
    label: 'I Want to Play',
    categoryId: 'play',
    componentId: 'clicker',
    description: 'Reflex sprint, memory match, arcade duels',
    color: 'from-purple-500/15 via-indigo-500/10 to-transparent border-purple-500/30 hover:border-purple-400/80 shadow-purple-500/5',
  },
  {
    id: 'brain',
    label: 'My Brain Needs a Snack',
    categoryId: 'brain',
    componentId: 'trivia',
    description: 'Trivia gauntlet, emoji cipher & anagram scrambles',
    color: 'from-emerald-500/15 via-teal-500/10 to-transparent border-emerald-500/30 hover:border-emerald-400/80 shadow-emerald-500/5',
  },
  {
    id: 'chill',
    label: 'I Need to Chill',
    categoryId: 'midnight',
    componentId: 'ambient',
    description: 'Synthesized rain audio, starry sky & box breathing',
    color: 'from-indigo-500/15 via-cyan-500/10 to-transparent border-indigo-500/30 hover:border-cyan-400/80 shadow-cyan-500/5',
  },
  {
    id: 'weird',
    label: 'Show Me Something Weird',
    categoryId: 'weird',
    componentId: 'facts',
    description: 'Curious scientific oddities & optical illusions',
    color: 'from-fuchsia-500/15 via-pink-500/10 to-transparent border-fuchsia-500/30 hover:border-fuchsia-400/80 shadow-fuchsia-500/5',
  },
  {
    id: 'quick',
    label: 'I Have Five Minutes',
    categoryId: 'escape',
    componentId: 'escape',
    description: 'Time-filtered micro-breaks and quick sprints',
    color: 'from-sky-500/15 via-blue-500/10 to-transparent border-sky-500/30 hover:border-sky-400/80 shadow-sky-500/5',
  },
];

interface MoodSelectorProps {
  onSelectMood: (categoryId: CategoryId, componentId?: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelectMood }) => {
  return (
    <section className="my-16">
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3.5 py-1 rounded-full border border-purple-500/20">
          Vibe Selector
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Pick Your Mood</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Whatever headspace you are in right now, we have the exact right corner for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {MOODS.map(m => (
          <button
            key={m.id}
            onClick={() => {
              sound.playPop();
              onSelectMood(m.categoryId, m.componentId);
            }}
            className={`p-5 rounded-3xl bg-gradient-to-br ${m.color} border bg-[#121829]/90 text-left transition-all hover:scale-[1.02] hover:-translate-y-1 cursor-pointer group shadow-xl flex items-center justify-between gap-4`}
          >
            <div>
              <h3 className="font-extrabold text-slate-100 text-base group-hover:text-white transition-colors">
                {m.label}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {m.description}
              </p>
            </div>
            <div className="shrink-0 p-2 rounded-2xl bg-slate-900/80 border border-slate-800 group-hover:scale-110 transition-transform shadow-inner">
              <CategoryIcon category={m.categoryId} size="md" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
