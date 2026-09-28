import { useRef, useState, type CSSProperties } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Check } from 'lucide-react';
import { BrandIcon } from '@/components/brand/Logo';
import { PrimaryButton } from '@/components/ui/Buttons';
import { FadeIn } from '@/components/ui/FadeIn';
import { PROCESS, TECH } from '@/data/process';

export function Process() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.65', 'end 0.55'] });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setReached(Math.min(PROCESS.length, Math.floor(p * PROCESS.length + 0.35)));
  });

  return (
    <section id="process" aria-labelledby="process-title" className="relative px-5 pb-16 pt-24 sm:px-8 md:px-10 md:pt-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <FadeIn>
            <p className="eyebrow">{'{/}'} Process</p>
            <h2
              id="process-title"
              className="hero-heading mt-4 font-display font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 120px)' }}
            >
              How we work
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink-muted md:text-lg">
              Seven clear steps from first call to long-term support. You always know what’s
              happening, what’s next and what it costs.
            </p>
            <div className="mt-8">
              <PrimaryButton href="#contact">Book a discovery call</PrimaryButton>
            </div>
          </FadeIn>
        </div>

        <ol ref={list} className="relative">
          {/* track */}
          <span aria-hidden className="absolute bottom-6 left-[17px] top-2 w-px bg-white/10" />
          <motion.span
            aria-hidden
            className="absolute bottom-6 left-[17px] top-2 w-px origin-top bg-gradient-to-b from-brand-blue to-brand-cyan"
            style={{ scaleY: scrollYProgress }}
          />
          {PROCESS.map((step, i) => {
            const done = i < reached;
            return (
              <li key={step.title} className="relative pb-12 pl-16 last:pb-0 md:pb-16">
                <span
                  className={`absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full border transition-all duration-500 ${
                    done
                      ? 'border-transparent bg-brand-gradient text-white shadow-[0_0_24px_rgba(0,242,228,0.45)]'
                      : 'border-white/15 bg-canvas text-ink-subtle'
                  }`}
                >
                  {done ? (
                    <Check aria-hidden className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    <span className="font-mono text-xs tabular-nums">{i + 1}</span>
                  )}
                  <span className="sr-only">{done ? ' (reached)' : ''}</span>
                </span>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">Step 0{i + 1}</p>
                <h3
                  className={`mt-1 font-display text-3xl font-medium uppercase transition-colors duration-500 md:text-4xl ${
                    done ? 'text-white' : 'text-ink-muted'
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-2 max-w-lg leading-relaxed text-ink-muted">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </div>

      <TechStrip />
    </section>
  );
}

/** Infinite strip of the tools we build with. */
function TechStrip() {
  const items = [...TECH, ...TECH];
  return (
    <div className="mask-fade-x mt-24 overflow-hidden border-y border-line py-6 md:mt-32" aria-label="Technologies we use">
      <ul className="sr-only">
        {TECH.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div
        aria-hidden
        className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]"
        style={{ '--duration': '45s' } as CSSProperties}
      >
        {items.map((tech, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-2xl font-medium uppercase text-ink-muted md:text-4xl">
              {tech}
            </span>
            <BrandIcon className="h-5 w-5 opacity-60 md:h-6 md:w-6" variant="light" frameFill="#6B7A90" />
          </span>
        ))}
      </div>
    </div>
  );
}
