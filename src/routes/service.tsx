import { breadcrumbSchema, faqSchema, serviceSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { groupCrumbs, serviceCrumbs } from '../lib/service-crumbs';
import { buildServiceRoute } from '../lib/service-pages';
import { ServiceGroupPage } from '../pages/services/ServiceGroupPage';
import { ServicePage } from '../pages/services/ServicePage';
import type { Route } from './+types/service';

export const loader = ({ params }: Route.LoaderArgs) => buildServiceRoute(params.service);

const DATES = { published: '2026-10-14', modified: '2026-10-14' };

export const meta = ({ loaderData }: Route.MetaArgs) => {
  if (!loaderData) return [];
  const { content, path, cities } = loaderData;
  const tags = [
    ...seo({
      title: content.metaTitle,
      description: content.metaDescription,
      path,
      ...DATES,
      ...('modified' in content && content.modified && { modified: content.modified }),
    }),
    ...(content.faqs.length ? [faqSchema(content.faqs)] : []),
  ];

  if (loaderData.kind === 'group') {
    return [...tags, breadcrumbSchema(groupCrumbs({ label: loaderData.group.label, path }))];
  }

  return [
    ...tags,
    breadcrumbSchema(serviceCrumbs(loaderData.group, loaderData.service, path)),
    serviceSchema({
      name: content.heading,
      description: content.metaDescription,
      path,
      areaServed: cities.map((city) => city.name),
      areaType: 'City',
    }),
  ];
};

export default function Service({ loaderData }: Route.ComponentProps) {
  return loaderData.kind === 'group' ? <ServiceGroupPage page={loaderData} /> : <ServicePage page={loaderData} />;
}
