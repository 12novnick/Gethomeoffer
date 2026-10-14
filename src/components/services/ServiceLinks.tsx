import { Link } from 'react-router';
import { SERVICE_GROUPS, SERVICES, servicePath } from '../../data/service-list';
import './ServiceLinks.css';

// Grouped links to every service page. `place` adds local anchor text ("... in Madison") on city pages.
export function ServiceLinks({ place }: { place?: string }) {
  return (
    <div className="service-links">
      {SERVICE_GROUPS.map((group) => (
        <div key={group.id} className="service-links__group">
          <h3 className="service-links__heading">{group.label}</h3>
          <ul role="list" className="service-links__list">
            {SERVICES.filter((service) => service.group === group.id).map((service) => (
              <li key={service.slug}>
                <Link to={servicePath(service.slug)}>{place ? `${service.name} in ${place}` : service.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
