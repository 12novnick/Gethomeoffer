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
        title="Get your free cash offer!"
        lede="Tell us a little about your property and what you're hoping to do. Whether you want a cash offer or would like to explore the Real Estate Agent Program, we'll help you take the next step."
      />

      <section className="section" aria-labelledby="contact-form-title">
        <div className="container contact-layout">
          <aside className="contact-details" aria-label="Contact details">
            <div className="trust-box">
              <h2 className="trust-box__title">Why Wisconsin homeowners sell to us</h2>
              <ul role="list" className="trust-box__list">
                <li>No Commissions</li>
                <li>No Fees</li>
                <li>Sell Your House "As Is"</li>
                <li>Leave Tenants To Us</li>
              </ul>
              <div className="trust-box__badges">
                <img src="/images/badge.png" alt="U.S. News & World Report Best Rankings" />
                <img src="/images/bbb-logo.png" alt="BBB Accredited" />
              </div>
            </div>

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
