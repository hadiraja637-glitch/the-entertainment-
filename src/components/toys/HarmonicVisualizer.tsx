import React, { useRef, useEffect, useState } from 'react';
import { Sliders, Sparkles } from 'lucide-react';

export const HarmonicVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [speed, setSpeed] = useState<number>(1);
  const [nodesCount, setNodesCount] = useState<number>(14);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, width, height);

      const centerY = height / 2;
      const spacing = width / (nodesCount + 1);

      // Connecting wave line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
      ctx.lineWidth = 2;

      for (let i = 1; i <= nodesCount; i++) {
        const x = i * spacing;
        const freq = 1 + i * 0.15;
        const y = centerY + Math.sin(time * freq) * (height * 0.35);

        if (i === 1) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Nodes
      for (let i = 1; i <= nodesCount; i++) {
        const x = i * spacing;
        const freq = 1 + i * 0.15;
        const y = centerY + Math.sin(time * freq) * (height * 0.35);

        const hue = (i * 25 + time * 30) % 360;
        ctx.fillStyle = `hsl(${hue}, 85%, 65%)`;
        ctx.shadowColor = `hsl(${hue}, 85%, 65%)`;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      time += 0.02 * speed;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [speed, nodesCount]);

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌊</span>
          <h3 className="font-bold text-lg text-slate-100">Harmonic Wave Visualizer</h3>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Pendulum wave harmony simulation: oscillating frequencies create hypnotic snake and braided patterns.
      </p>

      {/* Canvas */}
      <div className="w-full h-56 rounded-2xl overflow-hidden border border-slate-800 bg-[#0b0f19] mb-4">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 max-w-md mx-auto">
        <div>
          <div className="flex justify-between mb-1">
            <span>Oscillation Speed</span>
            <span className="font-mono text-slate-200">{speed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3"
            step="0.1"
            value={speed}
            onChange={e => setSpeed(parseFloat(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>Pendulum Nodes</span>
            <span className="font-mono text-slate-200">{nodesCount}</span>
          </div>
          <input
            type="range"
            min="6"
            max="24"
            step="1"
            value={nodesCount}
            onChange={e => setNodesCount(parseInt(e.target.value, 10))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
