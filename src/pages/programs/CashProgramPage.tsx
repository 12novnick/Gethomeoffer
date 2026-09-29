import { Link } from 'react-router';
import { StateDirectory } from '../../components/locations/StateDirectory';
import { CtaBand } from '../../components/ui/CtaBand';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { StepSequence } from '../../components/ui/StepSequence';
import { CASH_CRUMBS } from '../../data/breadcrumbs';
import { IMAGES } from '../../data/images';
import { AGENT_PROGRAM, CASH_AUDIENCE, CASH_PROGRAM, CASH_PROPERTY_TYPES } from '../../data/programs';
import './ProgramPage.css';

export function CashProgramPage() {
  return (
    <>
      <PageHero
        crumbs={CASH_CRUMBS}
        eyebrow="Cash Program"
        title="We Buy Houses Cash"
        lede={`${CASH_PROGRAM.summary} No listing, no showings, and the decision is always yours.`}
        image={IMAGES.cashHero}
        actions={
          <>
            <Link to={CASH_PROGRAM.cta.path} className="btn btn--primary">
              {CASH_PROGRAM.cta.label}
            </Link>
            <a href="#cash-process" className="btn btn--ghost">
              How it works
            </a>
          </>
        }
      />

      <SplitSection id="cash-what" eyebrow="The program" title="A direct sale, on your terms.">
        <p>The Cash Program is a way to sell your property directly, without listing it on the open market.</p>
        <p>
          Instead of preparing for showings and waiting on a buyer's financing, you receive a straightforward offer,
          review it on your own time and decide whether it's right for you.
        </p>
        <p className="program-note">
          A direct sale isn't right for everyone. If reaching the highest possible market price matters most, the
          traditional market may be a better fit. <Link to={AGENT_PROGRAM.path}>Explore the Agent Program</Link>.
        </p>
      </SplitSection>

      <SplitSection id="cash-fit" eyebrow="Is it a fit" title="Who it may be right for." tone="surface">
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
            eyebrow="The process"
            title="How the Cash Program works."
            lede="Five clear steps, with no obligation at any point."
          />
          <StepSequence steps={CASH_PROGRAM.steps} />
        </div>
      </section>

      <section className="section program-page__situations" aria-labelledby="cash-situations-title">
        <div className="container">
          <SectionHeader
            id="cash-situations-title"
            eyebrow="Common situations"
            title="When a direct sale can help."
            lede="Every situation is different. These are some of the moments when owners choose to explore a direct sale."
          />
          <DetailGrid items={CASH_AUDIENCE} />
        </div>
      </section>

      <SplitSection id="cash-properties" eyebrow="Properties" title="Properties we consider.">
        <p>We consider a range of residential properties, in many conditions.</p>
        <DetailGrid items={CASH_PROPERTY_TYPES} />
        <p className="program-note">Don't see your property type? Tell us about it and we'll let you know.</p>
      </SplitSection>

      <StateDirectory
        id="cash-locations"
        title="Where We Buy Houses"
        lede="Choose your state to learn how the Cash Program works where your property is located."
        basePath={CASH_PROGRAM.path}
      />

      <CtaBand
        id="cash-cta"
        title="See what a direct sale could look like."
        body="Tell us about your property. We'll review the details and follow up with a straightforward offer."
        cta={CASH_PROGRAM.cta}
        secondary={
          <Link to={AGENT_PROGRAM.path} className="arrow-link">
            Or explore the Agent Program
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        }
      />
    </>
  );
}
