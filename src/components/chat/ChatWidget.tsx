import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { submitLead } from '../../lib/contact-form';
import { TOKEN_FIELD, Turnstile } from '../forms/Turnstile';
import './ChatWidget.css';

type Message = { role: 'user' | 'assistant'; content: string };

const GREETING: Message = {
  role: 'assistant',
  content:
    "Hi there! I'm Amy, Get Home Offer's virtual assistant. I'm happy to help with any questions about selling your home, whether that's a cash sale or working with an agent. What's on your mind?",
};

const FALLBACK =
  "I'm sorry, I'm having trouble answering right now. Tap \"Request an offer\" below and we'll get back to you soon.";

const LEAD_SENT =
  "Thank you! We've received your details and someone from our team will reach out soon. Feel free to keep asking questions here.";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [view, setView] = useState<'chat' | 'lead'>('chat');
  const [leadSent, setLeadSent] = useState(false);
  const [leadError, setLeadError] = useState(false);
  const [leadAttempt, setLeadAttempt] = useState(0);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLOListElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else if (wasOpen.current) {
      toggleRef.current?.focus();
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (view === 'lead') firstFieldRef.current?.focus();
    else inputRef.current?.focus();
  }, [view, isOpen]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, isSending, view]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || isSending) return;

    const next: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setDraft('');
    setIsSending(true);

    let reply = FALLBACK;
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((item) => item !== GREETING) }),
      });
      const data = (await response.json()) as { ok: boolean; reply?: string };
      if (data.ok && data.reply) reply = data.reply;
    } catch {
      reply = FALLBACK;
    }

    setMessages((current) => [...current, { role: 'assistant', content: reply }]);
    setIsSending(false);
  }

  async function sendLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (key: string) => String(form.get(key) ?? '').trim();

    setIsSending(true);
    setLeadError(false);
    const result = await submitLead({
      pathway: 'unsure',
      firstName: text('firstName'),
      lastName: text('lastName'),
      phone: text('phone'),
      email: text('email'),
      address: text('address'),
      smsConsent: form.get('smsConsent') === 'yes',
      company: text('company'),
      turnstileToken: text(TOKEN_FIELD),
      transcript: messages.filter((item) => item !== GREETING),
    });
    setIsSending(false);
    setLeadAttempt((count) => count + 1);

    if (result === 'sent') {
      setLeadSent(true);
      setMessages((current) => [...current, { role: 'assistant', content: LEAD_SENT }]);
      setView('chat');
    } else {
      setLeadError(true);
    }
  }

  return (
    <div className="chat-widget">
      {isOpen && (
        <section id={panelId} className="chat-widget__panel" aria-label="Chat with Amy">
          <header className="chat-widget__header">
            <p className="chat-widget__title">{view === 'lead' ? 'Request an offer' : 'Chat with Amy'}</p>
            <button type="button" className="chat-widget__close" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </header>

          {view === 'chat' ? (
            <>
              <ol ref={logRef} className="chat-widget__log" aria-live="polite">
                {messages.map((message, index) => (
                  <li key={index} className={`chat-widget__message chat-widget__message--${message.role}`}>
                    {message.content}
                  </li>
                ))}
                {isSending && <li className="chat-widget__message chat-widget__message--assistant">Typing...</li>}
              </ol>

              {!leadSent && (
                <button type="button" className="chat-widget__offer" onClick={() => setView('lead')}>
                  Request an offer
                </button>
              )}

              <form className="chat-widget__form" onSubmit={send}>
                <label className="chat-widget__label" htmlFor={`${panelId}-input`}>
                  Your question
                </label>
                <input
                  ref={inputRef}
                  id={`${panelId}-input`}
                  className="chat-widget__input"
                  type="text"
                  value={draft}
                  maxLength={500}
                  autoComplete="off"
                  onChange={(event) => setDraft(event.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn--primary chat-widget__send"
                  disabled={isSending || !draft.trim()}
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <form className="chat-widget__lead" onSubmit={sendLead}>
              <p className="chat-widget__note">Share your details and we'll reach out about your home.</p>
              <div className="chat-widget__row">
                <label>
                  First name
                  <input ref={firstFieldRef} name="firstName" type="text" autoComplete="given-name" required />
                </label>
                <label>
                  Last name
                  <input name="lastName" type="text" autoComplete="family-name" required />
                </label>
              </div>
              <label>
                Phone number
                <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Property address
                <input name="address" type="text" autoComplete="street-address" required />
              </label>

              <div className="chat-widget__trap" aria-hidden="true">
                <label>
                  Company
                  <input name="company" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <label className="chat-widget__consent">
                <input type="checkbox" name="smsConsent" value="yes" required />
                <span>
                  I agree to receive text messages from Get Home Offer at the number above about my request, my property
                  and offers to buy it, including follow-up and marketing messages, which may be sent using automated
                  technology. Consent is not a condition of selling or any purchase. Message frequency varies. Message
                  and data rates may apply. Reply STOP to opt out or HELP for help. See our{' '}
                  <Link to="/privacy-policy/">Privacy Policy</Link> and <Link to="/terms/">Terms &amp; Conditions</Link>.
                </span>
              </label>

              <Turnstile key={leadAttempt} />

              {leadError && (
                <p className="chat-widget__error" role="alert">
                  Something went wrong sending your details. Please try again.
                </p>
              )}

              <div className="chat-widget__actions">
                <button type="button" className="chat-widget__close" onClick={() => setView('chat')}>
                  Back to chat
                </button>
                <button type="submit" className="btn btn--primary chat-widget__send" disabled={isSending}>
                  {isSending ? 'Sending...' : 'Send my details'}
                </button>
              </div>
            </form>
          )}
        </section>
      )}

      <button
        ref={toggleRef}
        type="button"
        className="chat-widget__toggle"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? 'Close chat' : 'Ask a question'}
      </button>
    </div>
  );
}
