import { Link } from 'react-router';
import { ComparisonTable } from '../../components/programs/ComparisonTable';
import { CtaBand } from '../../components/ui/CtaBand';
import { ImageSlot } from '../../components/ui/ImageSlot';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SERVICES_CRUMBS } from '../../data/breadcrumbs';
import { PROGRAMS } from '../../data/programs';
import { OFFER_PATH } from '../../lib/site';
import './ServicesPage.css';

export function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={SERVICES_CRUMBS}
        title="Find The Path That Fits Your Situation"
        lede="Explore a direct sale through our Cash Program or the traditional market through our Real Estate Agent Program, and choose the path that fits."
      />

      <section className="section" aria-labelledby="programs-title">
        <div className="container">
          <h2 id="programs-title" className="visually-hidden">
            Our programs
          </h2>
          <div className="gateway">
            {PROGRAMS.map((program, index) => (
              <article key={program.id} className={`gateway__panel gateway__panel--${program.id}`}>
                <div className="gateway__media">
                  <ImageSlot image={program.image} />
                </div>
                <div className="gateway__body">
                  <p className="gateway__meta">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{program.kicker}</span>
                  </p>
                  <h3 className="gateway__title">{program.name}</h3>
                  <p className="gateway__summary">{program.summary}</p>
                  <p className="gateway__fit-label">Often a fit when</p>
                  <ul role="list" className="gateway__fit">
                    {program.bestFor.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                  <Link to={program.path} className="gateway__link">
                    {program.exploreLabel}
                    <span className="btn__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section compare" aria-labelledby="compare-title">
        <div className="container">
          <SectionHeader
            id="compare-title"
            title="Comparing your options."
            lede="Both paths lead to a sale. The difference is how you get there."
          />
          <ComparisonTable />
        </div>
      </section>

      <CtaBand
        id="services-cta"
        title="Not sure which path fits?"
        body="Tell us about your property and your situation. We'll help you understand both options."
        cta={{ label: 'Get My Cash Offer', path: OFFER_PATH }}
      />
    </>
  );
}
