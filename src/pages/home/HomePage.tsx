import { Link } from 'react-router';
import { Approach } from '../../components/home/Approach';
import { Credentials } from '../../components/home/Credentials';
import { Hero } from '../../components/home/Hero';
import { NextChapter } from '../../components/home/NextChapter';
import { Options } from '../../components/home/Options';
import { Process } from '../../components/home/Process';
import { Situations } from '../../components/home/Situations';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CASH_STATES } from '../../data/locations';
import { SERVICES, servicePath } from '../../data/service-list';
import { CASH_PATH } from '../../lib/site';
import './HomePage.css';

export function HomePage() {
  return (
    <>
      <Hero />
      <Credentials />
      <Situations />
      <Options />
      <Approach />
      <Process />
      <NextChapter />
      <section className="section home-explore" aria-labelledby="home-explore-title">
        <div className="container">
          <SectionHeader
            id="home-explore-title"
            title="We buy houses in every situation."
            lede="Find the page for your situation, or choose your city."
          />
          <div className="home-explore__grid">
            <div>
              <h3 className="home-explore__heading">Situations we buy in</h3>
              <ul role="list" className="home-explore__list">
                {SERVICES.filter((service) => service.inNav).map((service) => (
                  <li key={service.slug}>
                    <Link to={servicePath(service.slug)}>{service.name}</Link>
                  </li>
                ))}
              </ul>
              <Link to={CASH_PATH} className="arrow-link">
                See all situations
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </div>
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
    </>
  );
}
