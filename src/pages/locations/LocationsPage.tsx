import { Link } from 'react-router';
import { CtaBand } from '../../components/ui/CtaBand';
import { PageHero } from '../../components/ui/PageHero';
import { LOCATIONS_CRUMBS } from '../../data/breadcrumbs';
import { CASH_STATES } from '../../data/locations';
import { CASH_PROGRAM } from '../../data/programs';
import './LocationsPage.css';

export function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={LOCATIONS_CRUMBS}
        title="Where We Buy Houses"
        lede="Choose your city to see how selling your house for cash works where your property is located."
      />

      {CASH_STATES.map((state) => {
        const statePath = `${CASH_PROGRAM.path}${state.slug}/`;
        return (
          <section key={state.slug} className="section locations" aria-labelledby={`locations-${state.slug}`}>
            <div className="container">
              <h2 id={`locations-${state.slug}`} className="locations__state">
                <Link to={statePath}>We Buy Houses in {state.name}</Link>
              </h2>
              <ul role="list" className="locations__grid">
                {state.cities.map((city) => (
                  <li key={city.slug}>
                    <Link to={`${statePath}${city.slug}/`} className="locations__city">
                      {city.name}
                      <span className="btn__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <CtaBand
        id="locations-cta"
        title="Don't see your city?"
        body="Tell us about your property anyway. We will let you know whether we can make you an offer."
        cta={CASH_PROGRAM.cta}
      />
    </>
  );
}
