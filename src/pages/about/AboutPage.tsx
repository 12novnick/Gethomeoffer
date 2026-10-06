import { Link } from 'react-router';
import { CtaBand } from '../../components/ui/CtaBand';
import { DetailGrid } from '../../components/ui/DetailGrid';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { SplitSection } from '../../components/ui/SplitSection';
import { BELIEFS, WORKING_PRINCIPLES } from '../../data/about';
import { ABOUT_CRUMBS } from '../../data/breadcrumbs';
import { IMAGES } from '../../data/images';
import { AGENT_PROGRAM, CASH_PROGRAM, PROGRAMS } from '../../data/programs';
import { OFFER_PATH } from '../../lib/site';
import '../programs/ProgramPage.css';
import './AboutPage.css';

function ProgramLinks() {
  return (
    <div className="about-links">
      {PROGRAMS.map((program) => (
        <Link key={program.id} to={program.path} className="arrow-link">
          {program.exploreLabel}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={ABOUT_CRUMBS}
        eyebrow="About Us"
        title="A different way forward for property owners."
        lede="GetHomeOffer helps property owners understand their options and choose what comes next."
        image={IMAGES.aboutHero}
      />

      <SplitSection id="why" eyebrow="Why we exist" title="Why GetHomeOffer exists.">
        <p>
          Selling a property is rarely just a transaction. It usually comes with a change in life: an inheritance, a
          move, or a property that has become more than you want to manage.
        </p>
        <p>
          Too often, owners are steered toward a single answer. GetHomeOffer exists to put the options side by side, a
          direct sale or the traditional market, so the owner can choose.
        </p>
      </SplitSection>

      <SplitSection id="story" eyebrow="Our story" title="Who we are." tone="surface">
        <p>
          I grew up in Wisconsin and studied real estate and risk management at the University of Wisconsin–Madison,
          where both programs ranked first in the nation. Those programs taught me two things: how to understand
          property and markets, and how to manage complexity and help people make decisions in uncertain situations.
        </p>
        <p>
          For years, I watched homeowners face a frustrating choice: list with an agent and wait months for a buyer
          to finance their purchase, or sell to someone who didn't understand their market or their situation. Too often,
          owners felt pressured into decisions that didn't fit their lives.
        </p>
        <p>
          I created GetHomeOffer because Wisconsin homeowners deserve better. They deserve to understand both options
          clearly, to work with someone who knows their market, and to choose the path that actually fits their situation,
          whether that's a fast cash sale or the traditional market with a professional.
        </p>
        <p>
          GetHomeOffer is built on the idea that selling a home isn't just a transaction. It's a life event. And the
          person selling deserves respect, clarity, and real options.
        </p>
      </SplitSection>

      <section className="section" aria-labelledby="beliefs-title">
        <div className="container">
          <SectionHeader id="beliefs-title" eyebrow="What we believe" title="What we believe." />
          <DetailGrid items={BELIEFS} numbered />
        </div>
      </section>

      <SplitSection id="how-we-work" eyebrow="Working together" title="How we work with property owners." tone="surface">
        <p>Whichever path you choose, the way we work stays the same.</p>
        <ul role="list" className="check-list">
          {WORKING_PRINCIPLES.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection id="approach" eyebrow="Our approach" title="Our approach to real estate.">
        <p>
          We offer two programs because property owners need different things. The{' '}
          <Link to={CASH_PROGRAM.path}>Cash Program</Link> is a direct sale with a straightforward offer and no
          listing. The <Link to={AGENT_PROGRAM.path}>Real Estate Agent Program</Link> is for owners who prefer the traditional
          market with a real estate professional.
        </p>
        <p>
          Neither is right for everyone. Our job is to help you understand the trade-offs so you can choose with
          confidence.
        </p>
      </SplitSection>

      <SplitSection id="where" eyebrow="Locations" title="Where we operate." tone="surface">
        <p>Both programs list the states and cities we serve. Choose a program to find your state.</p>
        <ProgramLinks />
      </SplitSection>

      <CtaBand
        id="about-cta"
        title="Let's talk about your property."
        body="Tell us about your property and your situation, and we'll help you understand your options."
        cta={{ label: 'Get My Cash Offer', path: OFFER_PATH }}
      />
    </>
  );
}
