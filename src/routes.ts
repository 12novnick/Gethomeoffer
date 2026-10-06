import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('services', 'routes/services.tsx'),
  route('locations', 'routes/locations.tsx'),
  route('we-buy-houses-cash', 'routes/cash-program.tsx'),
  route('we-buy-houses-cash/:state', 'routes/cash-state.tsx'),
  route('we-buy-houses-cash/:state/:city', 'routes/cash-city.tsx'),
  route('real-estate-agent-program', 'routes/agent-program.tsx'),
  route('about', 'routes/about.tsx'),
  route('faq', 'routes/faq.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('privacy-policy', 'routes/privacy-policy.tsx'),
  route('terms', 'routes/terms.tsx'),
  route('sitemap.xml', 'routes/sitemap.ts'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
