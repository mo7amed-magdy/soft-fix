import { useId } from 'react';
import { ICON } from './paths';

type Piece = 'frameTop' | 'frameBottom' | 'check';

interface BrandShapeProps {
  piece: Piece;
  /** face gradient stops (top-left → bottom-right) */
  face: [string, string];
  /** extrusion (side) colour */
  side: string;
  depth?: number;
  className?: string;
}

/**
 * A single piece of the SoftFix icon, extruded into a faux-3D object
 * (stacked offset copies + gradient face + soft highlight).
 */
export function BrandShape({ piece, face, side, depth = 18, className }: BrandShapeProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const d = ICON[piece];
  const step = 2.4;

  return (
    <svg
      viewBox={`-10 -10 ${ICON.width + depth * step + 20} ${ICON.height + depth * step + 20}`}
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={face[0]} />
          <stop offset="1" stopColor={face[1]} />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="40" stdDeviation="40" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        {Array.from({ length: depth }, (_, i) => {
          const offset = (depth - i) * step;
          return <path key={i} d={d} fill={side} transform={`translate(${offset} ${offset})`} />;
        })}
      </g>
      <path d={d} fill={`url(#${id}-face)`} />
      <path d={d} fill={`url(#${id}-shine)`} />
    </svg>
  );
}
