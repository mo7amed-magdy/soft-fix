import Lenis from 'lenis';
import type { MouseEvent } from 'react';

let lenis: Lenis | null = null;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Start Lenis smooth scrolling (skipped for reduced-motion users). Returns a cleanup. */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  let frame = 0;
  const raf = (time: number) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

/** Smooth-scroll to a section by id (or to the top with "top"). */
export function scrollToId(id: string) {
  const target = id === 'top' ? 0 : document.getElementById(id);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: id === 'top' ? 0 : -24, duration: 1.2 });
  } else if (target === 0) {
    window.scrollTo({ top: 0 });
  } else {
    target.scrollIntoView();
  }
  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`);
  // move focus for keyboard / screen-reader users
  if (target !== 0) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}

/** Smooth-scroll so an element sits in the middle of the viewport. */
export function scrollToElement(el: HTMLElement | null) {
  if (!el) return;
  const offset = -(window.innerHeight - Math.min(el.offsetHeight, window.innerHeight)) / 2;
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.1 });
  else el.scrollIntoView({ block: 'center' });
}

/** onClick handler for in-page anchors: <a href="#services" onClick={handleAnchor}> */
export function handleAnchor(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href');
  if (!href?.startsWith('#')) return;
  event.preventDefault();
  scrollToId(href.slice(1) || 'top');
}
