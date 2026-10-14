import { Link } from 'react-router';
import { Approach } from '../../components/home/Approach';
import { Credentials } from '../../components/home/Credentials';
import { Hero } from '../../components/home/Hero';
import { NextChapter } from '../../components/home/NextChapter';
import { Process } from '../../components/home/Process';
import { Situations } from '../../components/home/Situations';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CASH_STATES } from '../../data/locations';
import { FEATURED_SERVICES } from '../../data/home';
import { getService, servicePath } from '../../data/service-list';
import { CASH_PATH } from '../../lib/site';
import './HomePage.css';

export function HomePage() {
  return (
    <>
      <Hero />
      <Credentials />
      <Situations />
      <section className="section home-explore" aria-labelledby="home-explore-title">
        <div className="container">
          <SectionHeader
            id="home-explore-title"
            title="We buy houses in every situation."
            lede="Every house and every situation is different. Here are a few we help with most."
          />
          <ul role="list" className="home-services">
            {FEATURED_SERVICES.map((featured) => {
              const service = getService(featured.slug);
              if (!service) return null;
              return (
                <li key={featured.slug} className="home-services__card">
                  <h3 className="home-services__title">
                    <Link to={servicePath(featured.slug)}>{service.name}</Link>
                  </h3>
                  <p>{featured.body}</p>
                  <Link to={servicePath(featured.slug)} className="arrow-link" aria-hidden="true" tabIndex={-1}>
                    Learn more
                    <span className="btn__arrow">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="home-services__more">
            <Link to={CASH_PATH} className="btn btn--primary">
              View All Services
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="home-explore__grid">
            <div>
              <h3 className="home-explore__heading">Where we buy</h3>
              <ul role="list" className="home-explore__list">
                {CASH_STATES.flatMap((state) =>
                  state.cities.map((city) => (
                    <li key={city.slug}>
                      <Link to={`${CASH_PATH}${state.slug}/${city.slug}/`}>
                        We buy houses in {city.name}, {state.abbr}
                      </Link>
                    </li>
                  )),
                )}
              </ul>
              <Link to="/locations/" className="arrow-link">
                See all locations
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Approach />
      <Process />
      <NextChapter />
    </>
  );
}
