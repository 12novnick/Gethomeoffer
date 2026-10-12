import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { OFFER_PATH } from '../../lib/site';
import './ChatWidget.css';

type Message = { role: 'user' | 'assistant'; content: string };

const GREETING: Message = {
  role: 'assistant',
  content:
    'Hi, I can answer questions about our Cash Program and Real Estate Agent Program. For anything about your property, use the contact form.',
};

const FALLBACK = 'Sorry, I cannot answer right now. Please use the contact form and we will get back to you.';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  return (
    <div className="chat-widget">
      {isOpen && (
        <section id={panelId} className="chat-widget__panel" aria-label="Chat with Get Home Offer">
          <header className="chat-widget__header">
            <p className="chat-widget__title">Ask a question</p>
            <button type="button" className="chat-widget__close" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </header>

          <ol className="chat-widget__log" aria-live="polite">
            {messages.map((message, index) => (
              <li key={index} className={`chat-widget__message chat-widget__message--${message.role}`}>
                {message.content}
              </li>
            ))}
            {isSending && <li className="chat-widget__message chat-widget__message--assistant">Typing...</li>}
          </ol>

          <p className="chat-widget__note">
            For details about your property, <Link to={OFFER_PATH}>use the contact form</Link>.
          </p>

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
            <button type="submit" className="btn btn--primary chat-widget__send" disabled={isSending || !draft.trim()}>
              Send
            </button>
          </form>
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
