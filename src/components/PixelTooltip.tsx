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
      <span>Pixel</span>
      <span
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50"
        style={{
          opacity: hovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${hovered ? '0px' : '8px'})`,
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        <span className="liquid-glass flex flex-col gap-2 p-3 rounded-2xl" style={{ width: 172 }}>
          <span className="block rounded-xl overflow-hidden" style={{ width: 148, height: 148 }}>
            <Image
              src={src}
              alt="Pixel the Pomeranian"
              width={148}
              height={148}
              className="object-cover w-full h-full"
              unoptimized
            />
          </span>
          <span className="text-[11px] text-[#737373] font-light tracking-wide text-center">Pixel ✦ Pomeranian</span>
        </span>
      </span>
    </span>
  );
}
