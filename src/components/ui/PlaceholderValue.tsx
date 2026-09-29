import './PlaceholderValue.css';

// Inline marker for a business detail that hasn't been supplied yet.
export function PlaceholderValue({ children }: { children: string }) {
  return <span className="placeholder-value">[Placeholder] {children}</span>;
}
