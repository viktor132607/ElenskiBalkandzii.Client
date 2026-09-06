"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Начало" },
  { href: "/project", label: "Продукти" },
  { href: "/project#meso", label: "Месо", category: true },
  { href: "/project#mezeta", label: "Мезета", category: true },
  { href: "/project#sirena", label: "Сирена", category: true },
  { href: "/about", label: "За нас" },
  { href: "/contact", label: "Контакти" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
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
                style={{ position: "absolute", left: 0 }}
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
                  fontFamily:
                    '"Arial Narrow", "Liberation Sans Narrow", "Nimbus Sans Narrow", Arial, sans-serif',
                  fontWeight: 900,
                  fontStretch: "condensed",
                  lineHeight: 0.88,
                  letterSpacing: "0.01em",
                  WebkitTextStroke: "0.65px #092417",
                  textShadow:
                    "0 2px 0 #092417, 0 4px 8px rgba(0, 0, 0, .22)",
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
          <a
            className="nav-link nav-portfolio"
            href="https://viktor-iliev.site/portfolio/"
            target="_blank"
            rel="noreferrer"
          >
            Изработка ↗
          </a>
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
          <a
            href="https://viktor-iliev.site/portfolio/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Изработка ↗
          </a>
        </nav>
      )}
    </header>
  );
}
