"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Начало" },
  { href: "/project", label: "Продукти" },
  { href: "/about", label: "За нас" },
  { href: "/contact", label: "Контакти" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <div className="sign-heading-row">
          <Link href="/" className="brand-sign" onClick={() => setOpen(false)}>
            <span>ЕЛЕНСКИ</span>
            <span>БАЛКАНДЖИИ</span>
          </Link>

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

        <nav className="desktop-nav" aria-label="Основна навигация">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
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
