import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { submitContact, type Pathway, type SubmitResult } from '../../lib/contact-form';
import './ContactForm.css';

const PATHWAYS: { value: Pathway; label: string; hint: string }[] = [
  { value: 'cash', label: 'I want a cash offer', hint: 'Explore a direct sale through the Cash Program.' },
  { value: 'agent', label: 'I want to explore the Real Estate Agent Program', hint: 'Sell on the traditional market with a professional.' },
  { value: 'unsure', label: "I'm not sure yet", hint: "We'll help you compare both paths." },
];

const STATUS_MESSAGES: Record<SubmitResult, string> = {
  sent: "Thank you. We've received your details and will be in touch.",
  error: 'Something went wrong sending your message. Please try again.',
  'not-connected':
    '[Placeholder] This form is not connected yet, so nothing was sent. Submissions will work once the form backend is set up.',
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<SubmitResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-select the pathway from ?path= after hydration; the prerendered HTML has no query string.
  const requestedPath = searchParams.get('path');
  useEffect(() => {
    const radios = formRef.current?.elements.namedItem('pathway');
    if (radios instanceof RadioNodeList && PATHWAYS.some((pathway) => pathway.value === requestedPath)) {
      radios.value = requestedPath ?? '';
    }
  }, [requestedPath]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (key: string) => String(form.get(key) ?? '').trim();

    setIsSubmitting(true);
    const result = await submitContact({
      pathway: (text('pathway') || 'unsure') as Pathway,
      name: text('name'),
      email: text('email'),
      phone: text('phone') || undefined,
      address: text('address') || undefined,
      message: text('message') || undefined,
    });
    setIsSubmitting(false);
    setStatus(result);
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <fieldset className="contact-form__pathways">
        <legend className="contact-form__legend">How can we help?</legend>
        {PATHWAYS.map((pathway) => (
          <label key={pathway.value} className="pathway-option">
            <input type="radio" name="pathway" value={pathway.value} required className="pathway-option__input" />
            <span className="pathway-option__text">
              <span className="pathway-option__label">{pathway.label}</span>
              <span className="pathway-option__hint">{pathway.hint}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="contact-form__grid">
        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="contact-phone">
            Phone <span className="field__optional">(optional)</span>
          </label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="contact-address">
            Property address <span className="field__optional">(optional)</span>
          </label>
          <input id="contact-address" name="address" type="text" autoComplete="street-address" />
        </div>
        <div className="field field--full">
          <label htmlFor="contact-message">
            Anything we should know? <span className="field__optional">(optional)</span>
          </label>
          <textarea id="contact-message" name="message" rows={5} />
        </div>
      </div>

      <div className="contact-form__footer">
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send'}
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
