import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import { SERVICES } from '@/data/services';

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative rounded-t-[40px] bg-white px-5 py-20 text-brand-navy sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn y={40} className="mb-16 flex flex-col items-center gap-4 sm:mb-20 md:mb-28">
        <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-blue">
          {'{/}'} What we do
        </span>
        <h2
          id="services-title"
          className="text-center font-display font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <ol className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn
            as="li"
            key={service.name}
            delay={i * 0.1}
            className="group flex items-start gap-5 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-8 sm:py-10 md:gap-12 md:py-12"
          >
            <span
              aria-hidden
              className="font-display font-black leading-[0.8] tabular-nums text-brand-navy transition-colors duration-300 group-hover:text-brand-blue"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex min-w-0 flex-1 items-start justify-between gap-6">
              <div className="min-w-0">
                <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                  {service.name}
                </h3>
                <p
                  className="mt-2 max-w-2xl font-light leading-relaxed text-brand-navy/70"
                  style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.25rem)' }}
                >
                  {service.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${service.name} highlights`}>
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-brand-navy/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-brand-navy/75 transition-colors duration-300 group-hover:border-brand-blue/30 group-hover:text-brand-blue"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <ArrowUpRight
                aria-hidden
                className="mt-1 hidden h-10 w-10 shrink-0 text-brand-navy/30 transition-all duration-300 group-hover:rotate-45 group-hover:text-brand-blue md:block"
                strokeWidth={1.5}
              />
            </div>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}
