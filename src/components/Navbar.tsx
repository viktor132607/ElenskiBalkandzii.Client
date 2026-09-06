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

const navLinkBase =
  "min-w-[96px] border border-[#2b211c] bg-white px-[17px] py-[9px] text-center text-sm font-extrabold uppercase tracking-[0.045em] text-[#2d211b] transition-colors hover:border-[#08733a] hover:text-[#08733a]";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-b-[5px] border-[#15100d] bg-[repeating-linear-gradient(to_bottom,#8b4b2c_0px,#8b4b2c_11px,#2a211d_11px,#2a211d_16px)]">
        <div className="mx-auto w-[min(1320px,calc(100%-40px))] px-[18px] py-[12px] max-[620px]:w-full">
          <div className="relative flex min-h-[112px] w-full items-center justify-center max-[820px]:min-h-[92px] max-[820px]:px-[52px] max-[520px]:min-h-[80px] max-[520px]:pl-0">
            <div className="mx-auto inline-flex items-center justify-center gap-[22px] max-[820px]:gap-[13px] max-[520px]:gap-[9px]">
              <div
                className="grid h-[82px] w-[82px] shrink-0 place-items-center rounded-full border-4 border-white bg-[conic-gradient(#0b9c4a_0_33%,#fff_33%_66%,#cf2428_66%_100%)] max-[820px]:h-[62px] max-[820px]:w-[62px] max-[520px]:h-[50px] max-[520px]:w-[50px]"
                aria-label="Място за лого"
              >
                <span className="grid h-[58px] w-[58px] place-items-center rounded-full bg-white text-[10px] font-black tracking-[0.04em] text-[#2d211b] max-[820px]:h-[42px] max-[820px]:w-[42px] max-[820px]:text-[8px] max-[520px]:h-[34px] max-[520px]:w-[34px]">
                  ЛОГО
                </span>
              </div>

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center text-center font-['Arial_Black','Franklin_Gothic_Heavy',Arial,Helvetica,sans-serif] font-black uppercase leading-[0.88] tracking-[-0.035em] text-[#00c95a] [-webkit-text-stroke:0.55px_#000]"
              >
                <span className="block whitespace-nowrap text-[clamp(40px,4.4vw,66px)] [transform:scaleX(.86)] max-[820px]:text-[clamp(28px,6.4vw,40px)] max-[520px]:text-[clamp(23px,7vw,31px)]">
                  ЕЛЕНСКИ
                </span>
                <span className="mt-[3px] block whitespace-nowrap text-[clamp(47px,5.25vw,78px)] [transform:scaleX(1.03)] max-[820px]:text-[clamp(32px,7.4vw,47px)] max-[520px]:text-[clamp(27px,8.1vw,36px)]">
                  БАЛКАНДЖИИ
                </span>
              </Link>
            </div>

            <button
              type="button"
              aria-label="Отвори меню"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 flex-col items-center justify-center gap-[5px] border border-[#17120f] bg-white max-[820px]:flex max-[520px]:h-10 max-[520px]:w-10"
            >
              <span className="h-0.5 w-5 bg-[#2d211b]" />
              <span className="h-0.5 w-5 bg-[#2d211b]" />
              <span className="h-0.5 w-5 bg-[#2d211b]" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-[#ddd7d1] bg-[#faf9f7] max-[820px]:hidden">
        <nav className="mx-auto flex w-[min(1320px,calc(100%-40px))] flex-wrap items-center justify-center gap-[9px] px-5 py-[10px]" aria-label="Основна навигация">
          {navItems.map((item) => {
            const active = !item.category && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${navLinkBase} ${item.category ? "text-[#08733a]" : ""} ${active ? "border-[#0b9c4a] text-[#08733a]" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {open && (
        <nav
          className="hidden max-h-[calc(100vh-100px)] grid-cols-2 gap-[9px] overflow-y-auto border-b border-[#ddd8d2] bg-[#f7f7f5] px-[18px] py-[14px] max-[820px]:grid max-[420px]:grid-cols-1 max-[420px]:px-3"
          aria-label="Мобилна навигация"
        >
          {navItems.map((item) => {
            const active = !item.category && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border border-[#2b211c] bg-white px-[10px] py-[11px] text-center text-[15px] font-extrabold uppercase tracking-[0.04em] text-[#2d211b] ${item.category ? "text-[#08733a]" : ""} ${active ? "border-[#0b9c4a] text-[#08733a]" : ""}`}
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
