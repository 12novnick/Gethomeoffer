import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { submitLead, type Pathway, type SubmitResult } from '../../lib/contact-form';
import { AddressAutocomplete } from './AddressAutocomplete';
import { TOKEN_FIELD, Turnstile } from './Turnstile';
import './ContactForm.css';

const STATUS_MESSAGES: Record<SubmitResult, string> = {
  sent: "Thank you. We've received your details and will be in touch.",
  error: 'Something went wrong sending your information. Please try again, or call us.',
};

const PATHWAYS: Pathway[] = ['cash', 'agent', 'unsure'];

export function ContactForm() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<SubmitResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Turnstile tokens are single-use, so each attempt gets a fresh widget.
  const [attempt, setAttempt] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const text = (key: string) => String(form.get(key) ?? '').trim();
    const requested = searchParams.get('path') as Pathway | null;

    setIsSubmitting(true);
    const result = await submitLead({
      pathway: requested && PATHWAYS.includes(requested) ? requested : 'cash',
      firstName: text('firstName'),
      lastName: text('lastName'),
      phone: text('phone'),
      email: text('email'),
      address: text('address'),
      smsConsent: form.get('smsConsent') === 'yes',
      company: text('company'),
      turnstileToken: text(TOKEN_FIELD),
    });
    setIsSubmitting(false);
    setAttempt((count) => count + 1);
    setStatus(result);
    if (result === 'sent') formElement.reset();
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <p className="contact-form__time">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        Takes 5 to 10 minutes
      </p>
      <div className="contact-form__grid">
        <div className="field">
          <label htmlFor="lead-first-name">First name</label>
          <input id="lead-first-name" name="firstName" type="text" autoComplete="given-name" required />
        </div>
        <div className="field">
          <label htmlFor="lead-last-name">Last name</label>
          <input id="lead-last-name" name="lastName" type="text" autoComplete="family-name" required />
        </div>
        <div className="field">
          <label htmlFor="lead-phone">Phone number</label>
          <input id="lead-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
        </div>
        <div className="field">
          <label htmlFor="lead-email">Email</label>
          <input id="lead-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field field--full">
          <label htmlFor="lead-address">Property address</label>
          <AddressAutocomplete id="lead-address" name="address" />
        </div>
      </div>

      <div className="contact-form__trap" aria-hidden="true">
        <label htmlFor="lead-company">Company</label>
        <input id="lead-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="consent">
        <legend className="consent__legend">
          SMS Consent <span className="consent__required">(Required)</span>
        </legend>
        <label className="consent__option">
          <input type="checkbox" name="smsConsent" value="yes" required className="consent__input" />
          <span>
            I agree to receive text messages from Get Home Offer at the number above about my request, my property and
            offers to buy it, including follow-up and marketing messages, which may be sent using automated technology.
            Consent is not a condition of selling or any purchase. Message frequency varies. Message and data rates may
            apply. Reply STOP to opt out or HELP for help. See our <Link to="/privacy-policy/">Privacy Policy</Link> and{' '}
            <Link to="/terms/">Terms &amp; Conditions</Link>.
          </span>
        </label>
      </fieldset>

      <Turnstile key={attempt} />

      <div className="contact-form__footer">
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Get My Free Cash Offer'}
        </button>
        <p className="contact-form__note">
          See our <Link to="/privacy-policy/">Privacy Policy</Link> for how we handle your information.
        </p>
      </div>

      <p className={`contact-form__status ${status ? `is-${status}` : ''}`} role="status" aria-live="polite">
        {status ? STATUS_MESSAGES[status] : ''}
      </p>
    </form>
  );
}
