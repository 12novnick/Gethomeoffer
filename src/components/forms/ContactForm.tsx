import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { IMAGES } from '../../data/images';
import { KITCHEN_CONDITIONS, PROPERTY_TYPES, TIMELINES, submitLead, type HomeDetails, type Pathway, type SubmitResult } from '../../lib/contact-form';
import { ImageSlot } from '../ui/ImageSlot';
import { AddressAutocomplete } from './AddressAutocomplete';
import { TOKEN_FIELD, Turnstile } from './Turnstile';
import './ContactForm.css';

const STATUS_MESSAGES: Record<SubmitResult, string> = {
  sent: "Thank you. We've received your details and will be in touch.",
  error: 'Something went wrong sending your information. Please try again, or call us.',
};

const PATHWAYS: Pathway[] = ['cash', 'agent', 'unsure'];

const STEPS = ['Your details', 'Your home', 'Home details', 'Kitchen', 'Timeline', 'Confirm'] as const;
const DETAILS_STEP = 2;
const KITCHEN_STEP = 3;
// Steps that don't apply to an empty lot.
const BUILDING_STEPS = [DETAILS_STEP, KITCHEN_STEP];

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => String(from + index));

type DetailSelectConfig = { name: keyof HomeDetails; label: string; hint: string; options: string[] };

const SELECTS_BEFORE_SIZE: DetailSelectConfig[] = [
  { name: 'bedrooms', label: 'Bedrooms', hint: 'Must have a door, closet, and window.', options: [...range(0, 6), '7+'] },
  { name: 'fullBaths', label: 'Full bathrooms', hint: 'Must have a toilet and a shower/tub.', options: [...range(0, 5), '6+'] },
  { name: 'partialBaths', label: 'Partial bathrooms', hint: 'Must have a toilet and sink.', options: [...range(0, 4), '5+'] },
];

const FLOORS: DetailSelectConfig = {
  name: 'floors',
  label: 'Floors (above ground)',
  hint: "Don't include the basement.",
  options: ['1', '2', '3', '4+'],
};
const BASEMENT: DetailSelectConfig = {
  name: 'basement',
  label: 'Basement',
  hint: 'Floors that are completely below ground.',
  options: ['No', 'Yes'],
};
const SELECTS_AT_END: DetailSelectConfig[] = [
  { name: 'pool', label: 'Pool', hint: 'Does the property have a pool?', options: ['In-ground', 'Above-ground', 'Community pool', 'No pool'] },
];

const BASEMENT_SIZES: { name: keyof HomeDetails; label: string; hint: string }[] = [
  { name: 'finishedBasementSqft', label: 'Finished basement sq. ft.', hint: 'Heated, fully insulated, and waterproof.' },
  {
    name: 'unfinishedBasementSqft',
    label: 'Unfinished basement sq. ft.',
    hint: 'Non-heated, concrete floors, exposed pipes or drywall.',
  },
];

const DETAIL_FIELDS: (keyof HomeDetails)[] = [
  ...SELECTS_BEFORE_SIZE.map((item) => item.name),
  'sqft',
  'lotSqft',
  'floors',
  'basement',
  'finishedBasementSqft',
  'unfinishedBasementSqft',
  ...SELECTS_AT_END.map((item) => item.name),
];

function NumberField({
  name,
  label,
  hint,
  optional = false,
  min,
}: {
  name: string;
  label: string;
  hint: string;
  optional?: boolean;
  min: number;
}) {
  const id = `lead-${name}`;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {optional && <span className="field__optional"> (optional)</span>}
      </label>
      <span id={`${id}-hint`} className="field__hint">
        {hint}
      </span>
      <input
        id={id}
        name={name}
        type="number"
        inputMode="numeric"
        min={min}
        max={100000000}
        required={!optional}
        aria-describedby={`${id}-hint`}
      />
    </div>
  );
}

function DetailSelect({
  name,
  label,
  hint,
  options,
  onChange,
}: DetailSelectConfig & { onChange?: (value: string) => void }) {
  const id = `lead-${name}`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <span id={`${id}-hint`} className="field__hint">
        {hint}
      </span>
      <select
        id={id}
        name={name}
        required
        defaultValue=""
        aria-describedby={`${id}-hint`}
        onChange={onChange && ((event) => onChange(event.target.value))}
      >
        <option value="" disabled>
          Select...
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

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
  const [propertyType, setPropertyType] = useState('');
  const [ownership, setOwnership] = useState('');
  const [basement, setBasement] = useState('');
  // An empty lot has no rooms, so the home-details step is skipped.
  const skipDetails = propertyType === 'lot';
  const isSkipped = (index: number) => skipDetails && BUILDING_STEPS.includes(index);

  useEffect(() => {
    if (moved.current) headingRefs.current[step]?.focus();
  }, [step]);

  function goTo(next: number) {
    moved.current = true;
    setStatus(null);
    setStep(next);
  }

  function next() {
    const fields =
      stepRefs.current[step]?.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input:not([type="hidden"]), select') ?? [];
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return;
      }
    }
    let target = step + 1;
    while (isSkipped(target)) target++;
    goTo(target);
  }

  function back() {
    let target = step - 1;
    while (isSkipped(target)) target--;
    goTo(target);
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
      kitchen: skipDetails ? undefined : text('kitchen'),
      timeline: text('timeline'),
      ownership: text('ownership'),
      ownershipOther: text('ownershipOther'),
      details: skipDetails
        ? undefined
        : (Object.fromEntries(DETAIL_FIELDS.map((name) => [name, text(name)])) as unknown as HomeDetails),
      smsConsent: form.get('smsConsent') === 'yes',
      company: text('company'),
      turnstileToken: text(TOKEN_FIELD),
    });
    setIsSubmitting(false);
    setAttempt((count) => count + 1);
    setStatus(result);
    if (result === 'sent') {
      formElement.reset();
      setPropertyType('');
      setOwnership('');
      setBasement('');
      moved.current = false;
      setStep(0);
    }
  }

  const activeSteps = STEPS.map((_, index) => index).filter((index) => !isSkipped(index));
  const totalSteps = activeSteps.length;
  const stepNumber = activeSteps.indexOf(step) + 1;
  const progress = (stepNumber / totalSteps) * 100;

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
          Step {stepNumber} of {totalSteps}
        </p>
      </div>
      <div
        className="contact-form__progress"
        role="progressbar"
        aria-label="Form progress"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={stepNumber}
        aria-valuetext={`Step ${stepNumber} of ${totalSteps}: ${STEPS[step]}`}
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
          <div className="field field--full ownership" role="radiogroup" aria-labelledby="lead-ownership-label">
            <span id="lead-ownership-label" className="ownership__label">
              Are you the owner of this property?
            </span>
            <div className="ownership__options">
              <label className="ownership__option">
                <input type="radio" name="ownership" value="owner" required onChange={() => setOwnership('owner')} />
                I'm the owner
              </label>
              <label className="ownership__option">
                <input type="radio" name="ownership" value="other" required onChange={() => setOwnership('other')} />
                Other
              </label>
            </div>
            {ownership === 'other' && (
              <div className="field">
                <label htmlFor="lead-ownership-other">Please specify your relationship to the property</label>
                <input
                  id="lead-ownership-other"
                  name="ownershipOther"
                  type="text"
                  required
                  maxLength={120}
                  placeholder="For example: family member, executor, co-owner, agent"
                />
              </div>
            )}
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
              <input
                type="radio"
                name="propertyType"
                value={type.value}
                required
                className="property-type__input"
                onChange={() => setPropertyType(type.value)}
              />
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
          stepRefs.current[DETAILS_STEP] = el;
        }}
        className="contact-form__step"
        hidden={step !== DETAILS_STEP}
        disabled={skipDetails}
        aria-describedby="home-details-help"
      >
        <h3
          ref={(el) => {
            headingRefs.current[DETAILS_STEP] = el;
          }}
          tabIndex={-1}
          className="contact-form__step-title"
        >
          Do these home details look right to you?
        </h3>
        <p id="home-details-help" className="contact-form__step-help">
          Your offer will be more accurate if all these details are up to date.
        </p>
        <div className="contact-form__details">
          {SELECTS_BEFORE_SIZE.map((item) => (
            <DetailSelect key={item.name} {...item} />
          ))}
          <NumberField
            name="sqft"
            label="Square footage (above ground)"
            hint="Don't include basements, non-permitted additions, or non-heated square footage."
            min={100}
          />
          <NumberField
            name="lotSqft"
            label="Lot square footage"
            hint="This is the length x width of your lot (in feet)."
            min={1}
            optional
          />
          <DetailSelect {...FLOORS} />
          <DetailSelect {...BASEMENT} onChange={setBasement} />
          {basement === 'Yes' &&
            BASEMENT_SIZES.map((item) => <NumberField key={item.name} name={item.name} label={item.label} hint={item.hint} min={0} />)}
          {SELECTS_AT_END.map((item) => (
            <DetailSelect key={item.name} {...item} />
          ))}
        </div>
      </fieldset>

      <fieldset
        ref={(el) => {
          stepRefs.current[KITCHEN_STEP] = el;
        }}
        className="contact-form__step"
        hidden={step !== KITCHEN_STEP}
        disabled={skipDetails}
        aria-describedby="kitchen-help"
      >
        <h3
          ref={(el) => {
            headingRefs.current[KITCHEN_STEP] = el;
          }}
          tabIndex={-1}
          className="contact-form__step-title"
        >
          How would you describe your kitchen?
        </h3>
        <p id="kitchen-help" className="contact-form__step-help">
          For these questions, just select the closest match.
        </p>
        <div className="condition-cards">
          {KITCHEN_CONDITIONS.map((option) => (
            <label key={option.value} className="condition-card">
              <input type="radio" name="kitchen" value={option.value} required className="condition-card__input" />
              <ImageSlot
                image={IMAGES[option.image]}
                className="condition-card__image"
                sizes="(min-width: 900px) 320px, (min-width: 600px) 45vw, 90vw"
              />
              <span className="condition-card__text">
                <span className="condition-card__label">{option.value}</span>
                <span className="condition-card__hint">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset
        ref={(el) => {
          stepRefs.current[4] = el;
        }}
        className="contact-form__step"
        hidden={step !== 4}
        aria-describedby="timeline-help"
      >
        <h3
          ref={(el) => {
            headingRefs.current[4] = el;
          }}
          tabIndex={-1}
          className="contact-form__step-title"
        >
          When do you need to sell your home?
        </h3>
        <p id="timeline-help" className="contact-form__step-help">
          This won't affect your offer. We're here to help with any timeline.
        </p>
        <div className="property-types">
          {TIMELINES.map((option) => (
            <label key={option} className="property-type">
              <input type="radio" name="timeline" value={option} required className="property-type__input" />
              <span className="property-type__label">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset
        ref={(el) => {
          stepRefs.current[5] = el;
        }}
        className="contact-form__step"
        hidden={step !== 5}
      >
        <h3
          ref={(el) => {
            headingRefs.current[5] = el;
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

        {step === STEPS.length - 1 && <Turnstile key={attempt} />}
      </fieldset>

      <div className="contact-form__trap" aria-hidden="true">
        <label htmlFor="lead-company">Company</label>
        <input id="lead-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__footer">
        {step > 0 && (
          <button type="button" className="btn btn--ghost" onClick={back}>
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
