import { useEffect, useRef } from 'react';

const RAMP = ' .·:-=+*#%₦@';

/**
 * A character-cell rendering of a drifting interference field, in the spirit
 * of ASCII-magic renders. Drawn to a 2D canvas so it stays cheap at ~24fps.
 */
export function AsciiField({
  className = '',
  cell = 14,
  color = '#8d8a82',
  accent = '#ff5a1f',
}: {
  className?: string;
  cell?: number;
  color?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${cell * 0.92}px "Geist Mono", monospace`;
      ctx.textBaseline = 'top';
      cols = Math.ceil(width / (cell * 0.62));
      rows = Math.ceil(height / cell);
      draw(reduced ? 8000 : performance.now());
    };

    const draw = (now: number) => {
      const t = now / 1000;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      const cw = cell * 0.62;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols - 0.5;
          const ny = y / rows - 0.5;
          const d = Math.sqrt(nx * nx * 2.2 + ny * ny);
          let v =
            Math.sin(nx * 9 + t * 0.7) * 0.5 +
            Math.sin(ny * 11 - t * 0.5 + Math.sin(nx * 4 + t * 0.3) * 2) * 0.5 +
            Math.sin(d * 18 - t * 1.4) * 0.6;
          v = (v + 1.6) / 3.2;
          v *= 1 - Math.min(1, d * 1.15);
          const idx = Math.max(0, Math.min(RAMP.length - 1, Math.floor(v * RAMP.length)));
          const ch = RAMP[idx];
          if (ch === ' ') continue;
          ctx.fillStyle = ch === '₦' || ch === '@' ? accent : color;
          ctx.globalAlpha = 0.35 + v * 0.65;
          ctx.fillText(ch, x * cw, y * cell);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (visible && now - last > 42) {
        draw(now);
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    document.fonts?.ready.then(resize);
    if (!reduced) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [cell, color, accent]);

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
