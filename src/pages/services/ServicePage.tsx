import { Link } from 'react-router';
import { FaqList } from '../../components/faq/FaqList';
import { CtaBand } from '../../components/ui/CtaBand';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { StepSequence } from '../../components/ui/StepSequence';
import { AGENT_PROGRAM, CASH_PROGRAM } from '../../data/programs';
import { serviceCrumbs } from '../../lib/service-crumbs';
import type { ServicePageData } from '../../lib/service-pages';
import '../programs/ProgramPage.css';
import './ServicePage.css';

export function ServicePage({ page }: { page: ServicePageData }) {
  const { content } = page;

  return (
    <>
      <PageHero
        crumbs={serviceCrumbs(page.service, page.path)}
        title={content.heading}
        lede={content.summary}
        actions={
          <Link to={CASH_PROGRAM.cta.path} className="btn btn--primary">
            {CASH_PROGRAM.cta.label}
          </Link>
        }
      />

      <SplitSection id="service-intro" title="How we can help.">
        {content.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </SplitSection>

      <SplitSection id="service-signs" title="This may be you if…" tone="surface">
        <ul role="list" className="check-list">
          {content.signs.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
      </SplitSection>

      <section className="section" aria-labelledby="service-help-title">
        <div className="container">
          <SectionHeader id="service-help-title" title="What selling to us looks like." />
          <DetailGrid items={content.help} />
        </div>
      </section>

      <section className="section service-page__tinted" aria-labelledby="service-steps-title">
        <div className="container">
          <SectionHeader
            id="service-steps-title"
            title="How the Cash Program works."
            lede="Clear steps, and the decision stays yours at every point."
          />
          <StepSequence steps={CASH_PROGRAM.steps} />
        </div>
      </section>

      <SplitSection id="service-know" title="Good to know before you sell.">
        {content.know.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </SplitSection>

      {page.cities.length > 0 && (
        <SplitSection id="service-locations" title="Where we buy." tone="surface">
          <ul role="list" className="service-page__cities">
            {page.cities.map((city) => (
              <li key={city.path}>
                <Link to={city.path}>
                  {content.heading} in {city.name}, {city.stateAbbr}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <Link to="/locations/" className="arrow-link">
              See all locations
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </p>
        </SplitSection>
      )}

      <SplitSection id="service-faqs" title="Common questions.">
        <FaqList faqs={content.faqs} />
      </SplitSection>

      <SplitSection id="service-related" title="Related situations." tone="surface">
        <ul role="list" className="service-page__related">
          {page.related.map((related) => (
            <li key={related.path}>
              <Link to={related.path}>{related.name}</Link>
            </li>
          ))}
        </ul>
        <p>
          <Link to={CASH_PROGRAM.path} className="arrow-link">
            See every situation we buy in
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </p>
      </SplitSection>

      <CtaBand
        id="service-cta"
        title="See what we could offer for your house."
        body="Tell us about your property and your situation. We will review it and follow up with a straightforward cash offer."
        cta={CASH_PROGRAM.cta}
        secondary={
          <Link to={AGENT_PROGRAM.path} className="arrow-link">
            Or explore selling with an agent
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        }
      />
    </>
  );
}
