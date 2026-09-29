import { Link } from 'react-router';
import { STEPS } from '../../data/home';
import './Process.css';

export function Process() {
  return (
    <section className="process section on-dark" aria-labelledby="process-title">
      <div className="container">
        <header className="process__header">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="process-title" className="process__title">
              From property to possibility.
            </h2>
          </div>
          <Link to="/how-it-works/" className="arrow-link process__more">
            See the full process
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </header>

        <ol role="list" className="process__steps">
          {STEPS.map((step) => (
            <li key={step.number} className="process__step">
              <span className="process__number" aria-hidden="true">
                {step.number}
              </span>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
