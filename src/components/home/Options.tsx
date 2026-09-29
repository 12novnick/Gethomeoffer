import { Link } from 'react-router';
import { IMAGES, type ImageAsset } from '../../data/images';
import { AGENT_PATH, CASH_PATH } from '../../lib/site';
import { ImageSlot } from '../ui/ImageSlot';
import './Options.css';

interface ProgramCardProps {
  variant: 'cash' | 'agent';
  index: string;
  kicker: string;
  title: string;
  description: string;
  cta: string;
  to: string;
  image: ImageAsset;
}

function ProgramCard({ variant, index, kicker, title, description, cta, to, image }: ProgramCardProps) {
  return (
    <article className={`program-card program-card--${variant}`}>
      <div className="program-card__media">
        <ImageSlot image={image} />
      </div>
      <div className="program-card__body">
        <p className="program-card__meta">
          <span>{index}</span>
          <span>{kicker}</span>
        </p>
        <h3 className="program-card__title">{title}</h3>
        <p className="program-card__description">{description}</p>
        <Link to={to} className="program-card__link">
          {cta}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export function Options() {
  return (
    <section id="options" className="options section" aria-labelledby="options-title">
      <div className="container">
        <header className="options__header">
          <p className="eyebrow">Two paths</p>
          <h2 id="options-title" className="options__title">
            You have options.
          </h2>
          <p className="lede">
            Every property is different. That's why we've created different ways to help you move forward.
          </p>
        </header>

        <div className="options__grid">
          <ProgramCard
            variant="cash"
            index="01"
            kicker="Direct sale"
            title="We Buy Houses Cash"
            description="Explore a direct sale and get a straightforward offer for your property."
            cta="Explore the Cash Program"
            to={CASH_PATH}
            image={IMAGES.programCash}
          />
          <ProgramCard
            variant="agent"
            index="02"
            kicker="Traditional market"
            title="Agent Program"
            description="Prefer the traditional market? Explore connecting with a real estate professional."
            cta="Explore the Agent Program"
            to={AGENT_PATH}
            image={IMAGES.programAgent}
          />
        </div>
      </div>
    </section>
  );
}
