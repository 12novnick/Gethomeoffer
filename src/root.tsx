import type { ReactNode } from 'react';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { LinksFunction } from 'react-router';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/inter';
import frauncesLatin from '@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2?url';
import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import './index.css';
import { Footer } from './components/footer/Footer';
import { Navigation } from './components/navigation/Navigation';
import { StickyMobileCTA } from './components/navigation/StickyMobileCTA';
import { ScrollToTop } from './components/navigation/ScrollToTop';
import { ScrollProgress } from './components/navigation/ScrollProgress';
import { PlaceholderPage } from './pages/PlaceholderPage';

// Preloading the two latin font files prevents headings from re-wrapping (layout shift) when fonts swap in.
export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'preload', as: 'font', type: 'font/woff2', href: frauncesLatin, crossOrigin: 'anonymous' },
  { rel: 'preload', as: 'font', type: 'font/woff2', href: interLatin, crossOrigin: 'anonymous' },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f6f2ec" />
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollProgress />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
        <ScrollToTop />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <PlaceholderPage
      title={isNotFound ? 'Page not found.' : 'Something went wrong.'}
      note={isNotFound ? "The page you're looking for doesn't exist or has moved." : 'Please try again in a moment.'}
    />
  );
}
