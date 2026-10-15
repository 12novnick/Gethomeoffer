import { Fragment } from 'react';
import { Link } from 'react-router';

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders text with [label](url) links: site paths use the router, full URLs open the external page. */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, url] = match;
    const index = match.index ?? 0;
    parts.push(text.slice(last, index));
    parts.push(
      url.startsWith('/') ? (
        <Link key={index} to={url}>
          {label}
        </Link>
      ) : (
        <a key={index} href={url} rel="noopener">
          {label}
        </a>
      ),
    );
    last = index + whole.length;
  }
  parts.push(text.slice(last));
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
