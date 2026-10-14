import { Link } from 'react-router';
import { FaqList } from '../../components/faq/FaqList';
import { ServiceCardGrid } from '../../components/services/ServiceCards';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { CASH_PROGRAM } from '../../data/programs';
import { groupCrumbs } from '../../lib/service-crumbs';
import type { GroupPageData } from '../../lib/service-pages';
import '../programs/ProgramPage.css';
import './ServicePage.css';

export function ServiceGroupPage({ page }: { page: GroupPageData }) {
  const { content } = page;

  return (
    <>
      <PageHero
        crumbs={groupCrumbs({ label: page.group.label, path: page.path })}
        title={content.heading}
        lede={content.summary}
        actions={
          <Link to={CASH_PROGRAM.cta.path} className="btn btn--primary">
            {CASH_PROGRAM.cta.label}
          </Link>
        }
      />

      <SplitSection id="group-intro" title="How it works.">
        {content.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </SplitSection>

      <section className="section" aria-labelledby="group-services-title">
        <div className="container">
          <SectionHeader
            id="group-services-title"
            title="Choose your situation."
            lede="Each page explains how a direct sale works for that situation."
          />
          <ServiceCardGrid services={page.services} />
        </div>
      </section>

      <section className="section service-page__tinted" aria-labelledby="group-points-title">
        <div className="container">
          <SectionHeader id="group-points-title" title="What to expect." />
          <DetailGrid items={content.points} />
        </div>
      </section>

      <SplitSection id="group-faqs" title="Common questions.">
        <FaqList faqs={content.faqs} />
      </SplitSection>

      <SplitSection id="group-more" title="More ways we can help." tone="surface">
        <ul role="list" className="service-page__related">
          {page.otherGroups.map((other) => (
            <li key={other.path}>
              <Link to={other.path}>{other.label}</Link>
            </li>
          ))}
          {page.cities.map((city) => (
            <li key={city.path}>
              <Link to={city.path}>
                We buy houses in {city.name}, {city.stateAbbr}
              </Link>
            </li>
          ))}
        </ul>
        <p>
          <Link to={CASH_PROGRAM.cta.path} className="btn btn--primary">
            {CASH_PROGRAM.cta.label}
          </Link>
        </p>
      </SplitSection>
    </>
  );
}
