import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { NAV_ITEMS, OFFER_PATH } from '../../lib/site';
import './Navigation.css';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    // Keep keyboard focus inside the open menu: content behind it becomes non-interactive.
    const behind = [document.getElementById('main'), document.querySelector('.site-footer'), document.querySelector('.sticky-cta')];
    behind.forEach((element) => element?.setAttribute('inert', ''));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      behind.forEach((element) => element?.removeAttribute('inert'));
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <header className={`site-header ${isOpen ? 'is-open' : ''}`}>
      <div className="site-header__bar container">
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="visually-hidden">{isOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="menu-toggle__icon" aria-hidden="true" />
        </button>

        <nav className="site-nav" aria-label="Primary">
          <ul role="list" className="site-nav__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className="site-nav__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/" className="wordmark" onClick={closeMenu}>
          <img src="/images/logo.png" alt="Get Home Offer" className="wordmark__logo" />
        </Link>

        <Link to={OFFER_PATH} className="btn btn--primary site-header__cta">
          Get My Cash Offer
        </Link>
      </div>

      <div id="mobile-menu" className="mobile-menu">
        <nav className="container mobile-menu__inner" aria-label="Mobile">
          <ul role="list" className="mobile-menu__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className="mobile-menu__link" onClick={closeMenu}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to={OFFER_PATH} className="btn btn--primary mobile-menu__cta" onClick={closeMenu}>
            Get My Cash Offer
          </Link>
        </nav>
      </div>
    </header>
  );
}
