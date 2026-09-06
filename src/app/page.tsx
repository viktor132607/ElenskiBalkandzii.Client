import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero shop-hero">
        <div className="container">
          <div className="promo-board">
            <div className="promo-copy">
              <span className="promo-kicker">Прясно</span>
              <h1 className="promo-title">
                <span>Българско</span>
                <strong>Месо</strong>
              </h1>
              <div className="promo-green-ribbon">Всеки ден за вас!</div>

              <div className="promo-tags" aria-label="Основни продукти">
                <span>Кюфтета</span>
                <span>Кебапчета</span>
                <span>Наденички</span>
                <span>Прясно месо</span>
              </div>

              <div className="promo-actions">
                <Link className="button button-red" href="/project">Разгледай продуктите</Link>
                <Link className="button button-white" href="/contact">Поръчки и наличности</Link>
              </div>
            </div>

            <div className="promo-visual" aria-label="Място за снимка на продукти">
              <div className="promo-image-placeholder">
                <span>СНИМКА НА ПРОДУКТИ</span>
                <small>месо · мезета · сирена</small>
              </div>
              <div className="quality-seal">
                <strong>100%</strong>
                <span>гарантирано качество</span>
              </div>
            </div>

            <div className="promo-bottom-line">
              <span>Прясно</span>
              <i />
              <span className="green">Чисто</span>
              <i className="red-dot" />
              <span>Вкусно</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section category-section">
        <div className="container">
          <div className="section-heading section-heading-row">
            <div>
              <span className="eyebrow">Еленски Балканджии</span>
              <h2>Вкусът на Балкана</h2>
            </div>
            <p>Прясно месо, традиционни мезета и подбрани сирена в изчистена селекция.</p>
          </div>

          <div className="card-grid category-grid">
            <Link href="/project#meso" className="card product-card category-card red-card">
              <span>Месо</span>
              <h3>Прясна селекция</h3>
              <p>Месо за скара, домашната кухня и ежедневната трапеза.</p>
              <b>Виж продуктите →</b>
            </Link>
            <Link href="/project#mezeta" className="card product-card category-card green-card">
              <span>Мезета</span>
              <h3>Балкански вкус</h3>
              <p>Суджуци, луканки, сушени меса и селекции за споделяне.</p>
              <b>Виж продуктите →</b>
            </Link>
            <Link href="/project#sirena" className="card product-card category-card cream-card">
              <span>Сирена</span>
              <h3>За добрата трапеза</h3>
              <p>Подбрани сирена и допълнения към месата и мезетата.</p>
              <b>Виж продуктите →</b>
            </Link>
          </div>
        </div>
      </section>

      <section className="section story-section">
        <div className="container split-block">
          <div>
            <span className="eyebrow">Български характер</span>
            <h2>Традиционно усещане. Чист сайт.</h2>
          </div>
          <div className="prose">
            <p>
              Визията използва дървесни тонове, силно червено, българско зелено и едри надписи, вдъхновени от реалната идентичност на магазина, а съдържанието остава чисто и лесно за разглеждане.
            </p>
            <Link className="text-link" href="/about">Повече за магазина →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
