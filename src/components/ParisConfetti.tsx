'use client';
import { useCallback, useRef } from 'react';

const COLORS = [
  '#0B0F2E', '#1a2060', '#2d3580',
  '#D9694A', '#e07a5f', '#c45832',
  '#F0C17A', '#f5d08a', '#e8a840',
  '#ffffff', '#f0ece6',
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: 'rect' | 'circle' | 'strip' | 'image';
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function useParisConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const fire = useCallback(async () => {
    // Preload pixel image once
    if (!imgRef.current) {
      try {
        imgRef.current = await loadImage('/images/pixel.png');
      } catch {
        // fall through without image
      }
    }

    // Create canvas if needed
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999';
      document.body.appendChild(canvas);
      canvasRef.current = canvas;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d')!;

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const count = 240;
    // ~20% image particles if image loaded, rest normal shapes
    const imgRatio = imgRef.current ? 0.2 : 0;

    const particles: Particle[] = Array.from({ length: count }, (_, i) => {
      const spread = window.innerWidth * 0.85;
      const startX = window.innerWidth / 2 + (Math.random() - 0.5) * spread;
      const isImg = i < count * imgRatio;
      const shape: Particle['shape'] = isImg
        ? 'image'
        : Math.random() < 0.45 ? 'rect' : Math.random() < 0.5 ? 'circle' : 'strip';
      const size = isImg ? Math.random() * 18 + 20 : undefined;
      return {
        x: startX,
        y: Math.random() * -40,
        vx: (Math.random() - 0.5) * 5,
        vy: Math.random() * 3.5 + 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: size ?? (shape === 'strip' ? 2 : Math.random() * 8 + 4),
        height: size ? size * (738 / 620) : (shape === 'strip' ? Math.random() * 18 + 10 : Math.random() * 8 + 4),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.14,
        opacity: 1,
        shape,
      };
    });

    const tick = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      let alive = 0;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas!.height * 0.65) p.opacity -= 0.025;
        if (p.opacity <= 0) continue;
        alive++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        if (p.shape === 'image' && imgRef.current) {
          ctx.drawImage(imgRef.current, -p.width / 2, -p.height / 2, p.width, p.height);
        } else if (p.shape === 'circle') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        }
        ctx.restore();
      }
      if (alive > 0) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      }
    };

    animRef.current = requestAnimationFrame(tick);
  }, []);

  return fire;
}
