import type { ReactNode } from 'react';
import { Link } from 'react-router';
import './CtaBand.css';

interface CtaBandProps {
  id: string;
  title: string;
  body: string;
  cta: { label: string; path: string };
  secondary?: ReactNode;
}

export function CtaBand({ id, title, body, cta, secondary }: CtaBandProps) {
  return (
    <section className="cta-band section on-dark" aria-labelledby={id}>
      <div className="container cta-band__layout">
        <h2 id={id} className="cta-band__title">
          {title}
        </h2>
        <div className="cta-band__side">
          <p className="lede">{body}</p>
          <div className="cta-band__actions">
            <Link to={cta.path} className="btn btn--primary">
              {cta.label}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            {secondary}
          </div>
        </div>
      </div>
    </section>
  );
}
