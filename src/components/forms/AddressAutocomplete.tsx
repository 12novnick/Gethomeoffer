import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import './AddressAutocomplete.css';

// Google Places (New) autocomplete. Without VITE_GOOGLE_MAPS_API_KEY it is a plain address input.
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
const ENDPOINT = 'https://places.googleapis.com/v1/places:autocomplete';

interface Props {
  id: string;
  name: string;
}

function newSessionToken() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now());
}

async function fetchSuggestions(input: string, sessionToken: string, signal: AbortSignal): Promise<string[]> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY ?? '' },
    body: JSON.stringify({
      input,
      sessionToken,
      includedRegionCodes: ['us'],
      includedPrimaryTypes: ['street_address', 'premise', 'subpremise'],
    }),
  });
  if (!response.ok) return [];
  const data = (await response.json()) as { suggestions?: { placePrediction?: { text?: { text?: string } } }[] };
  return (data.suggestions ?? [])
    .map((item) => item.placePrediction?.text?.text?.replace(/, USA$/, '') ?? '')
    .filter(Boolean);
}

export function AddressAutocomplete({ id, name }: Props) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const [manual, setManual] = useState(!API_KEY);
  const sessionToken = useRef(newSessionToken());
  const skipNextLookup = useRef(false);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const clear = () => {
      skipNextLookup.current = true;
      setValue('');
      setSuggestions([]);
      setOpen(false);
    };
    form.addEventListener('reset', clear);
    return () => form.removeEventListener('reset', clear);
  }, []);

  useEffect(() => {
    if (manual || skipNextLookup.current) {
      skipNextLookup.current = false;
      return;
    }
    const query = value.trim();
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetchSuggestions(query, sessionToken.current, controller.signal)
        .then((items) => {
          setSuggestions(items);
          setActive(-1);
          setOpen(true);
        })
        .catch(() => {});
    }, 250);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [value, manual]);

  function choose(address: string) {
    skipNextLookup.current = true;
    setValue(address);
    setOpen(false);
    setSuggestions([]);
    sessionToken.current = newSessionToken();
  }

  function enterManually() {
    setManual(true);
    setOpen(false);
    setSuggestions([]);
    inputRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => (index + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    } else if (event.key === 'Enter' && active >= 0) {
      event.preventDefault();
      choose(suggestions[active]);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const showList = open && !manual && suggestions.length > 0;

  return (
    <div className="address-search">
      <span className="address-search__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      </span>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="text"
        required
        autoComplete={manual ? 'street-address' : 'off'}
        placeholder="Start typing the property address"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          if (!manual) setOpen(true);
        }}
        onKeyDown={onKeyDown}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        role={manual ? undefined : 'combobox'}
        aria-autocomplete={manual ? undefined : 'list'}
        aria-expanded={manual ? undefined : showList}
        aria-controls={manual ? undefined : listId}
        aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
      />
      {showList && (
        <div className="address-search__panel">
          <ul id={listId} role="listbox" className="address-search__list">
            {suggestions.map((address, index) => (
              <li
                key={address}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                className="address-search__option"
                onMouseDown={(event) => {
                  event.preventDefault();
                  choose(address);
                }}
              >
                {address}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="address-search__manual"
            onMouseDown={(event) => event.preventDefault()}
            onClick={enterManually}
          >
            Enter address manually instead
          </button>
        </div>
      )}
    </div>
  );
}
