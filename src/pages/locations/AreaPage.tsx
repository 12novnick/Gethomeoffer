import { Link } from 'react-router';
import { FaqList } from '../../components/faq/FaqList';
import { CtaBand } from '../../components/ui/CtaBand';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { StepSequence } from '../../components/ui/StepSequence';
import { COMPANY } from '../../data/company';
import { CASH_PROGRAM, CASH_TRUST_POINTS } from '../../data/programs';
import { areaCrumbs } from '../../lib/location-meta';
import type { AreaPageData } from '../../lib/location-pages';
import '../programs/ProgramPage.css';
import '../services/ServicePage.css';
import './LocationAreas.css';
import './LocationPage.css';

const phoneHref = COMPANY.phone ? `tel:${COMPANY.phone.replace(/[^\d+]/g, '')}` : undefined;

export function AreaPage({ page }: { page: AreaPageData }) {
  const { content, area, city } = page;

  return (
    <>
      <div className="container service-page__back">
        <Link to={city.path} className="arrow-link">
          <span aria-hidden="true">←</span> Back to We Buy Houses in {city.name}
        </Link>
      </div>

      <PageHero
        crumbs={areaCrumbs(page)}
        title={content.heading}
        lede={content.summary}
        actions={
          <>
            <Link to={CASH_PROGRAM.cta.path} className="btn btn--primary">
              {CASH_PROGRAM.cta.label}
            </Link>
            {phoneHref && (
              <a href={phoneHref} className="btn btn--ghost">
                Call {COMPANY.phone}
              </a>
            )}
            <ul role="list" className="trust-points">
              {CASH_TRUST_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </>
        }
      />

      <section className="section service-page__intro" aria-label="Overview">
        <div className="container service-page__prose">
          {content.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <SplitSection id="area-homes" title={`Homes in ${area.name}.`} tone="surface">
        {content.homes.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {content.source && (
          <p className="state-guide__note">
            <a href={content.source.url} target="_blank" rel="noopener noreferrer">
              {content.source.label}
            </a>
          </p>
        )}
      </SplitSection>

      <section className="section" aria-labelledby="area-situations-title">
        <div className="container">
          <SectionHeader id="area-situations-title" title={`Situations we buy in around ${area.name}.`} />
          <ul role="list" className="area-situations">
            {page.situations.map((situation) => (
              <li key={situation.path}>
                <Link to={situation.path} className="area-situations__link">
                  {situation.name} near {area.name}
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <p>{situation.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section service-page__tinted" aria-labelledby="area-process-title">
        <div className="container">
          <SectionHeader
            id="area-process-title"
            title="How selling to us works."
            lede="Clear steps, and the decision stays yours at every point."
          />
          <StepSequence steps={CASH_PROGRAM.steps} />
        </div>
      </section>

      <SplitSection id="area-faqs" title={`Questions about selling in ${area.name}.`}>
        <FaqList faqs={content.faqs} />
      </SplitSection>

      <section className="section service-page__links" aria-label={`More of ${city.name}`}>
        <div className="container service-page__prose">
          <p className="service-page__parent">
            Selling somewhere else in the city? See how we buy houses across{' '}
            <Link to={city.path}>
              {city.name}, {page.state.abbr}
            </Link>
            .
          </p>
          {page.otherAreas.length > 0 && (
            <p>
              Other {city.name} areas:{' '}
              {page.otherAreas.map((other, index) => (
                <span key={other.path}>
                  {index > 0 && ' · '}
                  <Link to={other.path}>{other.name}</Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <CtaBand
        id="area-cta"
        title={`Ready to sell your ${area.name} house?`}
        body={`Tell us about your property and we will follow up with a straightforward cash offer.${COMPANY.phone ? ` Or call us at ${COMPANY.phone}.` : ''}`}
        cta={CASH_PROGRAM.cta}
      />
    </>
  );
}
