// ─────────────────────────────────────────────────────────────
// HeroCarousel — mobile / tablet hero background
// Single Responsibility: renders only the mobile carousel.
// ─────────────────────────────────────────────────────────────

import { HERO_IMAGES } from '../../data';
import { useCarousel } from '../../hooks';

export function HeroCarousel() {
  const { index, goTo, handleTouchStart, handleTouchEnd } = useCarousel(HERO_IMAGES.length, 4000);

  return (
    <div className="absolute inset-0 z-0 lg:hidden overflow-hidden">
      {/* sliding track */}
      <div
        className="flex h-full"
        style={{
          width: `${HERO_IMAGES.length * 100}%`,
          transform: `translateX(-${(index * 100) / HERO_IMAGES.length}%)`,
          transition: 'transform 900ms cubic-bezier(0.77,0,0.175,1)',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {HERO_IMAGES.map(({ src, alt }, idx) => (
          <div
            key={idx}
            className="relative h-full group/slide"
            style={{ width: `${100 / HERO_IMAGES.length}%`, flexShrink: 0 }}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover grayscale brightness-50
                group-hover/slide:grayscale-0 group-hover/slide:brightness-[0.85]
                transition-[filter] duration-700 ease-in-out"
              style={{ transform: 'scale(1.04)' }}
            />
          </div>
        ))}
      </div>

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/50 to-[#050505] pointer-events-none z-10" />

      {/* dot nav */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => goTo(idx)}
            className={`rounded-full transition-all duration-300 focus:outline-none ${
              index === idx
                ? 'w-5 h-[6px] bg-[#FF4F00] shadow-[0_0_10px_rgba(255,79,0,0.5)]'
                : 'w-[6px] h-[6px] bg-zinc-600 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}