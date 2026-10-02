import { useEffect, useRef, useState } from 'react';
import { SITUATIONS } from '../../data/home';
import { ImageSlot } from '../ui/ImageSlot';
import './Situations.css';

export function Situations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    itemRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="situations section" aria-labelledby="situations-title">
      <div className="container situations__layout">
        <div className="situations__frame" aria-hidden="true">
          <div className="situations__image is-active">
            <ImageSlot image={SITUATIONS[0].image} />
          </div>
        </div>

        <div className="situations__content">
          <h2 id="situations-title" className="situations__title">
            Sometimes, life changes the plan.
          </h2>
          <p className="lede situations__lede">
            Property owners then reach moments where they need to decide what comes next. There's no single right answer,
            only the one that fits your situation.
          </p>

          <p className="situations__prompt">Perhaps you are experiencing one or more of the following.</p>

          <ol role="list" className="situations__list">
            {SITUATIONS.map((situation, index) => (
              <li
                key={situation.title}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                data-index={index}
                className={`situations__item ${index === activeIndex ? 'is-active' : ''}`}
              >
                <span className="situations__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="situations__item-title">{situation.title}</h3>
                  <p className="situations__item-body">{situation.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
