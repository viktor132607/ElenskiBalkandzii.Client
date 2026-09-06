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

const navFont =
  '"Arial Narrow", "Liberation Sans Narrow", "Nimbus Sans Narrow", Arial, Helvetica, sans-serif';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" style={{ boxShadow: "none" }}>
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

        .brand-sign {
          font-family: ${navFont} !important;
          font-weight: 800 !important;
          font-stretch: condensed;
          letter-spacing: 0.045em !important;
          line-height: 0.94 !important;
          -webkit-text-stroke: 0 !important;
          text-shadow: none !important;
        }

        .brand-sign span:first-child {
          font-size: clamp(31px, 3.5vw, 50px) !important;
        }

        .brand-sign span:last-child {
          font-size: clamp(35px, 4vw, 57px) !important;
        }

        .nav-link,
        .mobile-nav a,
        .menu-button {
          box-shadow: none !important;
        }

        .nav-link,
        .mobile-nav a {
          font-family: ${navFont} !important;
          font-weight: 800 !important;
          letter-spacing: 0.055em !important;
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
      `}</style>

      <div className="sign-board">
        <div className="nav-shell">
          <div className="sign-heading-row">
            <div
              className="sign-identity"
              style={{
                width: "100%",
                position: "relative",
                justifyContent: "center",
              }}
            >
              <div
                className="logo-placeholder"
                aria-label="Място за лого"
                style={{ position: "absolute", left: 0, boxShadow: "none" }}
              >
                <span>ЛОГО</span>
              </div>

              <Link
                href="/"
                className="brand-sign"
                onClick={() => setOpen(false)}
                style={{
                  alignItems: "center",
                  textAlign: "center",
                  margin: "0 auto",
                  fontFamily: navFont,
                  fontWeight: 800,
                  lineHeight: 0.94,
                  letterSpacing: "0.045em",
                  WebkitTextStroke: "0",
                  textShadow: "none",
                }}
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
              style={{ boxShadow: "none" }}
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
