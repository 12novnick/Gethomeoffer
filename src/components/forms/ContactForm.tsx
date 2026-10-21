import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { PROPERTY_TYPES, submitLead, type Pathway, type SubmitResult } from '../../lib/contact-form';
import { AddressAutocomplete } from './AddressAutocomplete';
import { TOKEN_FIELD, Turnstile } from './Turnstile';
import './ContactForm.css';

const STATUS_MESSAGES: Record<SubmitResult, string> = {
  sent: "Thank you. We've received your details and will be in touch.",
  error: 'Something went wrong sending your information. Please try again, or call us.',
};

const PATHWAYS: Pathway[] = ['cash', 'agent', 'unsure'];

const STEPS = ['Your details', 'Your home', 'Confirm'] as const;

export function ContactForm() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<SubmitResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Turnstile tokens are single-use, so each attempt gets a fresh widget.
  const [attempt, setAttempt] = useState(0);
  const [step, setStep] = useState(0);
  const stepRefs = useRef<(HTMLFieldSetElement | null)[]>([]);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const moved = useRef(false);

  useEffect(() => {
    if (moved.current) headingRefs.current[step]?.focus();
  }, [step]);

  function goTo(next: number) {
    moved.current = true;
    setStatus(null);
    setStep(next);
  }

  function next() {
    const fields = stepRefs.current[step]?.querySelectorAll<HTMLInputElement>('input:not([type="hidden"])') ?? [];
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return;
      }
    }
    goTo(step + 1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < STEPS.length - 1) {
      next();
      return;
    }
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
      propertyType: text('propertyType'),
      smsConsent: form.get('smsConsent') === 'yes',
      company: text('company'),
      turnstileToken: text(TOKEN_FIELD),
    });
    setIsSubmitting(false);
    setAttempt((count) => count + 1);
    setStatus(result);
    if (result === 'sent') {
      formElement.reset();
      moved.current = false;
      setStep(0);
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate={step < STEPS.length - 1}>
      <div className="contact-form__top">
        <p className="contact-form__time">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          Takes 5 to 10 minutes
        </p>
        <p className="contact-form__step-count">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>
      <div
        className="contact-form__progress"
        role="progressbar"
        aria-label="Form progress"
        aria-valuemin={0}
        aria-valuemax={STEPS.length}
        aria-valuenow={step + 1}
        aria-valuetext={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}
      >
        <span className="contact-form__progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <fieldset
        ref={(el) => {
          stepRefs.current[0] = el;
        }}
        className="contact-form__step"
        hidden={step !== 0}
      >
        <h3
          ref={(el) => {
            headingRefs.current[0] = el;
          }}
          tabIndex={-1}
          className="contact-form__step-title"
        >
          Tell us about you and the property
        </h3>
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
      </fieldset>

      <fieldset
        ref={(el) => {
          stepRefs.current[1] = el;
        }}
        className="contact-form__step"
        hidden={step !== 1}
        aria-describedby="property-type-help"
      >
        <h3
          ref={(el) => {
            headingRefs.current[1] = el;
          }}
          tabIndex={-1}
          className="contact-form__step-title"
        >
          What best describes your home?
        </h3>
        <p id="property-type-help" className="contact-form__step-help">
          This question helps us select comps when preparing your offer.
        </p>
        <div className="property-types">
          {PROPERTY_TYPES.map((type) => (
            <label key={type.value} className="property-type">
              <input type="radio" name="propertyType" value={type.value} required className="property-type__input" />
              <span className="property-type__text">
                <span className="property-type__label">{type.label}</span>
                {type.hint && <span className="property-type__hint">{type.hint}</span>}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset
        ref={(el) => {
          stepRefs.current[2] = el;
        }}
        className="contact-form__step"
        hidden={step !== 2}
      >
        <h3
          ref={(el) => {
            headingRefs.current[2] = el;
          }}
          tabIndex={-1}
          className="contact-form__step-title"
        >
          Almost done
        </h3>
        <div className="consent">
          <p className="consent__legend">
            SMS Consent <span className="consent__required">(Required)</span>
          </p>
          <label className="consent__option">
            <input type="checkbox" name="smsConsent" value="yes" required className="consent__input" />
            <span>
              I agree to receive text messages from Get Home Offer at the number above about my request, my property
              and offers to buy it, including follow-up and marketing messages, which may be sent using automated
              technology. Consent is not a condition of selling or any purchase. Message frequency varies. Message and
              data rates may apply. Reply STOP to opt out or HELP for help. See our{' '}
              <Link to="/privacy-policy/">Privacy Policy</Link> and <Link to="/terms/">Terms &amp; Conditions</Link>.
            </span>
          </label>
        </div>

        {step === 2 && <Turnstile key={attempt} />}
      </fieldset>

      <div className="contact-form__trap" aria-hidden="true">
        <label htmlFor="lead-company">Company</label>
        <input id="lead-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__footer">
        {step > 0 && (
          <button type="button" className="btn btn--ghost" onClick={() => goTo(step - 1)}>
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="submit" className="btn btn--primary">
            Next
          </button>
        ) : (
          <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Get My Free Cash Offer'}
          </button>
        )}
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
