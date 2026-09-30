import { Link } from 'react-router';
import { AGENT_PATH, CASH_PATH, LEGAL_ITEMS, NAV_ITEMS } from '../../lib/site';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="site-footer__grid">
          <nav aria-label="Footer">
            <h2 className="site-footer__heading">Explore</h2>
            <ul role="list" className="site-footer__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Programs">
            <h2 className="site-footer__heading">Programs</h2>
            <ul role="list" className="site-footer__list">
              <li>
                <Link to={CASH_PATH}>We Buy Houses Cash</Link>
              </li>
              <li>
                <Link to={AGENT_PATH}>Real Estate Agent Program</Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h2 className="site-footer__heading">Legal</h2>
            <ul role="list" className="site-footer__list">
              {LEGAL_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <Link to="/" className="site-footer__wordmark">
            Get Home Offer
          </Link>
          <p>© {CURRENT_YEAR} GetHomeOffer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
