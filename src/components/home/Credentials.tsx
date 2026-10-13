import './Credentials.css';

export function Credentials() {
  return (
    <section className="credentials" aria-label="Rankings">
      <div className="container credentials__inner">
        <img
          src="/images/badge.png"
          width={584}
          height={427}
          loading="lazy"
          alt="U.S. News & World Report Best Rankings"
          className="credentials__badge"
        />
        <img
          src="/images/bbb-logo.png"
          width={582}
          height={367}
          loading="lazy"
          alt="BBB Accredited"
          className="credentials__badge"
        />
      </div>
    </section>
  );
}
