import { useEffect, type RefObject } from 'react';

// Translates an oversized image layer against scroll. The layer must extend beyond its frame (see .parallax-layer).
export function useParallax(ref: RefObject<HTMLElement | null>, strength = 0.08) {
  useEffect(() => {
    const layer = ref.current;
    const frame = layer?.parentElement;
    if (!layer || !frame) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const rect = frame.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const limit = rect.height * 0.1;
      const offset = Math.max(-limit, Math.min(limit, distanceFromCenter * -strength));
      layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(rafId);
    };
  }, [ref, strength]);
}
