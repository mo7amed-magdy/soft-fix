import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react';
import { BrandIcon, Wordmark } from '@/components/brand/Logo';
import { PrimaryButton } from '@/components/ui/Buttons';
import { NAV, SITE } from '@/data/site';
import { handleAnchor, lockScroll, scrollToId } from '@/lib/scroll';

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
    ['top', ...NAV.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

/**
 * Fixed, centred glass pill (alpha-x style): logo · links with ↗ marks ·
 * white "Start a project" button. Collapses to logo + menu on mobile.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    lockScroll(true);
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
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
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5 sm:px-4"
      >
        <div
          className={`flex w-full items-center justify-between gap-2 rounded-[18px] border py-2 pl-4 pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 lg:w-auto lg:justify-start lg:gap-1 lg:pl-6 ${
            scrolled || open
              ? 'border-white/10 bg-[#070B14]/80 shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
              : 'border-white/[0.08] bg-[#070B14]/40'
          }`}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go('top');
            }}
            className="mr-auto flex shrink-0 items-center gap-2.5 rounded-lg py-1 lg:mr-5"
            aria-label="SoftFix — back to top"
          >
            <BrandIcon className="h-7 w-7" />
            <Wordmark className="h-[15px] w-auto text-white" fill="#fff" title="" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {NAV.map((item) => {
                const current = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={handleAnchor}
                      aria-current={current ? 'true' : undefined}
                      className="group relative flex items-center rounded-xl px-4 py-2.5 text-[15px] font-medium text-white transition-colors duration-200 hover:text-brand-cyan lg:px-5 lg:text-base"
                    >
                      {current && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-xl bg-white/[0.07]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {item.label}
                      <ArrowUpRight
                        aria-hidden
                        className="absolute right-1 top-1 h-3 w-3 text-white/45 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-cyan lg:right-1.5"
                        strokeWidth={2}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            href="#contact"
            onClick={handleAnchor}
            className="group hidden items-center gap-1 whitespace-nowrap rounded-xl bg-white px-4 py-2.5 text-[15px] font-medium text-canvas transition-colors duration-200 hover:bg-brand-cyan sm:inline-flex lg:ml-3 lg:px-5 lg:text-base"
          >
            Start a project
            <ChevronRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-canvas transition-colors hover:bg-brand-cyan sm:border sm:border-white/15 sm:bg-transparent sm:text-white sm:hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

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
            className="fixed inset-0 z-40 flex flex-col bg-canvas/95 px-6 pb-8 pt-28 backdrop-blur-xl sm:px-10 sm:pt-32 lg:hidden"
          >
            <ul className="space-y-1">
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
                    className="flex items-center justify-between border-b border-line py-4"
                  >
                    <span className="hero-heading font-display text-4xl font-black uppercase leading-none">
                      {item.label}
                    </span>
                    <ArrowUpRight aria-hidden className="h-6 w-6 text-ink-subtle" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-auto space-y-6"
            >
              <PrimaryButton
                href="#contact"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  go('contact');
                }}
              >
                Start a project
              </PrimaryButton>
              <div className="space-y-1 text-center">
                <p className="eyebrow">Say hello</p>
                <a href={`mailto:${SITE.email}`} className="text-lg text-ink underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
