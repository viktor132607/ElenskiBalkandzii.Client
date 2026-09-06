"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Начало" },
  { href: "/project#meso", label: "Месо", category: true },
  { href: "/project#mezeta", label: "Мезета", category: true },
  { href: "/project#sirena", label: "Сирена", category: true },
  { href: "/about", label: "За нас" },
  { href: "/contact", label: "Контакти" },
];

const brandFont =
  '"Arial Black", "Franklin Gothic Heavy", Arial, Helvetica, sans-serif';
const navFont =
  '"Arial Narrow", "Liberation Sans Narrow", Arial, Helvetica, sans-serif';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <style>{`
        .site-header,
        .site-header *,
        .promo-board,
        .promo-board *,
        .card,
        .card *,
        .hero-panel,
        .quality-seal {
          box-shadow: none !important;
          text-shadow: none !important;
        }

        .sign-board {
          border-bottom: 5px solid #15100d !important;
          background-color: #1d1714 !important;
          background-image: repeating-linear-gradient(
            to bottom,
            #8b4b2c 0px,
            #8b4b2c 11px,
            #2a211d 11px,
            #2a211d 16px
          ) !important;
        }

        .nav-shell {
          padding-top: 12px !important;
          padding-bottom: 13px !important;
        }

        .sign-heading-row {
          min-height: 112px !important;
        }

        .sign-identity {
          display: inline-flex !important;
          width: auto !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 22px !important;
          margin: 0 auto !important;
        }

        .logo-placeholder {
          position: static !important;
          flex: 0 0 auto !important;
          width: 82px !important;
          height: 82px !important;
          border-width: 4px !important;
          box-shadow: none !important;
        }

        .brand-sign {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 !important;
          font-family: ${brandFont} !important;
          font-weight: 900 !important;
          font-stretch: normal !important;
          line-height: 0.88 !important;
          letter-spacing: -0.035em !important;
          text-align: center !important;
          color: #00c95a !important;
          -webkit-text-stroke: 0 !important;
          text-shadow: none !important;
        }

        .brand-sign span {
          display: block !important;
          white-space: nowrap !important;
        }

        .brand-sign span:first-child {
          font-size: clamp(40px, 4.4vw, 66px) !important;
          transform: scaleX(0.86);
          transform-origin: center;
        }

        .brand-sign span:last-child {
          margin-top: 3px !important;
          font-size: clamp(47px, 5.25vw, 78px) !important;
          transform: scaleX(1.03);
          transform-origin: center;
        }

        .secondary-nav {
          box-shadow: none !important;
        }

        .nav-link,
        .mobile-nav a {
          font-family: ${navFont} !important;
          font-weight: 800 !important;
          letter-spacing: 0.045em !important;
          box-shadow: none !important;
          text-shadow: none !important;
        }

        .nav-link {
          border-width: 1px !important;
          border-radius: 3px !important;
          font-size: 14px !important;
          padding: 10px 17px 9px !important;
        }

        .nav-link:hover {
          transform: none !important;
        }

        .menu-button {
          box-shadow: none !important;
        }

        @media (max-width: 820px) {
          .sign-heading-row {
            min-height: 92px !important;
            justify-content: center !important;
            padding-right: 52px !important;
            padding-left: 52px !important;
          }

          .sign-identity {
            gap: 13px !important;
          }

          .logo-placeholder {
            width: 62px !important;
            height: 62px !important;
          }

          .brand-sign span:first-child {
            font-size: clamp(28px, 6.4vw, 40px) !important;
          }

          .brand-sign span:last-child {
            font-size: clamp(32px, 7.4vw, 47px) !important;
          }
        }

        @media (max-width: 520px) {
          .sign-heading-row {
            min-height: 80px !important;
            padding-left: 0 !important;
          }

          .sign-identity {
            gap: 9px !important;
          }

          .logo-placeholder {
            width: 50px !important;
            height: 50px !important;
          }

          .brand-sign span:first-child {
            font-size: clamp(23px, 7vw, 31px) !important;
          }

          .brand-sign span:last-child {
            font-size: clamp(27px, 8.1vw, 36px) !important;
          }
        }
      `}</style>

      <div className="sign-board">
        <div className="nav-shell">
          <div className="sign-heading-row">
            <div className="sign-identity">
              <div className="logo-placeholder" aria-label="Място за лого">
                <span>ЛОГО</span>
              </div>

              <Link
                href="/"
                className="brand-sign"
                onClick={() => setOpen(false)}
              >
                <span>ЕЛЕНСКИ</span>
                <span>БАЛКАНДЖИИ</span>
              </Link>
            </div>

            <button
              type="button"
              className="menu-button"
              aria-label="Отвори меню"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div className="secondary-nav">
        <nav className="desktop-nav" aria-label="Основна навигация">
          {navItems.map((item) => {
            const active = !item.category && pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${item.category ? "nav-category" : ""} ${active ? "active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Мобилна навигация">
          {navItems.map((item) => {
            const active = !item.category && pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${item.category ? "nav-category" : ""} ${active ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
