import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { OFFER_PATH } from '../../lib/site';
import './StickyMobileCTA.css';

// Appears once the visitor scrolls past the first screen, so it never doubles up with the hero CTA.
export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();
  const onOfferPage = pathname.startsWith(OFFER_PATH.split('?')[0]);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (onOfferPage) return null;

  return (
    <div className={`sticky-cta ${isVisible ? 'is-visible' : ''}`} aria-hidden={!isVisible}>
      <Link to={OFFER_PATH} className="btn btn--primary sticky-cta__button" tabIndex={isVisible ? 0 : -1}>
        Get My Cash Offer
      </Link>
    </div>
  );
}
