import { Link } from 'react-router';
import { SectionHeader } from '../../components/ui/SectionHeader';
import './LocationAreas.css';

type Area = { slug: string; name: string; card: string; anchor?: string; path: string };

function PinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function AreasStrip({ places, link = '/locations/' }: { places: string[]; link?: string }) {
  if (!places.length) return null;
  const shown = places.slice(0, 6);
  return (
    <div className="areas-strip">
      <div className="container areas-strip__inner">
        <span className="areas-strip__label">
          <PinIcon size={24} />
          Areas we Buy:
        </span>
        <span className="areas-strip__list">
          {shown.join(' • ')}
          {places.length > shown.length ? ' & more' : ''}
        </span>
        <Link to={link} className="areas-strip__all">
          View all locations <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

export function AreaCards({ city, areas }: { city: string; areas: Area[] }) {
  if (!areas.length) return null;
  return (
    <section className="section" aria-labelledby="area-cards-title">
      <div className="container">
        <SectionHeader
          id="area-cards-title"
          title={`We buy houses by area in ${city}.`}
          lede="Choose your neighborhood to learn more."
        />
        <ul role="list" className="area-cards">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link to={area.path} className="area-card">
                <span className="area-card__title">
                  <PinIcon />
                  {area.name}
                </span>
                <span className="area-card__body">{area.card}</span>
                <span className="area-card__more">
                  {area.anchor ?? `We buy houses in ${area.name}`}
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
