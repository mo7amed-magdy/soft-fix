import { Compass, Layers, Handshake, type LucideIcon } from 'lucide-react';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { FadeIn } from '@/components/ui/FadeIn';

const PILLARS: { icon: LucideIcon; eyebrow: string; title: string; points: string[]; label: string; pill: string }[] = [
  {
    icon: Compass,
    eyebrow: 'We think beyond the surface',
    title: 'Outcome first',
    points: ['Not just how it looks — how it performs, sells and supports your business.'],
    label: 'Starts with',
    pill: 'Discovery workshop',
  },
  {
    icon: Layers,
    eyebrow: 'We build with purpose',
    title: 'Built to scale',
    points: ['Clean, typed, reviewed code', 'Cloud infrastructure that grows with you'],
    label: 'Foundation',
    pill: 'TypeScript · Cloud',
  },
  {
    icon: Handshake,
    eyebrow: 'We keep it clear',
    title: 'Long-term partner',
    points: ['Fixed scope and weekly demos', 'Support after launch — never a hand-off'],
    label: 'After launch',
    pill: 'Care plans',
  },
];

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="relative overflow-x-clip px-5 py-24 sm:px-8 md:px-10 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[20%] h-[50vh] w-[50vw] rounded-full bg-brand-blue/20 blur-[140px]"
      />
      <div className="mx-auto max-w-7xl">
        <FadeIn className="text-center">
          <p id="why-title" className="eyebrow">
            {'{/}'} Why SoftFix
          </p>
        </FadeIn>
        <AnimatedText
          as="h2"
          by="word"
          from={0.12}
          offset={['start 0.85', 'end 0.35']}
          text="We don’t just build software. We build growth engines."
          className="mx-auto mt-8 max-w-6xl text-center font-display text-[clamp(2.4rem,7vw,112px)] font-bold uppercase leading-[0.95] tracking-tight text-white"
          wordClassName={(word) => (/^(growth|engines\.)$/.test(word) ? 'text-brand-cyan' : undefined)}
        />

        <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-3 md:gap-6">
          {PILLARS.map((pillar, i) => (
            <FadeIn
              key={pillar.title}
              delay={i * 0.12}
              className="crosshair flex flex-col border border-line bg-surface-1/40 p-6 backdrop-blur-sm md:p-8"
            >
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-subtle">
                <pillar.icon aria-hidden className="h-4 w-4 text-brand-sky" strokeWidth={1.8} />
                {pillar.eyebrow}
              </p>
              <h3 className="mt-6 font-display text-3xl font-medium uppercase text-white md:text-[2rem]">
                {pillar.title}
              </h3>
              <ul className="mt-4 flex-1 space-y-2 text-ink-muted">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-2.5 leading-relaxed">
                    <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-brand-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-subtle">{pillar.label}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-ink">
                  {pillar.pill}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
