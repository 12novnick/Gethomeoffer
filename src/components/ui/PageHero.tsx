import { useRef } from 'react';
import type { ReactNode } from 'react';
import type { ImageAsset } from '../../data/images';
import type { Crumb } from '../../lib/schema';
import { Breadcrumbs } from './Breadcrumbs';
import { ImageSlot } from './ImageSlot';
import { useParallax } from '../../lib/useParallax';
import './PageHero.css';

interface PageHeroProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: string;
  image?: ImageAsset;
  actions?: ReactNode;
  divider?: boolean;
}

export function PageHero({ crumbs, eyebrow, title, lede, image, actions, divider = true }: PageHeroProps) {
  const mediaRef = useRef<HTMLElement>(null);
  useParallax(mediaRef, 0.1);

  return (
    <section
      className={`page-hero ${image ? '' : 'page-hero--text'} ${divider ? '' : 'page-hero--seamless'}`}
      aria-labelledby="page-title"
    >
      <div className="container page-hero__layout">
        <div className="page-hero__text">
          <Breadcrumbs crumbs={crumbs} />
          {eyebrow && <p className="eyebrow page-hero__eyebrow">{eyebrow}</p>}
          <h1 id="page-title" className="page-hero__title">
            {title}
          </h1>
          {lede && <p className="lede page-hero__lede">{lede}</p>}
          {actions && <div className="page-hero__actions">{actions}</div>}
        </div>
        {image && (
          <figure className="page-hero__media" ref={mediaRef}>
            <ImageSlot image={image} className="page-hero__image" priority />
          </figure>
        )}
      </div>
    </section>
  );
}
