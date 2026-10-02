import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router';
import { CASH_STATES } from '../../data/locations';
import { CASH_PROGRAM } from '../../data/programs';
import './SidebarLayout.css';

export function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container sidebar-layout">
      <article className="sidebar-layout__article">{children}</article>

      <aside className="sidebar-layout__aside" aria-label="Locations we serve">
        <div className="sidebar-layout__panel">
          {CASH_STATES.map((state) => {
            const statePath = `${CASH_PROGRAM.path}${state.slug}/`;
            return (
              <nav key={state.slug} aria-label={`${state.name} cities`}>
                <p className="sidebar-layout__heading">Where we buy houses</p>
                <NavLink to={statePath} end className="sidebar-layout__state">
                  {state.name}
                </NavLink>
                <ul role="list" className="sidebar-layout__list">
                  {state.cities.map((city) => (
                    <li key={city.slug}>
                      <NavLink to={`${statePath}${city.slug}/`} className="sidebar-layout__link">
                        {city.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
          <Link to={CASH_PROGRAM.cta.path} className="btn btn--primary sidebar-layout__cta">
            {CASH_PROGRAM.cta.label}
          </Link>
        </div>
      </aside>
    </div>
  );
}
