import type { Faq } from '../../data/location-content';
import './FaqList.css';

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="faq-list">
      {faqs.map((faq) => (
        <div key={faq.question} className="faq-list__item">
          <h3 className="faq-list__question">{faq.question}</h3>
          <p className="faq-list__answer">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
