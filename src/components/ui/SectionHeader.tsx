import './SectionHeader.css';

interface SectionHeaderProps {
  id: string;
  title: string;
  lede?: string;
}

export function SectionHeader({ id, title, lede }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <div>
        <h2 id={id} className="section-header__title">
          {title}
        </h2>
      </div>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}
