import { useRef } from 'react';
import { Link } from 'react-router';
import { IMAGES } from '../../data/images';
import { AGENT_PATH, CASH_PATH, OFFER_PATH } from '../../lib/site';
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
          Fast Solutions for Your Next Move<span className="hero__title-period">.</span>
        </h1>
        <p className="hero__lede">
          What if you could sell your home without listing it, making costly repairs, or waiting months for a buyer? Find out what a cash offer could look like for your property.
        </p>
        <div className="hero__actions">
          <Link to={OFFER_PATH} className="btn btn--primary">
            Get My Cash Offer
          </Link>
        </div>

        <ul role="list" className="hero__paths" aria-label="Programs">
          <li>
            <span className="hero__path-index">01</span>
            <Link to={CASH_PATH}>We Buy Houses Cash</Link>
          </li>
          <li>
            <span className="hero__path-index">02</span>
            <Link to={AGENT_PATH}>Real Estate Agent Program</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
