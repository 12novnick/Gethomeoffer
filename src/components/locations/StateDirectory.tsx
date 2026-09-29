import { Link } from 'react-router';
import { LOCATIONS } from '../../data/locations';
import './StateDirectory.css';

interface StateDirectoryProps {
  id: string;
  title: string;
  lede: string;
  basePath: string;
}

export function StateDirectory({ id, title, lede, basePath }: StateDirectoryProps) {
  return (
    <section className="state-directory section" aria-labelledby={id}>
      <div className="container">
        <header className="state-directory__header">
          <p className="eyebrow">Locations</p>
          <h2 id={id} className="state-directory__title">
            {title}
          </h2>
          <p className="lede">{lede}</p>
        </header>

        <ul role="list" className="state-directory__list">
          {LOCATIONS.map((state) => (
            <li key={state.slug}>
              <Link to={`${basePath}${state.slug}/`} className="state-directory__link">
                <span>{state.name}</span>
                <span className="state-directory__abbr" aria-hidden="true">
                  {state.abbr}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
