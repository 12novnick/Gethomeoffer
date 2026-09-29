import type { CSSProperties } from 'react';
import type { ContentItem } from '../../data/programs';
import './StepSequence.css';

export function StepSequence({ steps }: { steps: ContentItem[] }) {
  return (
    <ol role="list" className="step-sequence" style={{ '--step-count': steps.length } as CSSProperties}>
      {steps.map((step, index) => (
        <li key={step.title} className="step-sequence__step">
          <span className="step-sequence__number" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="step-sequence__title">{step.title}</h3>
          {step.body && <p className="step-sequence__body">{step.body}</p>}
        </li>
      ))}
    </ol>
  );
}
