import './ContentSlot.css';

interface ContentSlotProps {
  label: string;
  guidance: string;
}

// Marks where localized copy is still needed. Pages containing slots are unpublished (noindex).
export function ContentSlot({ label, guidance }: ContentSlotProps) {
  return (
    <div className="content-slot">
      <p className="content-slot__label">Content needed · {label}</p>
      <p className="content-slot__guidance">{guidance}</p>
    </div>
  );
}
