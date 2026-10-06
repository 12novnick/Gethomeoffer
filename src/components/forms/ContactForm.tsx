import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { submitLead, type Pathway, type SubmitResult } from '../../lib/contact-form';
import './ContactForm.css';

const STATUS_MESSAGES: Record<SubmitResult, string> = {
  sent: "Thank you. We've received your details and will be in touch.",
  error: 'Something went wrong sending your information. Please try again.',
  'not-connected':
    '[Placeholder] This form is not connected yet, so nothing was sent. Submissions will work once the form backend is set up.',
};

const PATHWAYS: Pathway[] = ['cash', 'agent', 'unsure'];

export function ContactForm() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<SubmitResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
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
    });
    setIsSubmitting(false);
    setStatus(result);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
          <input id="lead-address" name="address" type="text" autoComplete="street-address" required />
        </div>
      </div>

      <fieldset className="consent">
        <legend className="consent__legend">
          SMS Consent <span className="consent__required">(Required)</span>
        </legend>
        <label className="consent__option">
          <input type="checkbox" name="smsConsent" value="yes" required className="consent__input" />
          <span>
            I agree to receive communications by text message from GetHomeOffer about updates and inquiries. You may
            opt out by replying STOP or ask for more information by replying HELP. Message frequency varies. Message
            and data rates may apply. You may review our <Link to="/privacy-policy/">Privacy Policy</Link> and{' '}
            <Link to="/terms/">Terms &amp; Conditions</Link>.
          </span>
        </label>
      </fieldset>

      <div className="contact-form__footer">
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Get My Cash Offer'}
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
