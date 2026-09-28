import { useRef, type ElementType } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Offset = NonNullable<Parameters<typeof useScroll>[0]>['offset'];

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Reveal unit: single characters (paragraphs) or whole words (statements). */
  by?: 'char' | 'word';
  /** Resting opacity before a unit is revealed. */
  from?: number;
  offset?: Offset;
  /** Optional class per word, e.g. to colour a highlighted word. */
  wordClassName?: (word: string, index: number) => string | undefined;
}

/**
 * Scroll-driven reveal: every character (or word) goes from `from` → 1 opacity
 * as the block scrolls through the viewport. An invisible copy reserves layout
 * so nothing shifts; the animated copy sits on top.
 */
export function AnimatedText({
  text,
  as: Tag = 'p',
  className,
  by = 'char',
  from = 0.2,
  offset = ['start 0.8', 'end 0.2'],
  wordClassName,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const words = text.split(' ');
  const total = by === 'char' ? text.replace(/ /g, '').length : words.length;
  let cursor = 0;

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, wi) => {
          const wordStart = cursor;
          cursor += by === 'char' ? word.length : 1;
          const wordClass = `inline-block whitespace-nowrap ${wordClassName?.(word, wi) ?? ''}`;
          return (
            <span key={wi}>
              {reduced ? (
                <span className={wordClass}>{word}</span>
              ) : (
                <span className={wordClass}>
                  {by === 'word' ? (
                    <Unit progress={scrollYProgress} index={wordStart} total={total} from={from}>
                      {word}
                    </Unit>
                  ) : (
                    word.split('').map((char, ci) => (
                      <Unit key={ci} progress={scrollYProgress} index={wordStart + ci} total={total} from={from}>
                        {char}
                      </Unit>
                    ))
                  )}
                </span>
              )}
              {wi < words.length - 1 && ' '}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

function Unit({
  children,
  progress,
  index,
  total,
  from,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
  from: number;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [from, 1]);
  return (
    <span className="relative inline-block">
      <span className="invisible">{children}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
}
