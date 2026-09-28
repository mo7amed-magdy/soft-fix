import { useId } from 'react';
import { motion } from 'framer-motion';
import { ICON, WORDMARK } from './paths';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Unique, url()-safe id for SVG defs. */
function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
}

type IconVariant = 'color' | 'light' | 'mono';

interface IconGroupProps {
  variant: IconVariant;
  /** Fill for the frame when variant is not "color". */
  frameFill?: string;
  drawCheck?: boolean;
  drawDelay?: number;
}

/** The icon artwork, drawn in the 676×648 icon coordinate space. */
function IconGroup({ variant, frameFill, drawCheck, drawDelay = 0 }: IconGroupProps) {
  const gradId = useSvgId('sf-check');
  const maskId = useSvgId('sf-draw');
  const frame = variant === 'color' ? '#004BF6' : (frameFill ?? 'currentColor');
  const check = variant === 'mono' ? frame : `url(#${gradId})`;

  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="155" y1="0" x2="676" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#004BF6" />
          <stop offset="1" stopColor="#00F2E4" />
        </linearGradient>
        {drawCheck && (
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={ICON.width} height={ICON.height}>
            <motion.path
              d={ICON.checkLine}
              fill="none"
              stroke="#fff"
              strokeWidth={200}
              strokeLinecap="butt"
              strokeLinejoin="miter"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: drawDelay, ease: EASE }}
            />
          </mask>
        )}
      </defs>
      <path fill={frame} d={ICON.frameTop + ICON.frameBottom} />
      <path fill={check} d={ICON.check} mask={drawCheck ? `url(#${maskId})` : undefined} />
    </>
  );
}

interface BrandIconProps {
  className?: string;
  variant?: IconVariant;
  frameFill?: string;
  drawCheck?: boolean;
  drawDelay?: number;
  title?: string;
}

/** SoftFix brand icon (check inside the split frame). */
export function BrandIcon({ className, variant = 'color', frameFill, drawCheck, drawDelay, title }: BrandIconProps) {
  return (
    <svg
      viewBox={`0 0 ${ICON.width} ${ICON.height}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <IconGroup variant={variant} frameFill={frameFill} drawCheck={drawCheck} drawDelay={drawDelay} />
    </svg>
  );
}

interface WordmarkProps {
  className?: string;
  /** Letter fill: a colour, or "silver" for the hero gradient. */
  fill?: string;
  iconVariant?: IconVariant;
  /** Staggered rise-in of each letter + check draw-on. */
  animated?: boolean;
  delay?: number;
  title?: string;
}

/** SOFTFIX wordmark, traced from the brand guideline. */
export function Wordmark({
  className,
  fill = 'currentColor',
  iconVariant = 'light',
  animated = false,
  delay = 0,
  title = 'SoftFix',
}: WordmarkProps) {
  const silverId = useSvgId('sf-silver');
  const clipId = useSvgId('sf-clip');
  const letterFill = fill === 'silver' ? `url(#${silverId})` : fill;
  const { x, y, scale } = WORDMARK.icon;

  // Visual order S, [O], F, T, F, I, X, used for stagger timing.
  const order = ['S', 'O', 'F', 'T', 'F2', 'I', 'X'];
  const letterDelay = (id: string) => delay + order.indexOf(id) * 0.07;

  return (
    <svg
      viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        {/* bounding-box units so the icon (scaled group) gets the same ramp as the letters */}
        <linearGradient id={silverId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5E6E86" />
          <stop offset="1" stopColor="#DCE7F2" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect x="-20" y="-4" width={WORDMARK.width + 40} height={WORDMARK.height + 8} />
        </clipPath>
      </defs>

      <g clipPath={animated ? `url(#${clipId})` : undefined}>
        {WORDMARK.letters.map((letter) =>
          animated ? (
            <motion.path
              key={letter.id}
              d={letter.d}
              fill={letterFill}
              initial={{ y: WORDMARK.height * 1.05 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: letterDelay(letter.id), ease: EASE }}
            />
          ) : (
            <path key={letter.id} d={letter.d} fill={letterFill} />
          ),
        )}

        <motion.g
          initial={animated ? { y: WORDMARK.height * 1.05 } : false}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: letterDelay('O'), ease: EASE }}
        >
          <g transform={`translate(${x} ${y}) scale(${scale})`}>
            <IconGroup
              variant={iconVariant}
              frameFill={letterFill}
              drawCheck={animated}
              drawDelay={letterDelay('O') + 0.55}
            />
          </g>
        </motion.g>
      </g>
    </svg>
  );
}
