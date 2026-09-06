export default function ProjectPage() {
  return (
    <section className="section page-hero products-page">
      <div className="container">
        <div className="section-heading products-heading">
          <span className="eyebrow">Продукти</span>
          <h1>Подбрано за трапезата</h1>
          <p>Категориите са готови за реални артикули, снимки, цени и наличности от магазина.</p>
        </div>

        <div className="product-category-block" id="meso">
          <div className="category-ribbon red-ribbon">Месо</div>
          <div className="card-grid product-grid">
            <article className="card product-card"><span>Прясно</span><h3>Свинско месо</h3><p>Място за актуални разфасовки, грамажи, цени и наличности.</p></article>
            <article className="card product-card"><span>Скара</span><h3>Кюфтета и кебапчета</h3><p>Прясно приготвени предложения за скара и домашната трапеза.</p></article>
            <article className="card product-card"><span>Класика</span><h3>Наденички</h3><p>Традиционни и сезонни предложения, готови за реален каталог.</p></article>
          </div>
        </div>

        <div className="product-category-block" id="mezeta">
          <div className="category-ribbon green-ribbon">Мезета</div>
          <div className="card-grid product-grid">
            <article className="card product-card"><span>Сушено</span><h3>Суджуци и луканки</h3><p>Класически сухи колбаси и традиционни балкански вкусове.</p></article>
            <article className="card product-card"><span>Селекция</span><h3>Сушени меса</h3><p>Подходящи за плато, аперитив, гости и подаръчни комбинации.</p></article>
            <article className="card product-card"><span>Комбо</span><h3>Мезе плата</h3><p>Комбинирани селекции от различни продукти за споделяне.</p></article>
          </div>
        </div>

        <div className="product-category-block" id="sirena">
          <div className="category-ribbon cream-ribbon">Сирена</div>
          <div className="card-grid product-grid">
            <article className="card product-card"><span>Класика</span><h3>Бяло сирене</h3><p>Подбрани предложения за ежедневната и празничната трапеза.</p></article>
            <article className="card product-card"><span>Подбор</span><h3>Кашкавал</h3><p>Категория за различни разфасовки, марки и сезонни предложения.</p></article>
            <article className="card product-card"><span>Комбинация</span><h3>Сирена за плато</h3><p>Подходящи допълнения към месата, мезетата и подаръчните селекции.</p></article>
          </div>
        </div>
      </div>
    </section>
  );
}
