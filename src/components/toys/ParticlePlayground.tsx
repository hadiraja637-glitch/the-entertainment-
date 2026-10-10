import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Trash2, Sliders } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
}

const PALETTES = {
  cosmic: ['#c084fc', '#f472b6', '#38bdf8', '#818cf8', '#e879f9'],
  firefly: ['#facc15', '#fbbf24', '#34d399', '#4ade80', '#a3e635'],
  electric: ['#06b6d4', '#3b82f6', '#ec4899', '#a855f7', '#6366f1'],
};

export const ParticlePlayground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePalette, setActivePalette] = useState<keyof typeof PALETTES>('cosmic');
  const [gravity, setGravity] = useState<boolean>(true);
  const particlesRef = useRef<Particle[]>([]);
  const isPointerDownRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Subtle motion trail
      ctx.fillStyle = 'rgba(11, 15, 25, 0.18)';
      ctx.fillRect(0, 0, width, height);

      const currentParticles = particlesRef.current;
      for (let i = currentParticles.length - 1; i >= 0; i--) {
        const p = currentParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (gravity) p.vy += 0.08;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          currentParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [gravity]);

  const spawnParticles = (clientX: number, clientY: number, count = 5) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const colors = PALETTES[activePalette];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01,
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    spawnParticles(e.clientX, e.clientY, isPointerDownRef.current ? 6 : 2);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDownRef.current = true;
    spawnParticles(e.clientX, e.clientY, 15);
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h3 className="font-bold text-lg text-slate-100">Luminous Particle Fountain</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setGravity(!gravity)}
            className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
              gravity
                ? 'bg-purple-900/30 border-purple-500/40 text-purple-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            Gravity: {gravity ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => (particlesRef.current = [])}
            title="Clear Canvas"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-3">
        Move or drag your mouse or finger across the canvas to release radiant particles.
      </p>

      {/* Interactive Canvas */}
      <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-slate-800 bg-[#0b0f19] cursor-crosshair">
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="w-full h-full touch-none"
        />
        <div className="pointer-events-none absolute bottom-2 right-3 text-[10px] text-slate-500">
          Canvas Physics Simulation
        </div>
      </div>

      {/* Palette switchers */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {(Object.keys(PALETTES) as Array<keyof typeof PALETTES>).map(key => (
          <button
            key={key}
            onClick={() => setActivePalette(key)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize border transition-all ${
              activePalette === key
                ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {key} Glow
          </button>
        ))}
      </div>
    </div>
  );
};
