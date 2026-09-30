import { FaqList } from '../../components/faq/FaqList';
import { CtaBand } from '../../components/ui/CtaBand';
import { PageHero } from '../../components/ui/PageHero';
import { FAQ_CRUMBS } from '../../data/breadcrumbs';
import { FAQ_CATEGORIES } from '../../data/faq';
import './FaqPage.css';

export function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={FAQ_CRUMBS}
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        lede="Answers to common questions about GetHomeOffer, the Cash Program, the Real Estate Agent Program and where we operate."
      />

      <section className="section" aria-label="Questions by topic">
        <div className="container faq-layout">
          <nav className="faq-nav" aria-label="FAQ topics">
            <ul role="list" className="faq-nav__list">
              {FAQ_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <a href={`#faq-${category.id}`} className="faq-nav__link">
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="faq-groups">
            {FAQ_CATEGORIES.map((category) => (
              <section key={category.id} id={`faq-${category.id}`} className="faq-group" aria-labelledby={`faq-${category.id}-title`}>
                <h2 id={`faq-${category.id}-title`} className="faq-group__title">
                  {category.title}
                </h2>
                <FaqList faqs={category.faqs} />
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        id="faq-cta"
        title="Still have questions?"
        body="Tell us about your property and what you're hoping to do. We're happy to walk you through your options."
        cta={{ label: 'Contact Us', path: '/contact/' }}
      />
    </>
  );
}
