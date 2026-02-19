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

const SECRET = "built with obsessive care ✦ paris, 2026";

export function FooterSecret() {
  const [revealed, setRevealed] = useState(false);
  const [displayText, setDisplayText] = useState('allisoncrank.com');
  const clickCount = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rafRef = useRef<number | undefined>(undefined);
  const startRef = useRef<number>(0);
  const DURATION = 700;

  const runReveal = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startRef.current) / DURATION, 1);
      setDisplayText(scramble(SECRET, progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(SECRET);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleClick = useCallback(() => {
    clickCount.current++;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { clickCount.current = 0; }, 600);

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      setRevealed(true);
      runReveal();
      timerRef.current = setTimeout(() => {
        setRevealed(false);
        setDisplayText('allisoncrank.com');
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      }, 4000);
    }
  }, [runReveal]);

  return (
    <p
      className="mt-16 text-xs font-light cursor-default select-none"
      onClick={handleClick}
      style={{
        color: revealed ? '#D9694A' : '#c0c0c0',
        letterSpacing: revealed ? '0.06em' : undefined,
        fontVariantNumeric: 'tabular-nums',
        transition: 'color 0.3s ease, letter-spacing 0.3s ease',
      }}
    >
      {displayText}
    </p>
  );
}
