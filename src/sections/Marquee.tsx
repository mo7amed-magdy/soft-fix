import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { BrandIcon } from '@/components/brand/Logo';
import { PROJECTS, shotSrc } from '@/data/projects';
import { STATEMENTS } from '@/data/site';

type Tile =
  | { kind: 'shot'; key: string; src: string; srcSet: string; project: string }
  | { kind: 'statement'; key: string; lines: readonly string[]; tone: (typeof STATEMENTS)[number]['tone'] };

/** Interleave every project screenshot with the brand statement posters. */
function buildTiles(): Tile[] {
  const shots: Tile[] = PROJECTS.flatMap((p) =>
    p.shots.map((s) => ({ kind: 'shot' as const, key: `${p.slug}-${s.name}`, project: p.name, ...shotSrc(p.slug, s.name) })),
  );
  const statements: Tile[] = STATEMENTS.map((s, i) => ({ kind: 'statement' as const, key: `st-${i}`, ...s }));
  const tiles: Tile[] = [];
  let si = 0;
  shots.forEach((shot, i) => {
    tiles.push(shot);
    if (i % 2 === 1 && si < statements.length) tiles.push(statements[si++]);
  });
  return [...tiles, ...statements.slice(si)];
}

export function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const right = useTransform(scrollYProgress, [0, 1], [-620, -60]);
  const left = useTransform(scrollYProgress, [0, 1], [-60, -620]);

  const tiles = buildTiles();
  const half = Math.ceil(tiles.length / 2);

  return (
    <section ref={ref} aria-label="A glimpse of our work" className="overflow-x-clip bg-canvas pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <Row tiles={tiles.slice(0, half)} x={right} />
        <Row tiles={tiles.slice(half)} x={left} />
      </div>
    </section>
  );
}

function Row({ tiles, x }: { tiles: Tile[]; x: MotionValue<number> }) {
  // tripled so the row never runs out while it slides
  const items = [...tiles, ...tiles, ...tiles];
  return (
    <motion.div className="flex w-max gap-3" style={{ x, willChange: 'transform' }}>
      {items.map((tile, i) => (
        <div
          key={`${tile.key}-${i}`}
          aria-hidden={i >= tiles.length}
          className="relative h-[190px] w-[300px] shrink-0 overflow-hidden rounded-2xl sm:h-[270px] sm:w-[420px]"
        >
          {tile.kind === 'shot' ? <ShotTile tile={tile} /> : <StatementTile tile={tile} />}
        </div>
      ))}
    </motion.div>
  );
}

function ShotTile({ tile }: { tile: Extract<Tile, { kind: 'shot' }> }) {
  return (
    <>
      <img
        src={tile.src}
        srcSet={tile.srcSet}
        sizes="(min-width: 640px) 420px, 300px"
        alt=""
        loading="lazy"
        decoding="async"
        width={420}
        height={270}
        className="h-full w-full object-cover object-left-top"
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      <span className="absolute bottom-3 left-3 rounded-full bg-canvas/75 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink backdrop-blur-md">
        {tile.project}
      </span>
    </>
  );
}

const TONES = {
  blue: { bg: 'bg-brand-blue', text: 'text-white', meta: 'text-white/70', icon: 'light', frame: '#fff' },
  cyan: { bg: 'bg-brand-cyan', text: 'text-brand-navy', meta: 'text-brand-navy/70', icon: 'mono', frame: '#0E1B2B' },
  navy: { bg: 'bg-brand-navy', text: 'text-white', meta: 'text-white/60', icon: 'light', frame: '#fff' },
  white: { bg: 'bg-white', text: 'text-brand-blue', meta: 'text-brand-navy/60', icon: 'color', frame: undefined },
  ink: { bg: 'bg-black', text: 'text-brand-gradient', meta: 'text-white/50', icon: 'light', frame: '#fff' },
} as const;

function StatementTile({ tile }: { tile: Extract<Tile, { kind: 'statement' }> }) {
  const tone = TONES[tile.tone];
  return (
    <div className={`flex h-full w-full flex-col justify-between p-5 sm:p-7 ${tone.bg}`}>
      <div className="flex items-start justify-between">
        <span className={`font-mono text-[10px] font-medium uppercase leading-tight tracking-wider ${tone.meta}`}>
          SoftFix
          <br />
          Brand identity
        </span>
        <BrandIcon className="h-8 w-8 sm:h-10 sm:w-10" variant={tone.icon} frameFill={tone.frame} />
      </div>
      <p className={`font-display text-[34px] font-black uppercase leading-[0.92] sm:text-[48px] ${tone.text}`}>
        {tile.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      <div className={`flex justify-between font-mono text-[10px] uppercase tracking-wider ${tone.meta}`}>
        <span>Software solution startup</span>
        <span>2026</span>
      </div>
    </div>
  );
}
