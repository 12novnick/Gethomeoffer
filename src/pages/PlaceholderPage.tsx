import { Link } from 'react-router';
import './PlaceholderPage.css';

interface PlaceholderPageProps {
  title: string;
  note?: string;
}

export function PlaceholderPage({ title, note = 'This page is being built.' }: PlaceholderPageProps) {
  return (
    <section className="placeholder-page section">
      <div className="container">
        <h1 className="placeholder-page__title">{title}</h1>
        <p className="lede placeholder-page__note">{note}</p>
        <Link to="/" className="arrow-link placeholder-page__link">
          Back to home
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
