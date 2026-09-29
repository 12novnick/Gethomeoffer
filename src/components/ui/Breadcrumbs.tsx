import { Link } from 'react-router';
import type { Crumb } from '../../lib/schema';
import './Breadcrumbs.css';

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol role="list" className="breadcrumbs__list">
        {crumbs.map((crumb, index) => {
          const isCurrent = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="breadcrumbs__item">
              {isCurrent ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link to={crumb.path}>{crumb.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
