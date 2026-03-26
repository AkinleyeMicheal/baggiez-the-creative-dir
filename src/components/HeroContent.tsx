// ─────────────────────────────────────────────────────────────
// HeroContent — text layer that sits above the hero background.
// Single Responsibility: renders only the hero text + CTA.
// ─────────────────────────────────────────────────────────────

import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import { GlitchText } from './GlitchText';

export function HeroContent() {
  return (
    <div className="relative z-10 max-w-400 mx-auto w-full flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-zinc-100 mb-8 text-center leading-none"
      >
        <GlitchText text="Ezekiel Anefiok" delay={0.3} />
        <span className="text-[#FF4F00]">.</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full flex flex-col md:flex-row justify-between items-start md:items-end text-xs uppercase tracking-widest text-zinc-500 mb-12 gap-4"
      >
        <div>
          <p className="text-zinc-300 mb-1">Baggiez</p>
          <p>Creative Director</p>
        </div>
        <div className="hidden md:block text-center">
          <p className="text-zinc-300 mb-1">Film &amp; Visual Arts</p>
          <p>London — Lagos</p>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <a
              href="#work"
              className="text-zinc-100 border border-zinc-800 hover:bg-[#FF4F00] hover:border-[#FF4F00] hover:text-white transition-colors duration-300 px-4 py-2 rounded-full"
            >
              View Work
            </a>
            <button
              onClick={() => alert('Showreel video integration coming soon.')}
              className="flex items-center gap-1 hover:text-[#FF4F00] transition-colors duration-300"
            >
              <PlayCircle size={16} strokeWidth={1.5} />
              Showreel
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        className="w-full mt-16 md:mt-24 pt-8 flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8 text-xs md:text-sm font-medium uppercase tracking-widest text-zinc-400 border-t border-zinc-800/50"
      >
        {['Creative Direction', 'Directing & Production', 'Post-Production', 'Color Grading'].map(
          (label, idx, arr) => (
            <>
              <span key={label}>{label}</span>
              {idx < arr.length - 1 && (
                <span key={`dot-${idx}`} className="hidden md:block w-1 h-1 rounded-full bg-[#ff4f00]" />
              )}
            </>
          )
        )}
      </motion.div>
    </div>
  );
}