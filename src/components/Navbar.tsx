"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", bg: "Начало", en: "Home" },
  { href: "/project#meso", bg: "Месо", en: "Meat" },
  { href: "/project#mezeta", bg: "Мезета", en: "Delicacies" },
  { href: "/project#sirena", bg: "Сирена", en: "Cheese" },
  { href: "/about", bg: "За нас", en: "About us" },
  { href: "/contact", bg: "Контакти", en: "Contacts" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<"bg" | "en">("bg");

  const toggleLanguage = () => {
    setLanguage((current) => (current === "bg" ? "en" : "bg"));
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-b-[4px] border-[#15100d] bg-[repeating-linear-gradient(to_bottom,#8b4b2c_0px,#8b4b2c_6px,#251c18_6px,#251c18_9px)]">
        <div className="mx-auto w-[min(1320px,calc(100%_-_40px))] px-[18px] py-[10px] max-[620px]:w-full">
          <div className="relative flex min-h-[108px] w-full items-center justify-center pr-[132px] max-[820px]:min-h-[88px] max-[820px]:pr-[116px] max-[520px]:min-h-[76px] max-[520px]:pl-0 max-[520px]:pr-[100px]">
            <div className="mx-auto inline-flex items-center justify-center gap-[18px] max-[820px]:gap-[12px] max-[520px]:gap-[8px]">
              <img
                src="/588283015_25323651390578829_4300945585916792863_n.jpg"
                alt="Еленски Балканджии"
                className="h-[96px] w-[96px] shrink-0 rounded-full border border-white bg-white object-cover max-[820px]:h-[76px] max-[820px]:w-[76px] max-[520px]:h-[66px] max-[520px]:w-[66px]"
              />

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center text-center font-['Arial_Black','Franklin_Gothic_Heavy',Arial,Helvetica,sans-serif] font-black uppercase leading-[0.88] tracking-[-0.025em] text-[#00c95a] antialiased [-webkit-text-stroke:0.75px_#111] [paint-order:stroke_fill]"
              >
                <span className="block whitespace-nowrap text-[clamp(40px,4.1vw,62px)] max-[820px]:text-[clamp(28px,6.1vw,38px)] max-[520px]:text-[clamp(23px,6.7vw,30px)]">
                  ЕЛЕНСКИ
                </span>
                <span className="mt-[3px] block whitespace-nowrap text-[clamp(47px,5vw,74px)] max-[820px]:text-[clamp(32px,7.1vw,45px)] max-[520px]:text-[clamp(27px,7.8vw,35px)]">
                  БАЛКАНДЖИИ
                </span>
              </Link>
            </div>

            <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-3 max-[520px]:gap-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className="h-11 min-w-11 rounded-[14px] border border-[#d7d2cc] bg-white px-3 text-[15px] font-extrabold uppercase text-[#201914] transition-colors hover:border-[#08733a] hover:text-[#08733a] max-[520px]:h-10 max-[520px]:min-w-10 max-[520px]:px-2 max-[520px]:text-[14px]"
                aria-label="Смени езика"
              >
                {language === "bg" ? "EN" : "BG"}
              </button>

              <button
                type="button"
                aria-label={open ? "Затвори меню" : "Отвори меню"}
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-[14px] border border-[#d7d2cc] bg-white transition-colors hover:border-[#08733a] max-[520px]:h-10 max-[520px]:w-10"
              >
                <span className="h-0.5 w-5 bg-[#2d211b]" />
                <span className="h-0.5 w-5 bg-[#2d211b]" />
                <span className="h-0.5 w-5 bg-[#2d211b]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <nav
          className="border-b border-[#dedad5] bg-white"
          aria-label="Основна навигация"
        >
          <div className="mx-auto w-[min(1320px,calc(100%_-_64px))] max-[620px]:w-[calc(100%_-_40px)]">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-[74px] items-center border-b border-[#e2dfdb] px-0 text-[24px] font-bold text-[#36322f] transition-colors last:border-b-0 hover:text-[#08733a] max-[620px]:min-h-[64px] max-[620px]:text-[20px] ${
                    active ? "text-[#08733a]" : ""
                  }`}
                >
                  {language === "bg" ? item.bg : item.en}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
