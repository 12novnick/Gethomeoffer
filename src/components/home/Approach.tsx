import { PILLARS } from '../../data/home';
import { IMAGES } from '../../data/images';
import { ImageSlot } from '../ui/ImageSlot';
import './Approach.css';

export function Approach() {
  return (
    <section className="approach section" aria-labelledby="approach-title">
      <div className="container approach__layout">
        <div className="approach__intro">
          <p className="eyebrow">Our approach</p>
          <h2 id="approach-title" className="approach__title">
            A different way forward.
          </h2>
          <p className="lede approach__lede">
            Selling a property is a significant decision. We keep the process calm and clear, and the choice stays
            yours.
          </p>
          <div className="approach__media">
            <ImageSlot image={IMAGES.approach} />
          </div>
        </div>

        <dl className="approach__pillars">
          {PILLARS.map((pillar) => (
            <div key={pillar.word} className="approach__pillar">
              <dt className="approach__word">{pillar.word}</dt>
              <dd className="approach__body">{pillar.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
