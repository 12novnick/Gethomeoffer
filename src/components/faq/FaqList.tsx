import type { Faq } from '../../data/location-content';
import './FaqList.css';

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="faq-list">
      {faqs.map((faq) => (
        <details key={faq.question} className="faq-list__item">
          <summary className="faq-list__question">
            <span>{faq.question}</span>
            <span className="faq-list__icon" aria-hidden="true" />
          </summary>
          <p className="faq-list__answer">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
