import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero section shop-hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Традиционни мезета · Български вкус</span>
            <h1>Вкус от Еленския Балкан.</h1>
            <p className="hero-copy">
              Подбрани меса и мезета, представени с уважение към българската традиция и с изчистено модерно усещане.
            </p>
            <div className="actions">
              <Link className="button button-dark" href="/project">Разгледай продуктите</Link>
              <Link className="button button-light" href="/about">Нашата история</Link>
            </div>
          </div>

          <div className="hero-panel product-feature">
            <div className="product-seal" aria-hidden="true">ЕБ</div>
            <span className="panel-label">Еленски Балканджии</span>
            <strong>Месо. Мезета. Традиция.</strong>
            <p>Селекция за трапезата, подарък или хубава вечер с приятели.</p>
          </div>
        </div>
      </section>

      <section className="section section-muted folk-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Селекция</span>
            <h2>За всяка добра трапеза</h2>
            <p>Категории, подредени ясно и без излишен шум — както в добрия магазин.</p>
          </div>

          <div className="card-grid product-grid">
            <article className="card product-card">
              <span>01</span>
              <div className="product-icon" aria-hidden="true">✦</div>
              <h3>Сушени мезета</h3>
              <p>Класически вкусове за аперитив, плато и споделена трапеза.</p>
            </article>
            <article className="card product-card">
              <span>02</span>
              <div className="product-icon" aria-hidden="true">◆</div>
              <h3>Подбрани меса</h3>
              <p>Продукти за домашната кухня, празничната маса и ежедневното меню.</p>
            </article>
            <article className="card product-card">
              <span>03</span>
              <div className="product-icon" aria-hidden="true">✣</div>
              <h3>Подаръчни селекции</h3>
              <p>Комбинации от мезета за гости, подарък или специален повод.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section story-section">
        <div className="container split-block">
          <div>
            <span className="eyebrow">Български характер</span>
            <h2>Традиция без претрупване</h2>
          </div>
          <div className="prose">
            <p>
              Визията стъпва върху естествени земни тонове, българско зелено и червено и фини фолклорни мотиви, без да губи чистия и модерен характер на магазина.
            </p>
            <Link className="text-link" href="/project">Към продуктите →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
