import { Link } from 'react-router';
import { SidebarLayout } from '../../components/locations/SidebarLayout';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { LOCATION_LABELS } from '../../data/location-labels';
import { AGENT_HELP_AREAS } from '../../data/programs';
import { cityCrumbs } from '../../lib/location-meta';
import type { CityPageData } from '../../lib/location-pages';
import { AreasServed, LocalFaqs, LocalIntro, LocalSituations, LocationCta, Paragraphs, ProgramSteps } from './LocationSections';
import { StateGuideSections } from './StateGuide';

export function CityPage({ page }: { page: CityPageData }) {
  const labels = LOCATION_LABELS[page.program];
  const { program } = labels;
  const isCash = page.program === 'cash';
  const crumbs = cityCrumbs(page);
  const { guide } = page.content;

  if (guide) {
    return (
      <SidebarLayout>
        <div className="state-guide">
          <PageHero
            crumbs={crumbs}
            title={page.content.heading ?? labels.cityTitle(page.city.name, page.state.abbr)}
            lede={page.content.summary ?? program.summary}
            image={page.content.image}
            actions={
              <Link to={program.cta.path} className="btn btn--primary">
                {program.cta.label}
              </Link>
            }
          />
          <StateGuideSections guide={guide} intro={page.content.intro ?? []} program={program} />
          <LocalFaqs place={page.city.name} content={page.content} title={guide.faqTitle} />
          <LocationCta program={page.program} place={page.city.name} closing={guide.closing} />
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <PageHero
        crumbs={crumbs}
        title={page.content.heading ?? labels.cityTitle(page.city.name, page.state.abbr)}
        lede={page.content.summary ?? program.summary}
        image={page.content.image}
        actions={
          <Link to={program.cta.path} className="btn btn--primary">
            {program.cta.label}
          </Link>
        }
      />

      <LocalIntro
        place={page.city.name}
        content={page.content}
        title={isCash ? `Selling a property in ${page.city.name}.` : `Selling a home in ${page.city.name}.`}
      />

      <SplitSection id="market-context" title={`The ${page.city.name} property landscape.`} tone="surface">
        <Paragraphs
          paragraphs={page.content.marketContext}
          slot={{
            label: 'Local property context',
            guidance: `What housing in ${page.city.name} is like: typical home types and ages, how the market behaves, anything owners should know.`,
          }}
        />
      </SplitSection>

      {!isCash && (
        <section className="section" aria-labelledby="selling-steps-title">
          <div className="container">
            <SectionHeader
              id="selling-steps-title"
              title={`Selling a home in ${page.city.name}, step by step.`}
              lede="Each part of a traditional sale, and what a real estate professional does at each stage."
            />
            <DetailGrid
              numbered
              items={AGENT_HELP_AREAS.map((area) => ({
                title: area.title,
                body: page.content.agentTopics?.[area.id] ?? area.body,
              }))}
            />
          </div>
        </section>
      )}

      <ProgramSteps program={program} />

      {isCash && <LocalSituations place={page.city.name} content={page.content} />}

      <AreasServed city={page.city.name} content={page.content} />

      <LocalFaqs place={page.city.name} content={page.content} />

      <LocationCta program={page.program} place={page.city.name} />
    </SidebarLayout>
  );
}
