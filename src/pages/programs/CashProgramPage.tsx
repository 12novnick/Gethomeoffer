import { Link } from 'react-router';
import { CtaBand } from '../../components/ui/CtaBand';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { StepSequence } from '../../components/ui/StepSequence';
import { ServiceLinks } from '../../components/services/ServiceLinks';
import { CASH_CRUMBS } from '../../data/breadcrumbs';
import { CASH_STATES } from '../../data/locations';
import { AGENT_PROGRAM, CASH_PROGRAM, CASH_PROPERTY_TYPES } from '../../data/programs';
import './ProgramPage.css';

export function CashProgramPage() {
  return (
    <div className="program-page--no-dividers">
      <PageHero
        crumbs={CASH_CRUMBS}
        title="Discover What a Cash Sale Could Look Like In Our We Buy Houses Program"
        divider={false}
      />

      <SplitSection id="cash-what">
        <p>
          We Buy Houses, but what if selling yours didn't require the usual steps? The Cash Program is a way to sell your property directly, without listing it on the open market.</p>
        <p>
          Instead of preparing for showings and waiting on a buyer's financing, you receive a straightforward offer
          and decide whether it's right for you.
        </p>
      </SplitSection>

      <SplitSection id="cash-fit" tone="surface">
        <p>The Cash Program tends to suit property owners who want a clear, simple path forward.</p>
        <ul role="list" className="check-list">
          {CASH_PROGRAM.bestFor.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </SplitSection>

      <section id="cash-process" className="section" aria-labelledby="cash-process-title">
        <div className="container">
          <SectionHeader
            id="cash-process-title"
            title="How the Cash Program works."
            lede="Five clear checkpoints, keeping you informed everystep of the way."
          />
          <StepSequence steps={CASH_PROGRAM.steps} />
        </div>
      </section>

<SplitSection id="cash-properties" title="Properties we consider.">
        <p>We consider a range of residential properties, in many conditions.</p>
        <DetailGrid items={CASH_PROPERTY_TYPES} />
        <p className="program-note">Don't see your property type? Tell us about it and we'll let you know.</p>
      </SplitSection>

      <section id="cash-services" className="section" aria-labelledby="cash-services-title">
        <div className="container">
          <SectionHeader
            id="cash-services-title"
            title="Every situation we buy in."
            lede="Choose the one closest to yours to see how a direct sale works for it."
          />
          <ServiceLinks />
        </div>
      </section>

      <section id="cash-locations" className="section" aria-labelledby="cash-locations-title">
        <div className="container">
          <SectionHeader id="cash-locations-title" title="Where we buy houses." />
          <ul role="list" className="cash-locations">
            {CASH_STATES.flatMap((state) =>
              state.cities.map((city) => (
                <li key={city.slug}>
                  <Link to={`${CASH_PROGRAM.path}${state.slug}/${city.slug}/`}>
                    We buy houses in {city.name}, {state.abbr}
                  </Link>
                </li>
              )),
            )}
          </ul>
          <p>
            <Link to="/locations/" className="arrow-link">
              See all locations
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </p>
          <p className="program-note">
            A direct sale isn't right for everyone. If reaching the highest possible market price matters most, the
            traditional market may be a better fit. <Link to={AGENT_PROGRAM.path}>Explore the Real Estate Agent Program</Link>.
          </p>
        </div>
      </section>

      <CtaBand
        id="cash-cta"
        title="See what a direct sale could look like."
        body="Tell us about your property. We'll review the details and follow up with a straightforward offer."
        cta={CASH_PROGRAM.cta}
        secondary={
          <Link to={AGENT_PROGRAM.path} className="arrow-link">
            Or explore the Real Estate Agent Program
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        }
      />
    </div>
  );
}
