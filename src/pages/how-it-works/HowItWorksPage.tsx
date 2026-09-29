import { Link } from 'react-router';
import { ComparisonTable } from '../../components/programs/ComparisonTable';
import { CtaBand } from '../../components/ui/CtaBand';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { StepSequence } from '../../components/ui/StepSequence';
import { HOW_IT_WORKS_CRUMBS } from '../../data/breadcrumbs';
import { JOURNEY } from '../../data/how-it-works';
import { IMAGES } from '../../data/images';
import { AGENT_PROGRAM, CASH_PROGRAM, PROGRAMS, type Program } from '../../data/programs';
import { OFFER_PATH } from '../../lib/site';
import './HowItWorksPage.css';

const PATH_ANCHORS: Record<Program['id'], string> = { cash: 'cash-path', agent: 'agent-path' };

function Pathway({ program, tinted = false }: { program: Program; tinted?: boolean }) {
  const titleId = `${PATH_ANCHORS[program.id]}-title`;
  return (
    <section
      id={PATH_ANCHORS[program.id]}
      className={`section pathway ${tinted ? 'pathway--tinted' : ''}`}
      aria-labelledby={titleId}
    >
      <div className="container">
        <SectionHeader
          id={titleId}
          eyebrow={`Path ${program.id === 'cash' ? '01' : '02'} · ${program.kicker}`}
          title={`The ${program.name}, step by step.`}
          lede={program.summary}
        />
        <StepSequence steps={program.steps} />
        <div className="pathway__actions">
          <Link to={program.cta.path} className="btn btn--primary">
            {program.cta.label}
          </Link>
          <Link to={program.path} className="arrow-link">
            {program.exploreLabel}
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksPage() {
  return (
    <>
      <PageHero
        crumbs={HOW_IT_WORKS_CRUMBS}
        eyebrow="How it works"
        title="How GetHomeOffer Works"
        lede="Every sale starts with your property and your situation. From there, you choose the path that fits: a direct sale or the traditional market."
        image={IMAGES.howItWorksHero}
      />

      <section className="section journey-section" aria-labelledby="journey-title">
        <div className="container">
          <SectionHeader
            id="journey-title"
            eyebrow="The overall process"
            title="From your property to your next move."
            lede="Five stages, and the decision stays yours throughout."
          />

          <ol role="list" className="journey">
            {JOURNEY.map((stage, index) => (
              <li key={stage.label} className={`journey__stage ${stage.branch ? 'journey__stage--branch' : ''}`}>
                <span className="journey__marker" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="journey__content">
                  <p className="journey__label">{stage.label}</p>
                  <h3 className="journey__title">{stage.title}</h3>
                  <p className="journey__body">{stage.body}</p>

                  {stage.branch && (
                    <ul role="list" className="journey__branches">
                      {PROGRAMS.map((program) => (
                        <li key={program.id}>
                          <a href={`#${PATH_ANCHORS[program.id]}`} className={`journey__branch journey__branch--${program.id}`}>
                            <span className="journey__branch-kicker">{program.kicker}</span>
                            <span className="journey__branch-name">{program.name}</span>
                            <span className="journey__branch-summary">{program.summary}</span>
                            <span className="journey__branch-link">
                              See the steps
                              <span className="btn__arrow" aria-hidden="true">
                                ↓
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Pathway program={CASH_PROGRAM} tinted />
      <Pathway program={AGENT_PROGRAM} />

      <section className="section pathway--surface" aria-labelledby="choose-title">
        <div className="container">
          <SectionHeader
            id="choose-title"
            eyebrow="Choosing a path"
            title="Comparing the two paths."
            lede="Both lead to a sale. The difference is how you get there."
          />
          <ComparisonTable />
        </div>
      </section>

      <CtaBand
        id="how-cta"
        title="Start with your property."
        body="Tell us about your property and your situation, and we'll help you understand both options."
        cta={{ label: 'Get Your Offer', path: OFFER_PATH }}
        secondary={
          <Link to="/faq/" className="arrow-link">
            Read the FAQ
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        }
      />
    </>
  );
}
