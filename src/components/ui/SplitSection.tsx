import type { ReactNode } from 'react';
import './SplitSection.css';

interface SplitSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  tone?: 'default' | 'surface';
}

export function SplitSection({ id, eyebrow, title, children, tone = 'default' }: SplitSectionProps) {
  return (
    <section className={`split-section section split-section--${tone}`} aria-labelledby={id}>
      <div className="container split-section__layout">
        <header className="split-section__header">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id} className="split-section__title">
            {title}
          </h2>
        </header>
        <div className="split-section__body">{children}</div>
      </div>
    </section>
  );
}
