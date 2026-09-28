import { useEffect, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, LoaderCircle } from 'lucide-react';
import { BrandIcon, Wordmark } from '@/components/brand/Logo';
import { TopNav } from '@/components/layout/Navbar';
import { PrimaryButton } from '@/components/ui/Buttons';
import { FadeIn } from '@/components/ui/FadeIn';
import { Magnet } from '@/components/ui/Magnet';

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-dvh flex-col overflow-x-clip">
      <HeroBackground />

      <FadeIn immediate y={-20}>
        <TopNav />
      </FadeIn>

      <h1 className="relative z-10 mt-6 px-5 sm:mt-5 sm:px-6 md:mt-6 md:px-10">
        <span className="sr-only">SoftFix — software solutions studio. Build. Fix. Scale.</span>
        <Wordmark animated fill="silver" delay={0.15} title="" className="block h-auto w-full" />
      </h1>

      <FadeIn
        immediate
        delay={0.85}
        y={10}
        className="eyebrow relative z-10 mt-3 flex items-center justify-between px-5 sm:mt-4 sm:px-6 md:px-10"
      >
        <span className="whitespace-nowrap">
          {'{/}'} Software <span className="hidden sm:inline">solutions</span> studio
        </span>
        <span className="hidden sm:inline">Est. 2026</span>
        <span className="whitespace-nowrap text-brand-cyan">Build · Fix · Scale</span>
      </FadeIn>

      <div className="relative z-10 flex flex-1 flex-col px-5 pb-7 sm:px-6 sm:pb-8 md:px-10 md:pb-10 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-end lg:gap-8 lg:pt-10">
        <div className="flex flex-1 items-center justify-center py-8 lg:order-2 lg:py-0">
          <FadeIn immediate delay={0.6} y={30} className="relative">
            <FloatingChips />
            <Magnet padding={150} strength={3}>
              <LaunchCard />
            </Magnet>
          </FadeIn>
        </div>

        <div className="flex items-end justify-between gap-4 lg:contents">
          <FadeIn immediate delay={0.35} y={20} className="lg:order-1">
            <p
              className="max-w-[170px] font-light uppercase leading-snug tracking-wide text-ink sm:max-w-[230px] md:max-w-[270px]"
              style={{ fontSize: 'clamp(0.75rem, 1.35vw, 1.4rem)' }}
            >
              We build software that solves real business problems
            </p>
          </FadeIn>
          <FadeIn immediate delay={0.5} y={20} className="shrink-0 lg:order-3 lg:justify-self-end">
            <PrimaryButton href="#contact">Start a project</PrimaryButton>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/** Dot grid + drifting brand-blue light beams (alpha-x style aurora). */
function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_25%,transparent_75%)]" />

      <div
        className="absolute top-[-25%] h-[130%] w-[34vw] animate-drift rounded-full blur-[70px]"
        style={{
          left: '48%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,75,246,0.55) 40%, rgba(0,242,228,0.22) 70%, transparent 100%)',
          '--r': '22deg',
          '--dx': '-50px',
          '--dy': '10px',
          '--t': '16s',
        } as CSSProperties}
      />
      <div
        className="absolute top-[-10%] h-[110%] w-[22vw] animate-drift rounded-full blur-[60px]"
        style={{
          left: '20%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,242,228,0.20) 45%, rgba(0,75,246,0.35) 75%, transparent 100%)',
          '--r': '-28deg',
          '--dx': '60px',
          '--dy': '-20px',
          '--t': '19s',
        } as CSSProperties}
      />
      <div className="absolute -bottom-1/4 left-[10%] h-[55vh] w-[80%] rounded-full bg-brand-blue/25 blur-[120px]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-canvas" />
    </div>
  );
}

const STEPS = ['Discovery & scope', 'UX / UI design', 'Development & APIs', 'QA & performance', 'Launch'];

/** Glass "launch log" — each delivery step ticks with the brand check. */
function LaunchCard() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(reduced ? STEPS.length : 0);

  useEffect(() => {
    if (reduced) return setDone(STEPS.length);
    const timers = STEPS.map((_, i) => window.setTimeout(() => setDone(i + 1), 1500 + i * 520));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const shipped = done === STEPS.length;

  return (
    <div className="w-[290px] rounded-[26px] border border-white/10 bg-surface-1/75 p-4 shadow-[0_30px_120px_-20px_rgba(0,75,246,0.6)] backdrop-blur-xl sm:w-[340px] sm:p-5 md:w-[380px] lg:w-[400px] xl:w-[440px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[11px] text-ink-subtle">softfix / launch.log</span>
        <span
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-500 ${
            shipped ? 'bg-brand-cyan/15 text-brand-cyan' : 'bg-white/5 text-ink-muted'
          }`}
        >
          <span className="relative flex h-1.5 w-1.5">
            {shipped && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-cyan" />}
            <span className={`relative h-1.5 w-1.5 rounded-full ${shipped ? 'bg-brand-cyan' : 'bg-ink-muted'}`} />
          </span>
          {shipped ? 'Live' : 'Building'}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-navy ring-1 ring-white/10">
          <BrandIcon className="h-7 w-7" variant="light" frameFill="#fff" drawCheck drawDelay={1.2} />
        </div>
        <div>
          <p className="font-medium text-white">Your next product</p>
          <p className="text-xs text-ink-muted">From idea to production</p>
        </div>
      </div>

      <ul className="mt-5 space-y-1.5" aria-label="Delivery steps">
        {STEPS.map((step, i) => {
          const state = i < done ? 'done' : i === done ? 'active' : 'todo';
          return (
            <li
              key={step}
              className={`flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors duration-300 ${
                state === 'active' ? 'bg-white/[0.04]' : ''
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                  state === 'done' ? 'bg-brand-gradient text-white' : 'border border-white/15 text-ink-subtle'
                }`}
              >
                {state === 'done' ? (
                  <motion.span initial={reduced ? false : { scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="h-3 w-3" strokeWidth={3.2} />
                  </motion.span>
                ) : state === 'active' ? (
                  <LoaderCircle className="h-3 w-3 animate-spin" />
                ) : null}
              </span>
              <span className={state === 'todo' ? 'text-ink-subtle' : 'text-ink'}>{step}</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
                {state === 'done' ? (i === STEPS.length - 1 ? 'shipped' : 'done') : state === 'active' ? 'running' : 'queued'}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
          <span>Progress</span>
          <span className="tabular-nums">{Math.round((done / STEPS.length) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full origin-left rounded-full bg-brand-gradient"
            initial={false}
            animate={{ scaleX: done / STEPS.length }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}

/** Small drifting labels around the card (desktop only). */
function FloatingChips() {
  const chips = [
    { label: '{/} Clean, typed code', className: '-left-52 top-4', t: '11s', dx: '10px', dy: '-14px' },
    { label: 'Cloud-ready', className: '-right-36 top-[38%]', t: '13s', dx: '-12px', dy: '12px' },
    { label: 'Automation & AI', className: '-left-44 bottom-24', t: '15s', dx: '14px', dy: '10px' },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
      {chips.map((chip) => (
        <span
          key={chip.label}
          className={`absolute z-10 animate-drift whitespace-nowrap rounded-full border border-white/10 bg-surface-2/80 px-3.5 py-1.5 font-mono text-[11px] text-ink-muted shadow-lg backdrop-blur-md ${chip.className}`}
          style={{ '--t': chip.t, '--dx': chip.dx, '--dy': chip.dy } as CSSProperties}
        >
          {chip.label}
        </span>
      ))}
    </div>
  );
}
