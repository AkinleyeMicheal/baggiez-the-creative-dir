// ─────────────────────────────────────────────────────────────
// BTSModal — lightbox for Behind The Scenes items.
// Single Responsibility: BTS modal only.
// Interface Segregation: minimal, focused prop interface.
// ─────────────────────────────────────────────────────────────

import { XCircle } from 'lucide-react';
import type { BTSItem } from '../../types';

interface BTSModalProps {
  open: boolean;
  items: BTSItem[];
  currentIndex: number;
  onClose: () => void;
}

export function BTSModal({ open, items, currentIndex, onClose }: BTSModalProps) {
  const item = items[currentIndex];

  return (
    <div
      className={`fixed inset-0 z-100 bg-[#050505]/95 backdrop-blur-xl transition-opacity duration-300 items-center justify-center p-6 md:p-12 ${
        open ? 'opacity-100 flex' : 'opacity-0 hidden pointer-events-none'
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-12 md:right-12 text-zinc-400 hover:text-[#FF4F00] transition-colors duration-300 focus:outline-none p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur-md z-50"
        aria-label="Close BTS modal"
      >
        <XCircle size={24} strokeWidth={1.5} />
      </button>

      {item && (
        <div className="w-full max-w-6xl bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
          <div className="w-full md:w-3/5 relative bg-zinc-900 h-64 md:h-auto shrink-0">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col overflow-y-auto scrollbar-hide font-raleway">
            <span className="text-xs text-zinc-500 uppercase tracking-widest mb-4">{item.location}</span>
            <h3 className="text-3xl font-extralight -tracking-tight text-zinc-100 mb-6 font-clash">{item.title}</h3>
            <p className="text-sm font-light leading-relaxed text-zinc-400 mb-8">{item.desc}</p>
            <div className="mt-auto pt-8 border-t border-zinc-900">
              <span className="text-xs text-zinc-600 uppercase tracking-widest block mb-2">Production Notes</span>
              <p className="text-sm font-light text-zinc-300 italic">{item.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}