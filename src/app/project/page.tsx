export default function ProjectPage() {
  return (
    <section className="section page-hero">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Техническа структура</span>
          <h1>Проект</h1>
          <p>Минимална, подредена основа за реална full-stack разработка.</p>
        </div>
        <div className="card-grid">
          <article className="card"><span>Frontend</span><h3>Next.js</h3><p>App Router, TypeScript, reusable UI компоненти и API конфигурация.</p></article>
          <article className="card"><span>Backend</span><h3>ASP.NET Core</h3><p>.NET 10 Web API с отделни Domain и Data слоеве.</p></article>
          <article className="card"><span>Database</span><h3>PostgreSQL</h3><p>Entity Framework Core, Npgsql и Docker Compose среда за локална разработка.</p></article>
        </div>
      </div>
    </section>
  );
}
