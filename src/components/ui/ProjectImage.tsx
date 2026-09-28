import { Expand } from 'lucide-react';
import { getShot, shotSrc, type Project } from '@/data/projects';
import { useLightbox } from './Lightbox';

interface ProjectImageProps {
  project: Project;
  name: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
  /** Wrap in a button that opens the full-size screenshot. */
  zoomable?: boolean;
}

/** Responsive WebP screenshot with intrinsic size (no layout shift). */
export function ProjectImage({
  project,
  name,
  className,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  eager,
  zoomable,
}: ProjectImageProps) {
  const openLightbox = useLightbox();
  const shot = getShot(project, name);
  const { src, srcSet } = shotSrc(project.slug, name);

  const img = (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  );

  if (!zoomable) return img;

  return (
    <button
      type="button"
      onClick={() => openLightbox({ src, srcSet, alt: shot.alt, width: shot.width, height: shot.height })}
      className="group relative block h-full w-full cursor-zoom-in rounded-[inherit] text-left"
      aria-label={`Enlarge screenshot: ${shot.alt}`}
    >
      {img}
      <span
        aria-hidden
        className="absolute bottom-2.5 right-2.5 grid h-8 w-8 place-items-center rounded-full bg-canvas/70 text-white opacity-100 backdrop-blur-md transition-opacity duration-200 md:bottom-4 md:right-4 md:h-10 md:w-10 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
      >
        <Expand className="h-3.5 w-3.5 md:h-4 md:w-4" />
      </span>
    </button>
  );
}
