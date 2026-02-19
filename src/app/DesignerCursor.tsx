'use client';
import { useEffect, useRef } from 'react';

const GLASS_SHADOW = 'inset 0 0 0 1px rgba(255,255,255,0.18), inset 1.8px 3px 0px -2px rgba(255,255,255,0.85), inset -2px -2px 0px -2px rgba(255,255,255,0.72), inset -3px -8px 1px -6px rgba(255,255,255,0.5), inset -0.3px -1px 4px 0px rgba(0,0,0,0.09), inset 0px 3px 4px -2px rgba(0,0,0,0.16), 0px 2px 8px 0px rgba(0,0,0,0.09), 0px 4px 16px 0px rgba(0,0,0,0.06)';

export default function DesignerCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number | undefined>(undefined);
  const hoveringRef = useRef(false);

  useEffect(() => {
    document.documentElement.style.cursor = 'none';

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const isInteractive = (el: HTMLElement) =>
      !!(el.closest('a, button, [role="button"], [data-cursor]'));

    const onOver = (e: MouseEvent) => {
      const hovering = isInteractive(e.target as HTMLElement);
      if (hovering === hoveringRef.current) return;
      hoveringRef.current = hovering;
      const ring = ringRef.current;
      if (!ring) return;
      if (hovering) {
        ring.style.width = '44px';
        ring.style.height = '44px';
        ring.style.background = 'rgba(255,255,255,0.03)';
        ring.style.backdropFilter = 'blur(0.5px)';
        (ring.style as CSSStyleDeclaration & { WebkitBackdropFilter?: string }).WebkitBackdropFilter = 'blur(0.5px)';
      } else {
        ring.style.width = '34px';
        ring.style.height = '34px';
        ring.style.background = 'rgba(184,184,186,0.06)';
        ring.style.backdropFilter = 'blur(2px) saturate(120%)';
        (ring.style as CSSStyleDeclaration & { WebkitBackdropFilter?: string }).WebkitBackdropFilter = 'blur(2px) saturate(120%)';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    const tick = () => {
      const ring = ringRef.current;
      if (ring) {
        ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.13);
        ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.13);
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
      style={{
        width: 34,
        height: 34,
        background: 'rgba(184,184,186,0.06)',
        backdropFilter: 'blur(2px) saturate(120%)',
        WebkitBackdropFilter: 'blur(2px) saturate(120%)',
        boxShadow: GLASS_SHADOW,
        willChange: 'transform',
        transition: 'width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), background 0.25s ease, backdrop-filter 0.25s ease',
      }}
    />
  );
}

