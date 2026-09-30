import './SectionHeader.css';

interface SectionHeaderProps {
  id: string;
  eyebrow?: string;
  title: string;
  lede?: string;
}

export function SectionHeader({ id, eyebrow, title, lede }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="section-header__title">
          {title}
        </h2>
      </div>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}
