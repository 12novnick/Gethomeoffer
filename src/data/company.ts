// Real business details only. Leave a value undefined and the site shows a clearly marked placeholder.
export const COMPANY: { phone?: string; email?: string } = {
  phone: '(608) 571-4547',
  email: 'info@gethomeoffer.com',
};

export const SOCIAL_LINKS: { label: string; url: string }[] = [
  { label: 'Facebook', url: 'https://www.facebook.com/Gethomeofferusa/' },
  { label: 'X', url: 'https://x.com/GetHomeOffer' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/get-home-offer/' },
  { label: 'YouTube', url: 'https://www.youtube.com/@GetHomeOffer' },
];

export const BUSINESS_ADDRESS = {
  streetAddress: '1723 Waldorf Blvd, Suite 401',
  addressLocality: 'Madison',
  addressRegion: 'WI',
  postalCode: '53719',
  addressCountry: 'US',
};

// From OpenStreetMap for 1723 Waldorf Blvd, Madison, WI.
export const BUSINESS_GEO = { latitude: 43.0339091, longitude: -89.525369 };
