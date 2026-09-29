import type { ImageAsset } from '../../data/images';
import './ImageSlot.css';

interface ImageSlotProps {
  image: ImageAsset;
  className?: string;
  priority?: boolean;
}

export function ImageSlot({ image, className = '', priority = false }: ImageSlotProps) {
  if (image.src) {
    return (
      <img
        className={`image-slot ${className}`}
        src={image.src}
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
