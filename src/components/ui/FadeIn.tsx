import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

// motion.create() is cached per tag so components aren't re-created on render
const cache = new Map<ElementType, ElementType>();
function getMotion(tag: ElementType) {
  let component = cache.get(tag);
  if (!component) {
    component = motion.create(tag as never) as unknown as ElementType;
    cache.set(tag, component);
  }
  return component;
}

type FadeInProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

export const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

export function FadeIn({
  as = 'div',
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  immediate = false,
  ...rest
}: FadeInProps) {
  const Component = getMotion(as);
  const target = { opacity: 1, x: 0, y: 0 };
  return (
    <Component
      initial={{ opacity: 0, x, y }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: '50px', amount: 0 } })}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Component>
  );
}
