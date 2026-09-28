import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { handleAnchor } from '@/lib/scroll';

type AnchorOrButton =
  | ({ href: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>)
  | ({ href?: undefined } & ComponentPropsWithoutRef<'button'>);

type ButtonProps = AnchorOrButton & {
  children: ReactNode;
  icon?: ReactNode | false;
  className?: string;
};

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** Renders <a> for hrefs (smooth-scrolling in-page anchors), <button> otherwise. */
function Base({
  children,
  icon,
  className,
  layer,
  ...props
}: ButtonProps & { className: string; layer?: ReactNode }) {
  const content = (
    <>
      {layer}
      <span className="relative">{children}</span>
      {icon !== false && (
        <span
          aria-hidden
          className="relative -mr-1 transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none"
        >
          {icon ?? <ArrowUpRight className="h-[1.15em] w-[1.15em]" strokeWidth={2.2} />}
        </span>
      )}
    </>
  );

  if (props.href !== undefined) {
    const { href, onClick, ...rest } = props;
    const external = isExternal(href);
    return (
      <a
        href={href}
        className={className}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented && href.startsWith('#')) handleAnchor(e);
        }}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  const { type = 'button', ...rest } = props as ComponentPropsWithoutRef<'button'>;
  return (
    <button type={type} className={className} {...rest}>
      {content}
    </button>
  );
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-canvas';

/** Brand-gradient pill (SoftFix take on the reference "Contact" button). */
export function PrimaryButton({ className = '', ...props }: ButtonProps) {
  return (
    <Base
      {...props}
      className={`group relative inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] motion-reduce:transform-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${focusRing} ${className}`}
      layer={
        // gradient body on its own layer so the keyboard focus ring stays visible
        <span
          aria-hidden
          className="absolute inset-0 rounded-full transition-[filter] duration-300 group-hover:brightness-110"
          style={{
            background: 'linear-gradient(123deg, #00123D 7%, #004BF6 38%, #1668FF 70%, #00CBE6 100%)',
            boxShadow: '0px 4px 18px rgba(0, 75, 246, 0.35), inset 4px 4px 12px #2F7BFF',
            outline: '2px solid rgba(255,255,255,0.92)',
            outlineOffset: '-3px',
          }}
        />
      }
    />
  );
}

/** Outline pill (reference "Live Project" button). `tone="dark"` for light sections. */
export function GhostButton({
  className = '',
  tone = 'light',
  ...props
}: ButtonProps & { tone?: 'light' | 'dark' }) {
  const colors =
    tone === 'light'
      ? 'border-ink text-ink hover:bg-ink/10'
      : 'border-brand-navy text-brand-navy hover:bg-brand-navy/5';
  return (
    <Base
      {...props}
      className={`group inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-full border-2 px-6 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors duration-200 sm:px-8 sm:py-3 sm:text-sm ${colors} ${focusRing} ${className}`}
    />
  );
}
