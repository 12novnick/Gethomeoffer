import type { ImageAsset } from '../../data/images';
import { responsiveImage } from '../../lib/images';
import './ImageSlot.css';

interface ImageSlotProps {
  image: ImageAsset;
  className?: string;
  priority?: boolean;
  /** How wide the image renders, so the browser picks the right size. */
  sizes?: string;
}

export function ImageSlot({ image, className = '', priority = false, sizes = '100vw' }: ImageSlotProps) {
  if (image.src) {
    const { src, srcSet } = responsiveImage(image.src);
    return (
      <img
        className={`image-slot ${className}`}
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    );
  }

  return (
    <div
      className={`image-slot image-slot--placeholder ${className}`}
      data-tone={image.tone}
      role="img"
      aria-label={image.alt}
    >
      <span className="image-slot__label" aria-hidden="true">
        {image.label}
      </span>
    </div>
  );
}
