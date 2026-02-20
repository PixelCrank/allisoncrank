'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print hover-link-gradient inline-flex items-baseline rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-black/20 text-xs text-[#a3a3a3] font-light cursor-pointer bg-transparent border-none p-0"
    >
      <span className="link-label underline decoration-1 underline-offset-[3px] decoration-current/40">
        Print / Save as PDF
      </span>
    </button>
  );
}
