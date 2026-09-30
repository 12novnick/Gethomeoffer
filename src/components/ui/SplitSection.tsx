import type { ReactNode } from 'react';
import './SplitSection.css';

interface SplitSectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  tone?: 'default' | 'surface';
}

export function SplitSection({ id, eyebrow, title, children, tone = 'default' }: SplitSectionProps) {
  return (
    <section
      id={title ? undefined : id}
      className={`split-section section split-section--${tone}`}
      aria-labelledby={title ? id : undefined}
    >
      <div className={`container split-section__layout${title ? '' : ' split-section__layout--single'}`}>
        {title && (
          <header className="split-section__header">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={id} className="split-section__title">
              {title}
            </h2>
          </header>
        )}
        <div className="split-section__body">{children}</div>
      </div>
    </section>
  );
}
