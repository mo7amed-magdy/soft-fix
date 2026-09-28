import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { BrandIcon } from '@/components/brand/Logo';
import { GhostButton, PrimaryButton } from '@/components/ui/Buttons';
import { FadeIn } from '@/components/ui/FadeIn';
import { ProjectImage } from '@/components/ui/ProjectImage';
import { PROJECTS, type Project } from '@/data/projects';

const numberStyle = { fontSize: 'clamp(3rem, 10vw, 140px)' };
const radius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

export function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
  const total = PROJECTS.length + 1; // + the "your project" card

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-canvas px-4 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32"
    >
      <FadeIn y={40} className="mb-12 flex flex-col items-center gap-4 sm:mb-16 md:mb-20">
        <span className="eyebrow">{'{/}'} Selected work</span>
        <h2
          id="work-title"
          className="hero-heading text-center font-display font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div ref={container} className="mx-auto max-w-7xl [--stick:6rem] md:[--stick:8rem]">
        {PROJECTS.map((project, i) => (
          <StackCard key={project.slug} index={i} total={total} progress={scrollYProgress}>
            <ProjectCard project={project} index={i} />
          </StackCard>
        ))}
        <StackCard index={PROJECTS.length} total={total} progress={scrollYProgress}>
          <NextCard index={PROJECTS.length} />
        </StackCard>
      </div>
    </section>
  );
}

function StackCard({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  return (
    <div className="sticky h-[85vh] min-h-[560px]" style={{ top: `calc(var(--stick) + ${index * 28}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: 'top center' }}
        className={`border-2 border-ink bg-canvas p-4 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.9)] sm:p-6 md:p-8 ${radius}`}
      >
        {children}
      </motion.article>
    </div>
  );
}

function CardHeader({
  index,
  category,
  title,
  actions,
}: {
  index: number;
  category: string;
  title: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 px-2 sm:px-3">
      <div className="flex min-w-0 items-end gap-4 md:gap-6">
        <span aria-hidden className="hero-heading font-display font-black leading-[0.8] tabular-nums" style={numberStyle}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 pb-1">
          <p className="eyebrow">{category}</p>
          <h3
            className="mt-1.5 font-display font-bold uppercase leading-none text-white"
            style={{ fontSize: 'clamp(1.35rem, 3.2vw, 3rem)' }}
          >
            {title}
          </h3>
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [topLeft, bottomLeft] = project.card.left;
  const img = `h-full w-full object-cover object-left-top ${radius}`;
  return (
    <>
      <CardHeader
        index={index}
        category={project.category}
        title={project.name}
        actions={project.links.map((link) => (
          <GhostButton key={link.href} href={link.href}>
            {link.label}
          </GhostButton>
        ))}
      />

      <div className="mt-4 hidden items-center justify-between gap-6 px-3 sm:flex">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">{project.summary}</p>
        <ul className="flex shrink-0 flex-wrap justify-end gap-2" aria-label="Tech stack">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex gap-3 sm:mt-6 sm:gap-4">
        <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
          <div className="overflow-hidden" style={{ height: 'clamp(130px, 16vw, 230px)' }}>
            <ProjectImage project={project} name={topLeft} className={img} sizes="(min-width: 1280px) 500px, 40vw" />
          </div>
          <div className="overflow-hidden" style={{ height: 'clamp(160px, 22vw, 340px)' }}>
            <ProjectImage project={project} name={bottomLeft} className={img} sizes="(min-width: 1280px) 500px, 40vw" />
          </div>
        </div>
        <div className="w-[60%]">
          <ProjectImage project={project} name={project.card.right} className={img} sizes="(min-width: 1280px) 760px, 60vw" />
        </div>
      </div>
    </>
  );
}

/** Final stacked card — the open slot for the next client. */
function NextCard({ index }: { index: number }) {
  return (
    <>
      <CardHeader index={index} category="Open slot · Now booking" title="Your product" />
      <div className="mt-4 grid gap-4 sm:mt-6 md:grid-cols-[1.1fr_0.9fr]">
        <div
          className={`relative flex flex-col justify-between gap-8 overflow-hidden bg-surface-1 p-6 sm:p-10 md:p-12 ${radius}`}
          style={{ minHeight: 'clamp(300px, 38vw, 586px)' }}
        >
          <div className="dot-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(180deg,#000,transparent)]" aria-hidden />
          <p
            className="relative font-display font-black uppercase leading-[0.95] text-white"
            style={{ fontSize: 'clamp(2rem, 5.2vw, 5rem)' }}
          >
            Could be <span className="text-brand-gradient">next.</span>
          </p>
          <div className="relative space-y-6">
            <p className="max-w-md text-ink-muted md:text-lg">
              Web platform, business system, store or app — tell us the problem and we’ll design the
              software that solves it.
            </p>
            <PrimaryButton href="#contact">Start a project</PrimaryButton>
          </div>
        </div>
        <div
          className={`relative hidden place-items-center overflow-hidden bg-brand-blue md:grid ${radius}`}
          aria-hidden
        >
          <div className="absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full bg-brand-cyan/40 blur-[80px]" />
          <div className="relative grid aspect-square w-1/2 place-items-center rounded-[28%] bg-brand-navy shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
            <BrandIcon className="w-[58%]" variant="light" frameFill="#fff" />
          </div>
        </div>
      </div>
    </>
  );
}
