import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { lockScroll } from '@/lib/scroll';

export interface LightboxItem {
  src: string;
  srcSet: string;
  alt: string;
  width: number;
  height: number;
}

const LightboxContext = createContext<(item: LightboxItem) => void>(() => {});

/** Open a screenshot full-screen: `const open = useLightbox(); open(item)` */
export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const open = useCallback((next: LightboxItem) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setItem(next);
  }, []);

  const close = useCallback(() => {
    setItem(null);
    returnFocus.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!item) return;
    lockScroll(true);
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [item, close]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {item && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex flex-col bg-canvas/95 backdrop-blur-xl"
            onClick={close}
          >
            <div className="flex items-start justify-between gap-4 px-4 pb-3 pt-4 sm:px-6 sm:pt-6">
              <p className="line-clamp-2 max-w-3xl pt-2.5 text-sm leading-snug text-ink-muted">{item.alt}</p>
              <button
                ref={closeButton}
                type="button"
                onClick={close}
                aria-label="Close image"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-canvas transition-colors hover:bg-brand-cyan"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* scrollable stage: pan sideways on phones, fit-to-screen on desktop */}
            <div
              data-lenis-prevent
              className="min-h-0 flex-1 overflow-auto overscroll-contain px-4 pb-4 sm:px-6 sm:pb-6"
            >
              <div className="flex min-h-full flex-col justify-center">
                <motion.img
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  src={item.src}
                  srcSet={item.srcSet}
                  sizes="(min-width: 768px) 90vw, 1100px"
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  onClick={(e) => e.stopPropagation()}
                  className="mx-0 h-auto w-[1100px] max-w-none rounded-xl shadow-2xl md:mx-auto md:max-h-[calc(100dvh-8rem)] md:w-auto md:max-w-full"
                />
              </div>
            </div>
            <p className="pb-5 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink-subtle md:hidden">
              Swipe to pan · tap outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
