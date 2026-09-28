import { ArrowUp } from 'lucide-react';
import { BrandIcon, Wordmark } from '@/components/brand/Logo';
import { NAV, SITE } from '@/data/site';
import { SERVICES } from '@/data/services';
import { handleAnchor, scrollToId } from '@/lib/scroll';

export function Footer() {
  const socials = SITE.socials.filter((s) => s.href);
  const heading = 'font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle';
  const link = 'text-ink-muted transition-colors hover:text-white';

  return (
    <footer className="relative overflow-hidden border-t border-line bg-canvas px-5 pt-16 sm:px-8 md:px-10 md:pt-24">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <BrandIcon className="h-12 w-12" title="SoftFix" />
          <p className="mt-6 font-display text-3xl font-medium uppercase text-white">{SITE.tagline}</p>
          <p className="mt-3 leading-relaxed text-ink-muted">{SITE.description}</p>
        </div>

        <nav aria-label="Footer">
          <p className={heading}>Navigate</p>
          <ul className="mt-5 space-y-3">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={handleAnchor} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={heading}>Services</p>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((s) => (
              <li key={s.name}>
                <a href="#services" onClick={handleAnchor} className={link}>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={heading}>Contact</p>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={`mailto:${SITE.email}`} className={link}>
                {SITE.email}
              </a>
            </li>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer noopener" className={link}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-ink-subtle">
        <p>
          © {SITE.year} {SITE.name}. Software solution startup.
        </p>
        <button
          type="button"
          onClick={() => scrollToId('top')}
          className="group inline-flex min-h-[44px] items-center gap-2 rounded-full px-2 font-mono text-xs uppercase tracking-[0.16em] hover:text-white"
        >
          Back to top
          <ArrowUp aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* oversized sign-off wordmark, bleeding off the bottom edge */}
      <div aria-hidden className="pointer-events-none -mb-[3.5vw] select-none opacity-[0.14]">
        <Wordmark title="" fill="#D7E2EA" iconVariant="mono" className="block h-auto w-full" />
      </div>
    </footer>
  );
}
