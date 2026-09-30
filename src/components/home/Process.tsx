import { useEffect, useRef, useState } from 'react';
import { STEPS } from '../../data/home';
import './Process.css';

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const list = trackRef.current;
    if (!list) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const markers = list.querySelectorAll<HTMLElement>('.process__marker');
      const threshold = window.innerHeight * 0.6;
      let index = -1;
      markers.forEach((marker, i) => {
        if (marker.getBoundingClientRect().top < threshold) index = i;
      });
      setActive(index);
      const target = markers[Math.max(index, 0)];
      if (target) {
        const listRect = list.getBoundingClientRect();
        const rect = target.getBoundingClientRect();
        setPos({
          x: rect.left + rect.width / 2 - listRect.left,
          y: rect.top + rect.height / 2 - listRect.top,
        });
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="process section on-dark" aria-labelledby="process-title">
      <div className="container">
        <header className="process__header">
          <div>
            <h2 id="process-title" className="process__title">
              How It Works
            </h2>
          </div>
        </header>

        <div className="process__track" ref={trackRef}>
        <ol role="list" className="process__steps">
          {STEPS.map((step, i) => (
            <li key={step.number} className={`process__step${i <= active ? ' is-reached' : ''}`}>
              <span className="process__marker" aria-hidden="true" />
              <span className="process__number" aria-hidden="true">
                {step.number}
              </span>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-body">{step.body}</p>
            </li>
          ))}
        </ol>
          <span
            className={`process__traveler${active >= 0 ? ' is-visible' : ''}`}
            style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
