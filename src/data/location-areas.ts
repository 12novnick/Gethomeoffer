// Neighborhood and landmark pages under a city page, at /we-buy-houses-cash/<state>/<city>/<area>/.
// Import-free because react-router.config.ts loads it. Page copy lives in location-area-content.ts (build-time only).
export interface AreaLink {
  slug: string;
  name: string;
  /** One or two sentences for the card on the city page. */
  card: string;
  /** Card link text when "We buy houses in <name>" reads badly. */
  anchor?: string;
}

export const CITY_AREAS: Record<string, AreaLink[]> = {
  'wisconsin/milwaukee': [
    {
      slug: 'bay-view',
      name: 'Bay View',
      card: 'South-side lakefront neighborhood with older single-family homes and upper and lower flats.',
    },
    {
      slug: 'walkers-point',
      name: "Walker's Point",
      card: 'One of the city\'s oldest neighborhoods, south of downtown, known for historic worker cottages.',
    },
    {
      slug: 'washington-heights',
      name: 'Washington Heights',
      card: 'West-side neighborhood between Sherman Park and Washington Park with long-established homes.',
    },
    {
      slug: 'east-side-near-uwm',
      name: 'East Side and UWM',
      anchor: 'We buy houses on the East Side',
      card: 'Duplexes, walk-up flats and rentals near the University of Wisconsin–Milwaukee.',
    },
    {
      slug: 'near-marquette-university',
      name: 'Marquette University Area',
      anchor: 'We buy houses near Marquette',
      card: 'Near West Side homes, many divided into units, close to the Marquette campus.',
    },
  ],
};

export const areaPath = (cityKey: string, slug: string) => `/we-buy-houses-cash/${cityKey}/${slug}/`;
