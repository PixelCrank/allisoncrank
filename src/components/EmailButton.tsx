'use client';
import { useParisConfetti } from '@/components/ParisConfetti';

export default function EmailButton() {
  const fireConfetti = useParisConfetti();

  return (
    <a
      href="mailto:hi@allisoncrank.com"
      className="px-4 py-1.5 text-sm font-medium rounded-full liquid-glass"
      onClick={fireConfetti}
    >
      <span className="glass-pill-text text-black/80">hi@allisoncrank.com</span>
    </a>
  );
}
