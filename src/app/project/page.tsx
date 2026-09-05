export default function ProjectPage() {
  return (
    <section className="section page-hero">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Продукти</span>
          <h1>Подбрано за трапезата</h1>
          <p>Примерна продуктова селекция, която може да се замени с реални артикули, цени и наличности.</p>
        </div>

        <div className="card-grid product-grid">
          <article className="card product-card"><span>Мезета</span><div className="product-icon" aria-hidden="true">✦</div><h3>Сушени меса</h3><p>Подходящи за плато, аперитив и споделяне.</p></article>
          <article className="card product-card"><span>Класика</span><div className="product-icon" aria-hidden="true">◆</div><h3>Суджуци и луканки</h3><p>Категория за традиционни сухи колбаси и сезонни предложения.</p></article>
          <article className="card product-card"><span>Месо</span><div className="product-icon" aria-hidden="true">✣</div><h3>Прясна селекция</h3><p>Място за актуални месни продукти и предложения от магазина.</p></article>
          <article className="card product-card"><span>Плато</span><div className="product-icon" aria-hidden="true">✥</div><h3>Комбинирани селекции</h3><p>Готови комбинации от различни вкусове за гости и поводи.</p></article>
          <article className="card product-card"><span>Подарък</span><div className="product-icon" aria-hidden="true">◇</div><h3>Подаръчни кутии</h3><p>Подбрани продукти в представителен формат за специален повод.</p></article>
          <article className="card product-card"><span>Сезонно</span><div className="product-icon" aria-hidden="true">✤</div><h3>Нови предложения</h3><p>Свободно място за сезонни артикули, промоции и нови вкусове.</p></article>
        </div>
      </div>
    </section>
  );
}
