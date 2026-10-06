import { useRef } from 'react';
import { Link } from 'react-router';
import { IMAGES } from '../../data/images';
import { OFFER_PATH } from '../../lib/site';
import { useParallax } from '../../lib/useParallax';
import { ImageSlot } from '../ui/ImageSlot';
import './Hero.css';

export function Hero() {
  const layerRef = useRef<HTMLDivElement>(null);
  useParallax(layerRef, 0.08);

  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <div className="hero__media">
        <div ref={layerRef} className="parallax-layer">
          <ImageSlot image={IMAGES.heroHome} className="hero__image" priority />
        </div>
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__content container">
        <h1 id="hero-title" className="hero__title">
          We Buy Houses<span className="hero__title-period">.</span>
        </h1>
        <p className="hero__lede">
          Fast Solutions for Your Next Move. Find out what a cash offer could look like for your property.
        </p>
        <div className="hero__actions">
          <Link to={OFFER_PATH} className="btn btn--primary">
            Get My Cash Offer
          </Link>
        </div>
      </div>
    </section>
  );
}
