import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero section">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Култура · Общност · Традиция</span>
            <h1>Еленски Балканджии</h1>
            <p className="hero-copy">
              Съвременна дигитална основа за проект, посветен на хората, събитията и духа на Еленския Балкан.
            </p>
            <div className="actions">
              <Link className="button button-dark" href="/about">За проекта</Link>
              <a className="button button-light" href="https://viktor-iliev.site/portfolio/" target="_blank" rel="noreferrer">
                Моето портфолио ↗
              </a>
            </div>
          </div>
          <div className="hero-panel">
            <span className="panel-label">Статус</span>
            <strong>В активно развитие</strong>
            <p>Next.js frontend, ASP.NET Core Web API и PostgreSQL архитектура.</p>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Основа</span>
            <h2>Основни направления</h2>
            <p>Структурата е подготвена така, че съдържанието и функционалностите да се добавят постепенно.</p>
          </div>
          <div className="card-grid">
            <article className="card"><span>01</span><h3>Събития</h3><p>Място за бъдещ календар, участия и актуална информация.</p></article>
            <article className="card"><span>02</span><h3>Галерия</h3><p>Основа за снимки, истории и визуално съдържание.</p></article>
            <article className="card"><span>03</span><h3>Общност</h3><p>Структура, която може да се разшири с профили, новини и членско съдържание.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-block">
          <div>
            <span className="eyebrow">Технологии</span>
            <h2>Чист client-server подход</h2>
          </div>
          <div className="prose">
            <p>Frontend-ът е отделен Next.js проект, а backend-ът е .NET 10 Web API с Entity Framework Core и PostgreSQL.</p>
            <Link className="text-link" href="/project">Виж структурата →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
