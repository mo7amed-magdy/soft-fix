import { useEffect, useRef, type ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  className?: string;
  /** Distance (px) outside the element's edge where the pull starts. */
  padding?: number;
  /** Higher = weaker pull. */
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

/**
 * Mouse-following magnetic effect. Writes the transform straight to the DOM
 * (no React re-render per mousemove) and is disabled for touch devices and
 * reduced-motion users.
 */
export function Magnet({
  children,
  className,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: MagnetProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduced) return;

    let frame = 0;
    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = outer.current;
        const target = inner.current;
        if (!el || !target) return;
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const active = Math.abs(dx) < rect.width / 2 + padding && Math.abs(dy) < rect.height / 2 + padding;
        target.style.transition = active ? activeTransition : inactiveTransition;
        target.style.transform = active
          ? `translate3d(${dx / strength}px, ${dy / strength}px, 0)`
          : 'translate3d(0, 0, 0)';
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
