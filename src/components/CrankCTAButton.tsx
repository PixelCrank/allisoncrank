'use client';
import { useCallback } from 'react';

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInCubic(t: number)  { return t * t * t; }

// Pre-defined blobs — fewer, larger, faster to paint
const BLOBS = [
  { angle: 0,   orbit: 0.30, rx: 0.65, ry: 0.32, rot: 0.4,  c: '#D9694A', alpha: 0.50, speed: 0.55 },
  { angle: 2.1, orbit: 0.42, rx: 0.70, ry: 0.26, rot: 1.2,  c: '#F0C17A', alpha: 0.36, speed: 0.80 },
  { angle: 4.2, orbit: 0.36, rx: 0.60, ry: 0.30, rot: 2.5,  c: '#2d3580', alpha: 0.62, speed: 0.65 },
  { angle: 5.5, orbit: 0.28, rx: 0.50, ry: 0.40, rot: 1.7,  c: '#1a2060', alpha: 0.68, speed: 0.90 },
];

export default function CrankCTAButton() {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = 'https://crankstudio.io';
    const cx = e.clientX;
    const cy = e.clientY;

    const canvas = document.createElement('canvas');
    // Use device pixel ratio for sharpness but half-res for perf
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.cssText = 'position:fixed;inset:0;z-index:99998;pointer-events:none;will-change:transform;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: false })!;
    ctx.scale(dpr, dpr);

    const W = window.innerWidth;
    const H = window.innerHeight;
    const maxR = Math.sqrt(Math.max(cx, W - cx) ** 2 + Math.max(cy, H - cy) ** 2) * 1.15;

    // Pre-cache unit gradients once
    const grads = BLOBS.map(b => {
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      g.addColorStop(0,   b.c + 'cc');
      g.addColorStop(0.5, b.c + '55');
      g.addColorStop(1,   b.c + '00');
      return g;
    });

    const EXPAND = 600;
    const HOLD   = 250;
    const RECEDE = 420;
    const TOTAL  = EXPAND + HOLD + RECEDE;

    let openedTab = false;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;

      let radiusT: number;
      if (elapsed < EXPAND)                     radiusT = easeOutCubic(elapsed / EXPAND);
      else if (elapsed < EXPAND + HOLD)         radiusT = 1;
      else                                       radiusT = 1 - easeInCubic((elapsed - EXPAND - HOLD) / RECEDE);

      const R = maxR * Math.max(radiusT, 0);
      const time = elapsed * 0.001;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Navy base
      ctx.fillStyle = '#0B0F2E';
      ctx.fillRect(0, 0, W, H);

      const blobScale = Math.min(radiusT * 1.5, 1);
      for (let i = 0; i < BLOBS.length; i++) {
        const b = BLOBS[i];
        const angle = b.angle + time * b.speed;
        const orbitR = maxR * b.orbit * blobScale;
        const bx = cx + Math.cos(angle) * orbitR;
        const by = cy + Math.sin(angle) * orbitR;
        const rx = maxR * b.rx * blobScale;
        const ry = maxR * b.ry * blobScale;

        ctx.save();
        ctx.globalAlpha = b.alpha;
        ctx.translate(bx, by);
        ctx.rotate(b.rot + time * b.speed * 0.4);
        ctx.scale(rx, ry);
        ctx.fillStyle = grads[i];
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Centre label fade-in
      const labelStart = EXPAND * 0.65;
      if (elapsed > labelStart) {
        const labelIn  = Math.min((elapsed - labelStart) / 220, 1);
        const labelOut = elapsed > EXPAND + HOLD
          ? 1 - Math.min((elapsed - EXPAND - HOLD) / 180, 1) : 1;
        ctx.globalAlpha = easeOutCubic(labelIn) * labelOut * 0.48;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#f0ece6';
        ctx.font = '600 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('CRANK STUDIO', W / 2, H / 2);
      }

      ctx.restore();

      if (!openedTab && elapsed > EXPAND * 0.55) {
        openedTab = true;
        window.open(href, '_blank', 'noreferrer');
      }

      if (elapsed < TOTAL) {
        requestAnimationFrame(tick);
      } else {
        canvas.remove();
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <a
      href="https://crankstudio.io"
      onClick={handleClick}
      className="crank-cta inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-full"
    >
      Visit Crank Studio{' '}
      <svg
        aria-hidden="true"
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cta-arrow"
      >
        <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3M9.5 1.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}
