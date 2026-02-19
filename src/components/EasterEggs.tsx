'use client';
import { useRef, useState, useCallback, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
const ORIGINAL = 'Allison Crank';

function scramble(target: string, progress: number): string {
  return target
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' ';
      const revealed = i < Math.floor(progress * target.length);
      if (revealed) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join('');
}

export function ScrambleName({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [text, setText] = useState(ORIGINAL);
  const [active, setActive] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const startRef = useRef<number>(0);
  const DURATION = 900;

  const run = useCallback(() => {
    if (active) return;
    setActive(true);
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      setText(scramble(ORIGINAL, progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setText(ORIGINAL);
        setActive(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [active]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <h1
      className={className}
      style={{ ...style, cursor: 'default', fontVariantNumeric: 'tabular-nums' }}
      onMouseEnter={run}
    >
      {text}
    </h1>
  );
}

const SECRET = "built with obsessive care ✦ paris, 2025";

export function FooterSecret() {
  const [revealed, setRevealed] = useState(false);
  const clickCount = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleClick = useCallback(() => {
    clickCount.current++;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { clickCount.current = 0; }, 600);

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      setRevealed(true);
      setTimeout(() => setRevealed(false), 4000);
    }
  }, []);

  return (
    <p
      className="mt-16 text-xs text-[#c0c0c0] font-light cursor-default select-none"
      onClick={handleClick}
      style={{ transition: 'color 0.4s ease' }}
    >
      {revealed ? (
        <span style={{ color: '#D9694A', letterSpacing: '0.06em' }}>{SECRET}</span>
      ) : (
        'allisoncrank.com'
      )}
    </p>
  );
}
