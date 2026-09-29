import type { ContentItem } from '../../data/programs';
import './DetailGrid.css';

interface DetailGridProps {
  items: ContentItem[];
  numbered?: boolean;
}

export function DetailGrid({ items, numbered = false }: DetailGridProps) {
  return (
    <ul role="list" className={`detail-grid ${items.some((item) => item.body) ? '' : 'detail-grid--compact'}`}>
      {items.map((item, index) => (
        <li key={item.title} className="detail-grid__item">
          {numbered && (
            <span className="detail-grid__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          <h3 className="detail-grid__title">{item.title}</h3>
          {item.body && <p className="detail-grid__body">{item.body}</p>}
        </li>
      ))}
    </ul>
  );
}
