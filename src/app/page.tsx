import type { Metadata } from 'next';
import Image from 'next/image';

import headshot from '../../images/headshot.png';
import crankLogo from '../../images/crankstudio.png';
import ScrollAnimations from './ScrollAnimations';
import DesignerCursor from './DesignerCursor';
import { FooterSecret } from '@/components/EasterEggs';
import CrankCTAButton from '@/components/CrankCTAButton';
import ParisHeaderRow from '@/components/ParisHeaderRow';
import pixeldog from '../../images/pixeldog.png';
import PixelTooltip from '@/components/PixelTooltip';

export const metadata: Metadata = {
  title: 'Allison Crank',
  description:
    'Designer and researcher based in Paris. Founder of Crank Studio. Working at the intersection of architecture, immersive technology, and intelligent systems.',
};

function Link({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  const external = href.startsWith('http') || href.startsWith('mailto');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`hover-link-gradient inline-flex items-baseline rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-black/20 ${className}`}
    >
      <span className="link-label underline decoration-1 underline-offset-[3px] decoration-current/40">{children}</span>
    </a>
  );
}

export default function AllisonPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#000000]" data-allison>
      {/* Hidden SVG filter for liquid glass distortion */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glass-filter" primitiveUnits="objectBoundingBox">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="blur" />
            <feDisplacementMap in="blur" in2="SourceGraphic" scale="0.04" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <style>{`
        @keyframes cta-gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes cta-shimmer {
          0%   { transform: translateX(-140%) skewX(-18deg); }
          100% { transform: translateX(260%) skewX(-18deg); }
        }
        [data-allison] .crank-cta {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0B0F2E 0%, #2d3580 28%, #D9694A 62%, #F0C17A 100%);
          background-size: 280% 280%;
          animation: cta-gradient-shift 5s ease infinite;
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease;
          box-shadow: 0 2px 18px rgba(11, 15, 46, 0.2);
        }
        [data-allison] .crank-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          width: 38%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.24), transparent);
          transform: translateX(-140%) skewX(-18deg);
        }
        [data-allison] .crank-cta:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 30px rgba(217, 105, 74, 0.45), 0 2px 10px rgba(11, 15, 46, 0.3);
        }
        [data-allison] .crank-cta:hover::before {
          animation: cta-shimmer 0.55s ease-out forwards;
        }
        [data-allison] .crank-cta .cta-arrow {
          display: inline-block;
          transition: transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        [data-allison] .crank-cta:hover .cta-arrow {
          transform: translate(2px, -2px);
        }
        @keyframes paris-pop {
          0%   { opacity: 0; transform: translateX(-50%) translateY(6px) scale(0.8); }
          60%  { transform: translateX(-50%) translateY(-10px) scale(1.06); }
          80%  { transform: translateX(-50%) translateY(-7px) scale(0.97); }
          100% { opacity: 1; transform: translateX(-50%) translateY(-8px) scale(1); }
        }
        [data-allison] .paris-word {
          position: relative;
          cursor: default;
        }
        [data-allison] .paris-tooltip {
          pointer-events: none;
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(6px) scale(0.8);
          opacity: 0;
          white-space: nowrap;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(14px) saturate(1.5);
          -webkit-backdrop-filter: blur(14px) saturate(1.5);
          color: #2a2a2a;
          font-size: 10px;
          letter-spacing: 0.06em;
          padding: 4px 9px 4px 7px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.4);
          box-shadow: 0 2px 14px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.55);
          transition: none;
          margin-bottom: 6px;
        }
        [data-allison] .paris-word:hover .paris-tooltip {
          animation: paris-pop 0.42s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
      <div className="px-6 md:px-12 lg:px-20 max-w-3xl mx-auto py-16 sm:py-24">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <ParisHeaderRow headshotSrc={headshot} pixelSrc={pixeldog} />

        {/* ── Bio ─────────────────────────────────────────────────────────── */}
        <div className="mt-14 space-y-5 text-[clamp(1rem,2vw,1.1rem)] font-light leading-relaxed text-[#737373]">
          <p className="stagger-paragraph" style={{ '--i': '0' } as React.CSSProperties}>
            I&apos;m a designer and researcher based in Paris, originally trained as an
            architect at Wellesley College and MIT, then Contextual Design at Design Academy
            Eindhoven, and Design for Digital Innovation at EPFL and ECAL. In 2020 I launched{' '}
            <Link href="https://crankstudio.io" className="text-[#737373]">Crank Studio</Link>
            {' '}— a practice devoted to experiences where design feels precise, human, and alive. Formally incorporated in 2024.
          </p>
          <p className="stagger-paragraph" style={{ '--i': '1' } as React.CSSProperties}>
            My work spans XR, VR, MR, game design, AI-driven interfaces, and spatial
            computing. I was lead interaction designer on{' '}
            <Link href="https://impulse-xr.io/" className="text-[#737373]">IMPULSE</Link>
            , an Emmy-nominated mixed-reality experience about ADHD, perception, and
            neurodiversity, and on{' '}
            <Link href="https://www.electricskies.io/glimpse" className="text-[#737373]">Glimpse</Link>
            , an animated VR experience that won Best Interactive Experience at Cannes XR
            and the VR Cristal at Annecy after premiering at Venice. I&apos;ve also designed
            therapeutic games for neurodiverse adolescents currently entering clinical
            trials, and culture-care systems for hospitals and museums.
          </p>
          <p className="stagger-paragraph" style={{ '--i': '2' } as React.CSSProperties}>
            Past collaborators include National Geographic, Google News Initiative, Meta, Audemars Piguet,
            Dreamscape, La Biennale di Venezia, and MIT. Projects have premiered at Venice,
            Cannes, Tribeca, and Annecy.
          </p>
          <p className="stagger-paragraph" style={{ '--i': '3' } as React.CSSProperties}>
            Before Crank Studio I was Head of Digital Experiences at{' '}
            <Link href="https://wowl.ch" className="text-[#737373]">wowl</Link>
            , and a researcher at the{' '}
            <Link href="https://epfl-ecal-lab.ch" className="text-[#737373]">EPFL+ECAL Lab</Link>
            {' '}where I worked on the UNESCO-recognized{' '}
            <Link href="https://www.epfl.ch/innovation/domains/fr/centre-dinnovation-dans-les-patrimoines-culturels/projet-montreux-jazz-digital/" className="text-[#737373]">
              Montreux Jazz digital archive
            </Link>
            . My research has appeared in <em>Leonardo</em> (MIT Press) and at SIGGRAPH,
            and my practice has been profiled by{' '}
            <Link href="https://xrmust.com/xrmagazine/allison-crank-ux-xr-designer/" className="text-[#737373]">XRMust</Link>.
          </p>
          <p className="stagger-paragraph" style={{ '--i': '4' } as React.CSSProperties}>
            I&apos;ve taught at the Architectural Association Visiting School in Melbourne
            (four editions), at{' '}
            <Link href="https://www.hslu.ch/en/lucerne-school-of-design-film-and-art/degree-programmes/bachelor/spatial-design/" className="text-[#737373]">HSLU in Lucerne</Link>
            , and as an expert lecturer on the{' '}
            <Link href="https://xpro.mit.edu/courses/course-v1:xPRO+ARVRx+R1/" className="text-[#737373]">MIT xPRO Virtual Reality &amp; Augmented Reality programme</Link>
            . I also mentor at the Venice Biennale College Cinema — most recently for the 2026 edition.
          </p>
          <p className="stagger-paragraph" style={{ '--i': '5' } as React.CSSProperties}>
            I design for how people feel, move, and make meaning in complex, hybrid worlds. Offline, I&apos;m usually roaming Paris with <PixelTooltip src={pixeldog} />, my Pomeranian — an exacting authority on nap architecture.
          </p>
        </div>

        {/* ── Studio CTA ──────────────────────────────────────────────────── */}
        <div className="scale-reveal mt-14 rounded-2xl liquid-glass p-6 sm:p-8 space-y-4">
          <Image
            src={crankLogo}
            alt="Crank Studio"
            width={120}
            height={36}
            unoptimized
            className="h-7 w-auto opacity-90"
          />
          <p className="text-[clamp(1.05rem,2.1vw,1.25rem)] font-light leading-relaxed text-[#404040] max-w-[58ch]">
            Project work — XR, VR, MR, game design, AI interfaces, and spatial
            experiences for cultural institutions, research organizations, and industry —
            is through{' '}
            <Link href="https://crankstudio.io">Crank Studio</Link>.
          </p>
          <CrankCTAButton />
        </div>

        {/* ── Contact ─────────────────────────────────────────────────────── */}
        <div className="fade-in mt-14 pt-10 border-t border-black/8">
          <p className="text-sm text-[#a3a3a3] font-light">
            Direct inquiries —{' '}
            <Link href="mailto:hi@allisoncrank.com" className="text-[#737373]">hi@allisoncrank.com</Link>
          </p>
        </div>

        <FooterSecret />

      </div>
      <ScrollAnimations />
      <DesignerCursor />
    </main>
  );
}
