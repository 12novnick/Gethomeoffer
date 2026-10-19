import { useEffect, useRef } from 'react';

// Cloudflare Turnstile spam check for lead forms. Off unless VITE_TURNSTILE_SITE_KEY is set at build time.
// The widget adds a hidden "cf-turnstile-response" input to its form; /api/lead verifies it.
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export const TOKEN_FIELD = 'cf-turnstile-response';

interface TurnstileApi {
  render(element: HTMLElement, options: Record<string, unknown>): string;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | undefined;

function loadTurnstile() {
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile missing')));
    script.onerror = () => {
      scriptPromise = undefined;
      reject(new Error('Turnstile failed to load'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/** Renders the check only when Cloudflare needs the visitor to interact; most people never see it. */
export function Turnstile() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SITE_KEY) return;
    let widgetId: string | undefined;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetId = turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          size: 'flexible',
          appearance: 'interaction-only',
          'response-field-name': TOKEN_FIELD,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, []);

  return SITE_KEY ? <div ref={containerRef} className="turnstile" /> : null;
}
