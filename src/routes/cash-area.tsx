import { breadcrumbSchema, faqSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { buildAreaPage } from '../lib/location-pages';
import { areaCrumbs } from '../lib/location-meta';
import { AreaPage } from '../pages/locations/AreaPage';
import type { Route } from './+types/cash-area';

export const loader = ({ params }: Route.LoaderArgs) => buildAreaPage(params.state, params.city, params.area);

export const meta = ({ loaderData }: Route.MetaArgs) => {
  if (!loaderData) return [];
  const { content, area } = loaderData;
  return [
    ...seo({
      title: content.metaTitle,
      description: content.metaDescription,
      path: area.path,
      published: '2026-10-14',
      modified: '2026-10-14',
    }),
    breadcrumbSchema(areaCrumbs(loaderData)),
    faqSchema(content.faqs),
  ];
};

export default function CashArea({ loaderData }: Route.ComponentProps) {
  return <AreaPage page={loaderData} />;
}
