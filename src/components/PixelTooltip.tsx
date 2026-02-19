'use client';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

export default function PixelTooltip({ src }: { src: StaticImageData }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative inline-block cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="underline decoration-dotted underline-offset-[3px] decoration-current/30">Pixel</span>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${hovered ? '0px' : '6px'})`,
        }}
      >
        <span className="block rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/8"
          style={{ width: 160, height: 160 }}>
          <Image
            src={src}
            alt="Pixel the Pomeranian"
            width={160}
            height={160}
            className="object-cover w-full h-full"
            unoptimized
          />
        </span>
      </span>
    </span>
  );
}
