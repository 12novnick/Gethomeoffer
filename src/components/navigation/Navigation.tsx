import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { CASH_STATES } from '../../data/locations';
import { SERVICE_GROUPS, SERVICES, servicePath } from '../../data/service-list';
import { CASH_PATH, NAV_ITEMS, OFFER_PATH } from '../../lib/site';
import './Navigation.css';

type MenuId = 'services' | 'locations';

const NAV_SERVICE_GROUPS = SERVICE_GROUPS.map((group) => ({
  ...group,
  services: SERVICES.filter((service) => service.inNav && service.group === group.id),
})).filter((group) => group.services.length > 0);

const cityPath = (stateSlug: string, citySlug: string) => `${CASH_PATH}${stateSlug}/${citySlug}/`;

function MenuLinks({ menu, onNavigate, linkClass }: { menu: MenuId; onNavigate?: () => void; linkClass: string }) {
  if (menu === 'services') {
    return (
      <>
        <Link to={CASH_PATH} className={`${linkClass} nav-menu__overview`} onClick={onNavigate}>
          How we buy houses for cash
        </Link>
        <div className="nav-menu__groups">
          {NAV_SERVICE_GROUPS.map((group) => (
            <div key={group.id} className="nav-menu__group">
              <p className="nav-menu__heading">{group.label}</p>
              <ul role="list">
                {group.services.map((service) => (
                  <li key={service.slug}>
                    <Link to={servicePath(service.slug)} className={linkClass} onClick={onNavigate}>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link to={`${CASH_PATH}#cash-services`} className={`${linkClass} nav-menu__all`} onClick={onNavigate}>
          See all services
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="nav-menu__groups">
        {CASH_STATES.map((state) => (
          <div key={state.slug} className="nav-menu__group">
            <p className="nav-menu__heading">{state.name}</p>
            <ul role="list">
              {state.cities.map((city) => (
                <li key={city.slug}>
                  <Link to={cityPath(state.slug, city.slug)} className={linkClass} onClick={onNavigate}>
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link to="/locations/" className={`${linkClass} nav-menu__all`} onClick={onNavigate}>
        All locations
      </Link>
    </>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  // The open dropdown is tied to the page it was opened on, so navigating closes it without an effect.
  const [menuState, setMenuState] = useState<{ id: MenuId; path: string } | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const closeMenu = () => setIsOpen(false);
  const openMenu = menuState?.path === pathname ? menuState.id : null;
  const setOpenMenu = (id: MenuId | null) => setMenuState(id ? { id, path: pathname } : null);

  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenuState(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[aria-controls="nav-menu-${openMenu}"]`);
        setMenuState(null);
        trigger?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenu]);

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

        <nav ref={navRef} className="site-nav" aria-label="Primary">
          <ul role="list" className="site-nav__list">
            {NAV_ITEMS.map((item) =>
              item.menu ? (
                <li key={item.path} className="site-nav__item">
                  <button
                    type="button"
                    className="site-nav__link site-nav__trigger"
                    aria-expanded={openMenu === item.menu}
                    aria-controls={`nav-menu-${item.menu}`}
                    onClick={() => setOpenMenu(openMenu === item.menu ? null : (item.menu ?? null))}
                  >
                    {item.label}
                    <span className="site-nav__caret" aria-hidden="true" />
                  </button>
                  <div
                    id={`nav-menu-${item.menu}`}
                    className={`nav-menu nav-menu--${item.menu}`}
                    hidden={openMenu !== item.menu}
                  >
                    <MenuLinks menu={item.menu} linkClass="nav-menu__link" onNavigate={() => setOpenMenu(null)} />
                  </div>
                </li>
              ) : (
                <li key={item.path} className="site-nav__item">
                  <NavLink to={item.path} className="site-nav__link">
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <Link to="/" className="wordmark" onClick={closeMenu}>
          <img src="/images/logo.png" width={528} height={472} alt="Get Home Offer" className="wordmark__logo" />
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
                {item.menu ? (
                  <details className="mobile-menu__section">
                    <summary className="mobile-menu__link mobile-menu__summary">{item.label}</summary>
                    <div className="mobile-menu__panel">
                      <MenuLinks menu={item.menu} linkClass="mobile-menu__sublink" onNavigate={closeMenu} />
                    </div>
                  </details>
                ) : (
                  <NavLink to={item.path} className="mobile-menu__link" onClick={closeMenu}>
                    {item.label}
                  </NavLink>
                )}
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
