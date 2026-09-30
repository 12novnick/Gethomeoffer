import { Link } from 'react-router';
import { FaqList } from '../../components/faq/FaqList';
import { ContentSlot } from '../../components/ui/ContentSlot';
import { CtaBand } from '../../components/ui/CtaBand';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { StepSequence } from '../../components/ui/StepSequence';
import type { LocalContent, ProgramId } from '../../data/location-content';
import { AGENT_PROGRAM, CASH_PROGRAM, type Program } from '../../data/programs';
import './LocationPage.css';

export function Paragraphs({ paragraphs, slot }: { paragraphs?: string[]; slot: { label: string; guidance: string } }) {
  if (!paragraphs?.length) return <ContentSlot {...slot} />;
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}

export function LocalIntro({ place, content, title }: { place: string; content: LocalContent; title: string }) {
  return (
    <SplitSection id="local-intro" eyebrow={place} title={title}>
      <Paragraphs
        paragraphs={content.intro}
        slot={{
          label: 'Local introduction',
          guidance: `Two or three paragraphs specific to ${place}: what owners here are dealing with and how this program fits. Required to publish this page.`,
        }}
      />
    </SplitSection>
  );
}

export function ProgramSteps({ program }: { program: Program }) {
  return (
    <section className="section" aria-labelledby="program-steps-title">
      <div className="container">
        <SectionHeader
          id="program-steps-title"
          eyebrow="The process"
          title={`How the ${program.id === 'cash' ? 'Cash' : 'Real Estate Agent'} Program works.`}
          lede="Clear steps, and the decision stays yours at every point."
        />
        <StepSequence steps={program.steps} />
      </div>
    </section>
  );
}

export function LocalSituations({ place, content }: { place: string; content: LocalContent }) {
  return (
    <section className="section location-page__tinted" aria-labelledby="local-situations-title">
      <div className="container">
        <SectionHeader
          id="local-situations-title"
          eyebrow="Local situations"
          title={`Common selling situations in ${place}.`}
        />
        {content.situations?.length ? (
          <DetailGrid items={content.situations} />
        ) : (
          <ContentSlot
            label="Local selling situations"
            guidance={`Four to six situations owners in ${place} commonly face, each with a one-sentence explanation.`}
          />
        )}
      </div>
    </section>
  );
}

export function AreasServed({ city, content }: { city: string; content: LocalContent }) {
  return (
    <SplitSection id="areas-served" eyebrow="Areas served" title={`Neighborhoods and communities around ${city}.`}>
      {content.areas?.length ? (
        <DetailGrid items={content.areas.map((area) => ({ title: area }))} />
      ) : (
        <ContentSlot
          label="Areas served"
          guidance={`A list of neighborhoods in ${city} and nearby communities you actually serve.`}
        />
      )}
    </SplitSection>
  );
}

export function LocalFaqs({ place, content, title }: { place: string; content: LocalContent; title?: string }) {
  return (
    <SplitSection
      id="local-faqs"
      eyebrow={title ? undefined : 'FAQ'}
      title={title ?? `Questions about selling in ${place}.`}
      tone="surface"
    >
      {content.faqs?.length ? (
        <FaqList faqs={content.faqs} />
      ) : (
        <ContentSlot
          label="Local FAQ"
          guidance={`Three to six questions owners in ${place} actually ask, with accurate answers.`}
        />
      )}
    </SplitSection>
  );
}

export function LocationCta({
  program,
  place,
  closing,
}: {
  program: ProgramId;
  place: string;
  closing?: { title: string; body: string; secondaryLabel: string; secondaryPath: string };
}) {
  const isCash = program === 'cash';
  const current = isCash ? CASH_PROGRAM : AGENT_PROGRAM;
  const other = isCash ? AGENT_PROGRAM : CASH_PROGRAM;
  return (
    <CtaBand
      id="location-cta"
      title={
        closing?.title ??
        (isCash ? `Get a straightforward offer for your ${place} property.` : `Explore the ${place} market with a professional.`)
      }
      body={
        closing?.body ??
        (isCash
          ? "Tell us about your property. We'll review the details and follow up with a straightforward offer."
          : "Tell us about your property and your goals, and we'll help you take the next step toward listing.")
      }
      cta={current.cta}
      secondary={
        <Link to={closing?.secondaryPath ?? other.path} className="arrow-link">
          {closing?.secondaryLabel ?? `Or explore the ${isCash ? 'Real Estate Agent' : 'Cash'} Program`}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      }
    />
  );
}
