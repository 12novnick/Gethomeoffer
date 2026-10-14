import { breadcrumbSchema, faqSchema, serviceSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { buildServicePage } from '../lib/service-pages';
import { serviceCrumbs } from '../lib/service-crumbs';
import { ServicePage } from '../pages/services/ServicePage';
import type { Route } from './+types/service';

export const loader = ({ params }: Route.LoaderArgs) => buildServicePage(params.service);

export const meta = ({ loaderData }: Route.MetaArgs) => {
  if (!loaderData) return [];
  const { content, path, cities } = loaderData;
  return [
    ...seo({
      title: content.metaTitle,
      description: content.metaDescription,
      path,
      published: '2026-10-14',
      modified: '2026-10-14',
    }),
    breadcrumbSchema(serviceCrumbs(loaderData.service, path)),
    serviceSchema({
      name: content.heading,
      description: content.metaDescription,
      path,
      areaServed: cities.map((city) => city.name),
      areaType: 'City',
    }),
    faqSchema(content.faqs),
  ];
};

export default function Service({ loaderData }: Route.ComponentProps) {
  return <ServicePage page={loaderData} />;
}
