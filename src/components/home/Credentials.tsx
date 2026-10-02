import './Credentials.css';

export function Credentials() {
  return (
    <section className="credentials" aria-label="Rankings">
      <div className="container credentials__inner">
        <img
          src="/images/badge.png"
          alt="U.S. News & World Report Best Rankings"
          className="credentials__badge"
        />
      </div>
    </section>
  );
}
