import { Link } from 'react-router';
import { FaqList } from '../../components/faq/FaqList';
import { CtaBand } from '../../components/ui/CtaBand';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { StepSequence } from '../../components/ui/StepSequence';
import { COMPANY } from '../../data/company';
import { CASH_PROGRAM, CASH_TRUST_POINTS } from '../../data/programs';
import { serviceCrumbs } from '../../lib/service-crumbs';
import type { ServicePageData } from '../../lib/service-pages';
import '../programs/ProgramPage.css';
import './ServicePage.css';

const phoneHref = COMPANY.phone ? `tel:${COMPANY.phone.replace(/[^\d+]/g, '')}` : undefined;

// Section order follows the reference layout: back link, hero, intro, when, process, offer, why us, parent link, CTA.
export function ServicePage({ page }: { page: ServicePageData }) {
  const { content } = page;
  const lowerHeading = content.heading.toLowerCase();

  return (
    <>
      <div className="container service-page__back">
        <Link to={page.group.path} className="arrow-link">
          <span aria-hidden="true">←</span> Back to {page.group.label}
        </Link>
      </div>

      <PageHero
        crumbs={serviceCrumbs(page.group, page.service, page.path)}
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

      <SplitSection id="service-when" title="When this makes sense." tone="surface">
        <ul role="list" className="check-list">
          {content.signs.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
      </SplitSection>

      <section className="section" aria-labelledby="service-process-title">
        <div className="container">
          <SectionHeader
            id="service-process-title"
            title="Our process."
            lede="Clear steps, and the decision stays yours at every point."
          />
          <StepSequence steps={CASH_PROGRAM.steps} />
        </div>
      </section>

      <SplitSection id="service-offer" title="How your offer works." tone="surface">
        {content.know.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </SplitSection>

      <section className="section" aria-labelledby="service-why-title">
        <div className="container">
          <SectionHeader id="service-why-title" title="Why choose Get Home Offer." />
          <DetailGrid items={content.help} />
        </div>
      </section>

      <SplitSection id="service-faqs" title="Common questions." tone="surface">
        <FaqList faqs={content.faqs} />
      </SplitSection>

      <section className="section service-page__links" aria-label="More ways to sell">
        <div className="container service-page__prose">
          <p className="service-page__parent">
            Looking for more ways to {lowerHeading}? Visit our <Link to={page.group.path}>{page.group.label}</Link>{' '}
            page for every related situation we buy in.
          </p>
          {page.related.length > 0 && (
            <p>
              Related:{' '}
              {page.related.map((related, index) => (
                <span key={related.path}>
                  {index > 0 && ' · '}
                  <Link to={related.path}>{related.name}</Link>
                </span>
              ))}
            </p>
          )}
          {page.cities.length > 0 && (
            <p>
              Where we buy:{' '}
              {page.cities.map((city, index) => (
                <span key={city.path}>
                  {index > 0 && ' · '}
                  <Link to={city.path}>
                    {content.heading} in {city.name}, {city.stateAbbr}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <CtaBand
        id="service-cta"
        title="Ready to see your offer?"
        body={`Tell us about your property and we will follow up with a straightforward cash offer.${COMPANY.phone ? ` Or call us at ${COMPANY.phone}.` : ''}`}
        cta={CASH_PROGRAM.cta}
      />
    </>
  );
}
