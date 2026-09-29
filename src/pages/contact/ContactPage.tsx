import { Link } from 'react-router';
import { ContactForm } from '../../components/forms/ContactForm';
import { PageHero } from '../../components/ui/PageHero';
import { PlaceholderValue } from '../../components/ui/PlaceholderValue';
import { CONTACT_CRUMBS } from '../../data/breadcrumbs';
import { COMPANY } from '../../data/company';
import { AGENT_PROGRAM, CASH_PROGRAM } from '../../data/programs';
import './ContactPage.css';

export function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={CONTACT_CRUMBS}
        eyebrow="Contact"
        title="Let's Talk About Your Property."
        lede="Tell us a little about your property and what you're hoping to do. Whether you want a cash offer or would like to explore the Agent Program, we'll help you take the next step."
      />

      <section className="section" aria-labelledby="contact-form-title">
        <div className="container contact-layout">
          <aside className="contact-details" aria-label="Contact details">
            <h2 className="contact-details__title">Reach us directly</h2>
            <dl className="contact-details__list">
              <div>
                <dt>Phone</dt>
                <dd>
                  {COMPANY.phone ? (
                    <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`}>{COMPANY.phone}</a>
                  ) : (
                    <PlaceholderValue>Phone number to be provided</PlaceholderValue>
                  )}
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  {COMPANY.email ? (
                    <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                  ) : (
                    <PlaceholderValue>Email address to be provided</PlaceholderValue>
                  )}
                </dd>
              </div>
            </dl>

            <div className="contact-details__programs">
              <p className="eyebrow">Learn first</p>
              <Link to={CASH_PROGRAM.path} className="arrow-link">
                {CASH_PROGRAM.exploreLabel}
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link to={AGENT_PROGRAM.path} className="arrow-link">
                {AGENT_PROGRAM.exploreLabel}
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </aside>

          <div className="contact-form-panel">
            <h2 id="contact-form-title" className="visually-hidden">
              Send us a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
