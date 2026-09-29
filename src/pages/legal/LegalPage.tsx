import { ContentSlot } from '../../components/ui/ContentSlot';
import { PageHero } from '../../components/ui/PageHero';
import { isFinal, type LegalDocument } from '../../data/legal';
import type { Crumb } from '../../lib/schema';
import './LegalPage.css';

export function LegalPage({ document }: { document: LegalDocument }) {
  const crumbs: Crumb[] = [
    { label: 'Home', path: '/' },
    { label: document.title, path: document.path },
  ];
  const final = isFinal(document);

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Legal"
        title={document.title}
        lede={
          final && document.lastUpdated ? `${document.lede} Last updated ${document.lastUpdated}.` : document.lede
        }
      />

      <section className="section" aria-label={document.title}>
        <div className="container legal-layout">
          <nav className="legal-toc" aria-label="On this page">
            <p className="eyebrow">On this page</p>
            <ol role="list" className="legal-toc__list">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal-body">
            {!final && (
              <div className="legal-draft" role="note">
                <p className="legal-draft__title">Draft structure: not legal advice</p>
                <p>
                  This page outlines the sections the final document should cover. No legal text has been written or
                  reviewed yet. Final wording must be prepared or approved by an attorney before launch.
                </p>
              </div>
            )}

            {document.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="legal-section" aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`} className="legal-section__title">
                  <span className="legal-section__number" aria-hidden="true">
                    {index + 1}.
                  </span>{' '}
                  {section.title}
                </h2>
                {section.body?.length ? (
                  section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                ) : (
                  <ContentSlot label="Legal text" guidance={section.guidance} />
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
