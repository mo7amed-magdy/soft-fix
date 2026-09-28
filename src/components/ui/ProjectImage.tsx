import { getShot, shotSrc, type Project } from '@/data/projects';

interface ProjectImageProps {
  project: Project;
  name: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}

/** Responsive WebP screenshot with intrinsic size (no layout shift). */
export function ProjectImage({ project, name, className, sizes = '(min-width: 1024px) 50vw, 100vw', eager }: ProjectImageProps) {
  const shot = getShot(project, name);
  const { src, srcSet } = shotSrc(project.slug, name);
  return (
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
}
