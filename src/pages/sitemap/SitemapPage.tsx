import { Link } from 'react-router';
import { PageHero } from '../../components/ui/PageHero';
import { SITEMAP_CRUMBS } from '../../data/breadcrumbs';
import { AGENT_PATH, CASH_PATH, LEGAL_ITEMS } from '../../lib/site';
import './SitemapPage.css';

interface SitemapLink {
  label: string;
  path: string;
}

export function SitemapPage({ locationLinks }: { locationLinks: SitemapLink[] }) {
  const groups: { id: string; title: string; links: readonly SitemapLink[] }[] = [
    {
      id: 'company',
      title: 'Company',
      links: [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about/' },
        { label: 'FAQ', path: '/faq/' },
        { label: 'Contact', path: '/contact/' },
      ],
    },
    {
      id: 'programs',
      title: 'Programs',
      links: [
        { label: 'Services', path: '/services/' },
        { label: 'We Buy Houses Cash', path: CASH_PATH },
        { label: 'Real Estate Agent Program', path: AGENT_PATH },
      ],
    },
    {
      id: 'locations',
      title: 'Locations',
      links: [{ label: 'All Locations', path: '/locations/' }, ...locationLinks],
    },
    { id: 'legal', title: 'Legal', links: LEGAL_ITEMS },
  ];

  return (
    <>
      <PageHero crumbs={SITEMAP_CRUMBS} title="Sitemap" lede="Every page on GetHomeOffer, in one place." />

      <section className="section sitemap" aria-label="All pages">
        <div className="container sitemap__grid">
          {groups.map((group) => (
            <nav key={group.id} aria-labelledby={`sitemap-${group.id}`} className="sitemap__group">
              <h2 id={`sitemap-${group.id}`} className="sitemap__title">
                {group.title}
              </h2>
              <ul role="list" className="sitemap__list">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="sitemap__link">
                      {link.label}
                      <span className="btn__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </section>
    </>
  );
}
