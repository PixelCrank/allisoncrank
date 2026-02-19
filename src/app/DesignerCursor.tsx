'use client';
import { useEffect, useRef, useState } from 'react';

const GLASS_SHADOW = 'inset 0 0 0 1px rgba(255,255,255,0.18), inset 1.8px 3px 0px -2px rgba(255,255,255,0.85), inset -2px -2px 0px -2px rgba(255,255,255,0.72), inset -3px -8px 1px -6px rgba(255,255,255,0.5), inset -0.3px -1px 4px 0px rgba(0,0,0,0.09), inset 0px 3px 4px -2px rgba(0,0,0,0.16), 0px 2px 8px 0px rgba(0,0,0,0.09), 0px 4px 16px 0px rgba(0,0,0,0.06)';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
const RAINBOW = ['#D9694A','#F0C17A','#0B0F2E','#2d3580','#e07a5f','#f5d08a','#c45832','#1a2060'];

export default function DesignerCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number | undefined>(undefined);
  const hoveringRef = useRef(false);
  const rainbowRef = useRef(false);
  const rainbowTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const konamiProgress = useRef(0);
  // Click squish: lerp toward target scale each frame
  const clickScaleRef = useRef(1);
  const clickScaleTargetRef = useRef(1);

  // Don't activate on touch / coarse-pointer devices (phones, tablets)
  // useState(false) keeps SSR and first client render in sync; effect detects touch.
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }
    document.documentElement.style.cursor = 'none';

    // ── Konami code listener ──────────────────────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiProgress.current]) {
        konamiProgress.current++;
        if (konamiProgress.current === KONAMI.length) {
          konamiProgress.current = 0;
          // Activate rainbow mode
          rainbowRef.current = true;
          if (rainbowTimerRef.current) clearTimeout(rainbowTimerRef.current);
          rainbowTimerRef.current = setTimeout(() => {
            rainbowRef.current = false;
            const ring = ringRef.current;
            if (ring) {
              ring.style.borderColor = '';
              ring.style.boxShadow = GLASS_SHADOW;
              ring.style.background = hoveringRef.current ? 'rgba(255,255,255,0.03)' : 'rgba(184,184,186,0.06)';
            }
          }, 10000);
        }
      } else {
        konamiProgress.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };

    // Rainbow animation tick counter
    let rainbowFrame = 0;

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

    // ── Click squish + ripple ─────────────────────────────────────────────
    const onMouseDown = () => {
      clickScaleTargetRef.current = 0.72;
      // Spawn an expanding ripple ring at the click position
      const ripple = document.createElement('div');
      const x = pos.current.x;
      const y = pos.current.y;
      ripple.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        pointer-events: none;
        border-radius: 50%;
        z-index: 9998;
        width: 34px; height: 34px;
        border: 1px solid rgba(255,255,255,0.45);
        transform: translate(${x}px, ${y}px) translate(-50%, -50%) scale(1);
        opacity: 0.7;
        transition: transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease;
      `;
      document.body.appendChild(ripple);
      // Trigger transition on the next paint
      requestAnimationFrame(() => {
        ripple.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(2.8)`;
        ripple.style.opacity = '0';
      });
      setTimeout(() => ripple.remove(), 600);
    };

    const onMouseUp = () => {
      // Overshoot spring back
      clickScaleTargetRef.current = 1.12;
      setTimeout(() => { clickScaleTargetRef.current = 1; }, 120);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const tick = () => {
      rainbowFrame++;
      const ring = ringRef.current;
      const dot = dotRef.current;

      if (ring) {
        ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.13);
        ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.13);

        // ── Velocity stretch: lag vector drives squish like a liquid droplet
        const dx = pos.current.x - ringPos.current.x;
        const dy = pos.current.y - ringPos.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const stretchAmt = Math.min(speed * 0.016, 0.40);
        const sx = 1 + stretchAmt;
        const sy = Math.max(1 / sx, 0.72); // preserve rough volume
        const angle = speed > 1 ? Math.atan2(dy, dx) : 0;

        // ── Click squish: lerp toward target scale
        clickScaleRef.current = lerp(clickScaleRef.current, clickScaleTargetRef.current, 0.22);
        const cs = clickScaleRef.current;

        ring.style.transform = [
          `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`,
          `translate(-50%, -50%)`,
          `rotate(${angle}rad)`,
          `scale(${sx * cs}, ${sy * cs})`,
        ].join(' ');

        if (rainbowRef.current) {
          const idx = Math.floor(rainbowFrame / 4) % RAINBOW.length;
          const color = RAINBOW[idx];
          ring.style.background = `${color}55`;
          ring.style.boxShadow = `${GLASS_SHADOW}, 0 0 18px 4px ${color}88`;
          ring.style.width = '42px';
          ring.style.height = '42px';
        }
      }

      // ── Precise inner dot: zero lag, always at exact pointer position
      if (dot) {
        dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (rainbowTimerRef.current) clearTimeout(rainbowTimerRef.current);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Lagging glass ring */}
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
      {/* Precise inner dot — zero lag, always at exact pointer */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full"
        style={{
          width: 5,
          height: 5,
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 0 5px 1px rgba(255,255,255,0.35)',
          willChange: 'transform',
        }}
      />
    </>
  );
}

