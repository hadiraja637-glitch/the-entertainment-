import React, { useRef, useState, useEffect } from 'react';
import { sound } from '../../services/sound';
import { Trash2, Download, Sparkles } from 'lucide-react';

const COLORS = ['#f472b6', '#38bdf8', '#c084fc', '#4ade80', '#fbbf24', '#ffffff'];

export const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState('#f472b6');
  const [brushSize, setBrushSize] = useState(4);
  const [isRainbow, setIsRainbow] = useState(false);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const hueRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    lastPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || !lastPosRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    let strokeColor = color;
    if (isRainbow) {
      hueRef.current = (hueRef.current + 3) % 360;
      strokeColor = `hsl(${hueRef.current}, 100%, 70%)`;
    }

    ctx.strokeStyle = strokeColor;
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 8;

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    ctx.restore();

    lastPosRef.current = { x: currentX, y: currentY };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, rect.width, rect.height);
    sound.playBlip();
  };

  const exportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `the-entertainment-sketch-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    sound.playSuccess();
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎨</span>
          <h3 className="font-bold text-lg text-slate-100">Glow Sketch Canvas</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearCanvas}
            title="Clear Canvas"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={exportPNG}
            title="Save PNG"
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-3">
        Doodle freely with luminous cosmic neon brushes. Touch and mouse enabled!
      </p>

      {/* Canvas */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-800 bg-[#0b0f19]">
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          className="w-full h-full touch-none cursor-crosshair"
        />
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {/* Colors */}
        <div className="flex items-center gap-2">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setIsRainbow(false);
              }}
              style={{ backgroundColor: c }}
              className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                color === c && !isRainbow ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'
              }`}
            />
          ))}
          <button
            onClick={() => setIsRainbow(!isRainbow)}
            className={`px-2 py-0.5 rounded-lg text-xs font-bold border transition-all ${
              isRainbow
                ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white border-white scale-105'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Rainbow 🌈
          </button>
        </div>

        {/* Thickness slider */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Brush:</span>
          <input
            type="range"
            min="2"
            max="20"
            value={brushSize}
            onChange={e => setBrushSize(parseInt(e.target.value, 10))}
            className="w-24 accent-purple-500 cursor-pointer"
          />
          <span className="font-mono text-slate-200">{brushSize}px</span>
        </div>
      </div>
    </div>
  );
};
