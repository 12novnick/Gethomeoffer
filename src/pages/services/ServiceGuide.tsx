import { RichText } from '../../components/ui/RichText';
import type { GuideSection, ServiceContent } from '../../data/service-content';

function GuideBlock({ section }: { section: GuideSection }) {
  return (
    <div className="service-guide__block">
      <h2 className="service-guide__heading">{section.heading}</h2>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>
          <RichText text={paragraph} />
        </p>
      ))}
      {section.bullets && (
        <ul className="service-guide__list">
          {section.bullets.map((bullet) => (
            <li key={bullet}>
              <RichText text={bullet} />
            </li>
          ))}
        </ul>
      )}
      {section.note && (
        <p>
          <strong>{section.note.label}</strong> <RichText text={section.note.text} />
        </p>
      )}
    </div>
  );
}

function Comparison({ table }: { table: NonNullable<ServiceContent['comparison']> }) {
  return (
    <div className="service-guide__block">
      <h2 className="service-guide__heading">{table.title}</h2>
      <div className="service-guide__table-wrap">
        <table className="service-guide__table">
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map(([first, ...rest]) => (
              <tr key={first}>
                <th scope="row">{first}</th>
                {rest.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Long-form guide sections, with an optional comparison table placed after a given section. */
export function ServiceGuide({ guide, comparison }: { guide: GuideSection[]; comparison?: ServiceContent['comparison'] }) {
  return (
    <section className="section service-guide" aria-label="Guide">
      <div className="container service-guide__body">
        {guide.map((section, i) => (
          <div key={section.heading} className="service-guide__group">
            <GuideBlock section={section} />
            {comparison && comparison.afterSection === i + 1 && <Comparison table={comparison} />}
          </div>
        ))}
      </div>
    </section>
  );
}
