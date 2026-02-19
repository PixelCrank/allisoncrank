'use client';
import Image, { StaticImageData } from 'next/image';
import { useRef, useState, useCallback } from 'react';

export default function HeadshotEgg({
  src,
  pixelSrc,
  alt,
}: {
  src: StaticImageData;
  pixelSrc: StaticImageData;
  alt: string;
}) {
  const [showPixel, setShowPixel] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleClick = useCallback(() => {
    if (showPixel) return;
    setShowPixel(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowPixel(false), 2200);
  }, [showPixel]);

  return (
    <div
      className="relative group w-[180px] sm:w-[220px] aspect-square rounded-2xl overflow-hidden bg-black/5 flex-shrink-0 cursor-pointer select-none"
      data-cursor="allison"
      onClick={handleClick}
    >
      {/* Main headshot */}
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        priority
        unoptimized
        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
        style={{
          opacity: showPixel ? 0 : 1,
          transform: showPixel ? 'scale(1.08)' : undefined,
          transition: 'opacity 0.4s ease, transform 0.7s ease',
        }}
      />
      {/* Pixel swap */}
      <Image
        src={pixelSrc}
        alt="Pixel 🐾"
        width={400}
        height={400}
        unoptimized
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: showPixel ? 1 : 0,
          transform: showPixel ? 'scale(1)' : 'scale(1.08)',
          transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
      {/* Label */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-wider text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-0.5 rounded-full pointer-events-none whitespace-nowrap"
        style={{
          opacity: showPixel ? 1 : 0,
          transition: 'opacity 0.3s ease 0.2s',
        }}
      >
        this is Pixel 🐾
      </div>
    </div>
  );
}

