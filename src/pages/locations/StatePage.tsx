import { Link } from 'react-router';
import { CityDirectory } from '../../components/locations/CityDirectory';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { IMAGES } from '../../data/images';
import { LOCATION_LABELS } from '../../data/location-labels';
import { AGENT_HELP_AREAS, CASH_PROPERTY_TYPES } from '../../data/programs';
import { stateCrumbs } from '../../lib/location-meta';
import type { StatePageData } from '../../lib/location-pages';
import { LocalFaqs, LocalIntro, LocalSituations, LocationCta, ProgramSteps } from './LocationSections';

export function StatePage({ page }: { page: StatePageData }) {
  const labels = LOCATION_LABELS[page.program];
  const { program } = labels;
  const isCash = page.program === 'cash';
  const crumbs = stateCrumbs(page);
  const statePath = crumbs[crumbs.length - 1].path;

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={`${page.state.name} · ${program.name}`}
        title={labels.stateTitle(page.state.name)}
        lede={page.content.summary ?? program.summary}
        image={page.content.image ?? (isCash ? IMAGES.cashHero : IMAGES.agentHero)}
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
        <SplitSection id="properties" eyebrow="Properties" title="Properties we consider." tone="surface">
          <p>We consider a range of residential properties, in many conditions.</p>
          <DetailGrid items={CASH_PROPERTY_TYPES} />
        </SplitSection>
      ) : (
        <section className="section split-section--surface" aria-labelledby="agent-role-title">
          <div className="container">
            <SectionHeader
              id="agent-role-title"
              eyebrow="The agent's role"
              title="What an agent can help with."
              lede="A real estate professional guides the sale from pricing through closing."
            />
            <DetailGrid items={AGENT_HELP_AREAS} numbered />
          </div>
        </section>
      )}

      <LocalSituations place={page.state.name} content={page.content} />

      <CityDirectory
        id="cities"
        eyebrow="Cities"
        title={labels.citiesTitle(page.state.name)}
        basePath={statePath}
        cities={page.cities}
        stateAbbr={page.state.abbr}
      />

      <LocalFaqs place={page.state.name} content={page.content} />

      <LocationCta program={page.program} place={page.state.name} />
    </>
  );
}
