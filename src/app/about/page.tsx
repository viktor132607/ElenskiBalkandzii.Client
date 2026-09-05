export default function AboutPage() {
  return (
    <section className="section page-hero">
      <div className="container narrow">
        <span className="eyebrow">За проекта</span>
        <h1>Еленски Балканджии</h1>
        <p className="hero-copy">
          Проектът започва с минимална и ясна техническа основа, която може да прерасне в пълноценна платформа без да се натрупва излишна сложност още в началото.
        </p>
        <div className="info-list">
          <div><strong>Подход</strong><span>Изчистен интерфейс, ясна навигация и mobile-first поведение.</span></div>
          <div><strong>Архитектура</strong><span>Отделни frontend и backend приложения с REST API връзка.</span></div>
          <div><strong>Развитие</strong><span>Готово за добавяне на реално съдържание, роли, галерии, събития и администрация.</span></div>
        </div>
      </div>
    </section>
  );
}
