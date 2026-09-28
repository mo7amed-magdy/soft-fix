import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { GhostButton } from '@/components/ui/Buttons';
import { scrollToElement } from '@/lib/scroll';
import { FadeIn } from '@/components/ui/FadeIn';
import { ProjectImage } from '@/components/ui/ProjectImage';
import type { Project } from '@/data/projects';

export function CaseStudy({ project, index }: { project: Project; index: number }) {
  const cs = project.caseStudy;
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    chapterRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!cs) return null;
  const titleId = `case-${project.slug}-title`;

  return (
    <section
      id={`case-${project.slug}`}
      aria-labelledby={titleId}
      className="relative px-5 py-24 sm:px-8 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <FadeIn className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">
              {'{/}'} Case study {String(index + 1).padStart(2, '0')}
            </p>
            <h2
              id={titleId}
              className="hero-heading mt-3 font-display font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(2.6rem, 8vw, 120px)' }}
            >
              {project.name}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <GhostButton key={link.href} href={link.href}>
                {link.label}
              </GhostButton>
            ))}
          </div>
        </FadeIn>

        {/* Meta */}
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
          {cs.meta.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.08}>
              <dt className="eyebrow">{m.label}</dt>
              <dd className="mt-2 text-sm text-ink md:text-base">{m.value}</dd>
            </FadeIn>
          ))}
        </dl>

        {/* Problem / solution / outcome */}
        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {[
            { label: 'The problem', text: cs.problem },
            { label: 'Our solution', text: cs.solution },
            { label: 'The outcome', text: cs.outcome },
          ].map((block, i) => (
            <FadeIn key={block.label} delay={i * 0.1} className="crosshair border border-line p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-cyan">
                0{i + 1} — {block.label}
              </p>
              <p className="mt-4 leading-relaxed text-ink md:text-lg">{block.text}</p>
            </FadeIn>
          ))}
        </div>

        {/* Facts */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:mt-20 md:grid-cols-4">
          {cs.facts.map((fact) => (
            <div key={fact.label} className="bg-canvas p-6 md:p-8">
              <p className="text-brand-gradient font-display text-5xl font-bold leading-none md:text-7xl">
                <CountUp value={fact.value} />
              </p>
              <p className="mt-3 text-sm leading-snug text-ink-muted">{fact.label}</p>
            </div>
          ))}
        </div>

        {/* Chapters */}
        <div className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <p className="eyebrow">Inside the product</p>
              <ol className="mt-6 space-y-2">
                {cs.chapters.map((chapter, i) => (
                  <li key={chapter.title}>
                    <button
                      type="button"
                      onClick={() => scrollToElement(chapterRefs.current[i])}
                      aria-current={active === i ? 'step' : undefined}
                      className={`group w-full rounded-2xl border p-5 text-left transition-colors duration-300 ${
                        active === i ? 'border-white/15 bg-surface-1' : 'border-transparent hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          className={`font-mono text-xs tabular-nums transition-colors ${
                            active === i ? 'text-brand-cyan' : 'text-ink-subtle'
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={`font-display text-2xl font-medium uppercase transition-colors ${
                            active === i ? 'text-white' : 'text-ink-subtle group-hover:text-ink'
                          }`}
                        >
                          {chapter.title}
                        </span>
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="block overflow-hidden pl-9"
                      >
                        <span className="block pt-3 leading-relaxed text-ink-muted">{chapter.text}</span>
                      </motion.span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-20 md:space-y-28">
            {cs.chapters.map((chapter, i) => {
              const [main, ...extras] = chapter.shots;
              return (
                <div
                  key={chapter.title}
                  data-index={i}
                  ref={(el) => {
                    chapterRefs.current[i] = el;
                  }}
                >
                  <div className="mb-6 lg:hidden">
                    <p className="font-mono text-xs text-brand-cyan">0{i + 1}</p>
                    <h3 className="mt-1 font-display text-2xl font-medium uppercase text-white">{chapter.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{chapter.text}</p>
                  </div>
                  <FadeIn y={60}>
                    <BrowserFrame project={project} name={main} />
                  </FadeIn>
                  {extras.length === 1 && (
                    <FadeIn y={60} delay={0.1} className="relative z-10 -mt-[10%] ml-auto w-[78%]">
                      <BrowserFrame project={project} name={extras[0]} />
                    </FadeIn>
                  )}
                  {extras.length > 1 && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {extras.map((name, j) => (
                        <FadeIn key={name} y={60} delay={0.1 + j * 0.08}>
                          <BrowserFrame project={project} name={name} compact />
                        </FadeIn>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrowserFrame({ project, name, compact }: { project: Project; name: string; compact?: boolean }) {
  const shot = project.shots.find((s) => s.name === name);
  const host = shot?.url ?? new URL(project.links[project.links.length - 1].href).host;
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-surface-1 p-1.5 shadow-[0_40px_100px_-40px_rgba(0,75,246,0.45)] md:rounded-3xl md:p-2">
      <div className={`flex items-center gap-3 px-2 ${compact ? 'py-1.5' : 'py-2 md:py-2.5'}`} aria-hidden>
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </span>
        {!compact && (
          <span className="mx-auto rounded-full bg-white/5 px-4 py-1 font-mono text-[10px] text-ink-subtle md:text-[11px]">
            {host}
          </span>
        )}
      </div>
      <ProjectImage
        project={project}
        name={name}
        sizes={compact ? '(min-width: 1024px) 360px, 50vw' : '(min-width: 1024px) 760px, 100vw'}
        className="h-auto w-full rounded-xl md:rounded-2xl"
      />
    </figure>
  );
}

/** Counts the numeric part of a value like "6+" up from zero once in view. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = useReducedMotion();
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : 0;
  const [n, setN] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!inView || reduced) return setN(target);
    const controls = animate(0, target, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduced, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {match ? `${n}${match[2]}` : value}
    </span>
  );
}
