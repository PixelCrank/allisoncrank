'use client';
import { useEffect } from 'react';

export default function ScrollAnimations() {
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
  return null;
}
