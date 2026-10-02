import { Link } from 'react-router';
import { CityDirectory } from '../../components/locations/CityDirectory';
import { SidebarLayout } from '../../components/locations/SidebarLayout';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { LOCATION_LABELS } from '../../data/location-labels';
import { AGENT_HELP_AREAS, CASH_PROPERTY_TYPES } from '../../data/programs';
import { stateCrumbs } from '../../lib/location-meta';
import type { StatePageData } from '../../lib/location-pages';
import { LocalFaqs, LocalIntro, LocationCta, ProgramSteps } from './LocationSections';
import { StateGuideSections } from './StateGuide';

export function StatePage({ page }: { page: StatePageData }) {
  const labels = LOCATION_LABELS[page.program];
  const { program } = labels;
  const isCash = page.program === 'cash';
  const crumbs = stateCrumbs(page);
  const statePath = crumbs[crumbs.length - 1].path;
  const { guide } = page.content;

  if (guide) {
    return (
      <SidebarLayout>
      <div className="state-guide">
        <PageHero
          crumbs={crumbs}
          title={labels.stateTitle(page.state.name)}
          lede={page.content.summary ?? program.summary}
          image={page.content.image}
          actions={
            <>
              <Link to={program.cta.path} className="btn btn--primary">
                {program.cta.label}
              </Link>
              <a href="#how-it-works" className="btn btn--ghost">
                How It Works
              </a>
            </>
          }
        />
        <StateGuideSections guide={guide} intro={page.content.intro ?? []} program={program} />
        <CityDirectory
          id="cities"
          title={guide.citiesTitle}
          basePath={statePath}
          cities={page.cities}
          stateAbbr={page.state.abbr}
        />
        <LocationCta program={page.program} place={page.state.name} closing={guide.closing} />
        <LocalFaqs place={page.state.name} content={page.content} title={guide.faqTitle} />
        <section className="section">
          <div className="container">
            <h3>Back to Start</h3>
            <p>
              <Link to="/" className="arrow-link">
                Back to Home
                <span className="btn__arrow" aria-hidden="true">←</span>
              </Link>
            </p>
          </div>
        </section>
      </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <PageHero
        crumbs={crumbs}
        title={labels.stateTitle(page.state.name)}
        lede={page.content.summary ?? program.summary}
        image={page.content.image}
        actions={
          <Link to={program.cta.path} className="btn btn--primary">
            {program.cta.label}
          </Link>
        }
      />

      <LocalIntro
        place={page.state.name}
        content={page.content}
        title={isCash ? `Selling a property in ${page.state.name}.` : `Selling on the ${page.state.name} market.`}
      />

      <ProgramSteps program={program} />

      {isCash ? (
        <SplitSection id="properties" title="Properties we consider." tone="surface">
          <p>We consider a range of residential properties, in many conditions.</p>
          <DetailGrid items={CASH_PROPERTY_TYPES} />
        </SplitSection>
      ) : (
        <section className="section split-section--surface" aria-labelledby="agent-role-title">
          <div className="container">
            <SectionHeader
              id="agent-role-title"
              title="What an agent can help with."
              lede="A real estate professional guides the sale from pricing through closing."
            />
            <DetailGrid items={AGENT_HELP_AREAS} numbered />
          </div>
        </section>
      )}

      <CityDirectory
        id="cities"
        title={labels.citiesTitle(page.state.name)}
        basePath={statePath}
        cities={page.cities}
        stateAbbr={page.state.abbr}
        className="hide-on-desktop"
      />

      <LocalFaqs place={page.state.name} content={page.content} />

      <LocationCta program={page.program} place={page.state.name} />
    </SidebarLayout>
  );
}
