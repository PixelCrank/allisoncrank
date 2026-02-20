'use client';
import { useEffect, useRef } from 'react';

export default function ScrollAnimations() {
  const barRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal observer
  useEffect(() => {
    const selectors = '.fade-in, .scale-reveal, .stagger-paragraph';
    const els = document.querySelectorAll<HTMLElement>(selectors);

    const makeVisible = () => els.forEach((el) => el.classList.add('visible'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -16px 0px' },
    );
    els.forEach((el) => observer.observe(el));

    const fallback = setTimeout(makeVisible, 900);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  // Progress bar
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      const progress = scrollable > 0 ? scrollTop / scrollable : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        background: 'linear-gradient(90deg, #0B0F2E 0%, #2d3580 25%, #D9694A 65%, #F0C17A 100%)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
}
