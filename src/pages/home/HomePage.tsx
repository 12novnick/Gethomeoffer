import { Link } from 'react-router';
import { Approach } from '../../components/home/Approach';
import { Credentials } from '../../components/home/Credentials';
import { Hero } from '../../components/home/Hero';
import { NextChapter } from '../../components/home/NextChapter';
import { Options } from '../../components/home/Options';
import { Process } from '../../components/home/Process';
import { Situations } from '../../components/home/Situations';

export function HomePage() {
  return (
    <>
      <Hero />
      <Credentials />
      <Situations />
      <Options />
      <Approach />
      <Process />
      <NextChapter />
      <section className="section">
        <div className="container">
          <h3>Explore Our Programs</h3>
          <p>
            <Link to="/we-buy-houses-cash/wisconsin/" className="arrow-link">
              We Buy Houses in Wisconsin
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </p>
          <ul role="list" style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li><Link to="/we-buy-houses-cash/wisconsin/milwaukee/">Milwaukee</Link></li>
            <li><Link to="/we-buy-houses-cash/wisconsin/madison/">Madison</Link></li>
            <li><Link to="/we-buy-houses-cash/wisconsin/green-bay/">Green Bay</Link></li>
            <li><Link to="/we-buy-houses-cash/wisconsin/kenosha/">Kenosha</Link></li>
            <li><Link to="/we-buy-houses-cash/wisconsin/racine/">Racine</Link></li>
            <li><Link to="/we-buy-houses-cash/wisconsin/appleton/">Appleton</Link></li>
            <li><Link to="/we-buy-houses-cash/wisconsin/waukesha/">Waukesha</Link></li>
            <li><Link to="/we-buy-houses-cash/wisconsin/eau-claire/">Eau Claire</Link></li>
            <li><Link to="/we-buy-houses-cash/wisconsin/la-crosse/">La Crosse</Link></li>
            <li><Link to="/we-buy-houses-cash/wisconsin/oshkosh/">Oshkosh</Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}
