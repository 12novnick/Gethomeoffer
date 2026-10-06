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
          </ul>
        </div>
      </section>
    </>
  );
}
