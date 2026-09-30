import { useEffect, useRef } from 'react';
import { PILLARS } from '../../data/home';
import { IMAGES } from '../../data/images';
import { ImageSlot } from '../ui/ImageSlot';
import './Approach.css';

export function Approach() {
  const listRef = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    list.classList.add('is-animated');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting)),
      { rootMargin: '-38% 0px -38% 0px' },
    );
    list.querySelectorAll('.approach__pillar').forEach((pillar) => observer.observe(pillar));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="approach section" aria-labelledby="approach-title">
      <div className="container approach__layout">
        <div className="approach__intro">
          <h2 id="approach-title" className="approach__title">
            Our Values
          </h2>
          <p className="lede approach__lede">
            Selling a property doesn't have to be complicated.
          </p>
          <div className="approach__media">
            <ImageSlot image={IMAGES.approach} />
          </div>
        </div>

        <dl className="approach__pillars" ref={listRef}>
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
