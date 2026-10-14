import { Link } from 'react-router';
import type { ServiceCardGroup } from '../../lib/service-pages';
import './ServiceCards.css';

export function ServiceCards({ groups }: { groups: ServiceCardGroup[] }) {
  return (
    <div className="service-cards">
      {groups.map((group) => (
        <section key={group.id} className="service-cards__group" aria-labelledby={`service-group-${group.id}`}>
          <h3 id={`service-group-${group.id}`} className="service-cards__heading">
            {group.label}
          </h3>
          <ul role="list" className="service-cards__grid">
            {group.services.map((service) => (
              <li key={service.path}>
                <Link to={service.path} className="service-card">
                  <span className="service-card__title">{service.name}</span>
                  <span className="service-card__summary">{service.summary}</span>
                  <span className="service-card__more">
                    Learn More
                    <span className="btn__arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
