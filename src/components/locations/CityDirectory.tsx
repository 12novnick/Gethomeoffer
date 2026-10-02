import { Link } from 'react-router';
import './CityDirectory.css';

interface CityDirectoryProps {
  id: string;
  eyebrow?: string;
  title: string;
  basePath: string;
  cities: { name: string; slug: string }[];
  stateAbbr: string;
  className?: string;
}

export function CityDirectory({ id, eyebrow, title, basePath, cities, stateAbbr, className }: CityDirectoryProps) {
  return (
    <section className={`city-directory section ${className ?? ''}`} aria-labelledby={id}>
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="city-directory__title">
          {title}
        </h2>
        <ul role="list" className="city-directory__list">
          {cities.map((city, index) => (
            <li key={city.slug}>
              <Link to={`${basePath}${city.slug}/`} className="city-directory__link">
                <span className="city-directory__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="city-directory__name">
                  {city.name}
                  <span className="city-directory__abbr">, {stateAbbr}</span>
                </span>
                <span className="btn__arrow city-directory__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
