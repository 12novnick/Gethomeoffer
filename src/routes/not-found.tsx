import type { MetaFunction } from 'react-router';
import { seo } from '../lib/seo';
import { PlaceholderPage } from '../pages/PlaceholderPage';

export const meta: MetaFunction = () =>
  seo({
    title: 'Page Not Found | GetHomeOffer',
    description: "The page you're looking for doesn't exist or has moved.",
    path: '/404',
    noindex: true,
  });

export default function NotFound() {
  return <PlaceholderPage title="Page not found." note="The page you're looking for doesn't exist or has moved." />;
}
