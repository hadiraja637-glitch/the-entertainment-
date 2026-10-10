import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../services/sound';
import { MASCOT } from '../../assets/mascot';
import { CloudRain, Waves, VolumeX, Moon, Sparkles, Heart, Coffee } from 'lucide-react';

const CALM_RITUALS = [
  'Drink a warm glass of water or chamomile tea with no screens for 10 minutes.',
  'Name 3 small gentle things you felt grateful for today.',
  'Unclench your jaw, soften your shoulders away from your ears, and take a deep exhale.',
  'Write down any buzzing thoughts or to-dos on physical paper so your brain can let them go until tomorrow.',
  'Look at the stars or out an open window and breathe in the cool night breeze.'
];

export const MidnightCorner: React.FC = () => {
  // Audio state
  const [rainActive, setRainActive] = useState(sound.isRainActive());
  const [oceanActive, setOceanActive] = useState(sound.isOceanActive());

  // Breathing state
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [breathingRunning, setBreathingRunning] = useState(false);

  // Starfield canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio toggles
  const handleToggleRain = () => {
    const active = sound.toggleRain();
    setRainActive(active);
  };

  const handleToggleOcean = () => {
    const active = sound.toggleOcean();
    setOceanActive(active);
  };

  const stopAllAudio = () => {
    sound.stopAllAmbience();
    setRainActive(false);
    setOceanActive(false);
  };

  // 4-4-4-4 Box Breathing loop
  useEffect(() => {
    if (!breathingRunning) return;

    const interval = setInterval(() => {
      setBreathSeconds(sec => {
        if (sec > 1) return sec - 1;

        // Transition phase
        setBreathPhase(curr => {
          if (curr === 'Inhale') return 'Hold';
          if (curr === 'Hold') return 'Exhale';
          if (curr === 'Exhale') return 'Rest';
          return 'Inhale';
        });
        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [breathingRunning]);

  // Starfield canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const numStars = 90;
    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, w, h);

      stars.forEach(s => {
        s.alpha += s.speed;
        const currentAlpha = Math.abs(Math.sin(s.alpha));
        ctx.fillStyle = `rgba(224, 231, 255, ${currentAlpha * 0.8 + 0.2})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Ambient Web Audio Synthesizer */}
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl">
        {/* Cosmo Chill Welcome */}
        <div className="mb-6 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-indigo-400/50 shadow-xl shrink-0">
            <img src={MASCOT.chill} alt="Cosmo resting" className="w-full h-full object-cover" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-extrabold text-base text-white">Recharge with Cosmo</h4>
            <p className="text-xs text-indigo-200/90 mt-1 leading-relaxed">
              "Soft lighting, gentle rain, and slow deep breaths. Let the internet fade away for a few calm minutes."
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌙</span>
            <h3 className="font-bold text-lg text-slate-100">Midnight Ambient Sanctuary</h3>
          </div>
          {(rainActive || oceanActive) && (
            <button
              onClick={stopAllAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/30 transition-colors cursor-pointer"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>Stop Ambience</span>
            </button>
          )}
        </div>

        <p className="text-xs text-slate-400 mb-6">
          100% synthesized acoustic white/pink noise audio filters created in real time via the Web Audio API. Zero external tracking or sound files.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Rain */}
          <button
            onClick={handleToggleRain}
            className={`p-5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
              rainActive
                ? 'bg-indigo-900/40 border-indigo-400 ring-2 ring-indigo-400/40 shadow-lg shadow-indigo-500/20'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-xl ${rainActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-indigo-400'}`}>
                <CloudRain className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">Gentle Rain Shower</h4>
                <p className="text-xs text-slate-400 mt-0.5">Filtered pink noise rainfall</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${rainActive ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-slate-400'}`}>
              {rainActive ? 'Playing 🌧️' : 'Muted'}
            </span>
          </button>

          {/* Ocean */}
          <button
            onClick={handleToggleOcean}
            className={`p-5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
              oceanActive
                ? 'bg-cyan-900/40 border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-xl ${oceanActive ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-cyan-400'}`}>
                <Waves className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">Rolling Ocean Waves</h4>
                <p className="text-xs text-slate-400 mt-0.5">Slow modulated surf waves</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${oceanActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'}`}>
              {oceanActive ? 'Playing 🌊' : 'Muted'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. 4-4-4-4 Box Breathing Guide */}
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl text-center">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🫁</span>
            <h3 className="font-bold text-lg text-slate-100">Box Breathing Sanctuary</h3>
          </div>
          <button
            onClick={() => setBreathingRunning(!breathingRunning)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              breathingRunning
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {breathingRunning ? 'Pause Cycle' : 'Start Guide'}
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">
          Box breathing activates your parasympathetic nervous system: Inhale for 4s, Hold for 4s, Exhale for 4s, Rest for 4s.
        </p>

        {/* Breathing Visualizer Ring */}
        <div className="relative w-52 h-52 mx-auto flex items-center justify-center my-4">
          <div
            className={`absolute inset-0 rounded-full border-4 border-dashed border-cyan-400/40 transition-transform duration-1000 ${
              breathingRunning && breathPhase === 'Inhale'
                ? 'scale-110 border-indigo-400'
                : breathingRunning && breathPhase === 'Hold'
                ? 'scale-110 border-purple-400 animate-pulse'
                : breathingRunning && breathPhase === 'Exhale'
                ? 'scale-90 border-cyan-400'
                : 'scale-90 border-slate-700'
            }`}
          />
          <div className="text-center z-10">
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1">
              {breathingRunning ? breathPhase : 'Ready'}
            </p>
            <p className="text-5xl font-black font-mono text-white">
              {breathingRunning ? breathSeconds : '4'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Seconds</p>
          </div>
        </div>
      </div>

      {/* 3. Starry Expanse */}
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">✨</span>
          <h3 className="font-bold text-lg text-slate-100">Night Sky Starfield</h3>
        </div>
        <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-800 relative bg-[#0b0f19]">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <p className="text-xs text-slate-400/70 font-light tracking-widest uppercase">
              Gaze softly into the quiet infinite
            </p>
          </div>
        </div>
      </div>

      {/* 4. Calm Night Rituals */}
      <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Coffee className="w-5 h-5 text-amber-300" />
          <h3 className="font-bold text-lg text-slate-100">Cozy Wind-Down Prompts</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CALM_RITUALS.map((r, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              ⭐ {r}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
