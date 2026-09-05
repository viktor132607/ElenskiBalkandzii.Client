import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="folk-stripe" aria-hidden="true" />
      <div className="footer-grid">
        <div>
          <div className="footer-brand">Еленски Балканджии</div>
          <p className="footer-copy">
            Магазин за месо, мезета и традиционни вкусове с характер от Еленския Балкан.
          </p>
        </div>

        <div>
          <div className="footer-title">Навигация</div>
          <div className="footer-links">
            <Link href="/">Начало</Link>
            <Link href="/project">Продукти</Link>
            <Link href="/about">За нас</Link>
            <Link href="/contact">Контакти</Link>
          </div>
        </div>

        <div>
          <div className="footer-title">Връзки</div>
          <div className="footer-links">
            <a href="https://viktor-iliev.site/portfolio/" target="_blank" rel="noreferrer">
              Изработка: Viktor Iliev ↗
            </a>
            <a href="https://github.com/viktor132607/ElenskiBalkandzii.Client" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Еленски Балканджии</div>
    </footer>
  );
}
