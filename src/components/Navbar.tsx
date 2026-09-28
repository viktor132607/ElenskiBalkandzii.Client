"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSiteContent } from "@/components/ContentProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { imageUrl } from "@/lib/api";
import { defaultImagePlacement, imagePlacementStyle } from "@/lib/content";

const links = [
  { href: "/", bg: "Начало", en: "Home" },
  { href: "/products", bg: "Асортимент", en: "Selection" },
  { href: "/news", bg: "Новини", en: "News" },
  { href: "/about", bg: "За нас", en: "About us" },
  { href: "/contact", bg: "Контакти", en: "Contacts" },
];

export default function Navbar() {
  const pathname = usePathname();
  const content = useSiteContent();
  const { language, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const categories = content[language].products.categories.filter((category) => category.visible);
  const localizedHref = (href: string) => language === "en" ? (href === "/" ? "/en" : `/en${href}`) : href;
  const isActive = (href: string) => pathname === localizedHref(href);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#065a2d] text-white shadow-[0_5px_20px_rgba(8,61,31,0.2)]">
      <div className="bg-[#08733a]">
        <div className="mx-auto flex h-[84px] max-w-[1240px] items-center justify-between gap-5 px-6 max-[640px]:h-[70px] max-[640px]:px-4">
          <Link href={localizedHref("/")} onClick={closeMenu} aria-label={language === "bg" ? "Еленски Балканджии — начало" : "Elenski Balkandzhii — home"} className="flex min-w-0 shrink-0 items-center gap-3.5 max-[640px]:gap-2.5">
            <span className="h-[62px] w-[62px] shrink-0 overflow-hidden rounded-full border-2 border-[#c4a87b] bg-white max-[640px]:h-[50px] max-[640px]:w-[50px]"><Image src={imageUrl(content.media.logo)} alt="" width={62} height={62} priority className="h-full w-full" style={imagePlacementStyle(content.mediaPlacements?.logo || defaultImagePlacement)} /></span>
            <span className="flex flex-col font-serif text-[21px] font-bold uppercase leading-[1.05] tracking-[0.06em] text-[#f7f0e5] max-[640px]:text-[15px]">
              <span>Еленски</span><span>Балканджии</span>
            </span>
          </Link>

          <nav aria-label={language === "bg" ? "Основна навигация" : "Main navigation"} className="flex h-full items-center gap-8 max-[1060px]:gap-5 max-[900px]:hidden">
            {links.map((item) => (
              <div key={item.href} className="group relative flex h-full items-center">
                <Link href={localizedHref(item.href)} aria-current={isActive(item.href) ? "page" : undefined} className={`relative flex h-full items-center whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-[#e6bd7e] after:absolute after:bottom-[19px] after:left-0 after:h-[2px] after:w-full after:bg-[#d5a65f] after:transition-opacity ${isActive(item.href) ? "text-[#e6bd7e] after:opacity-100" : "text-[#f4ebe0] after:opacity-0 group-hover:after:opacity-100"}`}>
                  {language === "bg" ? item.bg : item.en}
                </Link>
                {item.href === "/products" && categories.length > 0 && (
                  <div className="invisible absolute left-[-16px] top-[calc(100%-3px)] min-w-[230px] border-t-2 border-[#d5a65f] bg-[#075f31] py-2 opacity-0 shadow-xl transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {categories.map((category) => (
                      <Link key={category.id} href={`${localizedHref("/products")}#${category.id}`} className="block px-4 py-2.5 text-[13px] text-white hover:bg-[#0b8d47]">
                        {category.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <button type="button" onClick={toggleLanguage} className="flex h-9 min-w-10 items-center justify-center px-2 text-xs font-bold tracking-[0.08em] transition-colors hover:text-[#e6bd7e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label={language === "bg" ? "Switch to English" : "Превключи на български"}>
              {language === "bg" ? "EN" : "BG"}
            </button>
            <button type="button" aria-label={open ? (language === "bg" ? "Затвори меню" : "Close menu") : (language === "bg" ? "Отвори меню" : "Open menu")} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="hidden h-9 w-10 flex-col items-center justify-center gap-[5px] border border-white/60 max-[900px]:flex">
              <span className="h-[2px] w-5 bg-[#f4ebe0]" /><span className="h-[2px] w-5 bg-[#f4ebe0]" /><span className="h-[2px] w-5 bg-[#f4ebe0]" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" aria-label={language === "bg" ? "Мобилна навигация" : "Mobile navigation"} className="hidden border-t border-white/20 bg-[#075f31] px-4 pb-3 max-[900px]:block">
          {links.map((item) => (
            <div key={item.href}>
              <Link href={localizedHref(item.href)} onClick={closeMenu} aria-current={isActive(item.href) ? "page" : undefined} className={`block border-b border-white/20 py-3 text-[14px] font-semibold uppercase tracking-[0.08em] ${isActive(item.href) ? "text-[#e6bd7e]" : "text-white"}`}>
                {language === "bg" ? item.bg : item.en}
              </Link>
              {item.href === "/products" && categories.map((category) => (
                <Link key={category.id} href={`${localizedHref("/products")}#${category.id}`} onClick={closeMenu} className="block border-b border-white/20 py-2.5 pl-5 text-[13px] text-white">
                  {category.title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
