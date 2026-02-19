'use client';
import { useState, useEffect, useRef } from 'react';
import { StaticImageData } from 'next/image';
import HeadshotEgg from './HeadshotEgg';
import MagneticText from './MagneticText';
import EmailButton from './EmailButton';

const PARIS_IMG =
  'https://images.unsplash.com/photo-1593474769219-fea89cf0bbef?q=80&w=800&auto=format&fit=crop';

function getParisTime() {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function ParisHeaderRow({
  headshotSrc,
  pixelSrc,
}: {
  headshotSrc: StaticImageData;
  pixelSrc: StaticImageData;
}) {
  const [parisHover, setParisHover] = useState(false);
  const [parisTime, setParisTime] = useState('');
  const tickRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Start ticking when hovered, stop when not
  useEffect(() => {
    if (parisHover) {
      setParisTime(getParisTime());
      tickRef.current = setInterval(() => setParisTime(getParisTime()), 1000);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [parisHover]);

  return (
    <header className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-10 sm:gap-14 items-center mb-16 sm:mb-20">
      <HeadshotEgg
        src={headshotSrc}
        pixelSrc={pixelSrc}
        alt="Allison Crank"
        showParis={parisHover}
        parisImgSrc={PARIS_IMG}
      />

      <div className="space-y-5">
        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#a3a3a3]">
            <span
              className="paris-word"
              onMouseEnter={() => setParisHover(true)}
              onMouseLeave={() => setParisHover(false)}
            >
              Paris
              <span className="paris-tooltip">✦ {parisTime}</span>
            </span>
          </p>
          <h1
            className="text-[clamp(2.6rem,5.5vw,4rem)] leading-[0.94] font-light tracking-tight"
            style={{ fontFamily: 'var(--font-crank)' }}
          >
            Allison Crank
          </h1>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          <MagneticText strength={10}>
            <EmailButton />
          </MagneticText>
          <MagneticText strength={10}>
            <a
              href="/cv"
              className="px-4 py-1.5 text-sm font-medium rounded-full liquid-glass"
            >
              <span className="glass-pill-text text-black/80">CV</span>
            </a>
          </MagneticText>
          <MagneticText strength={10}>
            <a
              href="https://www.linkedin.com/in/allison-crank-53366b34"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 text-sm font-medium rounded-full liquid-glass"
            >
              <span className="glass-pill-text text-black/80">LinkedIn</span>
            </a>
          </MagneticText>
        </div>
      </div>
    </header>
  );
}
