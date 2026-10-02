import { Link } from 'react-router';
import { CASH_STATES } from '../../data/locations';
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
          <h2 id={id} className="state-directory__title">
            {title}
          </h2>
          <p className="lede">{lede}</p>
        </header>

        <ul role="list" className="state-directory__list">
          {CASH_STATES.map((state) => (
            <li key={state.slug}>
              <Link to={`${basePath}${state.slug}/`} className="state-directory__link">
                <span>{state.name}</span>
                <img
                  src={`/flags/${state.slug}.webp`}
                  alt=""
                  width={28}
                  height={28}
                  loading="lazy"
                  decoding="async"
                  className="state-directory__flag"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
