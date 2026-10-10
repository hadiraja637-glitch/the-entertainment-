import React from 'react';
import { CategoryId } from '../types';

interface CategoryIconProps {
  category: CategoryId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const dim = sizeMap[size];

  switch (category) {
    case 'lol':
      return (
        <svg viewBox="0 0 64 64" className={`${dim} ${className} filter drop-shadow-md`}>
          <defs>
            <radialGradient id="lolGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
            <linearGradient id="lolRim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#lolGrad)" stroke="url(#lolRim)" strokeWidth="2.5" />
          {/* Eyes laughing */}
          <path d="M19 24 Q24 18 29 24" fill="none" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M35 24 Q40 18 45 24" fill="none" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
          {/* Big laughing mouth */}
          <path d="M18 34 Q32 50 46 34 Z" fill="#991b1b" stroke="#78350f" strokeWidth="2" />
          <path d="M22 35 Q32 46 42 35 Q32 39 22 35" fill="#f87171" />
          {/* Spark tears */}
          <circle cx="15" cy="28" r="2.5" fill="#38bdf8" />
          <circle cx="49" cy="28" r="2.5" fill="#38bdf8" />
        </svg>
      );

    case 'play':
      return (
        <svg viewBox="0 0 64 64" className={`${dim} ${className} filter drop-shadow-md`}>
          <defs>
            <linearGradient id="padBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <radialGradient id="btnGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
          </defs>
          {/* Controller body */}
          <rect x="6" y="16" width="52" height="34" rx="14" fill="url(#padBody)" stroke="#a5b4fc" strokeWidth="2" />
          {/* D-Pad */}
          <path d="M16 29 H24 V23 H28 V29 H34 V35 H28 V41 H24 V35 H16 Z" fill="#1e1b4b" opacity="0.8" />
          <rect x="18" y="31" width="12" height="4" rx="1" fill="#c7d2fe" />
          <rect x="22" y="27" width="4" height="12" rx="1" fill="#c7d2fe" />
          {/* Neon action buttons */}
          <circle cx="44" cy="27" r="3.5" fill="#f43f5e" />
          <circle cx="50" cy="33" r="3.5" fill="#38bdf8" />
          <circle cx="38" cy="33" r="3.5" fill="#10b981" />
          <circle cx="44" cy="39" r="3.5" fill="#facc15" />
          {/* Central cosmic jewel */}
          <circle cx="32" cy="24" r="2.5" fill="#e0e7ff" />
        </svg>
      );

    case 'satisfying':
      return (
        <svg viewBox="0 0 64 64" className={`${dim} ${className} filter drop-shadow-md`}>
          <defs>
            <radialGradient id="satOrb" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="45%" stopColor="#c084fc" />
              <stop offset="85%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="26" fill="url(#satOrb)" stroke="#fbcfe8" strokeWidth="1.5" />
          {/* Sensory ripple rings */}
          <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" transform="rotate(-25 32 32)" />
          <ellipse cx="32" cy="32" rx="26" ry="12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" transform="rotate(-25 32 32)" />
          <circle cx="24" cy="22" r="5" fill="rgba(255,255,255,0.5)" filter="blur(1px)" />
        </svg>
      );

    case 'brain':
      return (
        <svg viewBox="0 0 64 64" className={`${dim} ${className} filter drop-shadow-md`}>
          <defs>
            <linearGradient id="brainGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          <rect x="8" y="10" width="48" height="44" rx="12" fill="#064e3b" stroke="#6ee7b7" strokeWidth="2" />
          {/* Synaptic circuit lines */}
          <path d="M18 20 H30 V28 H46" fill="none" stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 44 H34 V36 H46" fill="none" stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="30" cy="28" r="4" fill="#facc15" />
          <circle cx="34" cy="36" r="4" fill="#38bdf8" />
          <circle cx="18" cy="20" r="3" fill="#6ee7b7" />
          <circle cx="46" cy="28" r="3" fill="#6ee7b7" />
          <circle cx="18" cy="44" r="3" fill="#6ee7b7" />
          <circle cx="46" cy="36" r="3" fill="#6ee7b7" />
        </svg>
      );

    case 'midnight':
      return (
        <svg viewBox="0 0 64 64" className={`${dim} ${className} filter drop-shadow-md`}>
          <defs>
            <radialGradient id="moonGlow" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#e0e7ff" />
              <stop offset="60%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#312e81" />
            </radialGradient>
          </defs>
          {/* Crescent Moon */}
          <path
            d="M38 8 C22 8 10 20 10 36 C10 49 19 59 32 60 C26 52 24 40 28 28 C31 19 39 12 48 9 C45 8 41 8 38 8 Z"
            fill="url(#moonGlow)"
            stroke="#c7d2fe"
            strokeWidth="1.5"
          />
          {/* Twinkle stars */}
          <polygon points="46,18 48,22 52,24 48,26 46,30 44,26 40,24 44,22" fill="#fde047" />
          <polygon points="48,42 49,44 51,45 49,46 48,48 47,46 45,45 47,44" fill="#38bdf8" />
        </svg>
      );

    case 'weird':
      return (
        <svg viewBox="0 0 64 64" className={`${dim} ${className} filter drop-shadow-md`}>
          <defs>
            <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="40%" stopColor="#a855f7" />
              <stop offset="80%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>
          <ellipse cx="32" cy="32" rx="28" ry="18" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="14" fill="url(#eyeGrad)" stroke="#f472b6" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="6" fill="#020617" />
          <circle cx="34" cy="30" r="2" fill="#ffffff" />
          <circle cx="30" cy="34" r="1" fill="#38bdf8" />
        </svg>
      );

    case 'creative':
      return (
        <svg viewBox="0 0 64 64" className={`${dim} ${className} filter drop-shadow-md`}>
          <defs>
            <linearGradient id="palGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path
            d="M32 8 C16 8 8 18 8 32 C8 46 18 56 32 56 C38 56 42 52 42 46 C42 43 40 41 40 38 C40 35 43 33 46 33 H50 C54 33 56 29 56 25 C56 15 46 8 32 8 Z"
            fill="url(#palGrad)"
            stroke="#f5d0fe"
            strokeWidth="2"
          />
          <circle cx="20" cy="22" r="3.5" fill="#f43f5e" />
          <circle cx="32" cy="18" r="3.5" fill="#facc15" />
          <circle cx="44" cy="22" r="3.5" fill="#38bdf8" />
          <circle cx="22" cy="36" r="3.5" fill="#4ade80" />
          <circle cx="44" cy="46" r="4.5" fill="#1e1b4b" />
        </svg>
      );

    case 'escape':
      return (
        <svg viewBox="0 0 64 64" className={`${dim} ${className} filter drop-shadow-md`}>
          <defs>
            <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* Top cap */}
          <rect x="14" y="8" width="36" height="6" rx="3" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1" />
          {/* Bottom cap */}
          <rect x="14" y="50" width="36" height="6" rx="3" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1" />
          {/* Glass curves */}
          <path
            d="M18 14 C18 28 30 30 32 32 C30 34 18 36 18 50 H46 C46 36 34 34 32 32 C34 30 46 28 46 14 Z"
            fill="rgba(56, 189, 248, 0.15)"
            stroke="#7dd3fc"
            strokeWidth="2"
          />
          {/* Flowing stardust sand */}
          <polygon points="26,48 38,48 32,38" fill="#facc15" />
          <polygon points="24,18 40,18 32,26" fill="#facc15" opacity="0.7" />
          <line x1="32" y1="26" x2="32" y2="38" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      );

    case 'websites':
      return (
        <svg viewBox="0 0 64 64" className={`${dim} ${className} filter drop-shadow-md`}>
          <defs>
            <radialGradient id="globeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="60%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#115e59" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="26" fill="url(#globeGrad)" stroke="#5eead4" strokeWidth="2" />
          {/* Lat/Long orbital rings */}
          <ellipse cx="32" cy="32" rx="26" ry="11" fill="none" stroke="#99f6e4" strokeWidth="1.5" />
          <ellipse cx="32" cy="32" rx="11" ry="26" fill="none" stroke="#99f6e4" strokeWidth="1.5" />
          <line x1="6" y1="32" x2="58" y2="32" stroke="#99f6e4" strokeWidth="1.5" />
        </svg>
      );

    case 'creator':
      return (
        <svg viewBox="0 0 64 64" className={`${dim} ${className} filter drop-shadow-md`}>
          <defs>
            <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>
          </defs>
          {/* Rocket body */}
          <path d="M48 16 C38 14 26 22 20 34 L30 44 C42 38 50 26 48 16 Z" fill="url(#rocketBody)" stroke="#fdba74" strokeWidth="2" />
          {/* Fins */}
          <path d="M18 36 L10 40 L16 48 L22 42 Z" fill="#ef4444" />
          <path d="M28 48 L32 54 L40 48 L36 42 Z" fill="#ef4444" />
          {/* Porthole */}
          <circle cx="36" cy="28" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
          {/* Flame boost */}
          <polygon points="17,45 8,56 22,50" fill="#facc15" />
        </svg>
      );

    default:
      return null;
  }
};
