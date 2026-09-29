import { useRef } from 'react';
import { Link } from 'react-router';
import { IMAGES } from '../../data/images';
import { OFFER_PATH } from '../../lib/site';
import { useParallax } from '../../lib/useParallax';
import { ImageSlot } from '../ui/ImageSlot';
import './NextChapter.css';

export function NextChapter() {
  const layerRef = useRef<HTMLDivElement>(null);
  useParallax(layerRef, 0.1);

  return (
    <section className="next-chapter on-dark" aria-labelledby="next-chapter-title">
      <div className="next-chapter__media">
        <div ref={layerRef} className="parallax-layer">
          <ImageSlot image={IMAGES.nextChapter} />
        </div>
      </div>
      <div className="next-chapter__scrim" aria-hidden="true" />

      <div className="container next-chapter__content">
        <h2 id="next-chapter-title" className="next-chapter__title">
          Your next chapter starts here.
        </h2>
        <p className="next-chapter__lede">
          Whether you're considering a direct sale or exploring the traditional market, we're here to help you take
          the next step.
        </p>
        <Link to={OFFER_PATH} className="btn btn--primary next-chapter__cta">
          Get Your Offer
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
