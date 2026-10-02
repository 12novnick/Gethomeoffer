import { Link } from 'react-router';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { StepSequence } from '../../components/ui/StepSequence';
import type { GuideSection, StateGuide as Guide } from '../../data/location-content';
import type { Program } from '../../data/programs';

function OfferLink({ program }: { program: Program }) {
  return (
    <p className="state-guide__cta">
      <Link to={program.cta.path} className="btn btn--primary">
        {program.cta.label}
      </Link>
    </p>
  );
}

function GuideBlock({ section, program }: { section: GuideSection; program: Program }) {
  return (
    <div className={section.quiet ? 'state-guide__quiet' : undefined}>
      <SplitSection id={section.id} title={section.title} tone={section.tone}>
        {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.badgeImage && (
          <div className="state-guide__badge">
            <img src={section.badgeImage} alt="Badge" />
          </div>
        )}
        {section.stats && (
          <dl className="state-guide__stats">
            {section.stats.map((stat) => (
              <div key={stat.label} className="state-guide__stat">
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {section.table && (
          <table className="state-guide__table">
            <caption>{section.table.caption}</caption>
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Units</th>
                <th scope="col">Share</th>
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.count}</td>
                  <td>{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {section.list && (
          <ul role="list" className="check-list state-guide__list">
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {section.items && <DetailGrid items={section.items} />}
        {section.after?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.note && <p className="state-guide__note">{section.note}</p>}
        {section.cta && <OfferLink program={program} />}
      </SplitSection>
    </div>
  );
}

export function StateGuideSections({ guide, intro, program }: { guide: Guide; intro: string[]; program: Program }) {
  return (
    <>
      <GuideBlock
        program={program}
        section={{ id: 'local-intro', title: guide.introTitle, body: intro, cta: guide.introCta }}
      />
      {guide.sections.map((section) => (
        <GuideBlock key={section.id} section={section} program={program} />
      ))}
      <section id="how-it-works" className="section" aria-labelledby="guide-steps-title">
        <div className="container">
          <SectionHeader id="guide-steps-title" title={guide.stepsTitle} />
          <StepSequence steps={guide.steps} />
          <OfferLink program={program} />
        </div>
      </section>
    </>
  );
}
