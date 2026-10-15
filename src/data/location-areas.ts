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
    // Milwaukee County suburbs (owner chose all of them, 2026-10-15).
    { slug: 'bayside', name: 'Bayside', card: 'Residential North Shore village on Lake Michigan, at the northern end of the county lakeshore.' },
    { slug: 'brown-deer', name: 'Brown Deer', card: 'Northern Milwaukee County village that grew from farmland into a commuter suburb after World War II.' },
    { slug: 'cudahy', name: 'Cudahy', card: 'Lakefront city south of Milwaukee, founded around Patrick Cudahy\'s meatpacking plant.' },
    { slug: 'fox-point', name: 'Fox Point', card: 'North Shore village along Lake Michigan, incorporated in 1926.' },
    { slug: 'franklin', name: 'Franklin', card: 'Southwest Milwaukee County city that grew from farmland into subdivisions starting in the 1950s.' },
    { slug: 'glendale', name: 'Glendale', card: 'Inner-ring suburb just north of Milwaukee, between two county parks and the Milwaukee River.' },
    { slug: 'greendale', name: 'Greendale', card: 'Planned New Deal village with single-family homes, multi-family homes and row houses.' },
    { slug: 'greenfield', name: 'Greenfield', card: 'Mostly residential southwest suburb with several larger shopping centers and no major industry.' },
    { slug: 'hales-corners', name: 'Hales Corners', card: 'Small village around the historic crossroads of Highway 100 and Janesville Road.' },
    { slug: 'oak-creek', name: 'Oak Creek', card: 'Southern Milwaukee County city on Lake Michigan, with older homes in historic Carrollville.' },
    { slug: 'river-hills', name: 'River Hills', card: 'North Shore village named for the Milwaukee River and its rolling terrain.' },
    { slug: 'shorewood', name: 'Shorewood', card: 'Compact village between Lake Michigan and the Milwaukee River, just north of the city line.' },
    { slug: 'south-milwaukee', name: 'South Milwaukee', card: 'Lakefront industrial city along the Oak Creek, incorporated in 1892.' },
    { slug: 'st-francis', name: 'St. Francis', card: 'One of the smallest suburbs in Milwaukee County, on the lake just south of Milwaukee.' },
    { slug: 'wauwatosa', name: 'Wauwatosa', card: 'West-side city along the Menomonee River, bordered mostly by the City of Milwaukee.' },
    { slug: 'west-allis', name: 'West Allis', card: 'Industrial city on Milwaukee\'s western edge and home of State Fair Park.' },
    { slug: 'west-milwaukee', name: 'West Milwaukee', card: 'One-square-mile village of worker homes surrounded by industry, Milwaukee and West Allis.' },
    { slug: 'whitefish-bay', name: 'Whitefish Bay', card: 'Residential village on the bluffs above Lake Michigan, about five miles north of downtown.' },
  ],
};

/** Hub listing every area of a city. */
export const areasHubPath = (cityKey: string) => `/we-buy-houses-cash/${cityKey}/areas/`;

export const areaPath = (cityKey: string, slug: string) => `/we-buy-houses-cash/${cityKey}/${slug}/`;
