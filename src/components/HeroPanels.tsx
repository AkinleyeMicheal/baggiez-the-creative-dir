// ─────────────────────────────────────────────────────────────
// HeroPanels — desktop 4-panel hero background
//
// Animation rationale:
//   A "curtain wipe" (clip-path inset reveal) mimics a film
//   shutter or projector gate opening — native to the filmmaker
//   medium. Each panel reveals top-to-bottom with a staggered
//   delay so they ungate left-to-right like a film strip loading.
//   A slow Ken Burns drift (scale 1.0 → 1.06) keeps images alive
//   after reveal. On hover, grayscale lifts to restore colour —
//   the same interaction as the original design.
//
// Single Responsibility: renders only the desktop panel grid.
// ─────────────────────────────────────────────────────────────

import { motion } from 'motion/react';
import { HERO_IMAGES } from '../../data';

export function HeroPanels() {
  return (
    <div className="absolute inset-0 z-0 hidden lg:grid grid-cols-4">
      {HERO_IMAGES.map(({ src, alt }, idx) => (
        <div key={idx} className="relative overflow-hidden group/panel">
          {/*
           * Curtain mask — starts fully covering the image (inset 0% from top = fully masked),
           * then animates to inset(0% 0% 0% 0%) = fully revealed.
           * This is the "film shutter opening" effect.
           */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: '#050505' }}
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            transition={{
              duration: 1.2,
              delay: idx * 0.22,
              ease: [0.76, 0, 0.24, 1], // cinematic ease — fast in, slow finish
            }}
          />

          {/* Image with Ken Burns drift */}
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-full object-cover grayscale brightness-50
              group-hover/panel:grayscale-0 group-hover/panel:brightness-[0.85]
              transition-[filter] duration-700 ease-in-out"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.06 }}
            transition={{
              duration: 12,
              delay: idx * 0.22 + 1.2, // starts drifting only after curtain finishes
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />

          {/* separator line */}
          {idx > 0 && (
            <div className="absolute inset-y-0 left-0 w-px bg-white/6 z-20 pointer-events-none" />
          )}
        </div>
      ))}

      {/* master gradient — keeps text legible over all four panels */}
      <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-[#050505]/55 to-[#050505] pointer-events-none z-10" />
    </div>
  );
}