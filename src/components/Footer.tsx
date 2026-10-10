import React from 'react';
import { sound } from '../services/sound';
import { MASCOT } from '../assets/mascot';
import { Sparkles, Shield, RotateCcw, Info, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenPrivacy: () => void;
  onResetLocalData: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenPrivacy,
  onResetLocalData,
}) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#0a0e17] py-12 px-4 sm:px-6 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand identity & tagline */}
        <div className="text-center md:text-left space-y-1.5">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-purple-400/60 shadow-md">
              <img src={MASCOT.logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-extrabold text-base text-slate-100">The Entertainment</span>
          </div>
          <p className="text-slate-400 max-w-sm">
            "Your little corner of the internet." Tiny games, ridiculous questions, satisfying toys, and unexpected adventures.
          </p>
          <p className="text-[11px] text-slate-400">
            100% Client-Side • Zero ads by default • Pure Web Audio synthesis
          </p>
        </div>

        {/* Links & Legal */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 font-medium">
          <button
            onClick={() => {
              sound.playBlip();
              onOpenAbout();
            }}
            className="hover:text-purple-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>About The Playground</span>
          </button>

          <button
            onClick={() => {
              sound.playBlip();
              onOpenPrivacy();
            }}
            className="hover:text-purple-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy & Storage</span>
          </button>

          <button
            onClick={onResetLocalData}
            className="hover:text-rose-400 transition-colors flex items-center gap-1.5 text-slate-400 cursor-pointer"
            title="Reset your high scores and favorites saved in your browser"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Local Data</span>
          </button>
        </div>
      </div>

      {/* External Links Disclaimer */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center text-slate-400 text-[11px] leading-relaxed">
        <p>
          External links in the directory lead to independent third-party websites not operated by The Entertainment.
          We curate quality destinations but do not control external content.
        </p>
        <p className="mt-1">
          Made with curiosity for dreamers, thinkers, and internet wanderers everywhere.
        </p>
      </div>
    </footer>
  );
};
