import { Link } from 'react-router';
import { StateDirectory } from '../../components/locations/StateDirectory';
import { CtaBand } from '../../components/ui/CtaBand';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { StepSequence } from '../../components/ui/StepSequence';
import { AGENT_CRUMBS } from '../../data/breadcrumbs';
import { IMAGES } from '../../data/images';
import { AGENT_HELP_AREAS, AGENT_PROGRAM, CASH_PROGRAM } from '../../data/programs';
import './ProgramPage.css';

export function AgentProgramPage() {
  return (
    <>
      <PageHero
        crumbs={AGENT_CRUMBS}
        eyebrow="Real Estate Agent Program"
        title="Explore a Different Way to Sell."
        lede={AGENT_PROGRAM.summary}
        image={IMAGES.agentHero}
        actions={
          <>
            <Link to={AGENT_PROGRAM.cta.path} className="btn btn--primary">
              {AGENT_PROGRAM.cta.label}
            </Link>
            <a href="#agent-process" className="btn btn--ghost">
              How it works
            </a>
          </>
        }
      />

      <SplitSection id="agent-traditional" eyebrow="Traditional selling" title="Selling on the open market.">
        <p>
          A traditional sale means listing your property on the open market, where buyers see it, visit it and make
          offers.
        </p>
        <p>
          With the right preparation and guidance, the open market can be a strong way to reach the full value of a
          home. It usually takes more time and involvement than a direct sale.
        </p>
        <p className="program-note">
          If speed or simplicity matters more to you, a direct sale may be a better fit.{' '}
          <Link to={CASH_PROGRAM.path}>Explore the Cash Program</Link>.
        </p>
      </SplitSection>

      <section id="agent-process" className="section" aria-labelledby="agent-process-title">
        <div className="container">
          <SectionHeader
            id="agent-process-title"
            eyebrow="The process"
            title="How the Real Estate Agent Program works."
            lede="From your first conversation to closing day, you stay in control of every decision."
          />
          <StepSequence steps={AGENT_PROGRAM.steps} />
        </div>
      </section>

      <section className="section program-page__situations" aria-labelledby="agent-help-title">
        <div className="container">
          <SectionHeader
            id="agent-help-title"
            eyebrow="The agent's role"
            title="What an agent can help with."
            lede="A real estate professional guides the sale from pricing through closing."
          />
          <DetailGrid items={AGENT_HELP_AREAS} numbered />
        </div>
      </section>

      <SplitSection id="agent-expect" eyebrow="What to expect" title="What homeowners can expect.">
        <p>
          A traditional sale usually moves through preparation, listing, showings and offers, followed by the buyer's
          inspection, appraisal and financing before closing.
        </p>
        <p>
          Timelines vary with the local market, the property and the buyer. Your agent can give you a realistic picture
          for your area before you decide to list.
        </p>
        <ul role="list" className="check-list">
          {AGENT_PROGRAM.bestFor.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </SplitSection>

      <StateDirectory
        id="agent-locations"
        title="Where Our Real Estate Agent Program Operates"
        lede="Choose your state to learn how the Real Estate Agent Program works where your property is located."
        basePath={AGENT_PROGRAM.path}
      />

      <CtaBand
        id="agent-cta"
        title="Explore the traditional market."
        body="Tell us about your property and your goals, and we'll help you take the next step toward listing."
        cta={AGENT_PROGRAM.cta}
        secondary={
          <Link to={CASH_PROGRAM.path} className="arrow-link">
            Or explore the Cash Program
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        }
      />
    </>
  );
}
