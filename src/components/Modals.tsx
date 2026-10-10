import React from 'react';
import { sound } from '../services/sound';
import { MASCOT } from '../assets/mascot';
import { X, ShieldCheck, Heart, Sparkles, Database, Trash2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="About The Entertainment"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#121829] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative animate-scale"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-400 shadow-md">
              <img src={MASCOT.logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-extrabold text-white">About The Entertainment</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            <strong>The Entertainment</strong> is an original, cosmic internet playground crafted as an antidote to doomscrolling, endless feeds, and repetitive algorithms.
          </p>
          <p>
            Remember when visiting a web page felt wondrous, surprising, and full of charming tiny toys? That is the spirit of this corner:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
            <li>Zero account or signup required.</li>
            <li>Zero paid API locks or invasive tracking cookies.</li>
            <li>Synthesized browser audio using the modern Web Audio API.</li>
            <li>Genuine mini-games with local scoreboards and checked answers.</li>
          </ul>
          <p className="pt-2 text-purple-300 font-semibold">
            Tagline: "Your little corner of the internet."
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white cursor-pointer"
          >
            Close & Play
          </button>
        </div>
      </div>
    </div>
  );
};

export const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Privacy & Data Policy"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#121829] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative animate-scale"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Privacy & Local Storage</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Your privacy is respected by default. The Entertainment does not maintain user accounts or transmit personal information to external servers.
          </p>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Database className="w-4 h-4" />
              <span>What is stored in your browser (localStorage):</span>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
              <li>Bookmarked / favorited activity IDs</li>
              <li>Your best personal reaction speed & clicker game stardust</li>
              <li>Bubble wrap total pop count</li>
            </ul>
          </div>
          <p className="text-slate-400 text-xs">
            You can erase all locally stored data at any time using the "Reset Local Data" button in the footer.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-slate-200 cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
