import { Link } from 'react-router';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { ServiceCards } from '../../components/services/ServiceCards';
import { CASH_CRUMBS } from '../../data/breadcrumbs';
import { CASH_PROGRAM, CASH_TRUST_POINTS } from '../../data/programs';
import type { ServiceCardGroup } from '../../lib/service-pages';
import './ProgramPage.css';

export function CashProgramPage({ serviceGroups }: { serviceGroups: ServiceCardGroup[] }) {
  return (
    <div className="program-page--no-dividers">
      <PageHero
        crumbs={CASH_CRUMBS}
        title="Discover What a Cash Sale Could Look Like In Our We Buy Houses Program"
        lede="We buy houses as-is for cash. Find the situation closest to yours below, or tell us about your property and we will figure it out together."
        actions={
          <>
            <Link to={CASH_PROGRAM.cta.path} className="btn btn--primary">
              {CASH_PROGRAM.cta.label}
            </Link>
            <ul role="list" className="trust-points">
              {CASH_TRUST_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </>
        }
        divider={false}
      />

      <section id="cash-services" className="section" aria-labelledby="cash-services-title">
        <div className="container">
          <SectionHeader
            id="cash-services-title"
            title="Every situation we buy in."
            lede="Choose the one closest to yours to see how a direct sale works for it."
          />
          <ServiceCards groups={serviceGroups} />
        </div>
      </section>

      <SplitSection id="cash-unsure" title="Not sure which fits?" tone="surface">
        <p>
          Many houses fit more than one situation, and some fit none of these exactly. Tell us about yours and we will
          let you know how we can help. No pressure and no obligation.
        </p>
        <p>
          <Link to={CASH_PROGRAM.cta.path} className="btn btn--primary">
            {CASH_PROGRAM.cta.label}
          </Link>
        </p>
      </SplitSection>

    </div>
  );
}
