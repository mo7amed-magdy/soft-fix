import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrandIcon, Wordmark } from '@/components/brand/Logo';
import { PrimaryButton } from '@/components/ui/Buttons';
import { NAV, SITE } from '@/data/site';
import { handleAnchor, scrollToId } from '@/lib/scroll';

/** Tracks which section is in the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string>('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

/** Reference-style nav: links spread across the top of the hero. */
export function TopNav() {
  return (
    <nav aria-label="Primary" className="relative z-20 px-5 pt-6 sm:px-6 md:px-10 md:pt-8">
      <ul className="flex items-center justify-between">
        {NAV.map((item, i) => (
          <li key={item.id} className={i === 3 ? 'hidden sm:block' : undefined}>
            <a
              href={`#${item.id}`}
              onClick={handleAnchor}
              className="rounded text-sm font-medium uppercase tracking-wider text-ink transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Compact glass pill that slides in once the hero has scrolled away. */
export function FloatingNav() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > window.innerHeight * 0.7));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // wait a frame so the overlay unlocks scrolling first
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <AnimatePresence>
        {(visible || open) && (
          <motion.header
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4"
          >
            <div className="flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border border-white/10 bg-canvas/70 py-2 pl-4 pr-2 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  go('top');
                }}
                className="flex items-center gap-2.5 rounded-full"
                aria-label="SoftFix — back to top"
              >
                <BrandIcon className="h-7 w-7" />
                <Wordmark className="hidden h-3.5 w-auto text-ink sm:block" title="" />
              </a>

              <nav aria-label="Sections" className="hidden md:block">
                <ul className="flex items-center gap-1">
                  {NAV.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={handleAnchor}
                        aria-current={active === item.id ? 'true' : undefined}
                        className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                          active === item.id ? 'text-white' : 'text-ink-muted hover:text-white'
                        }`}
                      >
                        {active === item.id && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-white/10"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center gap-2">
                <PrimaryButton href="#contact" className="!px-5 !py-2.5 !text-[11px] md:!text-xs">
                  Start a project
                </PrimaryButton>
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-ink transition-colors hover:bg-white/10 md:hidden"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-canvas/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-2">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    className="hero-heading block py-1 font-display text-5xl font-black uppercase leading-none"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-2 text-ink-muted">
              <p className="eyebrow">Say hello</p>
              <a href={`mailto:${SITE.email}`} className="text-lg text-ink underline-offset-4 hover:underline">
                {SITE.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
